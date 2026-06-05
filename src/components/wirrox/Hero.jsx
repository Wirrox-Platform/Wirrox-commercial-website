import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-canvas">

      {/* Structural grid lines */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-rule/45" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-rule/45" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-rule/45" />
      </div>

      {/* Subtle geometric accent — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-2/5 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              var(--color-ink) 39px,
              var(--color-ink) 40px
            ), repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              var(--color-ink) 39px,
              var(--color-ink) 40px
            )`,
          }}
        />
        <div className="absolute right-16 top-1/3 w-px h-64 bg-gradient-to-b from-transparent via-bronze/20 to-transparent" />
        <div className="absolute right-48 top-1/4 w-px h-48 bg-gradient-to-b from-transparent via-bronze/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-32 pb-24">

        {/* Eyebrow */}
        <motion.p
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-bronze mb-10"
          {...fadeUp(0.15)}
        >
          Financial Infrastructure Platform
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="text-[clamp(2.5rem,7vw,6rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.04] max-w-4xl"
          {...fadeUp(0.3)}
        >
          Financial infrastructure
          <br />
          <span className="text-muted-foreground font-light">for compliant global operations</span>
        </motion.h1>

        {/* Supporting line */}
        <motion.p
          className="mt-5 text-base font-mono tracking-[0.04em] text-muted-foreground"
          {...fadeUp(0.45)}
        >
          Compliance-first onboarding. Provider-backed payment rails. API-ready infrastructure.
        </motion.p>

        {/* Sub */}
        <motion.p
          className="mt-6 max-w-lg text-[1.0625rem] text-muted-foreground leading-[1.7] font-light"
          {...fadeUp(0.55)}
        >
          WIRROX connects businesses to licensed financial infrastructure through structured
          onboarding, controlled access workflows, and operational dashboards — without
          custody or execution risk.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4"
          {...fadeUp(0.65)}
        >
          <a
            href="https://app.wirrox.com/request-access"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
          >
            Request Access
          </a>
          <a
            href="#what-we-do"
            onClick={e => { e.preventDefault(); document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="px-8 py-3.5 border border-rule text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
          >
            Explore Capabilities
          </a>
        </motion.div>

        {/* Trust points */}
        <motion.div
          className="mt-16 flex flex-wrap gap-x-8 gap-y-4"
          {...fadeUp(0.75)}
        >
          {[
            "Compliance-first onboarding",
            "Provider-backed rails",
            "Operational dashboard",
            "API-ready infrastructure",
          ].map((point) => (
            <div key={point} className="flex items-center gap-2">
              <span className="w-[4px] h-[4px] bg-bronze flex-shrink-0" />
              <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                {point}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-20 pt-10 border-t border-rule grid grid-cols-3 gap-8 max-w-xl"
          {...fadeUp(0.85)}
        >
          {[
            { value: "B2B", label: "Infrastructure Focus" },
            { value: "100%", label: "Audit Coverage" },
            { value: "0×", label: "Fund Custody" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-semibold text-ink tracking-tight">{s.value}</p>
              <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll nudge */}
      <motion.button
        onClick={() => document.getElementById("what-we-do")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <ArrowDown className="w-3.5 h-3.5 text-ink" />
      </motion.button>
    </section>
  );
}
