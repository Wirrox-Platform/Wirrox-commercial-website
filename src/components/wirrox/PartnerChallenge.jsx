import {useEffect, useRef, useState} from 'react';

export default function PartnerChallenge({siteKey, action, onToken, resetKey = 0}) {
  const container = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!siteKey) return;
    let widget; let removed = false;
    const mount = () => {
      if (removed || !window.turnstile || !container.current) return;
      widget = window.turnstile.render(container.current, {sitekey: siteKey, action: `partner-${action}`,
        callback: onToken, 'expired-callback': () => onToken(''),
        'error-callback': () => {onToken(''); setFailed(true);}});
    };
    let script = document.querySelector('script[data-partner-challenge]');
    if (window.turnstile) mount();
    else {
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        script.async = true; script.defer = true; script.dataset.partnerChallenge = 'true';
        document.head.appendChild(script);
      }
      script.addEventListener('load', mount);
      script.addEventListener('error', () => setFailed(true), {once: true});
    }
    return () => {removed = true; script?.removeEventListener('load', mount); if (widget != null) window.turnstile?.remove(widget); onToken('');};
  }, [siteKey, action, onToken, resetKey]);
  return <div><div ref={container} />{failed && <p role="alert" className="text-sm text-destructive">The verification check could not load. Please refresh before submitting.</p>}</div>;
}
