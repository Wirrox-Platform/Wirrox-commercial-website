import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { platformDestination } from "../../lib/platform-destination";

const steps = [
  {
    tag: "01",
    title: "Request Access",
    desc: "Business submits an access request through the WIRROX platform. Email verification is required to initiate the onboarding process.",
    details: [
      { label: "Channel",        val: platformDestination.hostLabel,  highlight: false },
      { label: "Email verified", val: "Required",        highlight: false },
      { label: "Status",        val: "Submitted",        highlight: false },
    ],
  },
  {
    tag: "02",
    title: "KYB Documentation",
    desc: "Entity documents uploaded — company registration, articles of incorporation, director list, and registered address.",
    details: [
      { label: "Company reg.",      val: "Uploaded",     highlight: false },
      { label: "Reg. address",      val: "Verified",     highlight: true  },
      { label: "Status",            val: "Under review", highlight: false },
    ],
  },
  {
    tag: "03",
    title: "UBO & Directors",
    desc: "Ultimate beneficial owners and authorised directors disclosed with supporting identity documentation for each individual.",
    details: [
      { label: "UBO disclosed",  val: "2 persons",   highlight: false },
      { label: "Director KYC",   val: "Completed",   highlight: true  },
      { label: "Status",         val: "Approved",    highlight: true  },
    ],
  },
  {
    tag: "04",
    title: "Source of Funds",
    desc: "Source of funds and source of wealth documented and submitted. Supporting evidence reviewed by the WIRROX compliance team.",
    details: [
      { label: "SOF document",  val: "Uploaded",      highlight: false },
      { label: "SOW declaration", val: "Signed",      highlight: true  },
      { label: "Status",        val: "Under review",  highlight: false },
    ],
  },
  {
    tag: "05",
    title: "Internal Review",
    desc: "WIRROX compliance team reviews the complete application. Provider onboarding is coordinated by WIRROX upon internal approval.",
    details: [
      { label: "Review team",   val: "WIRROX compliance", highlight: false },
      { label: "Provider sync", val: "Initiated",         highlight: true  },
      { label: "Status",        val: "In progress",       highlight: false },
    ],
  },
  {
    tag: "06",
    title: "Access Granted",
    desc: "2FA setup required before any operational access is activated. Role-based dashboard access enabled for approved accounts.",
    details: [
      { label: "2FA",       val: "Enforced",    highlight: true  },
      { label: "Dashboard", val: "Active",      highlight: true  },
      { label: "Status",    val: "Operational", highlight: true  },
    ],
  },
];

// Theme-aware palette shared with the commercial-site and Treasury surfaces.
const D = {
  bg:      "var(--color-canvas)",
  card:    "var(--color-surface)",
  border:  "var(--color-rule)",
  rule:    "var(--color-rule)",
  bronze:  "#C9A96E",
  bronzeSubtle: "var(--color-bronze-subtle)",
  ink:     "var(--color-ink)",
  muted:   "hsl(var(--muted-foreground))",
  faint:   "hsl(var(--muted-foreground))",
  green:   "#188659",
};

export default function OnboardingFlow() {
  const [current, setCurrent] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  // Start animation when section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % steps.length);
    }, 2600);
    return () => clearInterval(id);
  }, [running]);

  const progress = Math.round(((current + 1) / steps.length) * 100);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: D.bg, borderTop: `1px solid ${D.rule}` }}
      className="py-24 lg:py-36"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header — full width above */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="flex items-center gap-3 mb-8">
            <span style={{ width: 20, height: 1, backgroundColor: D.bronze, display: 'block' }} />
            <span style={{ fontSize: 10, fontFamily: 'Inter, monospace', letterSpacing: '0.3em', color: D.bronze, textTransform: 'uppercase' }}>
              Client Onboarding
            </span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-28 items-end">
            <h2 style={{ color: D.ink, fontSize: 'clamp(1.9rem, 3.5vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.12 }}>
              From application
              <br />
              <span style={{ color: D.muted, fontWeight: 300 }}>to operational access</span>
            </h2>
            <p style={{ color: D.muted, fontSize: '0.9375rem', lineHeight: 1.75, maxWidth: 420 }}>
              Every client follows the same structured review process. No shortcuts,
              no unreviewed access. The full journey from request to activation is
              tracked and visible at each stage.
            </p>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ height: 1, backgroundColor: D.rule, position: 'relative', overflow: 'hidden' }}>
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: D.bronze }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 9, fontFamily: 'Inter, monospace', letterSpacing: '0.2em', color: D.faint, textTransform: 'uppercase' }}>
                Progress
              </span>
              <span style={{ fontSize: 9, fontFamily: 'Inter, monospace', color: D.bronze }}>
                {current + 1} / {steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* Step list + detail card side by side */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — step timeline (below card on mobile) */}
          <div style={{ position: 'relative' }} className="order-2 lg:order-1">
          {steps.map((step, i) => {
            const state = i < current ? 'done' : i === current ? 'active' : 'pending';
            return (
              <div
                key={step.tag}
                onClick={() => setCurrent(i)}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer', position: 'relative', paddingBottom: i < steps.length - 1 ? 0 : 0 }}
              >
                {/* Vertical connector line */}
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', left: 15, top: 32, bottom: 0, width: 1, backgroundColor: D.rule, zIndex: 0 }}>
                    {state === 'done' && (
                      <motion.div
                        style={{ width: '100%', backgroundColor: D.bronze, transformOrigin: 'top' }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </div>
                )}

                {/* Node */}
                <div style={{ flexShrink: 0, zIndex: 1 }}>
                  <div style={{
                    width: 32, height: 32,
                    border: `1px solid ${state === 'pending' ? D.rule : D.bronze}`,
                    backgroundColor: state === 'active' ? D.bronze : state === 'done' ? D.bronzeSubtle : D.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: 6,
                    transition: 'all 0.3s',
                  }}>
                    {state === 'done' && (
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path d="M2.5 7l3 3 6-6" stroke={D.bronze} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {state === 'active' && (
                      <motion.div
                        style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: D.bg }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                    )}
                    {state === 'pending' && (
                      <span style={{ fontSize: 9, fontFamily: 'Inter, monospace', color: D.faint }}>
                        {step.tag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: 28, paddingTop: 5 }}>
                  <p style={{ fontSize: 8, fontFamily: 'Inter, monospace', letterSpacing: '0.25em', color: D.bronze, textTransform: 'uppercase', marginBottom: 3 }}>
                    Step {step.tag}
                  </p>
                  <p style={{
                    fontSize: 14, fontWeight: state === 'active' ? 500 : 400,
                    color: state === 'pending' ? D.faint : state === 'done' ? D.muted : D.ink,
                    transition: 'color 0.3s',
                    textDecoration: state === 'done' ? 'line-through' : 'none',
                    textDecorationColor: D.rule,
                  }}>
                    {step.title}
                  </p>
                </div>

                {/* Done badge */}
                {state === 'done' && (
                  <div style={{ paddingTop: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 8, fontFamily: 'Inter, monospace', color: D.bronze, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6 }}>
                      Done
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          </div>{/* end left column */}

          {/* Right — animated detail card (above timeline on mobile) */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ border: `1px solid ${D.bronze}`, borderRadius: 8, backgroundColor: D.bronzeSubtle, padding: '2rem', boxShadow: 'var(--shadow-panel)' }}
              >
                <p style={{ fontSize: 10, fontFamily: 'Inter, monospace', letterSpacing: '0.25em', color: D.bronze, textTransform: 'uppercase', marginBottom: 8 }}>
                  Step {steps[current].tag} · Active
                </p>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: D.ink, marginBottom: 10 }}>
                  {steps[current].title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: D.muted, lineHeight: 1.7, marginBottom: 20 }}>
                  {steps[current].desc}
                </p>
                <div style={{ borderTop: `1px solid ${D.rule}`, paddingTop: 16 }}>
                  {steps[current].details.map((d) => (
                    <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${D.rule}` }}>
                      <span style={{ fontSize: 11, fontFamily: 'Inter, monospace', letterSpacing: '0.12em', color: D.faint, textTransform: 'uppercase' }}>
                        {d.label}
                      </span>
                      <span style={{ fontSize: 11, fontFamily: 'Inter, monospace', color: d.highlight ? D.green : D.muted }}>
                        {d.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Step counter dots */}
                <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
                  {steps.map((_, i) => (
                    <div key={i} onClick={() => setCurrent(i)} style={{
                      width: i === current ? 16 : 6, height: 6,
                      backgroundColor: i <= current ? D.bronze : D.rule,
                      borderRadius: 999,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>{/* end grid */}

        {/* Bottom note */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${D.rule}` }}>
          <p style={{ fontSize: 11, fontFamily: 'Inter, monospace', color: D.faint, lineHeight: 1.7 }}>
            <span style={{ color: D.bronze, marginRight: 8 }}>Note —</span>
            WIRROX coordinates provider-side onboarding on behalf of approved clients.
            The client-facing journey remains WIRROX-branded throughout.
          </p>
        </div>
      </div>
    </section>
  );
}
