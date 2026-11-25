import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const t=JSON.parse(read('src/legal/platform-terms-v1.2.json'));
test('Public platform terms preserve the final issued text and version',()=>{assert.equal(t.version,'1.2');assert.equal(t.blocks.filter(b=>b.type==='heading').length,32);assert.equal(t.blocks.at(-1).text.includes('compliance@wirrox.com'),true);assert.doesNotMatch(JSON.stringify(t),/\[\[|TODO|INSERT DATE/);const original=readFileSync(new URL('../../../outputs/WIRROX_Separate_Platform_TC_v1.2.docx',import.meta.url));assert.equal(createHash('sha256').update(original).digest('hex'),t.sourceSha256);assert.deepEqual(readFileSync(new URL('../public/legal-downloads/WIRROX-Platform-Terms-v1.2.docx',import.meta.url)),original)});
test('Publication exposes read/save paths and keeps acceptance separate',()=>{const page=read('src/pages/PlatformTerms.jsx');assert.match(page,/Download PDF/);assert.match(page,/Download Word/);assert.match(page,/does not accept them/);assert.match(page,/headings\.map/);assert.match(read('src/App.jsx'),/legal\/platform-terms-v1-2/);assert.match(read('src/components/wirrox/Footer.jsx'),/legal\/platform-terms/);assert.match(read('src/pages/Legal.jsx'),/legal\/platform-terms/);assert.equal(readFileSync(new URL('../public/legal-downloads/WIRROX-Platform-Terms-v1.2.pdf',import.meta.url)).subarray(0,4).toString(),'%PDF')});
