import React from "react";
import { Link } from "react-router-dom";
import BrandWordmark from "./BrandWordmark";
import { RequestAccessTrigger } from "./RequestAccessContext";

const navCols = [
  {
    label: "Platform",
    links: [
      { label: "Capabilities", href: "/capabilities" },
      { label: "For Businesses", href: "/for-businesses" },
      { label: "Security", href: "/security" },
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
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
      { label: "Website information", href: "/legal" },
      { label: "Privacy Notice", href: "/legal/privacy-notice" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
      { label: "Company Information", href: "/legal/legal-notice" },
      { label: "Partner Privacy", href: "/partners/privacy" },
      { label: "Partner Agreement", href: "/partners/terms" },
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
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex rounded-md mb-4"
              aria-label="WIRROX home"
            >
              <BrandWordmark className="w-[138px]" />
            </Link>
            <p className="text-sm text-muted-foreground leading-[1.7] max-w-xs mb-6">
              WIRROX is operated by Swiss Fintech Forum AG, Zug, Switzerland.
              Technology and operational access for business clients.
            </p>
            <RequestAccessTrigger
              className="inline-block rounded-md text-[10px] font-mono uppercase tracking-[0.18em] px-5 py-2.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
            </RequestAccessTrigger>

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
        <div className="border border-rule rounded-lg p-5 mb-10 bg-card shadow-panel">
          <p className="text-[11px] font-mono text-muted-foreground leading-[1.75]">
            <span className="text-bronze uppercase tracking-[0.18em] mr-2">Notice:</span>
            Swiss Fintech Forum AG supplies the interface, onboarding coordination and support.
            Underlying financial services are supplied by the relevant third-party providers,
            subject to their requirements and approval. SFF does not itself hold or safeguard
            client funds, provide bank accounts, execute payments or act as the FX counterparty
            under this service model. Dashboard balances reflect provider information, not
            deposits with SFF. Provider involvement does not remove SFF's own responsibilities.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-rule pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Swiss Fintech Forum AG · CHE-406.093.019
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
            Gubelstrasse 24 · 6300 Zug · Switzerland
          </p>
        </div>
      </div>
    </footer>
  );
}
