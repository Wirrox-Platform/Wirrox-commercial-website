import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/95 backdrop-blur-md border-b border-rule"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-baseline group" onClick={() => window.scrollTo(0, 0)}>
            <span className="text-[18px] font-black tracking-[0.08em] text-ink">WIRROX</span>
            <span className="text-[18px] font-black text-bronze leading-none mb-[-1px]">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-10">
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
              className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-ink transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
            <a
              href="https://app.wirrox.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-[11px] font-mono uppercase tracking-[0.18em] px-5 py-2.5 border border-rule text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
            >
              Login
            </a>
            <a
              href="https://app.wirrox.com/request-access"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block text-[11px] font-mono uppercase tracking-[0.18em] px-6 py-2.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-[5px] p-1"
              aria-label="Toggle menu"
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
            className="lg:hidden overflow-hidden bg-canvas border-b border-rule"
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
                href="https://app.wirrox.com/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-[11px] font-mono uppercase tracking-[0.18em] px-6 py-3.5 border border-rule text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
              >
                Login
              </a>
              <a
                href="https://app.wirrox.com/request-access"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center text-[11px] font-mono uppercase tracking-[0.18em] px-6 py-3.5 bg-ink text-canvas hover:bg-bronze hover:text-ink transition-colors duration-300"
              >
                Request Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
