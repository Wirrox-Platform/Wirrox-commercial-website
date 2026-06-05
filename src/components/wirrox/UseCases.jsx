import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, Layers, Globe, Banknote, ArrowRightLeft } from "lucide-react";
import SectionLabel from "./SectionLabel";

const useCases = [
  {
    icon: Building2,
    title: "Fintech Platforms",
    description:
      "Fintech companies requiring licensed banking infrastructure — accounts, payouts, and FX — without building direct provider relationships or holding regulated licences themselves.",
    details: [
      "Provider-backed account access",
      "Compliance-first onboarding",
      "Operational dashboard integration",
    ],
  },
  {
    icon: Globe,
    title: "Global Businesses",
    description:
      "Businesses with multi-currency or cross-border payment needs that require structured access to international payment infrastructure and reliable FX workflows.",
    details: [
      "Multi-currency account workflows",
      "Cross-border payment routing",
      "Reconciliation and reporting",
    ],
  },
  {
    icon: Users,
    title: "Payroll & Contractor Platforms",
    description:
      "Platforms managing payroll or contractor payments across jurisdictions that need reliable, auditable disbursement infrastructure with full compliance documentation.",
    details: [
      "Structured disbursement workflows",
      "Audit-ready payment records",
      "Beneficiary management",
    ],
  },
  {
    icon: ArrowRightLeft,
    title: "Digital Asset Businesses",
    description:
      "Businesses operating at the intersection of digital assets and traditional finance that need fiat onboarding, account access, and interoperability with regulated institutions.",
    details: [
      "Fiat / digital asset interoperability",
      "Structured compliance review",
      "Provider-backed fiat accounts",
    ],
  },
  {
    icon: Banknote,
    title: "Payment Companies",
    description:
      "Payment service providers and processors that need additional banking infrastructure, provider-backed account access, or compliance-grade onboarding for their own clients.",
    details: [
      "B2B infrastructure layer",
      "API-ready integration",
      "Status synchronisation",
    ],
  },
  {
    icon: Layers,
    title: "B2B Operators",
    description:
      "Enterprises requiring structured financial workflows — treasury management, beneficiary control, and payment monitoring — through a single, compliant infrastructure layer.",
    details: [
      "Role-based access controls",
      "Centralised payment management",
      "Operational visibility",
    ],
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-32 lg:py-40 border-t border-rule bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="For Businesses" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-start mb-16 lg:mb-20">
          <div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
              Built for B2B
              <br />
              <span className="text-muted-foreground font-light">financial operations</span>
            </h2>
            <p className="mt-4 text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
              WIRROX serves businesses that need credible, structured financial infrastructure —
              not mass-market consumer tools.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-rule">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              className="group p-8 lg:p-10 border-r border-b border-rule hover:bg-white transition-colors duration-400"
              style={{ borderRight: (i + 1) % 3 === 0 ? "none" : undefined }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-5">
                <useCase.icon className="w-4 h-4 text-bronze opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
              </div>
              <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{useCase.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7] mb-6">{useCase.description}</p>
              <ul className="space-y-2 pt-5 border-t border-rule">
                {useCase.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2.5">
                    <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0" />
                    <span className="text-[11px] font-mono text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
