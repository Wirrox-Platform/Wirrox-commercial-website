import {Link} from 'react-router-dom';
import {ArrowUpRight, Check, Handshake, ArrowRight} from 'lucide-react';
import PartnerShell from '../components/wirrox/PartnerShell';
import SectionLabel from '../components/wirrox/SectionLabel';
import usePartnerConfig from '../hooks/use-partner-config';

const steps = [
  ['01', 'Apply & connect', 'Tell us about your business network and how you work. Our team reviews each application.'],
  ['02', 'Make an introduction', 'Introduce a business directly or share your partner code. We review eligibility and confirm attribution.'],
  ['03', 'Follow the relationship', 'See shared referral progress and published earnings in your private Partner Portal.'],
];

export default function Partners() {
  const config = usePartnerConfig();
  return <PartnerShell>
    <section className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-24 items-center pb-20 lg:pb-28">
      <div><SectionLabel label="WIRROX Partner Program" />
        <h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-semibold tracking-[-0.035em] leading-[1.04] mt-8 mb-7">Good introductions.<br /><span className="font-light text-muted-foreground">Lasting partnerships.</span></h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">Connect businesses in your network with WIRROX’s financial technology infrastructure. Build the relationship with a team that values a thoughtful introduction.</p>
        <div className="flex flex-wrap gap-4 mt-9"><Link to="/partners/apply" className="inline-flex items-center gap-4 rounded-md bg-ink text-canvas px-6 py-3.5 text-sm font-medium">Apply to become a partner <ArrowUpRight size={16} /></Link>
          {config.loginAvailable && <a href="/api/partners/login" className="inline-flex items-center gap-3 border border-rule rounded-md px-6 py-3.5 text-sm">Partner login <ArrowUpRight size={16} /></a>}</div>
        <p className="text-xs text-muted-foreground mt-5">Partner access is by invitation after approval.</p>
      </div>
      <div className="border border-rule rounded-lg bg-card shadow-panel p-8 lg:p-10 relative">
        <div className="flex justify-between items-center pb-7 border-b border-rule"><p className="font-mono uppercase text-[10px] tracking-[0.22em] text-bronze">A clear path, together</p><Handshake className="text-bronze" size={24} /></div>
        {steps.map(([number,title,description], index) => <div key={number} className="flex gap-5 pt-7">
          <div className="flex flex-col items-center"><span className="flex items-center justify-center w-9 h-9 rounded-full bg-bronze/10 text-bronze font-mono text-xs">{number}</span>{index<2 && <span className="w-px bg-rule flex-1 mt-3" />}</div>
          <div className="pb-5"><h2 className="text-lg font-medium mb-2">{title}</h2><p className="text-sm leading-relaxed text-muted-foreground">{description}</p></div>
        </div>)}
      </div>
    </section>
    <section className="border-y border-rule bg-card py-16 lg:py-20"><div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 lg:gap-24">
      <div><SectionLabel label="Who it suits" /><h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mt-6 mb-5">You know the business.<br /><span className="font-light text-muted-foreground">We bring the infrastructure.</span></h2><p className="text-muted-foreground leading-relaxed">We welcome relevant introductions from advisers, consultants, service providers and professional communities working with B2B businesses.</p></div>
      <ul className="space-y-6 self-center">{['A relevant business network and a considered approach','Clear, evidenced introductions with permission to connect','A shared focus on long-term business relationships'].map(label=><li className="flex items-start gap-4 text-base" key={label}><Check className="shrink-0 text-bronze mt-0.5" size={18} />{label}</li>)}</ul>
    </div></section>
    <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-16 lg:pt-24 grid lg:grid-cols-2 gap-12 lg:gap-24">
      <div><SectionLabel label="Clarity from the start" /><h2 className="text-3xl font-semibold tracking-tight mt-6 mb-5">Know what happens next.</h2><p className="text-muted-foreground leading-relaxed">Approved partners receive an agreement that defines eligible earnings, the earning period and payment timing. Your portal shows reviewed statements and confirmed payment progress.</p><p className="mt-5 text-sm text-muted-foreground leading-relaxed">An application or introduction does not create earnings or approve a customer account. Every relationship follows its own eligibility and onboarding review.</p></div>
      <div className="rounded-lg border border-rule p-8 bg-card"><h2 className="text-2xl font-medium mb-4">Referred by a partner?</h2><p className="text-muted-foreground leading-relaxed mb-7">Have a partner code? Send a business introduction and our team will review the connection with you.</p><Link className="inline-flex items-center gap-4 text-sm font-medium text-bronze" to="/partners/introduction">Send your business introduction <ArrowRight size={17} /></Link></div>
    </section>
  </PartnerShell>;
}
