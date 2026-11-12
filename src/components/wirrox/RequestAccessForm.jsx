import {useEffect, useRef, useState} from 'react';
import PartnerChallenge from './PartnerChallenge';
import usePartnerConfig from '../../hooks/use-partner-config';
import {accessEnquiry, accessEnquiryAttemptId, clearAccessEnquiryAttempt, PartnerInputError} from '../../lib/partner-input';

const input = 'mt-1 w-full rounded-md border border-rule bg-canvas px-3 py-2.5 text-sm';

export default function RequestAccessForm() {
  const config = usePartnerConfig('/api/partners/access-enquiry-config');
  const [token, setToken] = useState('');
  const [reset, setReset] = useState(0);
  const [state, setState] = useState('form');
  const [error, setError] = useState('');
  const confirmation = useRef(null);
  const inFlight = useRef(false);
  const attempt = useRef(null);

  useEffect(() => {
    if (state === 'confirmed') confirmation.current?.focus();
  }, [state]);

  const submit = async event => {
    event.preventDefault();
    if (inFlight.current || !config.available || (config.siteKey && !token)) return;
    const {companyFax, ...fields} = Object.fromEntries(new FormData(event.currentTarget));
    inFlight.current = true;
    setError('');
    try {
      attempt.current ??= accessEnquiryAttemptId();
      const payload = accessEnquiry({...fields, requestId: attempt.current});
      setState('sending');
      const response = await fetch('/api/partners/access-enquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...payload, companyFax, challengeToken: token}),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || 'We could not confirm the enquiry. Please try again.');
        setState('form');
        return;
      }
      clearAccessEnquiryAttempt();
      setState('confirmed');
    } catch (problem) {
      setError(problem instanceof PartnerInputError
        ? problem.message : 'We could not confirm the enquiry. Please try again or email onboarding@wirrox.com.');
      setState('form');
    } finally {
      inFlight.current = false;
      setReset(value => value + 1);
    }
  };

  if (state === 'confirmed') {
    return <p ref={confirmation} tabIndex={-1} role="status" className="text-sm leading-relaxed">
      Your enquiry was received. If it is approved, our onboarding team will contact you at the email you provided
      with the application link and next steps.
    </p>;
  }
  if (config.loading) return <p role="status" className="text-sm">Loading the enquiry form…</p>;
  if (!config.available) return <p className="text-sm">
    To enquire about access, email <a href="mailto:onboarding@wirrox.com" className="underline">onboarding@wirrox.com</a>.
  </p>;

  return <form onSubmit={submit}>
    <fieldset disabled={state === 'sending'} className="grid gap-4 disabled:opacity-70">
      <label className="text-sm font-medium">Business name
        <input className={input} name="businessName" maxLength={255} autoComplete="organization" required />
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">First name
          <input className={input} name="firstName" maxLength={100} autoComplete="given-name" required />
        </label>
        <label className="text-sm font-medium">Last name
          <input className={input} name="lastName" maxLength={100} autoComplete="family-name" required />
        </label>
      </div>
      <label className="text-sm font-medium">Work email
        <input className={input} name="email" type="email" maxLength={254} autoComplete="email" required />
      </label>
      <label className="text-sm font-medium">Partner referral code <span className="font-normal text-muted-foreground">(optional)</span>
        <input className={input} name="referralCode" maxLength={36} autoComplete="off" spellCheck={false} aria-describedby="access-enquiry-code-hint" />
      </label>
      <p id="access-enquiry-code-hint" className="-mt-2 text-xs text-muted-foreground">
        If we can match your referral, the partner can see your business name and referral status.
      </p>
      <div hidden aria-hidden="true"><label>Company fax<input name="companyFax" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        We use your details to review and respond to this enquiry. See the <a href="/legal/privacy-notice" className="underline">Privacy Notice</a>.
      </p>
      <PartnerChallenge siteKey={config.siteKey} action="access-enquiry" onToken={setToken} resetKey={reset} />
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <button type="submit" disabled={Boolean(config.siteKey && !token)}
        className="rounded-md bg-ink px-4 py-3 text-sm font-medium text-canvas disabled:opacity-50">
        {state === 'sending' ? 'Sending…' : 'Send access enquiry'}
      </button>
    </fieldset>
  </form>;
}
