import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../wirrox/SectionLabel";

const principles = [
  {
    title: "No Custody",
    description: "WIRROX never holds or stores client funds at any point.",
  },
  {
    title: "No Execution",
    description: "All financial execution is performed exclusively by licensed financial institutions.",
  },
  {
    title: "Full Separation",
    description: "A strict architectural boundary separates orchestration from execution.",
  },
];

export default function Principles() {
  return (
    <section className="py-32 lg:py-40 border-b border-rule bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Principles" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            Built on infrastructure<br />
            <span className="text-muted-foreground font-light">principles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-rule rounded-lg overflow-hidden bg-card shadow-panel">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="group p-8 lg:p-10 border-r border-rule last:border-r-0 hover:bg-white transition-colors duration-400"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-6">
                <div className="w-[5px] h-[5px] bg-bronze" />
              </div>
              <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{p.description}</p>

              <div className="mt-8 pt-6 border-t border-rule">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-bronze">
                  Principle 0{i + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
