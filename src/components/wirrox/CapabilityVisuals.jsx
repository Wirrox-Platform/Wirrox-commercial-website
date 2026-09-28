import React from "react";
import { FlowMark, FlowDot, flowFrames, fanFrames, flowAnimation } from "./FlowMotion";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import BrandIcon from "./BrandIcon";

/* ─── Payout Flow Diagram ─────────────────────────────────────────── */
const destinations = [
  { label: "United Kingdom", amount: "£12,400"   },
  { label: "European Union", amount: "€28,750"   },
  { label: "United States",  amount: "$41,200"   },
  { label: "UAE",            amount: "د.إ 9,800" },
  { label: "Singapore",      amount: "S$6,300"   },
];

function PayoutFlowDiagram() {
  // SVG coordinate constants
  const W = 860, ROW = 68, H = destinations.length * ROW;
  const hubY = H / 2;

  const srcX1 = 10,  srcX2 = 190;  // source box
  const hubX1 = 250, hubX2 = 420;  // wirrox box
  const dstX1 = 530, dstX2 = 850;  // destination boxes

  const srcMidX = (srcX1 + srcX2) / 2;
  const hubMidX = (hubX1 + hubX2) / 2;
  const pauseX  = hubMidX + 14;    // right edge of the brand mark

  const destYs = destinations.map((_, i) => i * ROW + ROW / 2);
  const fanPath = (dy) =>
    `M ${hubX2} ${hubY} C ${hubX2 + 40} ${hubY}, ${dstX1 - 40} ${dy}, ${dstX1} ${dy}`;

  const css = [
    flowFrames("payout-entry", [
      [0, srcX2, hubY, 0], [5, srcX2, hubY, 0], [5.01, srcX2, hubY],
      [20, pauseX, hubY], [50, pauseX, hubY], [59.99, hubX2, hubY],
      [60, hubX2, hubY, 0], [100, hubX2, hubY, 0],
    ]),
    ...destYs.map((dy, i) => fanFrames(`payout-fan-${i}`,
      [[hubX2, hubY], [hubX2 + 40, hubY], [dstX1 - 40, dy], [dstX1, dy]])),
  ].join("\n");

  return (
    <div className="w-full overflow-x-auto">
      <style>{css}</style>
      <svg data-flow="payout-desktop" viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 480, maxHeight: 360 }}>

        {/* ── SOURCE BOX ── */}
        <rect x={srcX1} y={hubY - 52} width={srcX2 - srcX1} height={104} rx={8}
          fill="none" stroke="var(--color-rule)" strokeWidth={1} />
        <text x={srcMidX} y={hubY - 26} textAnchor="middle"
          fontSize={9} fontFamily="Inter,monospace" letterSpacing={2.5} fill="#C9A96E">
          FUNDING ACCOUNT
        </text>
        <text x={srcMidX} y={hubY + 8} textAnchor="middle"
          fontSize={24} fontFamily="Inter,sans-serif" fontWeight={600} fill="var(--color-ink)">
          $250,000
        </text>
        <text x={srcMidX} y={hubY + 30} textAnchor="middle"
          fontSize={8.5} fontFamily="Inter,monospace" letterSpacing={1.5}
          fill="var(--color-ink)" opacity={0.35}>
          USD · AVAILABLE
        </text>

        {/* ── LINE: source → hub ── */}
        <line x1={srcX2} y1={hubY} x2={hubX1} y2={hubY}
          stroke="var(--color-rule)" strokeWidth={1} />

        {/* ── WIRROX HUB BOX ── */}
        <rect x={hubX1} y={hubY - 40} width={hubX2 - hubX1} height={80} rx={8}
          fill="var(--color-bronze-subtle)" stroke="#C9A96E" strokeWidth={1} />
        <FlowMark x={hubMidX - 18} y={hubY - 23} size={36} />
        <text x={hubMidX} y={hubY + 28} textAnchor="middle"
          fontSize={7.5} fontFamily="Inter,monospace" letterSpacing={2} fill="#C9A96E">
          ROUTING · COMPLIANCE
        </text>

        {/* ── FAN LINES + DESTINATION BOXES ── */}
        {destinations.map((dest, i) => {
          const dy = destYs[i];
          return (
            <g key={dest.label}>
              <path d={fanPath(dy)} fill="none" stroke="var(--color-rule)" strokeWidth={1} />
              <rect x={dstX1} y={dy - 26} width={dstX2 - dstX1} height={52} rx={8}
                fill="none" stroke="var(--color-rule)" strokeWidth={1} />
              <text x={(dstX1 + dstX2) / 2} y={dy - 8} textAnchor="middle"
                fontSize={8} fontFamily="Inter,monospace" letterSpacing={2}
                fill="var(--color-ink)" opacity={0.4}>
                {dest.label.toUpperCase()}
              </text>
              <text x={(dstX1 + dstX2) / 2} y={dy + 14} textAnchor="middle"
                fontSize={15} fontFamily="Inter,sans-serif" fontWeight={500}
                fill="var(--color-ink)">
                {dest.amount}
              </text>
            </g>
          );
        })}

        {/* ── TRAVELLING DOT: funding account → stop at the brand mark ── */}
        <FlowDot name="payout-entry" />

        {/* ── SPLIT DOTS + GOLD FLASH PER DESTINATION ── */}
        {destinations.map((dest, i) => (
          <FlowDot key={dest.label} name={`payout-fan-${i}`} kind="branch" />
        ))}
        {destinations.map((dest, i) => (
          <rect key={`flash-${dest.label}`} x={dstX1} y={destYs[i] - 26}
            width={dstX2 - dstX1} height={52} rx={8} fill="#C9A96E" stroke="#C9A96E"
            opacity={0} style={flowAnimation("payout-flash")} />
        ))}
      </svg>
    </div>
  );
}

/* ─── Mobile Payout Flow (stacked + animated) ───────────────────── */
function MobilePayoutFlow() {
  const boxes = [[20,330], [190,330], [20,425], [190,425], [105,520]];
  const routes = [
    [[180,260],[95,285],[95,315],[95,330]],
    [[180,260],[265,285],[265,315],[265,330]],
    [[180,260],[5,260],[5,460],[20,460]],
    [[180,260],[355,260],[355,460],[340,460]],
    [[180,260],[180,345],[180,440],[180,520]],
  ];
  const css = [
    flowFrames("payout-mobile-entry", [[0,180,90,0],[5,180,90,0],[5.01,180,90],
      [20,194,191],[50,194,191],[55,180,230],[59.99,180,260],[60,180,260,0],[100,180,260,0]]),
    ...routes.map((route,i) => flowFrames(`payout-mobile-fan-${i}`,
      [[0,...route[0],0],[59.99,...route[0],0],...route.map((p,k)=>[60+k*25/3,...p]),[85.01,...route[3],0],[100,...route[3],0]])),
  ].join("\n");
  return <svg viewBox="0 0 360 600" className="w-full" role="img" aria-label="Funding account routed through WIRROX to five destinations" data-flow="payout-mobile">
    <style>{css}</style>
    <rect x="10" y="0" width="340" height="90" rx="8" fill="var(--color-surface)" stroke="var(--color-rule)" />
    <text x="180" y="25" textAnchor="middle" fontSize="9" letterSpacing="2" fill="#C9A96E">FUNDING ACCOUNT</text>
    <text x="180" y="54" textAnchor="middle" fontSize="24" fontWeight="600" fill="var(--color-ink)">$250,000</text>
    <text x="180" y="74" textAnchor="middle" fontSize="9" fill="var(--color-ink)" opacity=".5">USD · Available</text>
    <path d="M180 90 V130 M180 230 V260" stroke="var(--color-rule)" fill="none" />
    <rect x="10" y="130" width="340" height="100" rx="8" fill="var(--color-bronze-subtle)" stroke="#C9A96E" />
    <text x="180" y="151" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#C9A96E">INFRASTRUCTURE</text>
    <FlowMark x={160} y={165} />
    <text x="180" y="215" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#C9A96E">ROUTING · COMPLIANCE</text>
    {routes.map((route,i)=><path key={i} d={route.map((p,k)=>(k?'L':'M')+p.join(' ')).join(' ')} fill="none" stroke="var(--color-rule)" />)}
    {destinations.map((dest,i)=><g key={dest.label}>
      <rect x={boxes[i][0]} y={boxes[i][1]} width="150" height="70" rx="8" fill="var(--color-surface)" stroke="var(--color-rule)" />
      <rect x={boxes[i][0]} y={boxes[i][1]} width="150" height="70" rx="8" fill="#C9A96E" opacity="0" style={flowAnimation('payout-flash')} />
      <text x={boxes[i][0]+75} y={boxes[i][1]+25} textAnchor="middle" fontSize="8" letterSpacing="1" fill="var(--color-ink)" opacity=".55">{dest.label.toUpperCase()}</text>
      <text x={boxes[i][0]+75} y={boxes[i][1]+48} textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--color-ink)">{dest.amount}</text>
    </g>)}
    <FlowDot name="payout-mobile-entry" />
    {destinations.map((dest,i)=><FlowDot key={dest.label} name={`payout-mobile-fan-${i}`} kind="branch" />)}
  </svg>;
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
    <div className="border border-rule rounded-lg bg-canvas overflow-hidden shadow-panel">
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
                  <rect width={20} height={20} rx={4} fill="#C9A96E" opacity={0.12} />
                  <path d="M5 10l3 3L15 7" stroke="#C9A96E" strokeWidth={1.5}
                    fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {step.status === "active" && (
                <motion.div className="w-2.5 h-2.5 rounded-sm bg-bronze"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }} />
              )}
              {step.status === "pending" && (
                <div className="w-2.5 h-2.5 rounded-sm border border-rule" />
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
  { ref: "WRX-00441", dest: "London, UK",    amount: "£12,400", status: "Completed"    },
  { ref: "WRX-00440", dest: "Amsterdam, NL", amount: "€8,750",  status: "Completed"    },
  { ref: "WRX-00439", dest: "New York, US",  amount: "$21,000", status: "Processing" },
  { ref: "WRX-00438", dest: "Dubai, AE",     amount: "$9,800",  status: "Completed"    },
];

function DashboardPreview() {
  return (
    <div className="border border-rule rounded-lg overflow-hidden flex shadow-panel" style={{ minHeight: 420 }}>

      {/* Sidebar — hidden on mobile */}
      <div className="hidden sm:flex w-40 flex-shrink-0 border-r border-rule bg-canvas flex-col">
        <div className="px-4 py-5 border-b border-rule">
          <BrandIcon className="h-6 w-6 rounded-md" />
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
          <div className="border border-rule rounded-lg p-4 bg-canvas shadow-panel">
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
          <div className="border border-rule rounded-lg overflow-hidden bg-card">
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
                  <span className={`text-[8px] font-mono rounded-full px-2 py-0.5 ${
                    p.status === "Completed"
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
          className="border border-rule rounded-lg p-6 lg:p-14 bg-canvas mb-16 shadow-panel"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-bronze mb-8 lg:mb-10">
            Payout Distribution — Live Flow
          </p>

          {/* Desktop SVG diagram */}
          <div className="hidden sm:block">
            <PayoutFlowDiagram />
          </div>

          {/* Mobile stacked version */}
          <div className="sm:hidden">
            <MobilePayoutFlow />
          </div>
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

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
