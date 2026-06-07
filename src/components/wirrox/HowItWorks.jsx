import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    number: "01",
    title: "Request Access",
    description:
      "Your business submits a request through the WIRROX platform. Email verification is required to initiate the onboarding process.",
  },
  {
    number: "02",
    title: "Compliance Review",
    description:
      "The WIRROX team reviews your KYB application, entity documentation, UBO disclosure, and source of funds before any access is granted.",
  },
  {
    number: "03",
    title: "Provider Onboarding",
    description:
      "Upon internal approval, WIRROX coordinates provider-side onboarding on your behalf. Status updates are reflected in your client dashboard.",
  },
  {
    number: "04",
    title: "Operational Access",
    description:
      "After full approval and 2FA setup, your team gains access to accounts, payouts, FX, and reporting through the WIRROX dashboard.",
  },
];

function ArchitectureDiagram() {
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAnimKey(k => k + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const W = 900, H = 160;
  const leftX = 20, rightX = W - 20;
  const midY = H / 2;

  // Box boundaries
  const srcX2 = 220;
  const hubX1 = 360, hubX2 = 540;
  const dstX1 = 680;

  const hubMidX = (hubX1 + hubX2) / 2;

  return (
    <motion.div
      className="mt-24 border border-rule bg-canvas overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Mobile stacked version */}
      <div className="sm:hidden flex flex-col items-center py-10 px-6 gap-0">
        <div className="text-center">
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Client</p>
          <p className="text-base font-medium text-ink">Your Business</p>
          <p className="text-xs text-muted-foreground">WIRROX-branded journey</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <div className="w-px h-8 bg-rule" />
          <div className="w-2 h-2 rotate-45 border-r border-b border-bronze" />
        </div>
        <div className="border border-bronze bg-bronze-subtle px-8 py-3 text-center">
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-bronze mb-1">Infrastructure</p>
          <p className="text-base font-black text-ink">WIRROX</p>
        </div>
        <div className="flex flex-col items-center py-2">
          <div className="w-px h-8 bg-rule" />
          <div className="w-2 h-2 rotate-45 border-r border-b border-bronze" />
        </div>
        <div className="text-center">
          <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1">Execution</p>
          <p className="text-base font-medium text-ink">Licensed Providers</p>
          <p className="text-xs text-muted-foreground">Regulated financial institutions</p>
        </div>
      </div>

      {/* Desktop SVG version */}
      <svg key={animKey} viewBox={`0 0 ${W} ${H}`}
        className="hidden sm:block w-full" style={{ maxHeight: 160 }}>

        {/* ── CLIENT label + text ── */}
        <text x={leftX} y={midY - 18} fontSize={8.5}
          fontFamily="JetBrains Mono,monospace" letterSpacing={2.5}
          fill="var(--color-ink)" opacity={0.4}>
          CLIENT
        </text>
        <text x={leftX} y={midY + 6} fontSize={15}
          fontFamily="Inter,sans-serif" fontWeight={500} fill="var(--color-ink)">
          Your Business
        </text>
        <text x={leftX} y={midY + 24} fontSize={9.5}
          fontFamily="Inter,sans-serif" fill="var(--color-ink)" opacity={0.4}>
          WIRROX-branded journey
        </text>

        {/* ── Line left: client → hub ── */}
        <line x1={srcX2} y1={midY} x2={hubX1} y2={midY}
          stroke="var(--color-rule)" strokeWidth={1} />
        <circle r={3.5} fill="#C9A96E" opacity={0}>
          <animate attributeName="opacity" values="0;1;1;0"
            dur="0.55s" begin="0.1s" fill="remove" />
          <animateMotion dur="0.55s" begin="0.1s" fill="remove"
            path={`M ${srcX2} ${midY} L ${hubX1} ${midY}`} />
        </circle>

        {/* ── WIRROX hub box ── */}
        <rect x={hubX1} y={midY - 38} width={hubX2 - hubX1} height={76}
          fill="var(--color-bronze-subtle)" stroke="#C9A96E" strokeWidth={1} />
        <text x={hubMidX} y={midY - 8} textAnchor="middle"
          fontSize={8.5} fontFamily="JetBrains Mono,monospace" letterSpacing={2}
          fill="#C9A96E">
          INFRASTRUCTURE
        </text>
        <text x={hubMidX} y={midY + 16} textAnchor="middle"
          fontSize={17} fontFamily="Inter,sans-serif" fontWeight={800}
          letterSpacing={0} fill="var(--color-ink)">
          WIRROX
        </text>

        {/* ── Line right: hub → providers ── */}
        <line x1={hubX2} y1={midY} x2={dstX1} y2={midY}
          stroke="var(--color-rule)" strokeWidth={1} />
        <circle r={3.5} fill="#C9A96E" opacity={0}>
          <animate attributeName="opacity" values="0;1;1;0"
            dur="0.55s" begin="0.75s" fill="remove" />
          <animateMotion dur="0.55s" begin="0.75s" fill="remove"
            path={`M ${hubX2} ${midY} L ${dstX1} ${midY}`} />
        </circle>

        {/* ── EXECUTION label + text ── */}
        <text x={rightX} y={midY - 18} textAnchor="end" fontSize={8.5}
          fontFamily="JetBrains Mono,monospace" letterSpacing={2.5}
          fill="var(--color-ink)" opacity={0.4}>
          EXECUTION
        </text>
        <text x={rightX} y={midY + 6} textAnchor="end" fontSize={15}
          fontFamily="Inter,sans-serif" fontWeight={500} fill="var(--color-ink)">
          Licensed Providers
        </text>
        <text x={rightX} y={midY + 24} textAnchor="end" fontSize={9.5}
          fontFamily="Inter,sans-serif" fill="var(--color-ink)" opacity={0.4}>
          Regulated financial institutions
        </text>
      </svg>
    </motion.div>
  );
}

export default function HowItWorks() {

  return (
    <section id="how-it-works" className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="How It Works" />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start mb-20">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            From application
            <br />
            <span className="text-muted-foreground font-light">to operational access</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md self-end">
            WIRROX manages the full onboarding lifecycle — from initial request through
            compliance review to provider-backed access. Every step is tracked and visible
            in the client dashboard.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Horizontal rule connecting steps (desktop) */}
          <div className="hidden lg:block absolute top-[7px] left-0 right-0 h-px bg-rule overflow-hidden">
            <motion.div
              className="h-full bg-bronze origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Node */}
                <div className="w-[14px] h-[14px] border border-bronze bg-canvas mb-10 relative z-10 hidden lg:flex items-center justify-center">
                  <div className="w-[5px] h-[5px] bg-bronze" />
                </div>

                <p className="text-[10px] font-mono tracking-[0.25em] text-bronze mb-3 uppercase">
                  Step {step.number}
                </p>
                <h3 className="text-[0.9375rem] font-medium text-ink mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.7]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Architecture callout */}
        <ArchitectureDiagram />
      </div>
    </section>
  );
}
