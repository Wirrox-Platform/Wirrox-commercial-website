# Commercial site brand alignment plan

## Scope and safety boundary

- Align the existing commercial site with WIRROX Brand Identity Workbook v1.6 and the current Treasury light-theme hierarchy.
- Keep the change limited to public-site presentation and Request Access routing.
- Do not change the WIRROX platform, provider behavior, production configuration, or onboarding approval gates.
- Production remains invitation-only. Preview and local builds route Request Access to the sandbox application.

## Design direction

Subject: WIRROX financial infrastructure for compliance-led B2B operators. The page's single job is to explain the infrastructure clearly enough that a qualified business can decide to request reviewed access.

### Token system

- Page canvas: `#EEF1F4` - neutral off-white, matching the current client workspace.
- Surface: `#FFFFFF` - navigation, cards, modal, and primary content panels.
- Secondary surface: `#F8FAFC` - quiet diagrams and nested information.
- Divider: `#D7DCE2` - visible without creating a boxed-in grid.
- Ink: `#0F0F0F` - workbook primary text and logo color.
- Amber: `#C9A96E` - workbook signature, reserved for emphasis and status.

Typography uses the supplied Inter Regular asset for readable interface and long-form copy. The supplied official SVG wordmarks retain the approved ExtraBold construction; the site does not rebuild the wordmark from text. Utility labels use Inter with controlled tracking rather than a separate monospace family.

### Layout concept

The existing editorial rhythm remains, but grouped information becomes a hierarchy of page canvas, white surfaces, and secondary nested surfaces.

```text
+----------------------------------------------------------+
| official wordmark       navigation       access controls |
+----------------------------------------------------------+
| compliance-led hero                                      |
| headline + copy             quiet operational grid       |
| [Request Access] [Login]                                  |
| environment / access-status disclosure                   |
+----------------------------------------------------------+
| white section surface                                    |
|   +------------------+   +------------------+             |
|   | 8px content card |   | 8px content card |             |
|   +------------------+   +------------------+             |
+----------------------------------------------------------+
```

Cards and grouped panels use an 8px radius and subtle panel shadow. Buttons, inputs, compact icon controls, and status treatments use a 6px radius. Shared grids keep internal dividers square while the containing surface carries the radius.

### Signature element

The memorable detail is a controlled-access handoff: every Request Access entry opens one environment-aware modal with a restrained amber status line. It makes the compliance boundary and destination visible without turning the site into a dashboard or adding decorative effects.

### Self-critique before build

The first direction risked applying rounded corners to every divider and small decorative mark. That would feel mechanically softened and weaken the site's operational structure. The revised direction rounds only interactive controls and containing surfaces; inner rules remain precise. Motion stays limited to the site's existing entrance choreography and the access modal, with reduced-motion support added globally.

## Request Access contract

| Context | Resolved destination | Visible gate copy |
| --- | --- | --- |
| `VITE_WIRROX_APP_ENV=sandbox` | `https://sandbox.app.wirrox.com/request-access` | Sandbox test environment; no production account is opened |
| `VITE_WIRROX_APP_ENV=production` | `https://app.wirrox.com/request-access` | Production access remains invitation-only |
| Auto on `wirrox.com` / `www.wirrox.com` | Production | Production access remains invitation-only |
| Auto on localhost, `*.pages.dev`, or other preview hosts | Sandbox | Sandbox test environment |

The environment resolver is covered by unit tests. All public Request Access entry points use the shared trigger and modal; source-level tests prevent hardcoded CTA destinations from returning.

## Validation matrix

- Static: lint, unit tests, production build.
- Routes: home, capabilities, security, about, and for-businesses.
- Viewports: desktop and mobile.
- Themes: light and dark.
- Request Access: header, hero, mobile navigation, page CTAs, footer, and modal destination/copy.
- Accessibility basics: keyboard focus, dialog semantics, Escape close, body scroll lock, reduced motion, and contrast inspection.
