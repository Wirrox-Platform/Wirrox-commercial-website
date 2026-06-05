import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, Globe, ArrowRightLeft, Banknote, Layers, ArrowUpRight } from "lucide-react";
import Navbar from "../components/wirrox/Navbar";
import Footer from "../components/wirrox/Footer";
import SectionLabel from "../components/wirrox/SectionLabel";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const segments = [
  {
    icon: Building2,
    title: "Fintech Platforms",
    description:
      "Fintech companies requiring licensed banking infrastructure — fiat accounts, payment rails, and FX — without building or maintaining direct provider relationships.",
    requirements: [
      "Provider-backed fiat accounts",
      "Compliance-reviewed onboarding",
      "API integration for payment flows",
      "Operational dashboard access",
    ],
  },
  {
    icon: Globe,
    title: "Global Businesses",
    description:
      "Companies operating across multiple currencies and jurisdictions that need reliable cross-border payment infrastructure with structured compliance and audit records.",
    requirements: [
      "Multi-currency account workflows",
      "Cross-border payment routing",
      "FX quote and execution visibility",
      "Reconciliation and reporting",
    ],
  },
  {
    icon: Users,
    title: "Payroll & Contractor Platforms",
    description:
      "Platforms that manage salary disbursements or contractor payments across jurisdictions and need auditable, compliant infrastructure for each payment workflow.",
    requirements: [
      "Structured beneficiary management",
      "Audit-ready disbursement records",
      "Multi-jurisdiction payment support",
      "Role-based access for finance teams",
    ],
  },
  {
    icon: ArrowRightLeft,
    title: "Digital Asset Businesses",
    description:
      "Businesses operating at the intersection of digital assets and traditional finance that need fiat infrastructure, compliance-grade onboarding, and provider-backed account access.",
    requirements: [
      "Fiat / digital asset interoperability",
      "Structured compliance review",
      "Provider-backed fiat account access",
      "Source of funds documentation",
    ],
  },
  {
    icon: Banknote,
    title: "Payment Companies",
    description:
      "Payment service providers and processors that need additional banking infrastructure, coverage for additional corridors, or a compliance-grade access layer for their own clients.",
    requirements: [
      "B2B infrastructure layer",
      "Webhook and API integration",
      "Status synchronisation",
      "Provider onboarding coordination",
    ],
  },
  {
    icon: Layers,
    title: "B2B Operators",
    description:
      "Enterprises with treasury, supplier payment, or internal financial workflow needs that require a single, structured infrastructure layer with full operational visibility.",
    requirements: [
      "Centralised payment management",
      "Role-based access controls",
      "Operational reporting",
      "Compliance audit trail",
    ],
  },
];

const requirements = [
  "Your business must be a legal entity (company, LLC, or equivalent).",
  "KYB documentation is required — including company registration, directors, and UBO disclosure.",
  "Source of funds and intended use of the platform must be documented.",
  "At least one authorised individual must complete KYC as part of the onboarding process.",
  "Access is granted only after internal review and approval by the WIRROX compliance team.",
  "2FA is required for all operational access after approval.",
];

export default function ForBusinesses() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-28 bg-canvas border-b border-rule overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-rule/45" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-rule/45" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-rule/45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
          <motion.p
            className="text-[10px] font-mono uppercase tracking-[0.4em] text-bronze mb-10"
            {...fadeUp(0.1)}
          >
            For Businesses
          </motion.p>
          <motion.h1
            className="text-[clamp(2.2rem,6vw,5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.06] max-w-3xl mb-6"
            {...fadeUp(0.25)}
          >
            Built for B2B<br />
            <span className="text-muted-foreground font-light">financial operations</span>
          </motion.h1>
          <motion.p
            className="text-[1.0625rem] text-muted-foreground leading-[1.75] font-light max-w-lg mb-12"
            {...fadeUp(0.4)}
          >
            WIRROX serves businesses that need credible, structured financial infrastructure —
            not a mass-market consumer tool. Access is by application, with a compliance
            review required before any operational feature is unlocked.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.52)}>
            <a
              href="https://app.wirrox.com/request-access"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:onboarding@wirrox.com"
              className="inline-block px-8 py-3.5 border border-rule text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
            >
              Contact Onboarding
            </a>
          </motion.div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-32 lg:py-40 border-b border-rule bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel label="Who We Serve" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
              Business segments<br />
              <span className="text-muted-foreground font-light">we support</span>
            </h2>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
              Each segment has distinct infrastructure needs. WIRROX provides a single
              compliance-first access layer for all of them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-rule">
            {segments.map((seg, i) => (
              <motion.div
                key={seg.title}
                className="group p-8 lg:p-10 border-r border-b border-rule hover:bg-canvas transition-colors duration-400"
                style={{ borderRight: (i + 1) % 3 === 0 ? "none" : undefined }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="mb-5">
                  <seg.icon className="w-4 h-4 text-bronze opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
                <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{seg.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.7] mb-6">{seg.description}</p>
                <ul className="space-y-2 pt-5 border-t border-rule">
                  {seg.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5">
                      <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0 mt-[7px]" />
                      <span className="text-[11px] font-mono text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding requirements */}
      <section className="py-32 lg:py-40 border-b border-rule bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
            <div>
              <SectionLabel label="Onboarding Requirements" />
              <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12] mb-7">
                What to expect<br />
                <span className="text-muted-foreground font-light">from the review process</span>
              </h2>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-8">
                WIRROX reviews all applications before granting access. There is no instant
                or self-service account opening. The onboarding process is structured to
                ensure compliance requirements are met before any operational access is activated.
              </p>
              <a
                href="mailto:onboarding@wirrox.com"
                className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] px-8 py-3.5 border border-rule text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
              >
                Onboarding enquiries
              </a>
            </div>

            <div className="border border-rule p-8 lg:p-10 bg-white">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-6">
                Requirements
              </p>
              <div className="space-y-5">
                {requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-[10px] font-mono text-bronze mt-[3px] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-muted-foreground leading-[1.7]">{req}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-white border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze mb-8">Apply</p>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12] mb-6">
              Ready to apply for access?
            </h2>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-12 max-w-md">
              Submit your request through the WIRROX platform. Our team will review your
              application and respond within two business days.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://app.wirrox.com/request-access"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
              >
                Request Access
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:support@wirrox.com"
                className="inline-block px-10 py-4 border border-rule text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
