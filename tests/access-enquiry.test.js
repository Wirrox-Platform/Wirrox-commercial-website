import test from 'node:test';
import assert from 'node:assert/strict';
import {handlePartner} from '../server/partners.js';
import {accessEnquiry, accessEnquiryAttemptId, clearAccessEnquiryAttempt} from '../src/lib/partner-input.js';

const origin = 'https://www.wirrox.com';
const payload = {requestId:'11111111-1111-4111-8111-111111111111', businessName:'Synthetic Business',
  firstName:'Synthetic', lastName:'Applicant', email:'Applicant@example.test', challengeToken:'synthetic-token'};
const env = {WIRROX_ACCESS_ENQUIRY_ENABLED:'true', PARTNER_SITE_ORIGIN:origin, PARTNER_TARGET_ENVIRONMENT:'production',
  PARTNER_CRM_ORIGIN:'https://crm.wirrox.com', PARTNER_GATEWAY_SECRET:'a'.repeat(64),
  PARTNER_TURNSTILE_SITE_KEY:'synthetic-site-key', PARTNER_TURNSTILE_SECRET:'synthetic-site-secret'};
const request = (data = payload, headers = {}) => new Request(origin+'/api/partners/access-enquiry', {method:'POST',
  headers:{Origin:origin, 'Content-Type':'application/json', ...headers}, body:JSON.stringify(data)});
const configRequest = () => new Request(origin+'/api/partners/access-enquiry-config');
const noFetch = () => assert.fail('The intake must fail before making a request');

test('Access enquiry is separate from partner applications and defaults to disabled', async () => {
  const config = await (await handlePartner(configRequest(),env,noFetch)).json();
  assert.deepEqual(config,{available:true,siteKey:'synthetic-site-key'});
  for (const change of [{WIRROX_ACCESS_ENQUIRY_ENABLED:undefined},{PARTNER_GATEWAY_SECRET:undefined},{PARTNER_TURNSTILE_SECRET:undefined}]) {
    assert.equal((await handlePartner(request(),{...env,...change},noFetch)).status,503);
  }
  assert.equal((await handlePartner(request(payload,{Origin:'https://unexpected.example.test'}),env,noFetch)).status,403);
});

test('Optional code and normalized applicant details reach only the gated enquiry endpoint', async () => {
  for (const referralCode of ['', 'B'.repeat(36)]) {
    const paths = [];
    const response = await handlePartner(request({...payload,referralCode},{'X-Wirrox-Partner-Gateway':'untrusted'}),env,async (url,options)=>{
      paths.push(url);
      assert.equal(options.redirect,'manual');
      if (url.includes('siteverify')) return Response.json({success:true,hostname:'www.wirrox.com',action:'partner-access-enquiry'});
      assert.equal(options.headers['X-Wirrox-Partner-Gateway'],env.PARTNER_GATEWAY_SECRET);
      assert.equal(options.headers['X-Api-Key'],undefined);
      assert.deepEqual(JSON.parse(options.body), {requestId:payload.requestId,businessName:payload.businessName,firstName:payload.firstName,
        lastName:payload.lastName,email:'applicant@example.test',referralCode:referralCode.toLowerCase()});
      return Response.json({internalId:'private'});
    });
    assert.equal(response.status,200);
    assert.deepEqual(paths, ['https://challenges.cloudflare.com/turnstile/v0/siteverify',
      'https://crm.wirrox.com/api/v1/AffiliateProgram/access-enquiry']);
    assert.deepEqual(await response.json(),{message:'Your access enquiry was received for review.'});
  }
});

test('The access enquiry rejects replayed, wrong-host and wrong-action Turnstile results', async () => {
  for (const challenge of [{success:false,'error-codes':['timeout-or-duplicate']},
    {success:true,hostname:'sandbox.wirrox.com',action:'partner-access-enquiry'},
    {success:true,hostname:'www.wirrox.com',action:'partner-apply'}]) {
    let calls = 0;
    const response = await handlePartner(request(),env,async url=>{
      assert(url.includes('siteverify'));
      calls++;
      return Response.json(challenge);
    });
    assert.equal(response.status,400);
    assert.equal(calls,1);
  }
});

test('Unexpected workflow fields, malformed codes and bots do not reach CRM', async () => {
  for (const change of [{assignedUserId:'untrusted'},{referralCode:'bad-code'},{businessName:'Example\nInjected'}]) {
    assert.equal((await handlePartner(request({...payload,...change}),env,noFetch)).status,400);
  }
  assert.equal((await handlePartner(request({...payload,companyFax:'filled'}),env,noFetch)).status,200);
  assert.equal(accessEnquiry({requestId:payload.requestId,businessName:'Synthetic',firstName:'First',lastName:'Last',email:'synthetic@example.test'}).referralCode,'');
});

test('Enquiry retries retain only an opaque request ID in their own session key', () => {
  const values = new Map();
  const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};
  const id = accessEnquiryAttemptId(storage);
  assert.equal(accessEnquiryAttemptId(storage),id);
  assert.deepEqual([...values.values()],[id]);
  clearAccessEnquiryAttempt(storage);
  assert.notEqual(accessEnquiryAttemptId(storage),id);
});
