import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RequestAccessTrigger } from "./RequestAccessContext";
import { platformDestination } from "../../lib/platform-destination";

export default function CTASection() {
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
            Ready to build on compliant
            <br />financial infrastructure?
          </h2>
          <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-12 max-w-md">
            Submit an access request to begin structured onboarding. Our team reviews
            each application and coordinates provider access for approved businesses.
          </p>

          <div className="flex flex-wrap gap-4">
            <RequestAccessTrigger
              className="inline-flex items-center gap-2 rounded-md px-10 py-4 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.18em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Request Access
              <ArrowUpRight className="w-3.5 h-3.5" />
            </RequestAccessTrigger>
            <a
              href="mailto:support@wirrox.com"
              className="inline-block rounded-md px-10 py-4 border border-rule bg-card text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-ink hover:border-ink/20 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
            {platformDestination.statusLabel}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
