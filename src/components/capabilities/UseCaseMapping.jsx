import React from "react";
import { motion } from "framer-motion";
import { Banknote, Wallet, Building2 } from "lucide-react";
import SectionLabel from "../wirrox/SectionLabel";

const useCases = [
  {
    icon: Banknote,
    title: "Global Payroll",
    description:
      "Execute salary payments across jurisdictions using optimized routing through local and international rails.",
    tag: "USE CASE 01",
  },
  {
    icon: Wallet,
    title: "Enterprise Payouts",
    description:
      "Distribute funds to suppliers, contractors, and partners with full control over routing, compliance, and execution visibility.",
    tag: "USE CASE 02",
  },
  {
    icon: Building2,
    title: "Treasury Operations",
    description:
      "Manage internal fund movements and liquidity operations across multiple financial systems with centralized control.",
    tag: "USE CASE 03",
  },
];

export default function UseCaseMapping() {
  return (
    <section className="py-32 lg:py-40 border-b border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Use Case Mapping" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            Operational<br />
            <span className="text-muted-foreground font-light">use cases</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-rule">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              className="group p-8 lg:p-10 border-r border-rule last:border-r-0 hover:bg-canvas transition-colors duration-400"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-6">
                <uc.icon className="w-4 h-4 text-bronze opacity-90" strokeWidth={1.5} />
              </div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-bronze mb-3">{uc.tag}</p>
              <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}