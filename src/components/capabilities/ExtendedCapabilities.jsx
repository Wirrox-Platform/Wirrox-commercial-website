import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "../wirrox/SectionLabel";

const sections = [
  {
    tag: "A",
    title: "Digital & Fiat Flow Management",
    description:
      "WIRROX enables businesses to operate across both traditional and digital financial systems through a unified orchestration layer. Instructions can be routed across asset types and jurisdictions without requiring direct custody or infrastructure management.",
  },
  {
    tag: "B",
    title: "Partner Routing Engine",
    description:
      "Our routing engine evaluates each instruction in real time based on compliance rules, partner capabilities, cost structures, and jurisdictional requirements to determine the optimal execution path.",
  },
  {
    tag: "C",
    title: "Infrastructure Abstraction",
    description:
      "WIRROX abstracts the complexity of financial integrations, allowing businesses to operate through a single interface while interacting with multiple licensed financial institutions behind the scenes.",
  },
];

export default function ExtendedCapabilities() {
  return (
    <section className="py-32 lg:py-40 border-b border-rule bg-canvas">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Extended Capabilities" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            Infrastructure<br />
            <span className="text-muted-foreground font-light">architecture</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
            Three foundational pillars that define how WIRROX operates across financial systems and jurisdictions.
          </p>
        </div>

        <div>
          {sections.map((s, i) => (
            <motion.div
              key={s.tag}
              className="group border-b border-rule py-12 last:border-b-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze">{s.tag}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="text-xl font-medium text-ink">{s.title}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">{s.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}