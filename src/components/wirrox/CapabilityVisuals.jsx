import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

/* ─── Payout Flow Diagram ─────────────────────────────────────────── */
const destinations = [
  { label: "United Kingdom", code: "GBP", amount: "£12,400", color: "#C9A96E" },
  { label: "European Union", code: "EUR", amount: "€28,750", color: "#C9A96E" },
  { label: "United States",  code: "USD", amount: "$41,200", color: "#C9A96E" },
  { label: "UAE",            code: "AED", amount: "د.إ 9,800", color: "#C9A96E" },
  { label: "Singapore",      code: "SGD", amount: "S$6,300",  color: "#C9A96E" },
];

function PayoutFlowDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1800);
    return () => clearInterval(id);
  }, []);

  const W = 680, H = 320;
  const srcX = 120, srcY = H / 2;
  const hubX = 320, hubY = H / 2;
  const destX = 560;

  const destYs = destinations.map((_, i) => {
    const spread = (destinations.length - 1) * 44;
    return H / 2 - spread / 2 + i * 44;
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl mx-auto" style={{ minWidth: 340 }}>
        {/* Source account box */}
        <rect x={srcX - 70} y={srcY - 36} width={140} height={72} rx={0}
          fill="none" stroke="var(--color-rule)" strokeWidth={1} />
        <text x={srcX} y={srcY - 14} textAnchor="middle" fontSize={9}
          fill="#C9A96E" fontFamily="JetBrains Mono, monospace" letterSpacing={2}>
          FUNDING ACCOUNT
        </text>
        <text x={srcX} y={srcY + 6} textAnchor="middle" fontSize={18}
          fill="var(--color-ink)" fontFamily="Inter, sans-serif" fontWeight={600}>
          $250,000
        </text>
        <text x={srcX} y={srcY + 22} textAnchor="middle" fontSize={8}
          fill="var(--color-ink)" fontFamily="JetBrains Mono, monospace"
          opacity={0.4} letterSpacing={1}>
          USD · AVAILABLE
        </text>

        {/* Line: source → hub */}
        <line x1={srcX + 70} y1={srcY} x2={hubX - 44} y2={hubY}
          stroke="var(--color-rule)" strokeWidth={1} />

        {/* Animated dot: source → hub */}
        <motion.circle r={3} fill="#C9A96E"
          key={`dot-in-${tick}`}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            offsetPath: `path("M ${srcX + 70} ${srcY} L ${hubX - 44} ${hubY}")`,
            offsetDistance: "0%",
          }}
        />

        {/* Hub — WIRROX node */}
        <rect x={hubX - 44} y={hubY - 26} width={88} height={52} rx={0}
          fill="var(--color-bronze-subtle)" stroke="#C9A96E" strokeWidth={1} />
        <text x={hubX} y={hubY - 7} textAnchor="middle" fontSize={7.5}
          fill="#C9A96E" fontFamily="JetBrains Mono, monospace" letterSpacing={2}>
          WIRROX
        </text>
        <text x={hubX} y={hubY + 9} textAnchor="middle" fontSize={7}
          fill="var(--color-ink)" fontFamily="JetBrains Mono, monospace"
          opacity={0.5} letterSpacing={1}>
          ROUTING · COMPLIANCE
        </text>

        {/* Lines + dots: hub → destinations */}
        {destinations.map((dest, i) => {
          const dy = destYs[i];
          const pathD = `M ${hubX + 44} ${hubY} C ${hubX + 100} ${hubY}, ${destX - 80} ${dy}, ${destX - 60} ${dy}`;
          const delay = i * 0.12;
          return (
            <g key={dest.code}>
              <path d={pathD} fill="none" stroke="var(--color-rule)" strokeWidth={1} />
              <motion.circle r={2.5} fill="#C9A96E"
                key={`dot-${i}-${tick}`}
                initial={{ offsetDistance: "0%", opacity: 0 }}
                animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.7, delay, ease: "easeInOut" }}
                style={{ offsetPath: `path("${pathD}")`, offsetDistance: "0%" }}
              />
              {/* Destination box */}
              <rect x={destX - 60} y={dy - 22} width={132} height={44} rx={0}
                fill="none" stroke="var(--color-rule)" strokeWidth={1} />
              <text x={destX - 60 + 66} y={dy - 6} textAnchor="middle" fontSize={8}
                fill="var(--color-ink)" fontFamily="JetBrains Mono, monospace"
                opacity={0.45} letterSpacing={1}>
                {dest.label.toUpperCase()}
              </text>
              <text x={destX - 60 + 66} y={dy + 10} textAnchor="middle" fontSize={11}
                fill="var(--color-ink)" fontFamily="Inter, sans-serif" fontWeight={500}>
                {dest.amount}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Compliance Gateway Visual ──────────────────────────────────── */
const complianceSteps = [
  { label: "KYB Submitted",         status: "done" },
  { label: "Documents Verified",    status: "done" },
  { label: "UBO Disclosed",         status: "done" },
  { label: "Source of Funds",       status: "done" },
  { label: "Internal Review",       status: "active" },
  { label: "Provider Onboarding",   status: "pending" },
  { label: "2FA & Access Granted",  status: "pending" },
];

function ComplianceGateway() {
  return (
    <div className="w-full max-w-sm mx-auto border border-rule bg-canvas p-6">
      <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-bronze mb-5">
        Onboarding Status
      </p>
      <div className="space-y-0">
        {complianceSteps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-3 py-3 border-b border-rule last:border-b-0"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {/* Status indicator */}
            <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
              {step.status === "done" && (
                <svg viewBox="0 0 16 16" className="w-4 h-4">
                  <rect width={16} height={16} fill="#C9A96E" opacity={0.12} />
                  <path d="M4 8l2.5 2.5L12 5.5" stroke="#C9A96E" strokeWidth={1.5}
                    fill="none" strokeLinecap="round" />
                </svg>
              )}
              {step.status === "active" && (
                <motion.div
                  className="w-2 h-2 bg-bronze"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
              {step.status === "pending" && (
                <div className="w-2 h-2 border border-rule" />
              )}
            </div>
            <span className={`text-[11px] font-mono tracking-[0.05em] ${
              step.status === "done" ? "text-muted-foreground line-through opacity-50" :
              step.status === "active" ? "text-ink" :
              "text-muted-foreground opacity-40"
            }`}>
              {step.label}
            </span>
            {step.status === "active" && (
              <span className="ml-auto text-[9px] font-mono uppercase tracking-[0.15em] text-bronze">
                In Review
              </span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-rule flex items-center justify-between">
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Completion
        </span>
        <div className="flex items-center gap-2">
          <div className="w-24 h-px bg-rule relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-bronze"
              initial={{ width: 0 }}
              whileInView={{ width: "57%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
          <span className="text-[9px] font-mono text-bronze">57%</span>
        </div>
      </div>
    </div>
  );
}

/* ─── FX / Dashboard Preview ─────────────────────────────────────── */
const fxPairs = [
  { pair: "USD / EUR", rate: "0.9218", change: "+0.12%", up: true },
  { pair: "USD / GBP", rate: "0.7841", change: "+0.08%", up: true },
  { pair: "USD / AED", rate: "3.6725", change: "0.00%",  up: null },
  { pair: "EUR / GBP", rate: "0.8505", change: "-0.03%", up: false },
];

const recentPayouts = [
  { ref: "WRX-00441", dest: "London, UK",    amount: "£12,400", status: "Settled"  },
  { ref: "WRX-00440", dest: "Amsterdam, NL", amount: "€8,750",  status: "Settled"  },
  { ref: "WRX-00439", dest: "New York, US",  amount: "$21,000", status: "Processing"},
  { ref: "WRX-00438", dest: "Dubai, AE",     amount: "$9,800",  status: "Settled"  },
];

function DashboardPreview() {
  return (
    <div className="w-full max-w-lg mx-auto border border-rule bg-white overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-rule bg-canvas">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-ink">
          WIRROX · Operational Dashboard
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
          <span className="text-[8px] font-mono text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        {/* Account balance */}
        <div className="col-span-2 border border-rule p-4 bg-canvas">
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mb-2">
            Account Balance
          </p>
          <p className="text-2xl font-semibold text-ink tracking-tight">$250,000.00</p>
          <p className="text-[9px] font-mono text-muted-foreground mt-1">
            USD · Provider-backed · Last updated 2 min ago
          </p>
        </div>

        {/* FX Rates */}
        <div className="border border-rule p-4">
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mb-3">
            FX Rates
          </p>
          <div className="space-y-2">
            {fxPairs.map((fx) => (
              <div key={fx.pair} className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-muted-foreground">{fx.pair}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-ink">{fx.rate}</span>
                  <span className={`text-[8px] font-mono ${
                    fx.up === true ? "text-green-600" :
                    fx.up === false ? "text-red-500" :
                    "text-muted-foreground"
                  }`}>{fx.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="border border-rule p-4">
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mb-3">
            This Month
          </p>
          <div className="space-y-3">
            {[
              { label: "Payouts Sent",  value: "47" },
              { label: "Total Volume",  value: "$2.4M" },
              { label: "Corridors",     value: "12" },
              { label: "Pending Items", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-muted-foreground">{stat.label}</span>
                <span className="text-[10px] font-mono font-medium text-ink">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payouts */}
        <div className="col-span-2 border border-rule p-4">
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mb-3">
            Recent Payouts
          </p>
          <div className="space-y-0">
            {recentPayouts.map((p, i) => (
              <div key={p.ref}
                className="flex items-center justify-between py-2 border-b border-rule last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-muted-foreground">{p.ref}</span>
                  <span className="text-[9px] font-mono text-ink">{p.dest}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-ink">{p.amount}</span>
                  <span className={`text-[8px] font-mono px-1.5 py-0.5 ${
                    p.status === "Settled"
                      ? "bg-green-50 text-green-700"
                      : "bg-bronze-subtle text-bronze"
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ────────────────────────────────────────────────── */
export default function CapabilityVisuals() {
  return (
    <section className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Platform in Action" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-20">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            From a single account
            <br />
            <span className="text-muted-foreground font-light">to global distribution</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
            Fund one account. WIRROX routes payments to multiple destinations
            across jurisdictions — each instruction compliance-checked, provider-routed,
            and fully tracked.
          </p>
        </div>

        {/* Payout flow diagram — full width */}
        <motion.div
          className="border border-rule p-8 lg:p-12 bg-canvas mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-bronze mb-8">
            Payout Distribution — Live Flow
          </p>
          <PayoutFlowDiagram />
        </motion.div>

        {/* Two columns: compliance + dashboard */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Compliance gateway */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-5">
              Compliance Gateway
            </p>
            <h3 className="text-xl font-semibold text-ink mb-4 leading-[1.2]">
              Every client reviewed<br />before access is granted
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.75] mb-8">
              No instant account opening. Each application passes through a structured
              KYB/KYC review with provider coordination before operational access is activated.
            </p>
            <ComplianceGateway />
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-5">
              Operational Dashboard
            </p>
            <h3 className="text-xl font-semibold text-ink mb-4 leading-[1.2]">
              Full visibility across<br />accounts and payouts
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.75] mb-8">
              Once approved, clients access accounts, FX rates, payout history,
              and reconciliation data — all in one operational dashboard.
            </p>
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
