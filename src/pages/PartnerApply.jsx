import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowLeft, CheckCircle2} from 'lucide-react';
import PartnerShell from '../components/wirrox/PartnerShell';
import PartnerChallenge from '../components/wirrox/PartnerChallenge';
import SectionLabel from '../components/wirrox/SectionLabel';
import usePartnerConfig from '../hooks/use-partner-config';
import {application} from '../lib/partner-input';

const inputClass = 'w-full rounded-md border border-rule bg-canvas text-ink px-3.5 py-3 mt-2 text-sm';

export default function PartnerApply() {
  const config = usePartnerConfig();
  const [token,setToken] = useState('');
  const [reset,setReset] = useState(0);
  const [state,setState] = useState('form');
  const [error,setError] = useState('');
  const confirmation=useRef(null);
  useEffect(()=>{if(state==='confirmed'){confirmation.current?.focus();confirmation.current?.scrollIntoView({block:'center'});}},[state]);
  const submit = async event => {
    event.preventDefault(); setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const {companyFax,...fields} = values;
    try {
      const payload = application({...fields,noticeVersion:config.noticeVersion});
      setState('sending');
      const response = await fetch('/api/partners/apply', {method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...payload,companyFax,challengeToken:token})});
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setState('confirmed');
    } catch (problem) {setError(problem.message || 'We could not confirm the result. Please contact support@wirrox.com.');setState('form');setReset(value=>value+1);}
  };
  return <PartnerShell><div className="max-w-6xl mx-auto px-6 lg:px-16">
    <Link to="/partners" className="inline-flex gap-2 items-center text-sm text-muted-foreground mb-10"><ArrowLeft size={15} /> Partner Program</Link>
    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20"><div><SectionLabel label="Start a conversation" /><h1 className="text-4xl lg:text-5xl font-semibold tracking-tight mt-6 mb-6">Become a<br /><span className="font-light text-muted-foreground">WIRROX partner.</span></h1><p className="text-muted-foreground leading-relaxed">Tell us a little about your network and how you would introduce businesses. We’ll verify your email before the team reviews your application.</p><div className="border-t border-rule mt-8 pt-7 text-sm text-muted-foreground leading-relaxed"><p>No payout information is needed to apply.</p><p className="mt-4">Already invited? {config.loginAvailable ? <a href="/api/partners/login" className="text-bronze underline">Partner login</a> : 'Your invitation contains your partner login details.'}</p></div></div>
    <section className="border border-rule rounded-lg bg-card shadow-panel p-6 lg:p-9">
      {state==='confirmed' ? <div role="status" className="py-10"><CheckCircle2 size={34} className="text-bronze mb-6" /><h2 ref={confirmation} tabIndex={-1} className="text-2xl font-medium mb-4">Check your email</h2><p className="text-muted-foreground leading-relaxed">If your application can be processed, verification instructions will be sent. Follow the link to verify your email before review.</p><p className="text-sm text-muted-foreground mt-5">No portal access is granted at this stage.</p></div> : <>
      <h2 className="text-2xl font-medium mb-6">Partner application</h2>
      {!config.available && <p role="status" className="border border-rule bg-canvas rounded-md p-4 text-sm text-muted-foreground mb-6">{config.loading ? 'Checking application availability…' : 'Partner applications are not open here yet. Please check back or contact support@wirrox.com.'}</p>}
      {error && <p role="alert" className="text-sm text-destructive mb-5">{error}</p>}
      <form onSubmit={submit}><fieldset disabled={!config.available || state==='sending'} className="grid sm:grid-cols-2 gap-5 disabled:opacity-60">
        <label className="text-sm font-medium">Full name<input className={inputClass} name="name" autoComplete="name" maxLength={255} required /></label>
        <label className="text-sm font-medium">Business email<input className={inputClass} name="email" type="email" autoComplete="email" maxLength={255} required /></label>
        <label className="text-sm font-medium">Company <span className="text-muted-foreground font-normal">(optional)</span><input className={inputClass} name="company" autoComplete="organization" maxLength={255} /></label>
        <label className="text-sm font-medium">Country<input className={inputClass} name="country" autoComplete="country-name" maxLength={100} required /></label>
        <label className="text-sm font-medium sm:col-span-2">Website or professional profile <span className="text-muted-foreground font-normal">(optional)</span><input className={inputClass} name="website" type="url" placeholder="https://" maxLength={500} /></label>
        <label className="text-sm font-medium sm:col-span-2">How do you work?<select className={inputClass} name="partnerType" required defaultValue=""><option value="" disabled>Select your partner type</option>{['Adviser or consultant','Professional services','Business network or community','Other'].map(value=><option key={value}>{value}</option>)}</select></label>
        <label className="text-sm font-medium sm:col-span-2">Who do you work with?<textarea className={inputClass} name="audience" rows={2} maxLength={2000} required /></label>
        <label className="text-sm font-medium sm:col-span-2">How would you introduce businesses to WIRROX?<textarea className={inputClass} name="introduction" rows={3} maxLength={4000} required /></label>
        <div className="hidden" aria-hidden="true"><label>Company fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="sm:col-span-2 text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">{config.noticeText}</div>
        <div className="sm:col-span-2"><PartnerChallenge siteKey={config.siteKey} action="apply" onToken={setToken} resetKey={reset} /></div>
        <button type="submit" disabled={Boolean(config.siteKey && !token)} className="sm:col-span-2 bg-ink text-canvas rounded-md py-3.5 text-sm font-medium disabled:opacity-50">{state==='sending'?'Submitting…':'Submit partner application'}</button>
      </fieldset></form></>}
    </section></div>
  </div></PartnerShell>;
}
