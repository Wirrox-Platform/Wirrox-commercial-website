import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CapabilitiesCTA() {
  return (
    <section className="py-32 lg:py-40 border-t border-rule bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze mb-8">
            Get Started
          </p>
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12] mb-6">
            Access compliant financial
            <br />infrastructure for your business.
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-12 max-w-md">
            Submit your access request to begin structured onboarding. Our team reviews each
            application and coordinates provider-backed account access for approved clients.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://app.wirrox.com/request-access"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.2em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:support@wirrox.com"
              className="inline-block px-10 py-4 border border-rule text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
