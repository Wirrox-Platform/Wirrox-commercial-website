# WIRROX Website — Deployment Guide

Partner Program changes are a closed-by-default pre-release. See
[partner build and environment instructions](docs/partner-program.md). Use
`[CF-Pages-Skip]` on feature commits while deployment is not authorized; the current
Pages project automatically deploys previews from all branches. Partner Functions
and environment values were not deployed/configured by this implementation.

## Local Development

```bash
# Install dependencies (first time or after package.json changes)
npm install

# Start local dev server
npm run dev
# → Opens at http://localhost:5173
```

## Production Build

```bash
npm run build
# Output: dist/ folder

# Preview the production build locally
npm run preview
```

## Cloudflare Pages Deployment

### Option A — Git-connected (Recommended)

1. Push the project to a GitHub or GitLab repository.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → Create a project → Connect to Git.
3. Select your repository.
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 18 or higher (set in Environment Variables: `NODE_VERSION = 18`)
5. Deploy.

Every push to the main branch will trigger a new deployment automatically.

### Option B — Direct Upload

```bash
npm run build
```

Then drag and drop the `dist/` folder into Cloudflare Pages → Upload assets.

### SPA Routing

The `public/_redirects` file is already configured:
```
/* /index.html 200
```

This ensures all routes (e.g. `/capabilities`, `/security`) are correctly handled by the React router on Cloudflare Pages.

## Environment Variables

The application and login destinations are environment-aware.

| Variable | Values | Behavior |
|---|---|---|
| `VITE_WIRROX_APP_ENV` | `auto` (default), `sandbox`, `production` | Selects the WIRROX application destination |

With `auto`, `wirrox.com` and `www.wirrox.com` resolve to production. Localhost,
Cloudflare `*.pages.dev` previews, and other preview hosts resolve to sandbox.
Set the variable explicitly when a deployment uses a custom hostname.

## Public access enquiries

Platform onboarding remains invitation-only. Before enabling the website form, enable
`accessEnquiryIntakeEnabled` in the target CRM and verify the CRM job runner and
approved mail transport. Use the existing partner site-origin, CRM environment,
server-only gateway secret and Turnstile bindings. Then set
`WIRROX_ACCESS_ENQUIRY_ENABLED=true` on the website. Both feature flags default to
disabled.

Review incoming enquiries under **CRM → Leads**. The Lead includes the applicant’s
contact details and any referral code for review. The onboarding mailbox receives
a link to the Lead. Staff send the invitation and application details separately.

## Key URLs

| Purpose | URL |
|---------|-----|
| Preview / sandbox Request Access | https://sandbox.app.wirrox.com/request-access |
| Production Request Access (invitation-only) | https://app.wirrox.com/request-access |
| General support | support@wirrox.com |
| Onboarding | onboarding@wirrox.com |
| Compliance | compliance@wirrox.com |

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/capabilities` | Capabilities |
| `/security` | Security |
| `/about` | About / Infrastructure |
| `/for-businesses` | For Businesses |
