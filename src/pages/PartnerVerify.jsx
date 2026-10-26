import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import PartnerShell from '../components/wirrox/PartnerShell';
import PartnerChallenge from '../components/wirrox/PartnerChallenge';
import usePartnerConfig from '../hooks/use-partner-config';

export default function PartnerVerify() {
  const config=usePartnerConfig();
  const [verificationToken]=useState(()=>new URLSearchParams(window.location.hash.slice(1)).get('token')||'');
  const [challengeToken,setChallengeToken]=useState('');
  const [state,setState]=useState('ready');
  const [message,setMessage]=useState('');
  const [reset,setReset]=useState(0);
  useEffect(()=>{window.history.replaceState(window.history.state,'',window.location.pathname);},[]);
  const verify=async()=>{
    setState('sending');
    try{
      const response=await fetch('/api/partners/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:verificationToken,challengeToken})});
      const result=await response.json();setMessage(result.message);setState(response.ok?'verified':'error');
    }catch{setMessage('We could not confirm verification. Please contact support@wirrox.com.');setState('error');}
    setReset(value=>value+1);
  };
  const valid=/^[a-f0-9]{64}$/.test(verificationToken);
  return <PartnerShell><section className="max-w-xl mx-auto px-6"><div className="border border-rule rounded-lg bg-card shadow-panel p-8 lg:p-10">
    <p className="font-mono uppercase text-[10px] tracking-[0.2em] text-bronze mb-5">WIRROX Partner Program</p>
    <h1 className="text-3xl font-semibold tracking-tight mb-5">{state==='verified'?'Email verified.':'Verify your email.'}</h1>
    <p role="status" className="text-muted-foreground leading-relaxed mb-7">{message || (valid?'Confirm below to send your application to the partner team for review.':'This link is missing or invalid. Open the complete link in your verification email.')}</p>
    {state!=='verified' && valid && <><PartnerChallenge siteKey={config.siteKey} action="verify" onToken={setChallengeToken} resetKey={reset} /><button onClick={verify} disabled={!config.available||state==='sending'||Boolean(config.siteKey&&!challengeToken)} className="w-full rounded-md bg-ink text-canvas py-3.5 mt-5 text-sm disabled:opacity-50">{state==='sending'?'Verifying…':'Verify email'}</button></>}
    {!config.loading && !config.available && valid && <p className="text-sm text-muted-foreground mt-4">Verification is not available on this site yet.</p>}
    <Link className="inline-block text-sm text-bronze mt-7" to="/partners">Back to the Partner Program</Link>
  </div></section></PartnerShell>;
}
