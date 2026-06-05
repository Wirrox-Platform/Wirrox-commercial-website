import React from "react";
import Navbar from "../components/wirrox/Navbar";
import Footer from "../components/wirrox/Footer";
import CapabilitiesHero from "../components/capabilities/CapabilitiesHero";
import CapabilitiesGrid from "../components/capabilities/CapabilitiesGrid";
import ExtendedCapabilities from "../components/capabilities/ExtendedCapabilities";
import UseCaseMapping from "../components/capabilities/UseCaseMapping";
import Principles from "../components/capabilities/Principles";
import CapabilitiesCTA from "../components/capabilities/CapabilitiesCTA";

export default function Capabilities() {
  return (
    <div className="bg-canvas min-h-screen">
      <Navbar />
      <CapabilitiesHero />
      <CapabilitiesGrid />
      <ExtendedCapabilities />
      <UseCaseMapping />
      <Principles />
      <CapabilitiesCTA />
      <Footer />
    </div>
  );
}
