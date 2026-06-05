import React from "react";
import Navbar from "../components/wirrox/Navbar";
import ScrollProgress from "../components/wirrox/ScrollProgress";
import Hero from "../components/wirrox/Hero";
import WhatWeDo from "../components/wirrox/WhatWeDo";
import HowItWorks from "../components/wirrox/HowItWorks";
import WhyWirrox from "../components/wirrox/WhyWirrox";
import Compliance from "../components/wirrox/Compliance";
import UseCases from "../components/wirrox/UseCases";
import CTASection from "../components/wirrox/CTASection";
import Footer from "../components/wirrox/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <ScrollProgress />

      <main>
        <Hero />
        <WhatWeDo />
        <HowItWorks />
        <WhyWirrox />
        <Compliance />
        <UseCases />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
