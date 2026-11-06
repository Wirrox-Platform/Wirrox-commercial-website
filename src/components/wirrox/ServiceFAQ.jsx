import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  ['Who operates WIRROX?', 'Swiss Fintech Forum AG in Zug, Switzerland supplies the technology interface, coordinates application review and provider onboarding, and supports operational access. Swiss incorporation does not itself confer financial authorisation.'],
  ['Who supplies the financial services?', 'The relevant third-party providers supply the underlying services under their applicable terms and authorisations. Their approval and compliance requirements remain separate from WIRROX review. Request the relevant service and provider details before funding.'],
  ['Are dashboard balances held by WIRROX?', 'No. Under the described model, balances reflect provider information and are not deposits with SFF. The legal holder, custody arrangement and recovery rights depend on the specific service; do not infer deposit protection from the dashboard.'],
  ['When can my business transact?', 'Operational access requires the relevant reviews and approvals, acceptance of the customer agreement and incorporated documents, and required security setup. View-only status access does not permit transactions.'],
  ['Are all rails and delivery times guaranteed?', 'No. Service availability, limits and timing depend on the customer, provider, rail and destination. Completion estimates are not guarantees. Cancellation and recall depend on the transaction stage and may not be possible.'],
  ['How are fees and support agreed?', 'Pricing is customer-specific, with the applicable total charge shown before approval. Fixed support hours or service levels apply only when specifically agreed. Contact WIRROX support about both platform issues and provider matters requiring coordination.'],
];

export default function ServiceFAQ() {
  return <section className="max-w-7xl mx-auto px-6 lg:px-16 py-24" aria-labelledby="service-faq-title">
    <h2 id="service-faq-title" className="text-3xl font-semibold mb-8">Questions about WIRROX</h2>
    {items.map(([q, a]) => <details key={q} className="border-b border-rule py-5">
      <summary className="cursor-pointer font-medium">{q}</summary>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{a}</p>
    </details>)}
    <p className="mt-8"><Link className="underline" to="/legal">Read company and website information</Link></p>
  </section>;
}
