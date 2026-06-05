import React from "react";
import { motion } from "framer-motion";
import { Key, Shield, Eye, Server, Lock, AlertTriangle } from "lucide-react";
import Navbar from "../components/wirrox/Navbar";
import Footer from "../components/wirrox/Footer";
import SectionLabel from "../components/wirrox/SectionLabel";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const controls = [
  {
    icon: Key,
    tag: "AUTHENTICATION",
    title: "Two-Factor Authentication",
    description:
      "2FA is enforced for all client accounts after onboarding approval. Access to the operational dashboard requires verified identity at every session.",
  },
  {
    icon: Shield,
    tag: "ACCESS",
    title: "Role-Based Access Controls",
    description:
      "Platform features are segmented by role. Admin and client roles have distinct permissions, and access to sensitive functions is controlled at the infrastructure level.",
  },
  {
    icon: Eye,
    tag: "AUDIT",
    title: "Immutable Audit Logs",
    description:
      "Every login, onboarding action, payment instruction, and administrative operation is logged with a timestamped audit record that cannot be modified or deleted.",
  },
  {
    icon: Server,
    tag: "INFRASTRUCTURE",
    title: "Secrets & Environment Isolation",
    description:
      "API keys, provider credentials, and service secrets are stored in isolated environment configurations — never exposed in client interfaces or source code.",
  },
  {
    icon: Lock,
    tag: "COMMUNICATION",
    title: "Encrypted Communication",
    description:
      "All client-server communication is encrypted in transit. Provider webhook payloads are validated using cryptographic signatures to prevent tampering.",
  },
  {
    icon: AlertTriangle,
    tag: "OPERATIONS",
    title: "Controlled Admin Operations",
    description:
      "Sensitive administrative operations — including account activation, provider status updates, and access grants — require internal authorisation and are fully logged.",
  },
];

export default function Security() {
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
            Security
          </motion.p>
          <motion.h1
            className="text-[clamp(2.2rem,6vw,5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.06] max-w-3xl mb-6"
            {...fadeUp(0.25)}
          >
            Security controls<br />
            <span className="text-muted-foreground font-light">built into every layer</span>
          </motion.h1>
          <motion.p
            className="text-[1.0625rem] text-muted-foreground leading-[1.75] font-light max-w-lg"
            {...fadeUp(0.4)}
          >
            WIRROX is designed with security and operational integrity as foundational
            requirements — not add-ons. Every layer of the platform incorporates controls
            that protect client data, provider credentials, and operational workflows.
          </motion.p>
        </div>
      </section>

      {/* Controls grid */}
      <section className="py-32 lg:py-40 border-b border-rule bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <SectionLabel label="Security Controls" />

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-end mb-16">
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
              Platform<br />
              <span className="text-muted-foreground font-light">security architecture</span>
            </h2>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
              Each control is implemented at the infrastructure level, not applied as an
              optional setting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-rule">
            {controls.map((ctrl, i) => (
              <motion.div
                key={ctrl.tag}
                className="group p-8 lg:p-10 border-r border-b border-rule hover:bg-canvas transition-colors duration-400"
                style={{ borderRight: (i + 1) % 3 === 0 ? "none" : undefined }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="mb-5">
                  <ctrl.icon className="w-4 h-4 text-bronze opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-3">{ctrl.tag}</p>
                <h3 className="text-[0.9375rem] font-medium text-ink mb-2.5">{ctrl.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.7]">{ctrl.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture note */}
      <section className="py-24 border-b border-rule bg-canvas">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel label="Architecture Note" />
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.15] mb-6">
                SOC 2-ready architecture
              </h2>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
                WIRROX is designed with SOC 2-aligned principles including access controls,
                audit logging, data separation, and encrypted communication. Formal
                certification is part of our compliance roadmap.
              </p>
            </div>
            <div className="border border-rule p-8 bg-white">
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-5">
                Key Principles
              </p>
              {[
                "No shared credentials between clients",
                "Provider secrets never exposed to client interfaces",
                "Webhook signature validation on all provider callbacks",
                "Admin operations require logged authorisation",
                "2FA enforced for all operational access",
                "Audit records retained for compliance review",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3 mb-4 last:mb-0">
                  <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0 mt-[7px]" />
                  <span className="text-sm text-muted-foreground leading-[1.7]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-b border-rule bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze mb-6">Questions</p>
            <h3 className="text-2xl font-semibold text-ink mb-4">Security or compliance enquiries</h3>
            <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-8">
              For security-related questions, vulnerability disclosures, or compliance review
              requests, contact our team directly.
            </p>
            <a
              href="mailto:compliance@wirrox.com"
              className="inline-block px-8 py-3.5 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              compliance@wirrox.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
