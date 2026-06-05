import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    number: "01",
    title: "Request Access",
    description:
      "Your business submits a request through the WIRROX platform. Email verification is required to initiate the onboarding process.",
  },
  {
    number: "02",
    title: "Compliance Review",
    description:
      "The WIRROX team reviews your KYB application, entity documentation, UBO disclosure, and source of funds before any access is granted.",
  },
  {
    number: "03",
    title: "Provider Onboarding",
    description:
      "Upon internal approval, WIRROX coordinates provider-side onboarding on your behalf. Status updates are reflected in your client dashboard.",
  },
  {
    number: "04",
    title: "Operational Access",
    description:
      "After full approval and 2FA setup, your team gains access to accounts, payouts, FX, and reporting through the WIRROX dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="How It Works" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start mb-20">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            From application
            <br />
            <span className="text-muted-foreground font-light">to operational access</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md self-end">
            WIRROX manages the full onboarding lifecycle — from initial request through
            compliance review to provider-backed access. Every step is tracked and visible
            in the client dashboard.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Horizontal rule connecting steps (desktop) */}
          <div className="hidden lg:block absolute top-[7px] left-0 right-0 h-px bg-rule overflow-hidden">
            <motion.div
              className="h-full bg-bronze origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Node */}
                <div className="w-[14px] h-[14px] border border-bronze bg-canvas mb-10 relative z-10 hidden lg:flex items-center justify-center">
                  <div className="w-[5px] h-[5px] bg-bronze" />
                </div>

                <p className="text-[10px] font-mono tracking-[0.25em] text-bronze mb-3 uppercase">
                  Step {step.number}
                </p>
                <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.7]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture callout */}
        <motion.div
          className="mt-24 border border-rule p-8 lg:p-12 bg-canvas"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1.5">Client</p>
              <p className="text-base font-medium text-ink">Your Business</p>
              <p className="text-xs text-muted-foreground mt-1">WIRROX-branded journey</p>
            </div>
            <div className="text-center relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-rule -translate-y-1/2" />
              <div className="relative z-10 inline-block px-7 py-4 border border-bronze bg-bronze-subtle">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-bronze mb-1">Infrastructure</p>
                <p className="text-base font-semibold text-ink">WIRROX</p>
              </div>
            </div>
            <div className="lg:text-right">
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-1.5">Execution</p>
              <p className="text-base font-medium text-ink">Licensed Providers</p>
              <p className="text-xs text-muted-foreground mt-1">Regulated financial institutions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
