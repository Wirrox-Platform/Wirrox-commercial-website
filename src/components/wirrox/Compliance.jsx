import React from "react";
import { motion } from "framer-motion";
import { FileCheck, Users, Search, BookOpen, Clock, ShieldCheck } from "lucide-react";
import SectionLabel from "./SectionLabel";

const protocols = [
  {
    icon: FileCheck,
    tag: "ONBOARDING",
    title: "Structured KYB / KYC Workflow",
    description:
      "WIRROX manages a structured onboarding process covering entity verification, KYB review, and KYC collection — with document upload, review queues, and status tracking.",
  },
  {
    icon: Users,
    tag: "DISCLOSURE",
    title: "UBO & Authorised Persons",
    description:
      "Disclosure of ultimate beneficial owners, directors, and authorised signatories is required and collected through the onboarding workflow before access is granted.",
  },
  {
    icon: Search,
    tag: "SOURCE OF FUNDS",
    title: "Source of Funds & Wealth",
    description:
      "Clients are required to provide source of funds and source of wealth documentation as part of the compliance review. This is assessed prior to account activation.",
  },
  {
    icon: BookOpen,
    tag: "AUDIT TRAIL",
    title: "Immutable Audit Records",
    description:
      "Every onboarding step, review action, and status change is logged with a timestamped, immutable audit trail — available for internal review and regulatory purposes.",
  },
  {
    icon: Clock,
    tag: "REVIEW PROCESS",
    title: "Internal Review & Provider Sync",
    description:
      "Applications are reviewed by the WIRROX compliance team. Provider-side onboarding is coordinated by WIRROX on behalf of approved clients. Status is reflected in the client dashboard.",
  },
  {
    icon: ShieldCheck,
    tag: "ACCESS CONTROL",
    title: "2FA & Role-Based Access",
    description:
      "Two-factor authentication is required after approval. Role-based access controls determine which platform features and operational functions each user may access.",
  },
];

export default function Compliance() {
  return (
    <section id="compliance" className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start mb-20">
          <div>
            <SectionLabel label="Compliance & Controls" />
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
              Compliance-first<br />
              <span className="text-muted-foreground font-light">by design</span>
            </h2>
            <p className="mt-7 text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
              WIRROX supports structured compliance workflows and operational controls throughout
              the onboarding and access lifecycle. Final regulated services are performed by
              licensed providers where applicable.
            </p>
          </div>

          {/* Callout box */}
          <div className="relative border border-rule p-8 lg:p-10 bg-canvas">
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-5">
              Compliance Notice
            </p>
            <p className="text-sm text-muted-foreground leading-[1.8]">
              WIRROX supports compliance workflows and operational controls throughout the
              client onboarding journey. Final regulated services — including account
              opening, payment execution, and FX — may be performed by licensed providers
              where applicable. WIRROX does not hold client funds or execute regulated
              financial transactions on its own account.
            </p>
            <div className="mt-6 pt-6 border-t border-rule">
              <div className="flex items-center gap-2">
                <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Technology infrastructure provider
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Provider-backed execution model
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0" />
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Zero custody architecture
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-rule">
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.tag}
              className="group p-7 lg:p-8 border-r border-b border-rule hover:bg-canvas transition-colors duration-400"
              style={{
                borderRight: (i + 1) % 3 === 0 ? "none" : undefined,
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-4">
                <protocol.icon className="w-4 h-4 text-bronze opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-3">
                {protocol.tag}
              </p>
              <h3 className="text-[0.9375rem] font-medium text-ink mb-2.5">{protocol.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{protocol.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
