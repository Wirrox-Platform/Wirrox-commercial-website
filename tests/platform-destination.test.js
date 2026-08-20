import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolvePlatformDestination } from "../src/lib/platform-destination.js";

test("explicit sandbox configuration resolves the sandbox application", () => {
  const destination = resolvePlatformDestination({
    configuredEnvironment: "sandbox",
    hostname: "www.wirrox.com",
  });

  assert.equal(destination.environment, "sandbox");
  assert.equal(destination.requestAccessUrl, "https://sandbox.app.wirrox.com/request-access");
  assert.equal(destination.accessMode, "sandbox-review");
  assert.equal(destination.resolution, "configuration");
});

test("explicit production configuration preserves the invitation-only gate", () => {
  const destination = resolvePlatformDestination({
    configuredEnvironment: "production",
    hostname: "preview.example.com",
  });

  assert.equal(destination.environment, "production");
  assert.equal(destination.requestAccessUrl, "https://app.wirrox.com/request-access");
  assert.equal(destination.accessMode, "invitation-only");
  assert.match(destination.modalDescription, /invitation-only/);
});

test("auto uses production only on canonical commercial-site hosts", () => {
  for (const hostname of ["wirrox.com", "www.wirrox.com"]) {
    assert.equal(
      resolvePlatformDestination({ configuredEnvironment: "auto", hostname }).environment,
      "production",
    );
  }
});

test("auto routes local and Cloudflare preview hosts to sandbox", () => {
  for (const hostname of ["localhost", "wirrox-commercial.pages.dev", "preview.wirrox.dev"]) {
    assert.equal(
      resolvePlatformDestination({ configuredEnvironment: "auto", hostname }).environment,
      "sandbox",
    );
  }
});

test("invalid environment configuration fails visibly", () => {
  assert.throws(
    () => resolvePlatformDestination({ configuredEnvironment: "staging", hostname: "localhost" }),
    /Use auto, sandbox, or production/,
  );
});

test("public Request Access entry points do not hardcode a platform destination", async () => {
  const entryPoints = [
    "src/components/wirrox/Navbar.jsx",
    "src/components/wirrox/Hero.jsx",
    "src/components/wirrox/CTASection.jsx",
    "src/components/wirrox/Footer.jsx",
    "src/components/capabilities/CapabilitiesHero.jsx",
    "src/components/capabilities/CapabilitiesCTA.jsx",
    "src/pages/ForBusinesses.jsx",
  ];

  for (const entryPoint of entryPoints) {
    const source = await readFile(new URL(`../${entryPoint}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /https:\/\/(?:sandbox\.)?app\.wirrox\.com\/request-access/);
  }
});
