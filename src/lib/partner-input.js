export class PartnerInputError extends Error {}

export const APPLICATION_FIELDS = Object.freeze(['name','email','company','website','country','partnerType','audience','introduction','noticeVersion']);
export const INTRODUCTION_FIELDS = Object.freeze(['applicationId','referralCode','businessName','website','contactName','contactEmail','introduction']);

export function text(value, max = 255, required = true) {
  if (typeof value !== 'string') throw new PartnerInputError('Please complete the required fields.');
  const result = value.trim();
  if ((required && !result) || result.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(result)) {
    throw new PartnerInputError('Please check the length and format of your details.');
  }
  return result;
}

export function only(input, allowed) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).some(key => !allowed.includes(key))) {
    throw new PartnerInputError('This submission contains unsupported fields.');
  }
}

export function email(value) {
  const result = text(value).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(result)) throw new PartnerInputError('Please enter a valid business email.');
  return result;
}

export function website(value = '') {
  const result = text(value, 500, false);
  if (!result) return '';
  try {
    const url = new URL(result);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error();
  } catch { throw new PartnerInputError('Please enter a full website or profile URL.'); }
  return result;
}

export function application(input) {
  only(input, APPLICATION_FIELDS);
  return {name: text(input.name), email: email(input.email), company: text(input.company || '', 255, false),
    website: website(input.website), country: text(input.country, 100), partnerType: text(input.partnerType, 100),
    audience: text(input.audience, 2000), introduction: text(input.introduction, 4000), noticeVersion: text(input.noticeVersion, 100)};
}

export function introduction(input) {
  only(input, INTRODUCTION_FIELDS);
  const applicationId = text(input.applicationId, 64);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu.test(applicationId)) {
    throw new PartnerInputError('Please refresh the form before submitting.');
  }
  const referralCode = text(input.referralCode, 36).toLowerCase();
  if (!/^[a-f0-9]{36}$/u.test(referralCode)) throw new PartnerInputError('Please check the partner referral code.');
  return {applicationId, referralCode, businessName: text(input.businessName), website: website(input.website),
    contactName: text(input.contactName || '', 255, false), contactEmail: email(input.contactEmail),
    introduction: text(input.introduction, 4000)};
}

export function codeFromSearch(search) {
  const code = new URLSearchParams(search).get('partner') || '';
  return /^[a-f0-9]{36}$/iu.test(code) ? code.toLowerCase() : '';
}

export function introductionAttemptId(storage) {
  const key='wirrox-partner-introduction-attempt';
  try {
    const store=storage || globalThis.sessionStorage;
    const saved=store.getItem(key);
    if (/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/iu.test(saved || '')) return saved;
    const id=crypto.randomUUID();store.setItem(key,id);return id;
  } catch {return crypto.randomUUID();}
}

export function clearIntroductionAttempt(storage) {
  try {(storage || globalThis.sessionStorage).removeItem('wirrox-partner-introduction-attempt');} catch { /* Storage can be disabled. */ }
}
