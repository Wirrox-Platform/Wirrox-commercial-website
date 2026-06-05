import React from "react";
import { Link } from "react-router-dom";

const navCols = [
  {
    label: "Platform",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "For Businesses", href: "/for-businesses" },
      { label: "Security", href: "/security" },
      { label: "About", href: "/about" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "support@wirrox.com", href: "mailto:support@wirrox.com" },
      { label: "onboarding@wirrox.com", href: "mailto:onboarding@wirrox.com" },
      { label: "compliance@wirrox.com", href: "mailto:compliance@wirrox.com" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Compliance Notice", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-canvas py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-baseline gap-0 mb-4">
              <span className="text-sm font-black tracking-[0.22em] text-ink">WIRROX</span>
              <span className="text-sm font-black text-bronze">.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-[1.7] max-w-xs mb-6">
              Compliance-first financial infrastructure for global B2B payment operations.
            </p>
            <a
              href="https://app.wirrox.com/request-access"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-5 py-2.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
            </a>
          </div>

          {/* Nav cols */}
          {navCols.map((col) => (
            <div key={col.label}>
              <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-5">
                {col.label}
              </p>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith("/") ? (
                      <Link
                        to={item.href}
                        onClick={() => window.scrollTo(0, 0)}
                        className="text-sm text-muted-foreground hover:text-ink transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-ink transition-colors duration-200 break-all"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance notice */}
        <div className="border border-rule p-5 mb-10 bg-canvas">
          <p className="text-[11px] font-mono text-muted-foreground leading-[1.75]">
            <span className="text-bronze uppercase tracking-[0.18em] mr-2">Notice:</span>
            WIRROX operates as a technology infrastructure provider. It does not hold client funds,
            execute regulated payments, or provide financial services directly. Final regulated services
            are performed by licensed providers where applicable. WIRROX is not a bank, payment institution,
            or investment firm.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-rule pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} WIRROX. All rights reserved.
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Financial Infrastructure Provider
          </p>
        </div>
      </div>
    </footer>
  );
}
