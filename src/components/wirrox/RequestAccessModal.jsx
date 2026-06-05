import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

export default function RequestAccessModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/20 backdrop-blur-[3px]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md mx-5 bg-white border border-rule shadow-[0_8px_48px_rgba(0,0,0,0.1)] p-8 lg:p-12"
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze mb-4">
              Request Access
            </p>
            <h3 className="text-xl font-semibold text-ink mb-3">
              Get started with WIRROX
            </h3>
            <p className="text-sm text-muted-foreground mb-10 leading-[1.7]">
              Submit your access request through the WIRROX platform. Our team will
              review your application and respond within two business days.
            </p>

            <a
              href="https://app.wirrox.com/request-access"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.22em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              Continue to Application
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <p className="mt-6 text-[11px] font-mono text-muted-foreground/60 text-center leading-[1.6]">
              You will be redirected to app.wirrox.com
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
