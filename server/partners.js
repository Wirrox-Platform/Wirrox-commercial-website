import { accessEnquiry, ACCESS_ENQUIRY_FIELDS, APPLICATION_FIELDS, application, introduction, only, PartnerInputError } from '../src/lib/partner-input.js';

const productionHosts = new Set(['wirrox.com', 'www.wirrox.com']);
const loopbackHosts = new Set(['localhost', '127.0.0.1', '[::1]']);
const genericEnquiry = 'Your access enquiry was received for review.';
const genericApplication = 'If your application can be processed, verification instructions will be sent.';
const genericIntroduction = 'Your introduction has been submitted for review. It does not open or approve a customer account.';

export function json(value, status = 200) {
  return Response.json(value, {status, headers: {'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff', 'Vary': 'Origin'}});
}

export async function boundedJson(stream, max = 12000) {
  if (!stream) throw new PartnerInputError('Missing request body.');
  const reader = stream.getReader();
  const chunks = []; let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > max) { await reader.cancel(); throw new PartnerInputError('The submission is too large.'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const data = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) {data.set(chunk, offset); offset += chunk.byteLength;}
  try { return JSON.parse(new TextDecoder('utf-8', {fatal: true}).decode(data)); }
  catch { throw new PartnerInputError('Please submit a valid form.'); }
}

function transportConfiguration(request, env) {
  try {
    const site = new URL(request.url);
    const local = loopbackHosts.has(site.hostname) && env.PARTNER_LOCAL_TEST === 'true';
    const production = productionHosts.has(site.hostname);
    const expected = local ? 'local' : production ? 'production' : 'sandbox';
    if (env.PARTNER_TARGET_ENVIRONMENT !== expected || env.PARTNER_SITE_ORIGIN !== site.origin) return null;
    const crm = new URL(env.PARTNER_CRM_ORIGIN);
    if (crm.username || crm.password || crm.pathname !== '/' || crm.search || crm.hash ||
        (crm.protocol !== 'https:' && !(local && crm.protocol === 'http:' && loopbackHosts.has(crm.hostname))) ||
        (!production && crm.hostname === 'crm.wirrox.com')) return null;
    if (!local && (!env.PARTNER_TURNSTILE_SITE_KEY || !env.PARTNER_TURNSTILE_SECRET)) return null;
    // Nonlocal intake must use the CRM-side gateway guard as well as Turnstile.
    if (!local && !/^[a-f0-9]{64}$/u.test(env.PARTNER_GATEWAY_SECRET || '')) return null;
    if (env.PARTNER_GATEWAY_SECRET && !/^[a-f0-9]{64}$/u.test(env.PARTNER_GATEWAY_SECRET)) return null;
    return {local, hostname: site.hostname, crmOrigin: crm.origin, siteKey: local ? null : env.PARTNER_TURNSTILE_SITE_KEY};
  } catch { return null; }
}

export function configuration(request, env) {
  const transport = transportConfiguration(request, env);
  if (!transport || env.PARTNER_PROGRAM_ENABLED !== 'true' || !env.PARTNER_NOTICE_VERSION ||
      !env.PARTNER_NOTICE_TEXT || env.PARTNER_EMAIL_READY !== 'true') return null;
  try {
    let portal = null;
    if (env.PARTNER_PORTAL_URL) {
      const value = new URL(env.PARTNER_PORTAL_URL);
      if (value.origin !== transport.crmOrigin || !value.pathname.startsWith('/portal/') || value.username || value.password || value.search) return null;
      value.hash = 'partner'; portal = value.href;
    }
    return {...transport, portal, noticeVersion: env.PARTNER_NOTICE_VERSION, noticeText: env.PARTNER_NOTICE_TEXT};
  } catch { return null; }
}

function enquiryConfiguration(request, env) {
  if (env.WIRROX_ACCESS_ENQUIRY_ENABLED !== 'true' || !/^[a-f0-9]{64}$/u.test(env.PARTNER_GATEWAY_SECRET || '')) return null;
  return transportConfiguration(request, env);
}

async function challenge(request, input, config, env, fetcher, action) {
  if (config.local) return;
  if (typeof input.challengeToken !== 'string' || !input.challengeToken || input.challengeToken.length > 2048) {
    throw new PartnerInputError('Please complete the verification check.');
  }
  const response = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST', headers: {'Content-Type': 'application/json'}, redirect: 'manual', signal: AbortSignal.timeout(10000),
    body: JSON.stringify({secret: env.PARTNER_TURNSTILE_SECRET, response: input.challengeToken,
      remoteip: request.headers.get('CF-Connecting-IP') || undefined}),
  });
  if (!response.ok) throw new Error('Challenge service unavailable');
  const result = await boundedJson(response.body, 16000);
  if (result.success !== true || result.hostname !== config.hostname || result.action !== `partner-${action}`) {
    throw new PartnerInputError('The verification check expired. Please try again.');
  }
}

export async function handlePartner(request, env, fetcher = fetch) {
  const url = new URL(request.url);
  const action = url.pathname.replace(/^\/api\/partners\//u, '');
  const isEnquiry = action === 'access-enquiry' || action === 'access-enquiry-config';
  const config = isEnquiry ? enquiryConfiguration(request, env) : configuration(request, env);
  if (request.method === 'GET' && action === 'access-enquiry-config') {
    return json({available: Boolean(config), siteKey: config?.siteKey || null});
  }
  if (request.method === 'GET' && action === 'config') {
    return json({available: Boolean(config), loginAvailable: Boolean(config?.portal),
      introductionAvailable: Boolean(config && env.PARTNER_INTAKE_API_KEY), siteKey: config?.siteKey || null,
      noticeVersion: config?.noticeVersion || '', noticeText: config?.noticeText || ''});
  }
  const enquiryError = 'We could not confirm the enquiry. Please try again or email onboarding@wirrox.com.';
  if (!config) return json({message: isEnquiry ? enquiryError : 'The partner program is not accepting submissions here yet.'}, 503);
  if (request.method === 'GET' && action === 'login') {
    return config.portal ? new Response(null, {status: 302, headers: {Location: config.portal, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer'}}) :
      json({message: 'Partner login is available after invitation.'}, 503);
  }
  if (!['apply','verify','introduction','access-enquiry'].includes(action)) return json({message: 'Not found.'}, 404);
  if (request.method !== 'POST') return json({message: 'Use the submission form.'}, 405);
  if (request.headers.get('Origin') !== url.origin) return json({message: 'Please submit from the WIRROX form.'}, 403);
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({message: 'Expected a form submission.'}, 415);
  try {
    const input = await boundedJson(request.body);
    const allowed = isEnquiry ? [...ACCESS_ENQUIRY_FIELDS, 'challengeToken', 'companyFax'] : action === 'verify' ? ['token','challengeToken','companyFax'] : action === 'apply' ?
      [...APPLICATION_FIELDS,'challengeToken','companyFax'] :
      ['applicationId','referralCode','businessName','website','contactName','contactEmail','introduction','challengeToken','companyFax'];
    only(input, allowed);
    if (input.companyFax) return json({message: isEnquiry ? genericEnquiry :
      action === 'introduction' ? genericIntroduction : genericApplication});
    const {challengeToken: _challenge, companyFax: _fax, ...fields} = input;
    let payload;
    if (isEnquiry) {
      payload = accessEnquiry(fields);
    } else if (action === 'apply') {
      payload = application(fields);
      if (payload.noticeVersion !== config.noticeVersion) throw new PartnerInputError('The application notice changed. Please refresh the form.');
    } else if (action === 'introduction') {
      if (!env.PARTNER_INTAKE_API_KEY) return json({message: 'Introductions are not open here yet.'}, 503);
      payload = introduction(fields);
    } else {
      only(fields, ['token']);
      if (typeof fields.token !== 'string' || !/^[a-f0-9]{64}$/u.test(fields.token)) throw new PartnerInputError('This verification link is invalid or expired.');
      payload = {token: fields.token};
    }
    await challenge(request, input, config, env, fetcher, action);
    const crmAction = action === 'introduction' ? 'introduction-evidence' : action;
    const headers = {'Content-Type': 'application/json', Accept: 'application/json'};
    if (action !== 'introduction' && env.PARTNER_GATEWAY_SECRET) headers['X-Wirrox-Partner-Gateway'] = env.PARTNER_GATEWAY_SECRET;
    if (action === 'introduction') headers['X-Api-Key'] = env.PARTNER_INTAKE_API_KEY;
    const upstream = await fetcher(`${config.crmOrigin}/api/v1/AffiliateProgram/${crmAction}`, {
      method: 'POST', headers, body: JSON.stringify(payload), redirect: 'manual', signal: AbortSignal.timeout(10000),
    });
    // No automatic retry: native source/app IDs provide idempotency for an explicit retry.
    await upstream.body?.cancel();
    if (!upstream.ok && isEnquiry) return json({message: enquiryError}, 503);
    if (!upstream.ok) return json({message: action === 'verify' ? 'This verification link is invalid or expired.' :
      'We could not confirm this submission. Please check your details or contact the partner team.'},
      upstream.status >= 400 && upstream.status < 500 ? 400 : 503);
    return json({message: isEnquiry ? genericEnquiry : action === 'apply' ? genericApplication : action === 'introduction' ? genericIntroduction :
      'Your email has been verified. Your partner application is pending review. Look for an email from the partner team with the outcome or next steps.'});
  } catch (error) {
    if (error instanceof PartnerInputError) return json({message: error.message}, 400);
    // Do not log request bodies, tokens, contact details, credentials or upstream errors.
    return json({message: isEnquiry ? enquiryError :
      'We could not confirm the result. Please contact the partner team before submitting again.'}, 503);
  }
}
