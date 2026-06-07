import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

/* ─── Payout Flow Diagram ─────────────────────────────────────────── */
const destinations = [
  { label: "United Kingdom", code: "GBP", amount: "£12,400"    },
  { label: "European Union", code: "EUR", amount: "€28,750"    },
  { label: "United States",  code: "USD", amount: "$41,200"    },
  { label: "UAE",            code: "AED", amount: "د.إ 9,800"  },
  { label: "Singapore",      code: "SGD", amount: "S$6,300"    },
];

function PayoutFlowDiagram() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const ROW_H = 64;
  const DEST_COUNT = destinations.length;
  const SVG_H = DEST_COUNT * ROW_H;
  const midY = SVG_H / 2;

  return (
    <div className="w-full flex items-center gap-0 overflow-x-auto">

      {/* ── Source account ── */}
      <div className="flex-shrink-0 border border-rule p-5 text-center w-44">
        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-bronze mb-2">
          Funding Account
        </p>
        <p className="text-2xl font-semibold text-ink tracking-tight">$250,000</p>
        <p className="text-[9px] font-mono text-muted-foreground mt-1 opacity-60">
          USD · Available
        </p>
      </div>

      {/* ── Connector line: source → hub ── */}
      <div className="flex-shrink-0 relative h-px w-10 bg-rule">
        <motion.div
          key={`left-${tick}`}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-bronze"
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* ── WIRROX hub ── */}
      <div className="flex-shrink-0 border border-bronze bg-bronze-subtle px-6 py-4 text-center w-36">
        <p className="text-base font-black tracking-[0.15em] text-ink">WIRROX</p>
        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-bronze mt-1">
          Routing
        </p>
        <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-bronze">
          Compliance
        </p>
      </div>

      {/* ── Fan-out SVG ── */}
      <div className="flex-shrink-0" style={{ width: 64, height: SVG_H }}>
        <svg width={64} height={SVG_H}>
          {destinations.map((_, i) => {
            const destY = ROW_H * i + ROW_H / 2;
            const path = `M 0 ${midY} C 32 ${midY}, 32 ${destY}, 64 ${destY}`;
            return (
              <g key={i}>
                <path d={path} fill="none" stroke="var(--color-rule)" strokeWidth={1} />
                <motion.circle r={3} fill="#C9A96E"
                  key={`fan-${i}-${tick}`}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeInOut" }}
                  style={{ offsetPath: `path("${path}")`, offsetDistance: "0%" }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Destinations ── */}
      <div className="flex-shrink-0 flex flex-col" style={{ gap: 0 }}>
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.code}
            className="border border-rule px-5 flex items-center justify-between gap-8"
            style={{ height: ROW_H, borderTop: i === 0 ? undefined : "none" }}
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-muted-foreground w-28">
              {dest.label}
            </p>
            <p className="text-base font-semibold text-ink tracking-tight">
              {dest.amount}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Compliance Checklist ───────────────────────────────────────── */
const complianceSteps = [
  { label: "KYB application submitted",      status: "done"    },
  { label: "Entity documents verified",       status: "done"    },
  { label: "UBO & directors disclosed",       status: "done"    },
  { label: "Source of funds reviewed",        status: "done"    },
  { label: "Internal compliance review",      status: "active"  },
  { label: "Provider onboarding initiated",   status: "pending" },
  { label: "2FA setup & access granted",      status: "pending" },
];

function ComplianceGateway() {
  return (
    <div className="border border-rule bg-canvas overflow-hidden">
      {/* Header bar — matches app style */}
      <div className="px-6 py-4 border-b border-rule bg-white flex items-center justify-between">
        <div>
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze">
            Onboarding Review
          </p>
          <p className="text-sm font-semibold text-ink mt-0.5">Acme Corp Ltd.</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 bg-bronze rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }} />
          <span className="text-[9px] font-mono text-bronze uppercase tracking-[0.15em]">In Review</span>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 py-2">
        {complianceSteps.map((step, i) => (
          <motion.div key={step.label}
            className="flex items-center gap-4 py-3 border-b border-rule last:border-b-0"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
              {step.status === "done" && (
                <svg viewBox="0 0 20 20" className="w-5 h-5">
                  <rect width={20} height={20} fill="#C9A96E" opacity={0.12} />
                  <path d="M5 10l3 3L15 7" stroke="#C9A96E" strokeWidth={1.5}
                    fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {step.status === "active" && (
                <motion.div className="w-2.5 h-2.5 bg-bronze"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }} />
              )}
              {step.status === "pending" && (
                <div className="w-2.5 h-2.5 border border-rule" />
              )}
            </div>
            <span className={`text-[11px] font-mono tracking-[0.03em] flex-1 ${
              step.status === "done"
                ? "text-muted-foreground line-through opacity-40"
                : step.status === "active"
                ? "text-ink"
                : "text-muted-foreground opacity-35"
            }`}>
              {step.label}
            </span>
            {step.status === "active" && (
              <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-bronze">
                Active
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress footer */}
      <div className="px-6 py-4 border-t border-rule flex items-center gap-4">
        <div className="flex-1 h-px bg-rule relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-full bg-bronze"
            initial={{ width: 0 }}
            whileInView={{ width: "57%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }} />
        </div>
        <span className="text-[9px] font-mono text-bronze flex-shrink-0">4 / 7 complete</span>
      </div>
    </div>
  );
}

/* ─── Dashboard Preview — mirrors actual WIRROX app ─────────────── */
const navItems = [
  { label: "Home",            active: true  },
  { label: "Accounts",        active: false },
  { label: "Beneficiaries",   active: false },
  { label: "New Payout",      active: false },
  { label: "Payout History",  active: false },
  { label: "FX Calculator",   active: false },
  { label: "Reports",         active: false },
];

const recentPayouts = [
  { ref: "WRX-00441", dest: "London, UK",    amount: "£12,400", status: "Settled"    },
  { ref: "WRX-00440", dest: "Amsterdam, NL", amount: "€8,750",  status: "Settled"    },
  { ref: "WRX-00439", dest: "New York, US",  amount: "$21,000", status: "Processing" },
  { ref: "WRX-00438", dest: "Dubai, AE",     amount: "$9,800",  status: "Settled"    },
];

function DashboardPreview() {
  return (
    <div className="border border-rule overflow-hidden flex" style={{ minHeight: 420 }}>

      {/* Sidebar */}
      <div className="w-40 flex-shrink-0 border-r border-rule bg-canvas flex flex-col">
        <div className="px-4 py-5 border-b border-rule">
          <p className="text-[13px] font-black tracking-[0.12em] text-ink">WIRROX</p>
          <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mt-0.5">Treasury</p>
        </div>
        <nav className="flex-1 py-3">
          {navItems.map((item) => (
            <div key={item.label}
              className={`px-4 py-2.5 flex items-center gap-2.5 ${
                item.active
                  ? "bg-bronze/10 border-l-2 border-bronze"
                  : "border-l-2 border-transparent"
              }`}>
              <span className={`text-[10px] font-mono tracking-[0.05em] ${
                item.active ? "text-ink font-medium" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white overflow-hidden">
        {/* Page header */}
        <div className="px-6 py-5 border-b border-rule flex items-start justify-between">
          <div>
            <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze mb-1">
              Treasury Command Center
            </p>
            <p className="text-xl font-semibold text-ink">Home</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="px-3 py-1.5 border border-rule text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
              Reports
            </button>
            <button className="px-3 py-1.5 bg-bronze text-[9px] font-mono uppercase tracking-[0.15em] text-white">
              New Payout
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Balance block */}
          <div className="border border-rule p-4 bg-canvas">
            <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Available Balance
            </p>
            <p className="text-2xl font-semibold text-ink tracking-tight">
              100,000.00 <span className="text-base font-normal text-muted-foreground">USD</span>
            </p>
            <p className="text-[9px] font-mono text-muted-foreground mt-1">
              2 currencies across 2 source accounts
            </p>
            <div className="grid grid-cols-4 gap-3 mt-4 pt-3 border-t border-rule">
              {[
                { label: "Active Accounts", val: "2" },
                { label: "Pending",         val: "0" },
                { label: "Completed",       val: "2" },
                { label: "Last Activity",   val: "Today" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-[7.5px] font-mono uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
                  <p className="text-sm font-semibold text-ink mt-0.5">{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent payouts */}
          <div className="border border-rule">
            <div className="px-4 py-3 border-b border-rule">
              <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-bronze">
                Recent Payouts
              </p>
            </div>
            {recentPayouts.map((p) => (
              <div key={p.ref}
                className="flex items-center justify-between px-4 py-2.5 border-b border-rule last:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="text-[8px] font-mono text-muted-foreground">{p.ref}</span>
                  <span className="text-[10px] font-mono text-ink">{p.dest}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-medium text-ink">{p.amount}</span>
                  <span className={`text-[8px] font-mono px-2 py-0.5 ${
                    p.status === "Settled"
                      ? "bg-green-50 text-green-700"
                      : "bg-bronze/10 text-bronze"
                  }`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */
export default function CapabilityVisuals() {
  return (
    <section className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <SectionLabel label="Platform in Action" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-28 items-end mb-16">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12]">
            From a single account
            <br />
            <span className="text-muted-foreground font-light">to global distribution</span>
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] max-w-md">
            Fund one account. WIRROX routes payments to multiple destinations
            across jurisdictions — each instruction compliance-checked, provider-routed,
            and fully tracked in real time.
          </p>
        </div>

        {/* Payout flow — full width */}
        <motion.div
          className="border border-rule p-8 lg:p-14 bg-canvas mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-bronze mb-10">
            Payout Distribution — Live Flow
          </p>
          <PayoutFlowDiagram />
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-4">
              Compliance Gateway
            </p>
            <h3 className="text-xl font-semibold text-ink mb-3 leading-[1.2]">
              Every client reviewed<br />before access is granted
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.75] mb-7">
              No instant account opening. Each application passes through a structured
              KYB/KYC review before any operational access is activated.
            </p>
            <ComplianceGateway />
          </motion.div>

          {/* Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-4">
              Operational Dashboard
            </p>
            <h3 className="text-xl font-semibold text-ink mb-3 leading-[1.2]">
              Full visibility across<br />accounts and payouts
            </h3>
            <p className="text-sm text-muted-foreground leading-[1.75] mb-7">
              Once approved, clients access balances, FX rates, payout history,
              and reconciliation — all from one dashboard.
            </p>
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
