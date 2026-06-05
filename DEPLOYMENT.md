# WIRROX Website — Deployment Guide

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

No environment variables are required for the commercial website. The site is fully static.

## Key URLs

| Purpose | URL |
|---------|-----|
| Request Access CTA | https://app.wirrox.com/request-access |
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
