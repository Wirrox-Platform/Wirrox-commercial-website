import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { platformDestination } from "../../lib/platform-destination";

export default function RequestAccessModal({ open, onClose }) {
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  const isProduction = platformDestination.environment === "production";

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
            className="relative w-full max-w-md mx-5 bg-white border border-rule rounded-lg shadow-pop p-8 lg:p-12"
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-access-title"
            aria-describedby="request-access-description"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-ink hover:bg-canvas transition-colors"
              aria-label="Close Request Access dialog"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-bronze mb-4">
              Request Access
            </p>
            <h3 id="request-access-title" className="text-xl font-semibold text-ink mb-3">
              {platformDestination.modalTitle}
            </h3>
            <p
              id="request-access-description"
              className="text-sm text-muted-foreground mb-6 leading-[1.7]"
            >
              {platformDestination.modalDescription}
            </p>

            <div className="mb-8 rounded-md border border-rule bg-canvas px-4 py-3">
              <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
                {platformDestination.statusLabel}
              </p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Destination: {platformDestination.hostLabel}
              </p>
            </div>

            <a
              href={platformDestination.requestAccessUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              data-platform-environment={platformDestination.environment}
              data-access-mode={platformDestination.accessMode}
              className="flex items-center justify-center gap-2 w-full rounded-md py-4 bg-ink text-canvas text-[11px] font-mono uppercase tracking-[0.18em] hover:bg-bronze hover:text-ink transition-colors duration-300"
            >
              {isProduction ? "Continue to Request" : "Continue to Sandbox"}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <p className="mt-6 text-[11px] text-muted-foreground text-center leading-[1.6]">
              Opens the WIRROX application in a new tab.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
