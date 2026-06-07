import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/wirrox/Navbar";
import Footer from "../components/wirrox/Footer";
import SectionLabel from "../components/wirrox/SectionLabel";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
});


export default function About() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-28 bg-canvas border-b border-rule overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 bottom-0 left-1/4 w-px bg-rule/45" />
          <div className="absolute top-0 bottom-0 left-2/4 w-px bg-rule/45" />
          <div className="absolute top-0 bottom-0 left-3/4 w-px bg-rule/45" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
          <motion.p
            className="text-[10px] font-mono uppercase tracking-[0.4em] text-bronze mb-10"
            {...fadeUp(0.1)}
          >
            About WIRROX
          </motion.p>
          <motion.h1
            className="text-[clamp(2.2rem,6vw,5rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.06] max-w-3xl mb-6"
            {...fadeUp(0.25)}
          >
            Financial technology<br />
            <span className="text-muted-foreground font-light">infrastructure platform</span>
          </motion.h1>
          <motion.p
            className="text-[1.0625rem] text-muted-foreground leading-[1.75] font-light max-w-lg"
            {...fadeUp(0.4)}
          >
            WIRROX is built as a B2B financial technology infrastructure platform — designed
            to connect businesses to licensed financial services through a compliance-first
            onboarding layer and structured operational workflows.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 lg:py-40 border-b border-rule bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
            <div>
              <SectionLabel label="What We Do" />
              <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-semibold tracking-[-0.02em] text-ink leading-[1.12] mb-7">
                Infrastructure, not a product
              </h2>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.75] mb-6">
                WIRROX is not a bank, payment institution, or consumer financial product.
                It is a technology infrastructure platform that connects B2B clients to
                licensed financial providers through a structured onboarding and operational
                access layer.
              </p>
              <p className="text-[0.9375rem] text-muted-foreground leading-[1.75]">
                The platform manages the compliance review process, coordinates provider
                onboarding, and provides the operational dashboard through which approved
                clients manage accounts, payouts, FX, and reporting.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "B2B-only",
                  body: "WIRROX serves businesses — fintech platforms, payment companies, global operators, and digital asset businesses. It is not designed for individual consumer use.",
                },
                {
                  title: "Provider-backed",
                  body: "Account opening, payment execution, and FX are performed by licensed financial providers. WIRROX manages access to these services, not the services themselves.",
                },
                {
                  title: "Compliance-first",
                  body: "Every client goes through a structured review process before accessing any operational feature. There is no self-service account opening without compliance approval.",
                },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-bronze pl-6">
                  <h3 className="text-[0.9375rem] font-medium text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 bg-white border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-3 gap-10">
            {[
              { label: "General Enquiries", email: "support@wirrox.com" },
              { label: "Onboarding", email: "onboarding@wirrox.com" },
              { label: "Compliance", email: "compliance@wirrox.com" },
            ].map((contact) => (
              <div key={contact.label} className="border border-rule p-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-bronze mb-4">
                  {contact.label}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm font-medium text-ink hover:text-bronze transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
