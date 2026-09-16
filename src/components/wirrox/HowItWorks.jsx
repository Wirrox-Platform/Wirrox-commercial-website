import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { FlowMark, FlowDot, flowFrames } from "./FlowMotion";

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

function MobileArchDiagram() {
  const css=flowFrames("architecture-mobile", [[0,180,90,0],[5,180,90,0],[5.01,180,90],
    [20,194,183],[50,194,183],[60,180,225],[80,180,280],[80.01,180,280,0],[100,180,280,0]]);
  return <svg viewBox="0 0 360 365" className="sm:hidden block w-full" data-flow="architecture-mobile" role="img" aria-label="Your business through WIRROX to licensed providers">
    <style>{css}</style>
    <text x="180" y="30" textAnchor="middle" fontSize="9" fill="var(--color-ink)" opacity=".5">CLIENT</text>
    <text x="180" y="54" textAnchor="middle" fontSize="16" fontWeight="500" fill="var(--color-ink)">Your Business</text>
    <text x="180" y="74" textAnchor="middle" fontSize="11" fill="var(--color-ink)" opacity=".5">WIRROX-branded journey</text>
    <path d="M180 90 V135 M180 225 V280" stroke="var(--color-rule)" fill="none" />
    <rect x="80" y="135" width="200" height="90" rx="8" fill="var(--color-bronze-subtle)" stroke="#C9A96E" />
    <FlowMark x={160} y={157} />
    <text x="180" y="212" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#C9A96E">INFRASTRUCTURE</text>
    <text x="180" y="300" textAnchor="middle" fontSize="9" fill="var(--color-ink)" opacity=".5">EXECUTION</text>
    <text x="180" y="324" textAnchor="middle" fontSize="16" fontWeight="500" fill="var(--color-ink)">Licensed Providers</text>
    <text x="180" y="345" textAnchor="middle" fontSize="11" fill="var(--color-ink)" opacity=".5">Regulated financial institutions</text>
    <FlowDot name="architecture-mobile" />
  </svg>;
}

function ArchitectureDiagram() {
  const W = 900, H = 160;
  const leftX = 20, rightX = W - 20;
  const midY = H / 2;

  // Box boundaries
  const srcX2 = 220;
  const hubX1 = 360, hubX2 = 540;
  const dstX1 = 680;

  const hubMidX = (hubX1 + hubX2) / 2;
  const css=flowFrames("architecture-desktop", [[0,srcX2,midY,0],[5,srcX2,midY,0],[5.01,srcX2,midY],
    [20,hubMidX+14,midY],[50,hubMidX+14,midY],[60,hubX2,midY],[80,dstX1,midY],
    [80.01,dstX1,midY,0],[100,dstX1,midY,0]]);

  return (
    <motion.div
      className="mt-24 border border-rule rounded-lg bg-canvas overflow-hidden shadow-panel"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <style>{css}</style>
      {/* Mobile stacked animated version */}
      <MobileArchDiagram />

      {/* Desktop SVG version */}
      <svg data-flow="architecture-desktop" viewBox={`0 0 ${W} ${H}`}
        className="hidden sm:block w-full" style={{ maxHeight: 160 }}>

        {/* ── CLIENT label + text ── */}
        <text x={leftX} y={midY - 18} fontSize={8.5}
          fontFamily="Inter,monospace" letterSpacing={2.5}
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

        {/* ── Line right: hub → providers ── */}
        <line x1={hubX2} y1={midY} x2={dstX1} y2={midY}
          stroke="var(--color-rule)" strokeWidth={1} />

        {/* ── WIRROX hub box ── */}
        <rect x={hubX1} y={midY - 38} width={hubX2 - hubX1} height={76} rx={8}
          fill="var(--color-bronze-subtle)" stroke="#C9A96E" strokeWidth={1} />
        <FlowMark x={hubMidX - 18} y={midY - 23} size={36} />
        <text x={hubMidX} y={midY + 30} textAnchor="middle"
          fontSize={8} fontFamily="Inter,monospace" letterSpacing={2}
          fill="#C9A96E">
          INFRASTRUCTURE
        </text>

        <FlowDot name="architecture-desktop" />

        {/* ── EXECUTION label + text ── */}
        <text x={rightX} y={midY - 18} textAnchor="end" fontSize={8.5}
          fontFamily="Inter,monospace" letterSpacing={2.5}
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
