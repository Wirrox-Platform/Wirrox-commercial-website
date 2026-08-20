import React from "react";
import { motion } from "framer-motion";
import { Lock, BarChart2, Globe } from "lucide-react";
import SectionLabel from "./SectionLabel";

const reasons = [
  {
    icon: Lock,
    title: "Compliance Before Access",
    description:
      "Every client goes through structured KYB/KYC review before gaining access to any operational feature. No self-service account opening. No unreviewed access.",
    stat: "100%",
    statLabel: "Reviewed Onboarding",
  },
  {
    icon: BarChart2,
    title: "Operational Visibility",
    description:
      "Real-time account status, payment tracking, FX quotes, and reconciliation data — all in one dashboard. Audit-ready records at every step.",
    stat: "Full",
    statLabel: "Audit Trail Coverage",
  },
  {
    icon: Globe,
    title: "Provider-Backed Infrastructure",
    description:
      "Accounts, payouts, and FX are backed by licensed financial providers. WIRROX coordinates provider access as part of the onboarding process — no direct integration required.",
    stat: "B2B",
    statLabel: "Focused Infrastructure",
  },
];

export default function WhyWirrox() {
  return (
    <section id="why-wirrox" className="py-32 lg:py-40 border-t border-rule bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Why WIRROX" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-start mb-20 lg:mb-28">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            Structured for trust,
            <br />
            <span className="text-muted-foreground font-light">compliance, and control</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md self-end">
            WIRROX is designed for businesses that need credible, audit-ready financial
            infrastructure — not a generic payment tool.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-rule rounded-lg overflow-hidden bg-card shadow-panel">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="group p-8 lg:p-10 border-r border-rule last:border-r-0 hover:bg-white transition-colors duration-500"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-8">
                <reason.icon className="w-4 h-4 text-bronze opacity-90" strokeWidth={1.5} />
              </div>

              <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7] mb-10">{reason.description}</p>

              <div className="pt-6 border-t border-rule">
                <p className="text-2xl font-semibold text-ink tracking-tight">{reason.stat}</p>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mt-1.5">
                  {reason.statLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
