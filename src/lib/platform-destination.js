const DESTINATIONS = Object.freeze({
  sandbox: Object.freeze({
    environment: "sandbox",
    baseUrl: "https://sandbox.app.wirrox.com",
    requestAccessUrl: "https://sandbox.app.wirrox.com/request-access",
    loginUrl: "https://sandbox.app.wirrox.com/login",
    hostLabel: "sandbox.app.wirrox.com",
    accessMode: "sandbox-review",
    statusLabel: "Sandbox onboarding",
    modalTitle: "Continue to sandbox onboarding",
    modalDescription:
      "This preview sends access requests to the WIRROX sandbox for test onboarding. It does not open or change a production account.",
  }),
  production: Object.freeze({
    environment: "production",
    baseUrl: "https://app.wirrox.com",
    requestAccessUrl: "https://app.wirrox.com/request-access",
    loginUrl: "https://app.wirrox.com/login",
    hostLabel: "app.wirrox.com",
    accessMode: "invitation-only",
    statusLabel: "Production access · Invitation only",
    modalTitle: "Request reviewed production access",
    modalDescription:
      "Production onboarding remains invitation-only. Submitting a request starts WIRROX compliance review; it does not automatically open or activate an account.",
  }),
});

const PRODUCTION_HOSTS = new Set(["wirrox.com", "www.wirrox.com"]);
const VALID_ENVIRONMENTS = new Set(["auto", "sandbox", "production"]);

function normalizeEnvironment(value) {
  const environment = String(value || "auto").trim().toLowerCase();

  if (!VALID_ENVIRONMENTS.has(environment)) {
    throw new TypeError(
      `Unsupported VITE_WIRROX_APP_ENV "${value}". Use auto, sandbox, or production.`,
    );
  }

  return environment;
}

export function resolvePlatformDestination({
  configuredEnvironment = "auto",
  hostname = "",
} = {}) {
  const requestedEnvironment = normalizeEnvironment(configuredEnvironment);
  const normalizedHostname = String(hostname).trim().toLowerCase();
  const environment =
    requestedEnvironment === "auto"
      ? PRODUCTION_HOSTS.has(normalizedHostname)
        ? "production"
        : "sandbox"
      : requestedEnvironment;

  return Object.freeze({
    ...DESTINATIONS[environment],
    resolution: requestedEnvironment === "auto" ? "hostname" : "configuration",
  });
}

export function resolveCurrentPlatformDestination() {
  return resolvePlatformDestination({
    configuredEnvironment: import.meta.env?.VITE_WIRROX_APP_ENV || "auto",
    hostname: typeof window === "undefined" ? "" : window.location.hostname,
  });
}

export const platformDestination = resolveCurrentPlatformDestination();
