import React from "react";
import { motion } from "framer-motion";
import { UserCheck, LayoutDashboard, Zap } from "lucide-react";
import SectionLabel from "./SectionLabel";

const capabilities = [
  {
    icon: UserCheck,
    title: "Compliance-First Onboarding",
    description:
      "Structured KYB and KYC workflows covering entity verification, UBO disclosure, source of funds collection, and document review — with admin approval before access is granted.",
    tag: "ONBOARDING LAYER",
  },
  {
    icon: LayoutDashboard,
    title: "Operational Dashboard",
    description:
      "Provider-backed accounts, beneficiary management, payment monitoring, FX quotes, and reconciliation — all accessible through a role-based client dashboard after approval.",
    tag: "CLIENT PLATFORM",
  },
  {
    icon: Zap,
    title: "API-Ready Infrastructure",
    description:
      "Webhooks, status synchronisation, and API connectivity for businesses that need to integrate payment workflows, reporting, and account data into their own systems.",
    tag: "API & INTEGRATION",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-32 lg:py-40 border-t border-rule bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Platform" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">

          {/* Left */}
          <div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
              Structured access to
              <br />
              <span className="text-muted-foreground font-light">global financial infrastructure</span>
            </h2>
            <p className="mt-7 text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
              WIRROX connects businesses to provider-backed payment infrastructure through a
              compliance-first onboarding process. Once approved, clients access accounts,
              payouts, FX, and reporting through a unified operational dashboard.
            </p>
          </div>

          {/* Right — capability list */}
          <div>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="group border-b border-rule py-8 last:border-b-0"
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-3">
                  {cap.tag}
                </p>
                <div className="flex items-start gap-5">
                  <div className="mt-0.5 w-8 h-8 border border-rule flex items-center justify-center flex-shrink-0 group-hover:border-bronze/40 transition-colors duration-300">
                    <cap.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-bronze transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-[0.9375rem] font-medium text-ink">{cap.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-[1.7]">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
