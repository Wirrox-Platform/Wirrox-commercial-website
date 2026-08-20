import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import BrandWordmark from "./BrandWordmark";
import { RequestAccessTrigger } from "./RequestAccessContext";
import { platformDestination } from "../../lib/platform-destination";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Capabilities", href: "/capabilities" },
    { label: "Compliance", id: "compliance" },
    { label: "Platform", id: "how-it-works" },
    { label: "Security", href: "/security" },
    { label: "For Businesses", href: "/for-businesses" },
    { label: "About", href: "/about" },
  ];

  const linkClass = "text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-ink transition-colors duration-300";

  return (
    <motion.nav
      className={`site-nav fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-all duration-500 ${
        scrolled
          ? "border-rule shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
          : "border-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center rounded-md focus-visible:outline-none"
            onClick={() => window.scrollTo(0, 0)}
            aria-label="WIRROX home"
          >
            <BrandWordmark className="w-[138px]" />
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-10">
            {navLinks.map((link) =>
              link.href ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => window.scrollTo(0, 0)}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ) : (
                <button key={link.id} onClick={() => scrollTo(link.id)} className={linkClass}>
                  {link.label}
                </button>
              )
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDark}
              className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-ink hover:bg-card transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <a
              href={platformDestination.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:block rounded-md text-[11px] font-mono uppercase tracking-[0.16em] px-5 py-2.5 border border-bronze text-bronze hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Login
            </a>
            <RequestAccessTrigger
              className="hidden xl:block rounded-md text-[11px] font-mono uppercase tracking-[0.16em] px-6 py-2.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
            </RequestAccessTrigger>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden flex flex-col gap-[5px] rounded-md p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`w-5 h-px bg-ink transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`w-5 h-px bg-ink transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`w-5 h-px bg-ink transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden overflow-hidden bg-card border-b border-rule shadow-panel"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) =>
                link.href ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => { setMobileOpen(false); window.scrollTo(0, 0); }}
                    className="block text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-ink transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
              <a
                href={platformDestination.loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md text-center text-[11px] font-mono uppercase tracking-[0.16em] px-6 py-3.5 border border-bronze text-bronze hover:bg-bronze hover:text-ink transition-colors duration-300"
              >
                Login
              </a>
              <RequestAccessTrigger
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md text-center text-[11px] font-mono uppercase tracking-[0.16em] px-6 py-3.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
              >
                Request Access
                <span className="mt-1 block text-[9px] normal-case tracking-normal opacity-70">
                  {platformDestination.statusLabel}
                </span>
              </RequestAccessTrigger>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
