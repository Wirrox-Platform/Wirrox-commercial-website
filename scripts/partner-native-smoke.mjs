/** Explicit local integration test; requires the isolated WirroxAffiliateDocker stack.
 * Uses the real Pages handler and real Espo HTTP API. No hosted services or mail.
 */
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {handlePartner} from '../server/partners.js';

const origin = 'http://127.0.0.1:8181';
const env = {PARTNER_PROGRAM_ENABLED:'true',PARTNER_TARGET_ENVIRONMENT:'local',PARTNER_LOCAL_TEST:'true',
  PARTNER_SITE_ORIGIN:origin,PARTNER_CRM_ORIGIN:'http://127.0.0.1:8180',PARTNER_EMAIL_READY:'true',
  PARTNER_NOTICE_VERSION:'synthetic-notice-v1',PARTNER_NOTICE_TEXT:'Synthetic native integration test only.'};
const email = `website-native-${crypto.randomUUID()}@example.invalid`;
const payload = {name:'Synthetic website native test',email,country:'CH',partnerType:'Consultant',
  audience:'Synthetic audience',introduction:'Synthetic local integration test',noticeVersion:'synthetic-notice-v1'};
const send = (action, data) => handlePartner(new Request(`${origin}/api/partners/${action}`,{
  method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(data)}),env);
const first = await send('apply',payload);
assert.equal(first.status,200);
assert.deepEqual(await (await send('apply',payload)).json(),await first.json());
const reader = 'foreach(glob("data/affiliate-mail-sink/*.json") as $f){$m=json_decode(file_get_contents($f),true);if($m["to"]===$argv[1])echo json_encode($m)."\\n";}';
const args = ['-d','WirroxAffiliateDocker','--user','root','--exec','docker','exec',
  '-w','/var/www/html','wirrox-affiliate-20261026-crm-1','php','-r',reader,email];
const message = JSON.parse(execFileSync('wsl.exe',args,{encoding:'utf8'}).trim().split('\n').at(-1));
const token = message.body.match(/#token=([a-f0-9]{64})/u)[1];
assert.equal((await send('verify',{token})).status,200);
assert.equal((await send('verify',{token})).status,400);
assert.equal((await send('apply',{...payload,noticeVersion:'wrong'})).status,400);
console.log('PASS real Pages adapter → local EspoCRM application, duplicate handling, native mail sink, verification and single-use rejection');
