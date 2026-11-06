import {build} from 'esbuild';
import {readdir, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const files=await readdir(resolve(root,'functions'),{recursive:true,withFileTypes:true});
const handlers=files.filter(x=>x.isFile()).map(x=>resolve(x.parentPath,x.name));
const expected=resolve(root,'functions/api/partners/[[action]].js');
if(handlers.length!==1||handlers[0]!==expected)throw new Error('Review new Functions routes before manual packaging.');
await build({entryPoints:[resolve(root,'server/pages-pilot-worker.js')],outfile:resolve(root,'dist/_worker.js'),
  bundle:true,format:'esm',platform:'browser',target:'es2022',sourcemap:false,logLevel:'warning'});
await writeFile(resolve(root,'dist/_routes.json'),JSON.stringify({version:1,include:['/api/partners/*'],exclude:[]})+'\n');
console.log('Pages pilot package includes the existing API handler and static asset fallback.');
