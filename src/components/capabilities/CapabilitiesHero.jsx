import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function CapabilitiesHero() {
  return (
    <section className="relative pt-40 pb-28 bg-canvas border-b border-rule overflow-hidden">
      {/* Structural grid lines */}
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
          Platform Capabilities
        </motion.p>

        <motion.h1
          className="text-[clamp(2.2rem,6vw,5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.06] max-w-3xl mb-6"
          {...fadeUp(0.25)}
        >
          Platform capabilities<br />
          <span className="text-muted-foreground font-light">built for B2B operations</span>
        </motion.h1>

        <motion.p
          className="text-[1.0625rem] text-muted-foreground leading-[1.75] font-light max-w-lg mb-12"
          {...fadeUp(0.4)}
        >
          WIRROX provides the onboarding, account management, payment, and reporting
          infrastructure that B2B operators need — connected to licensed providers
          through a compliance-first access layer.
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
            href="mailto:support@wirrox.com"
            className="inline-block px-8 py-3.5 border border-rule text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
          >
            Contact Sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}
