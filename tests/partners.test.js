import test from 'node:test';
import assert from 'node:assert/strict';
import {handlePartner,configuration,boundedJson} from '../server/partners.js';
import {application,introduction,codeFromSearch,introductionAttemptId,clearIntroductionAttempt} from '../src/lib/partner-input.js';

const origin='http://localhost:5173';
const env=()=>({PARTNER_PROGRAM_ENABLED:'true',PARTNER_TARGET_ENVIRONMENT:'local',PARTNER_LOCAL_TEST:'true',
  PARTNER_SITE_ORIGIN:origin,PARTNER_CRM_ORIGIN:'http://127.0.0.1:8180',PARTNER_EMAIL_READY:'true',
  PARTNER_NOTICE_VERSION:'synthetic-notice-v1',PARTNER_NOTICE_TEXT:'Synthetic test notice, not an approved privacy notice.',
  PARTNER_PORTAL_URL:'http://127.0.0.1:8180/portal/synthetic-partners/',PARTNER_INTAKE_API_KEY:'synthetic-intake-value'});
const applicationInput=()=>({name:'Synthetic Applicant',email:'synthetic@example.test',country:'Test Country',
  partnerType:'Consultant',audience:'Synthetic businesses',introduction:'Synthetic introductions',noticeVersion:'synthetic-notice-v1'});
const introInput=()=>({applicationId:'11111111-1111-4111-8111-111111111111',referralCode:'a'.repeat(36),
  businessName:'Synthetic Business',contactEmail:'synthetic@example.test',introduction:'Synthetic introduction'});
const request=(action,body,options={})=>new Request(`${options.origin||origin}/api/partners/${action}`,{
  method:options.method||'POST',headers:{Origin:options.origin||origin,'Content-Type':'application/json',...options.headers},
  ...((options.method||'POST')==='GET'?{}:{body:JSON.stringify(body)}),
});
const noFetch=()=>{throw new Error('Unexpected network call');};

test('Partner API is disabled until explicitly configured',async()=>{
  const response=await handlePartner(request('apply',applicationInput()),{},noFetch);assert.equal(response.status,503);
  const config=await (await handlePartner(request('config',null,{method:'GET'}),{},noFetch)).json();assert.equal(config.available,false);
});
test('Public configuration never reveals credentials or CRM target',async()=>{
  const result=await (await handlePartner(request('config',null,{method:'GET'}),env(),noFetch)).json();
  assert.equal(result.available,true);assert.equal(result.loginAvailable,true);assert.equal(result.introductionAvailable,true);
  assert.equal(JSON.stringify(result).includes('synthetic-intake-value'),false);assert.equal(JSON.stringify(result).includes('8180'),false);
});
test('Preview and local hosts cannot be pointed at the known live CRM',()=>{
  const e={...env(),PARTNER_SITE_ORIGIN:'https://preview.pages.dev',PARTNER_TARGET_ENVIRONMENT:'sandbox',PARTNER_CRM_ORIGIN:'https://crm.wirrox.com',
    PARTNER_TURNSTILE_SITE_KEY:'synthetic-site-key',PARTNER_TURNSTILE_SECRET:'synthetic-challenge-value'};
  assert.equal(configuration(new Request('https://preview.pages.dev/api/partners/config'),e),null);
  assert.equal(configuration(request('config',null,{method:'GET'}),{...env(),PARTNER_CRM_ORIGIN:'https://crm.wirrox.com'}),null);
});
test('Local testing flags cannot disable production challenge requirements',()=>{
  const e={...env(),PARTNER_SITE_ORIGIN:'https://www.wirrox.com',PARTNER_TARGET_ENVIRONMENT:'production',PARTNER_CRM_ORIGIN:'https://crm.wirrox.com'};
  assert.equal(configuration(new Request('https://www.wirrox.com/api/partners/config'),e),null);
});
test('Untrusted URL credentials paths and login destinations fail closed',()=>{
  for(const changes of [{PARTNER_CRM_ORIGIN:'https://user:password@example.test'}, {PARTNER_CRM_ORIGIN:'https://example.test/private'},
    {PARTNER_PORTAL_URL:'https://other.example.test/login'},{PARTNER_TARGET_ENVIRONMENT:'production'}]){
    assert.equal(configuration(request('config',null,{method:'GET'}),{...env(),...changes}),null);
  }
});
test('Cross-origin and non-JSON submissions never reach CRM',async()=>{
  assert.equal((await handlePartner(request('apply',applicationInput(),{headers:{Origin:'https://other.example.test'}}),env(),noFetch)).status,403);
  assert.equal((await handlePartner(request('apply',applicationInput(),{headers:{'Content-Type':'text/plain'}}),env(),noFetch)).status,415);
});
test('Public forms reject ownership finance and workflow injection',async()=>{
  for(const key of ['affiliateId','affiliateContactId','status','rateBps','commissionMinor','portalUserId']){
    assert.equal((await handlePartner(request('apply',{...applicationInput(),[key]:'tampered'}),env(),noFetch)).status,400);
  }
});
test('Application proxy forwards only safe fields and no credential',async()=>{
  let calls=0;
  const response=await handlePartner(request('apply',applicationInput()),env(),async(url,options)=>{
    calls++;assert.equal(url,'http://127.0.0.1:8180/api/v1/AffiliateProgram/apply');assert.equal(options.headers['X-Api-Key'],undefined);
    assert.equal(options.redirect,'error');assert.deepEqual(JSON.parse(options.body),application(applicationInput()));
    return Response.json({id:'private-record',internalNotes:'private',exists:true});
  });
  const text=await response.text();assert.equal(calls,1);assert.equal(response.status,200);assert.equal(text.includes('private'),false);assert.equal(text.includes('exists'),false);
});
test('Changed notice and honeypot cannot create an application',async()=>{
  assert.equal((await handlePartner(request('apply',{...applicationInput(),noticeVersion:'old'}),env(),noFetch)).status,400);
  assert.equal((await handlePartner(request('apply',{...applicationInput(),companyFax:'bot'}),env(),noFetch)).status,200);
});
test('GET verification does not consume a token',async()=>{
  assert.equal((await handlePartner(request('verify',null,{method:'GET'}),env(),noFetch)).status,405);
  assert.equal((await handlePartner(request('verify',{token:'short'}),env(),noFetch)).status,400);
});
test('Verification forwards the exact token only on explicit POST',async()=>{
  const token='a'.repeat(64);let calls=0;
  const response=await handlePartner(request('verify',{token}),env(),async(url,options)=>{
    calls++;assert.equal(url.endsWith('/verify'),true);assert.deepEqual(JSON.parse(options.body),{token});return Response.json({});
  });assert.equal(response.status,200);assert.equal(calls,1);assert.equal((await response.text()).includes(token),false);
});
test('Website introduction uses server-only credential and preserves application identity',async()=>{
  const input=introInput();let calls=0;
  const response=await handlePartner(request('introduction',input),env(),async(url,options)=>{
    calls++;assert.equal(url.endsWith('/introduction-evidence'),true);assert.equal(options.headers['X-Api-Key'],'synthetic-intake-value');
    assert.deepEqual(JSON.parse(options.body),introduction(input));return Response.json({id:'private-referral-id'});
  });assert.equal(response.status,200);assert.equal(calls,1);assert.equal((await response.text()).includes('private-referral-id'),false);
});
test('Unavailable website integration and malformed codes cannot post evidence',async()=>{
  const e=env();delete e.PARTNER_INTAKE_API_KEY;
  assert.equal((await handlePartner(request('introduction',introInput()),e,noFetch)).status,503);
  assert.equal((await handlePartner(request('introduction',{...introInput(),referralCode:'guess'}),env(),noFetch)).status,400);
});
test('Upstream uncertainty is not retried and private errors are suppressed',async()=>{
  let calls=0;const response=await handlePartner(request('apply',applicationInput()),env(),async()=>{calls++;throw new Error('private token and diagnostic');});
  assert.equal(response.status,503);assert.equal(calls,1);assert.equal((await response.text()).includes('private token'),false);
});
test('Streaming request limits reject an untrusted or missing content length',async()=>{
  const stream=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(12001));controller.close();}});
  await assert.rejects(()=>boundedJson(stream),/too large/);
});
test('Challenge result must match hostname and operation',async()=>{
  const e={...env(),PARTNER_LOCAL_TEST:'false',PARTNER_TARGET_ENVIRONMENT:'sandbox',PARTNER_SITE_ORIGIN:'https://preview.pages.dev',
    PARTNER_CRM_ORIGIN:'https://synthetic-crm.example.test',PARTNER_PORTAL_URL:'https://synthetic-crm.example.test/portal/synthetic/',
    PARTNER_TURNSTILE_SITE_KEY:'synthetic-site-key',PARTNER_TURNSTILE_SECRET:'synthetic-challenge-value'};
  for(const result of [{success:false},{success:true,hostname:'other.example.test',action:'partner-apply'},
    {success:true,hostname:'preview.pages.dev',action:'partner-introduction'}]){
    let calls=0;const response=await handlePartner(request('apply',{...applicationInput(),challengeToken:'synthetic-token'},{origin:'https://preview.pages.dev'}),e,
      async(url)=>{calls++;assert.equal(url,'https://challenges.cloudflare.com/turnstile/v0/siteverify');return Response.json(result);});
    assert.equal(response.status,400);assert.equal(calls,1);
  }
});
test('Valid server challenge precedes the narrow CRM call',async()=>{
  const e={...env(),PARTNER_TARGET_ENVIRONMENT:'sandbox',PARTNER_SITE_ORIGIN:'https://preview.pages.dev',PARTNER_CRM_ORIGIN:'https://synthetic-crm.example.test',
    PARTNER_PORTAL_URL:'https://synthetic-crm.example.test/portal/synthetic/',PARTNER_TURNSTILE_SITE_KEY:'synthetic-site-key',PARTNER_TURNSTILE_SECRET:'synthetic-challenge-value'};
  const urls=[];const response=await handlePartner(request('apply',{...applicationInput(),challengeToken:'synthetic-token'},{origin:'https://preview.pages.dev'}),e,async(url,options)=>{
    urls.push(url);if(url.includes('siteverify')){assert.equal(JSON.parse(options.body).secret,e.PARTNER_TURNSTILE_SECRET);return Response.json({success:true,hostname:'preview.pages.dev',action:'partner-apply'});}
    assert.equal(options.headers['X-Api-Key'],undefined);return Response.json({});
  });assert.equal(response.status,200);assert.equal(urls.length,2);
});
test('Opaque code capture is explicit and validates the complete value',()=>{
  assert.equal(codeFromSearch('?partner='+'a'.repeat(36)),'a'.repeat(36));assert.equal(codeFromSearch('?partner=someone@example.test'),'');
  assert.throws(()=>introduction({...introInput(),affiliateId:'tampered'}));assert.throws(()=>application({...applicationInput(),website:'javascript:alert(1)'}));
});
test('Partner login redirects only to the configured native portal',async()=>{
  const response=await handlePartner(request('login',null,{method:'GET'}),env(),noFetch);assert.equal(response.status,302);
  assert.equal(response.headers.get('Location'),'http://127.0.0.1:8180/portal/synthetic-partners/#partner');
});
test('An introduction retry retains its source identity across reloads without storing contact data',()=>{
  const values=new Map();const storage={getItem:key=>values.get(key),setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
  const first=introductionAttemptId(storage);assert.equal(introductionAttemptId(storage),first);assert.equal(values.size,1);
  assert.equal(values.values().next().value,first);clearIntroductionAttempt(storage);assert.notEqual(introductionAttemptId(storage),first);
});
