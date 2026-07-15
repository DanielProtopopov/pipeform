# Plan: Form API SaaS Landing Page

## Context
Build a complete landing page for a form submission API SaaS product — not yet launched. The page must communicate the value proposition, showcase 10 researched features drawn from competitor analysis, and capture early interest via a waitlist form (email + feature-interest checkboxes).

---

## Aesthetic Direction

**Stance:** Minimalist-technical — dark canvas, tight typography, generous whitespace, single electric accent. Developer-tool credibility without being cold.

**Palette (dark ground):**
- Background: `#08080E` (near-black, slight blue cast)
- Foreground: `#F0F0F5`
- Card: `#111118`
- Primary (accent): `#A3E635` (acid lime — uncommon, energetic, legible on dark)
- Muted foreground: `#6B6B80`
- Border: `rgba(255,255,255,0.08)`

**Fonts (Google Fonts):**
- Display headings: **Bricolage Grotesque** — wide, expressive grotesque; not overused
- Body/UI: **Figtree** — friendly, clean sans
- Code/labels: **JetBrains Mono** — for snippets and technical badges

**Canvas treatment:** Solid dark ground. Thin lime accent lines used sparingly as structural dividers. No gradient hero blobs.

---

## Page Sections

### 1. Nav
- Logo (text mark: "FormPipe" or similar placeholder — user can rename)
- Navigation anchors: Features, How it works, Waitlist
- CTA button: "Join Waitlist" → scrolls to form

### 2. Hero
- Large Bricolage Grotesque headline: "Form submissions, handled."
- Sub-headline: "Drop a single API endpoint into any HTML form. No server, no config."
- Inline code snippet showing the integration (one `<form action>` line)
- Two CTAs: "Join Waitlist" + "See Features ↓"
- Small social proof line: "Researched by 200+ developers"

### 3. How It Works (3 steps)
- Step 1: Add your form endpoint
- Step 2: Submissions arrive in your dashboard
- Step 3: Get notified and integrate with your stack
- Numbered with JetBrains Mono labels

### 4. Features Grid (10 features)
Drawn from competitor research (StaticForms, Formspree, Web3Forms, Forminit, APIForms, Formbricks):

| # | Feature | Description |
|---|---------|-------------|
| 1 | Email Notifications | Instant submission alerts to your inbox with customizable templates |
| 2 | Spam Protection | reCAPTCHA v3, hCaptcha, Cloudflare Turnstile, and honeypot fields |
| 3 | File Uploads | Accept attachments up to 25 MB with encrypted storage |
| 4 | Webhooks | Real-time JSON forwarding to any endpoint with automatic retry on failure |
| 5 | Third-party Integrations | Native connectors for Slack, Discord, Zapier, Make, and Google Sheets |
| 6 | Submission Dashboard | Search, filter, star, annotate, and export submissions as CSV |
| 7 | Custom Redirects & Autoresponders | Post-submit redirect URLs and branded confirmation emails |
| 8 | GDPR Compliance | Data export/deletion, consent tracking, and IP anonymization |
| 9 | Multi-framework Support | Works with React, Next.js, Vue, Svelte, Webflow, or plain HTML |
| 10 | Form Analytics | Track submission volume, UTM attribution, device breakdown, and ad click IDs |

Layout: asymmetric 2-column grid on desktop, single column on mobile. Cards with thin border, hover lift.

### 5. Waitlist / Interest Form
- Section heading: "Be first to know"
- Email input (required)
- Checkbox group: one per feature (all 10), labeled "What matters most to you?"
- Submit button: "Notify me when we launch"
- Success state: inline confirmation message (no page reload)
- React state: `useState` for email, checked features, submitted flag

### 6. Footer
- Logo + tagline
- Copyright line
- Link placeholders: Privacy, Terms

---

## Files to Modify

| File | Change |
|------|--------|
| `src/styles/theme.css` | Update `:root` tokens to dark-ground palette; preserve `.dark` block and `@theme inline` |
| `src/styles/fonts.css` | Add Google Fonts import for Bricolage Grotesque, Figtree, JetBrains Mono |
| `src/app/App.tsx` | Replace placeholder with full landing page component |

---

## Implementation Notes

- All in one `App.tsx` file. No routing needed.
- Use `useState` for the waitlist form (email value, checked feature IDs, submitted state).
- Use Tailwind utility classes only — no inline styles.
- Lucide icons for feature cards (e.g. `Mail`, `ShieldCheck`, `Upload`, `Webhook`, `Plug`, `LayoutDashboard`, `CornerDownRight`, `Lock`, `Code2`, `BarChart2`).
- Smooth scroll via `scroll-behavior: smooth` on `html`.
- Responsive: single-column below ~768px for features grid and form.
- Hover transitions: `transition-all duration-200` on cards and buttons.
- No external fetch — form is purely UI (waitlist API integration is out of scope).

---

## Verification

1. All 10 features render in the grid with icons and descriptions.
2. Waitlist form: email field validates (HTML `required` + `type="email"`), all 10 checkboxes render, submit shows success message.
3. Nav CTA scrolls to waitlist section.
4. Page is readable and well-composed on both wide (1280px+) and narrow (375px) viewports.
5. No TypeScript errors (all imports used, all JSX closed).
