const steps = ['Application', 'Email verification', 'Approval', 'Password setup', 'Security', 'Agreement', 'Active'];

export default function PartnerProgress({current}) {
  return <nav aria-label="Partner onboarding progress" className="mb-6">
    <ol className="flex flex-wrap gap-2 text-xs">
      {steps.map((step,index) => <li key={step} aria-current={index===current?'step':undefined}
        className={'rounded border border-rule px-2.5 py-1.5 ' +
          (index===current?'bg-canvas font-semibold text-ink':'text-muted-foreground')}>{step}</li>)}
    </ol>
  </nav>;
}
