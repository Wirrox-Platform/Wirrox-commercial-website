# Partner Program build — 2026-10-26

## Source and delivery boundary

Based on main `6071c0a5dbf39be7020bb5f1b3f6b5e2267863a5`. The existing commercial
repository was retrieved through the connected GitHub app into a separate local
working directory. All 119 text files and four public font/icon files were recovered;
the four public assets match the Git blob hashes exactly. The unused root Favicon.png
was not retrievable as text; it remains preserved in the upstream tree. Local initial
snapshot history differs from upstream; publication uses an upstream-based Git tree,
not an unrelated-history push. No treasury or CRM code is copied into this repository.

Read-only Cloudflare metadata confirmed the existing project wirrox-commercial-website,
domain www.wirrox.com, production branch main, and automatic preview deployments for
all branches. No configuration was changed. Every published feature commit must start
with `[CF-Pages-Skip]` so Pages omits the deployment. Create the feature ref directly
at that skipped commit, rather than first creating a branch at an ordinary main commit.
Do not merge/deploy or change branch controls without explicit approval.
Cloudflare reference: https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message

Publication readback confirmed `is_skipped: true`, `skip_reason: commit_message` for
feature/partner-program. The production deployment remained the successful
2026-10-20 deployment. Those recent live/preview deployment records have no Git
commit hash; the named privacy-review branch is not present in GitHub. This does
not establish what code changed, but it prevents attesting live/source parity.
Reconcile the live source before merging/releasing this main-based PR.

## Implemented

* /partners: branded program explanation, application and invited-login entry,
  steps, partner fit and statement expectations. No draft rates or timing promises.
* /partners/apply: separate application, current notice, bounded fields, challenge,
  neutral duplicate-safe confirmation. No payout data and no customer Request Access change.
* /partners/verify: opaque fragment token, removed from address history after load,
  explicit POST confirmation, expired/error states. GET never consumes the token.
* /partners/introduction: explicit referral code from ?partner=... or typed input,
  business introduction, separate customer-onboarding notice, stable per-attempt ID
  persisted in sessionStorage across reloads. No contact information/code is stored
  in browser storage. With storage disabled the ID survives only the current page;
  staff must reconcile any resubmitted introduction after an uncertain reload.
* Pages Functions: narrow same-origin JSON endpoints under /api/partners/*; server-only
  configured CRM destination and optional dedicated evidence API credential. Applications
  and email verification never need an administrator key.
* Nonlocal submissions require server-validated Turnstile hostname and action. Origin,
  payload type, streaming byte limits, honeypot, field allowlists, bounded upstream
  results, timeout, no redirects/retries, generic errors and no-store/referrer headers.
* Unknown/unconfigured environments fail closed. Preview/local hosts cannot use the
  known live CRM. Login exists only for an explicitly configured native Portal URL.
* Partner navigation in the existing header/footer. Current customer onboarding/login
  destinations and invitation-only gate remain unchanged.

The CRM native extension is maintained separately in Wirrox-Platform/wirrox-crm,
draft PR https://github.com/Wirrox-Platform/wirrox-crm/pull/1. It owns membership,
approval, invitation, agreement/MFA, attribution, financial statements and payouts.

## Configuration (not applied to any hosted environment)

| Server-side value | Purpose |
|---|---|
| PARTNER_PROGRAM_ENABLED | Exact string true to enable; absent means closed |
| PARTNER_TARGET_ENVIRONMENT | local, sandbox or production; must match the serving hostname |
| PARTNER_SITE_ORIGIN | Exact serving origin, including scheme and port |
| PARTNER_CRM_ORIGIN | Explicit CRM origin, no path/query/credentials; HTTPS outside local tests |
| PARTNER_NOTICE_VERSION / PARTNER_NOTICE_TEXT | Approved public application/privacy notice; version must match CRM affiliateNoticeVersion |
| PARTNER_EMAIL_READY | Exact true only after native delivery is configured and tested |
| PARTNER_PORTAL_URL | Actual URL returned by the native Portal, with /portal/ path; no invented partner subdomain |
| PARTNER_TURNSTILE_SITE_KEY | Public widget key, scoped to approved hostnames |
| PARTNER_TURNSTILE_SECRET | Secret server-side validation key |
| PARTNER_INTAKE_API_KEY | Secret dedicated CRM API-user key for introduction-evidence only |
| PARTNER_LOCAL_TEST | Loopback-only test bypass; never effective on deployed hosts |

Set the CRM's affiliateWebsiteIntakeUserId and affiliateWebsiteIntakeEnabled only in
the authorized environment. The configured API user must have no generic CRM access;
the endpoint explicitly checks the dedicated user ID and API type. No administrator
key or secret belongs in a VITE_ variable, browser bundle, committed env file or chat.
Configure CRM affiliateProspectUrl to the approved site /partners/introduction URL
after deployment so native partners can copy a tracked link as well as their code.

No Turnstile widget or secret was created. Widget provisioning, Pages runtime settings,
approved notices, native portal URL and external mail are release work requiring
the specific hosted actions to be approved. Cloudflare types were inspected at
@cloudflare/workers-types 5.20261026.1; the handler uses Web APIs without Node dependencies.
Set/verify compatibility date 2026-10-26 in the approved Functions environment and
apply the edge rate/abuse policy before external launch. Do not enable solely because
the client-side widget renders; native CRM counters are an additional conservative cap.

## Local verification

```
npm ci --ignore-scripts
npm test
npm run lint
npm run build
npm run preview:partners
```

Actual results: build and full repository lint pass; 26 tests pass (20 new partner
adapter/input tests, 6 existing destination tests). Verified request tampering,
preview/live isolation, credential placement, challenge validation, verification
POST-only consumption, error redaction, byte limits, explicit code capture and
stable retry identity. Gitleaks source scan is run before publication.

Browser QA: desktop landing and application; synthetic application submission and
email-verification confirmation against the mock CRM; mobile 390x844 landing/form
and no horizontal overflow. Confirmation receives focus and scrolls into view.
The local preview binds only http://127.0.0.1:5173 and never calls real CRM, email,
Turnstile or hosted services. Its synthetic verification link prints in the local
terminal. All preview data is in memory and must be invented. This is UI/adapter
verification, not a real EspoCRM end-to-end test.

The inherited Browserslist data-age warning does not fail the build; the lockfile
was preserved rather than mixing an unrelated dependency update into this feature.
The Pages Function itself has unit/adapter coverage but has not run in workerd or
a hosted Pages deployment. Native EspoCRM Docker installation, full API/UI permissions,
MFA/invitation concurrency and restore acceptance remain separate CRM release gates.

## Release review

Keep monthly finance review and payment evidence manual. Finalize commercial terms,
attribution/existing-opportunity rules and privacy/retention text before enabling
applications. Configure sandbox-only CRM, mail and challenge values for an explicitly
approved hosted preview, then run the full native two-affiliate scenarios. Verify
Functions routing alongside the existing static redirects. Only after acceptance
and explicit approval should the production site and CRM be configured/released.
Never infer deployment approval from a Git commit, PR or the word pilot.
