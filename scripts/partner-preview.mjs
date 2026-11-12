/** Synthetic loopback UI preview only. No real CRM, mail, CAPTCHA or hosted service calls. */
import http from 'node:http';
import {Readable} from 'node:stream';
import {createServer as createVite} from 'vite';
import {handlePartner} from '../server/partners.js';

const host='127.0.0.1';const port=5173;const origin=`http://${host}:${port}`;
const env={PARTNER_PROGRAM_ENABLED:'true',PARTNER_TARGET_ENVIRONMENT:'local',PARTNER_LOCAL_TEST:'true',
  PARTNER_SITE_ORIGIN:origin,PARTNER_CRM_ORIGIN:'http://127.0.0.1:8180',PARTNER_EMAIL_READY:'true',
  PARTNER_NOTICE_VERSION:'SYNTHETIC-PREVIEW-v1',PARTNER_NOTICE_TEXT:'SYNTHETIC LOCAL PREVIEW. Use invented details only. This preview stores submissions in memory; it does not send email or contact the CRM.',
  PARTNER_INTAKE_API_KEY:'synthetic-preview-value'};
const verification=new Set();const introductions=new Map();
const fakeCrm=async(url,options)=>{
  const data=JSON.parse(options.body);
  if(url.endsWith('/apply')){
    const bytes=crypto.getRandomValues(new Uint8Array(32));const token=Array.from(bytes,x=>x.toString(16).padStart(2,'0')).join('');
    verification.add(token);console.log(`[synthetic preview verification] ${origin}/partners/verify#token=${token}`);
    return Response.json({});
  }
  if(url.endsWith('/verify')){const found=verification.delete(data.token);return Response.json({}, {status:found?200:400});}
  const serialized=JSON.stringify(data);const existing=introductions.get(data.applicationId);
  if(existing&&existing!==serialized)return Response.json({}, {status:400});
  introductions.set(data.applicationId,serialized);return Response.json({});
};
const vite=await createVite({server:{middlewareMode:true},appType:'spa'});
const server=http.createServer(async(req,res)=>{
  if(!req.url?.startsWith('/api/partners/'))return vite.middlewares(req,res,()=>{res.writeHead(404);res.end();});
  try{
    const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value)headers.set(name,Array.isArray(value)?value.join(','):value);
    const request=new Request(origin+req.url,{method:req.method,headers,...(req.method==='GET'?{}:{body:Readable.toWeb(req),duplex:'half'})});
    const response=await handlePartner(request,env,fakeCrm);res.writeHead(response.status,Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  }catch{res.writeHead(500);res.end('Synthetic preview error.');}
});
server.listen(port,host,()=>console.log(`Synthetic partner UI preview: ${origin}/partners (mock CRM; no email or hosted services)`));
