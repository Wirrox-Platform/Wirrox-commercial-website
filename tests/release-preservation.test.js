import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {websiteNotices} from '../src/legal/website-notices.js';

const root=new URL('../',import.meta.url);
const read=name=>readFileSync(new URL(name,root),'utf8');
const baseline=JSON.parse(read('docs/WEBSITE-LIVE-BASELINE-20261106.json'));
const partner=JSON.parse(read('src/legal/partner-notices.json'));
test('Published website privacy content survives partner integration byte-for-byte',()=>{
  const value=readFileSync(new URL('src/legal/website-notices.js',root));
  assert.equal(createHash('sha256').update(value.toString().replaceAll('\r\n','\n')).digest('hex'),baseline.publicSourceSha256['src/legal/website-notices.js']);
  assert.deepEqual(websiteNotices.map(x=>x.slug),['legal-notice','privacy-notice','cookie-policy']);
  assert.equal(read('src/App.jsx').includes('path="/legal/:slug"'),true);
});
test('SPA fallback preserves page paths and does not rewrite the API',()=>{
  assert.equal(existsSync(new URL('public/404.html',root)),false);
  assert.equal(/^\s*\/.*\/index\.html/gmu.test(read('public/_redirects')),false);
  assert.equal(existsSync(new URL('functions/api/partners/[[action]].js',root)),true);
});
test('Published source recovered exactly; unpublished legal additions stay outside this change',()=>{
  assert.equal(baseline.rebuiltJavaScriptMatchesLive,true);
  assert.equal(baseline.liveJavaScriptSha256,'10cfb806939b98638400e2d65fdd65127cf88564e3404d7a907fd9fa21a29818');
  assert.equal(existsSync(new URL('src/legal/additional-website-notices.js',root)),false);
});
test('Partner documents have stable routes and agreement hash; publication authority stays closed',()=>{
  assert.equal(partner.approved,false);
  assert.deepEqual(Object.keys(partner.documents),['privacy','terms','providers','cookies']);
  assert.equal(createHash('sha256').update(partner.documents.terms.text).digest('hex'),partner.agreementSha256);
  assert.doesNotMatch(partner.documents.privacy.text,/walapay|\bKYC\b|\bKYB\b/iu);
  assert.doesNotMatch(partner.documents.terms.text,/\[Partner|Proposed|for approval|for final review/iu);
  assert.match(partner.documents.providers.text,/Google Cloud EMEA Limited/);
  assert.match(read('src/pages/PartnerDocument.jsx'),/text-bronze/);
  assert.doesNotMatch(read('src/pages/PartnerDocument.jsx'),/dangerouslySetInnerHTML|\beval\(/u);
});
