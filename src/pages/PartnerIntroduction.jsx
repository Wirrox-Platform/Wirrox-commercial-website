import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import PartnerShell from '../components/wirrox/PartnerShell';
import PartnerChallenge from '../components/wirrox/PartnerChallenge';
import usePartnerConfig from '../hooks/use-partner-config';
import {codeFromSearch,introduction,introductionAttemptId,clearIntroductionAttempt} from '../lib/partner-input';

const inputClass='w-full border border-rule rounded-md bg-canvas px-3.5 py-3 mt-2 text-sm';
export default function PartnerIntroduction(){
  const config=usePartnerConfig();
  const [id]=useState(()=>introductionAttemptId());
  const [initialCode]=useState(()=>codeFromSearch(window.location.search));
  const [token,setToken]=useState('');const [reset,setReset]=useState(0);
  const [state,setState]=useState('form');const [message,setMessage]=useState('');
  const confirmation=useRef(null);
  useEffect(()=>{if(state==='confirmed'){confirmation.current?.focus();confirmation.current?.scrollIntoView({block:'center'});}},[state]);
  const submit=async event=>{
    event.preventDefault();const {companyFax,...fields}=Object.fromEntries(new FormData(event.currentTarget));
    try{
      const payload=introduction({...fields,applicationId:id});setState('sending');
      const response=await fetch('/api/partners/introduction',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...payload,companyFax,challengeToken:token})});
      const result=await response.json();setMessage(result.message);setState(response.ok?'confirmed':'error');
      if(response.ok)clearIntroductionAttempt();
    }catch(problem){setMessage(problem.message||'We could not confirm the result. Please contact support@wirrox.com.');setState('error');}
    setReset(value=>value+1);
  };
  return <PartnerShell><section className="max-w-2xl mx-auto px-6">
    <Link to="/partners" className="text-sm text-muted-foreground">WIRROX Partner Program</Link>
    <h1 className="text-4xl font-semibold tracking-tight mt-6 mb-5">Make the connection.</h1>
    <p className="text-muted-foreground leading-relaxed mb-9">Referred by a WIRROX partner? Tell us about your business and include their code so our team can review the introduction.</p>
    <div className="border border-rule rounded-lg bg-card shadow-panel p-6 lg:p-9">
    {message&&<p ref={confirmation} tabIndex={-1} role={state==='confirmed'?'status':'alert'} className="text-sm mb-6">{message}</p>}
    {state!=='confirmed'&&<><p className="text-xs text-muted-foreground mb-6">An introduction does not open a customer account. Customer onboarding and approval happen separately.</p>
    {!config.loading&&!config.introductionAvailable&&<p role="status" className="text-sm text-muted-foreground mb-6">Business introductions are not open here yet.</p>}
    <form onSubmit={submit}><fieldset disabled={!config.introductionAvailable||state==='sending'} className="grid gap-5 disabled:opacity-60">
      <label className="text-sm font-medium">Partner referral code<input className={inputClass+' font-mono'} name="referralCode" defaultValue={initialCode} minLength={36} maxLength={36} required autoComplete="off" /></label>
      <label className="text-sm font-medium">Business name<input className={inputClass} name="businessName" maxLength={255} autoComplete="organization" required /></label>
      <label className="text-sm font-medium">Your name<input className={inputClass} name="contactName" maxLength={255} autoComplete="name" required /></label>
      <label className="text-sm font-medium">Business email<input className={inputClass} name="contactEmail" type="email" maxLength={255} autoComplete="email" required /></label>
      <label className="text-sm font-medium">Website <span className="text-muted-foreground font-normal">(optional)</span><input className={inputClass} name="website" type="url" maxLength={500} /></label>
      <label className="text-sm font-medium">What would you like to discuss?<textarea className={inputClass} name="introduction" rows={4} maxLength={4000} required /></label>
      <div hidden aria-hidden="true"><label>Company fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs whitespace-pre-wrap text-muted-foreground leading-relaxed">{config.noticeText}</p>
      <PartnerChallenge siteKey={config.siteKey} action="introduction" onToken={setToken} resetKey={reset} />
      <button disabled={Boolean(config.siteKey&&!token)} className="bg-ink text-canvas rounded-md py-3.5 text-sm font-medium disabled:opacity-50">{state==='sending'?'Submitting…':'Submit business introduction'}</button>
    </fieldset></form></>}
    </div></section></PartnerShell>;
}
