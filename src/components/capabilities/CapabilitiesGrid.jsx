import React from "react";
import { motion } from "framer-motion";
import { UserCheck, LayoutDashboard, RefreshCw, ShieldCheck, BarChart2, Webhook } from "lucide-react";
import SectionLabel from "../wirrox/SectionLabel";

const capabilities = [
  {
    icon: UserCheck,
    title: "Client Onboarding & KYB/KYC",
    description: "Structured onboarding workflow covering entity verification, director and UBO disclosure, document collection, source of funds review, and internal approval before access is granted.",
  },
  {
    icon: LayoutDashboard,
    title: "Account & Beneficiary Management",
    description: "Provider-backed account workflows with beneficiary setup, account status tracking, and balance visibility — accessible through a role-based client dashboard after approval.",
  },
  {
    icon: RefreshCw,
    title: "FX & Payment Operations",
    description: "FX quote visibility, payment initiation workflows, and payout management — connected to licensed provider infrastructure with real-time status synchronisation.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Controls",
    description: "2FA enforcement, role-based access controls, document collection workflows, and immutable audit logs covering every onboarding action and operational event.",
  },
  {
    icon: BarChart2,
    title: "Reporting & Reconciliation",
    description: "Transaction reporting, payment status tracking, and reconciliation data — structured for internal review, client visibility, and audit-ready record keeping.",
  },
  {
    icon: Webhook,
    title: "Webhooks & API Connectivity",
    description: "API-ready infrastructure with webhook delivery for payment status updates, account events, and onboarding status changes — enabling integration with your own systems.",
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="py-32 lg:py-40 border-b border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Core Capabilities" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-end mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            Platform<br />
            <span className="text-muted-foreground font-light">capabilities</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
            Each capability is delivered through a unified platform layer connected to provider-backed financial infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-rule rounded-lg overflow-hidden bg-card shadow-panel">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="group p-8 lg:p-10 border-r border-b border-rule hover:bg-canvas transition-colors duration-400"
              style={{ borderRight: (i + 1) % 3 === 0 ? "none" : undefined }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-6">
                <cap.icon
                  className="w-4 h-4 text-bronze opacity-90 group-hover:opacity-100 transition-opacity"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-[0.9375rem] font-medium text-ink mb-2.5">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
