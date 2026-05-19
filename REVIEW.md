# REVIEW.md

## Scope
Review date: 2026-05-19  
Project type: Vue 3 static site (portfolio + contact form)  
Method: codebase audit + dependency audit (`npm audit --package-lock-only --json`)

## Executive Summary
- The site is clean and understandable, but has security and maintainability gaps that should be addressed before adding new functionality.
- Highest remaining risks are dependency vulnerabilities in legacy Vue CLI toolchain and the client-only contact architecture.

## Findings (Prioritized)

### High
1. Dependency vulnerability exposure is significant.
- Evidence (after fixes): `npm audit` reports `45` vulnerabilities total (`0 critical`, `25 high`, `16 moderate`, `4 low`).
- `axios` was upgraded to `^1.16.0` in [package.json](./package.json), which removed the direct axios advisory set from this project.
- Dev toolchain (`@vue/cli-service` and related packages) also carries multiple high/moderate issues.
- Impact: supply-chain and build/runtime risk; future maintenance friction.

2. Contact anti-spam and abuse controls are weak.
- `g-recaptcha-response` is still validated only client-side; there is no server-side verification under your control.
- The form now includes a honeypot and configurable FormSubmit captcha toggle, but it still posts directly from browser to third party: [src/components/forms/ContactForm.vue](./src/components/forms/ContactForm.vue).
- Impact: spam/abuse risk, unreliable protection assumptions.

3. External third-party assets/scripts are loaded without integrity pinning.
- CDN CSS in [public/index.html:11](./public/index.html#L11).
- Google Fonts/Font CDN dependencies in [public/index.html:12](./public/index.html#L12).
- Dynamic reCAPTCHA script insertion in [src/components/forms/ContactForm.vue:116](./src/components/forms/ContactForm.vue#L116).
- Impact: third-party availability/supply risk.

### Medium
4. Routing/base-path logic is inconsistent.
- Router uses production `/` and development `/jennys-flowers/`: [src/router/index.js:26](./src/router/index.js#L26).
- 404 redirect hardcodes `/jennys-flowers/`: [public/404.html:9](./public/404.html#L9).
- Index redirect script rewrites to root path: [public/index.html:23](./public/index.html#L23).
- Impact: fragile behavior when hosting setup changes; harder to reason about routing.

### Low
5. Dead/unused code increases maintenance overhead.
- Unused files/components:
  - [src/components/forms/FormField.vue](./src/components/forms/FormField.vue)
  - [src/components/ui/ThankYouPopup.vue](./src/components/ui/ThankYouPopup.vue)
  - [src/components/ui/LoadingSpinner.vue](./src/components/ui/LoadingSpinner.vue) (empty)
  - [src/plugins/cloudinary.js](./src/plugins/cloudinary.js) (not wired in `main.js`)
  - [src/components/carousel/TheCarousel.vue](./src/components/carousel/TheCarousel.vue) (not referenced)
- Empty style stubs:
  - `src/assets/styles/base.scss`
  - `src/assets/styles/variables.scss`
  - `src/assets/styles/mixins.scss`
  - `src/assets/styles/animations.scss`

## Simplification Suggestions
1. Centralize gallery image data in one module (for Home/About/Contact sections) and render via shared component.
2. Reuse `ThankYouPopup.vue` instead of duplicating popup markup in `ContactForm.vue`.
3. Remove dead files/components and commented-out blocks after confirming they are not planned.
4. Consolidate route/base-path handling into one source of truth (`publicPath` + router history base derived from env var).
5. Use one lint config `rules` block and keep Prettier rule active.

## Fixes Recommended (Short-Term Plan)
1. Security baseline:
- Keep `axios` current and re-run lockfile audit routinely.
- Plan migration away from Vue CLI 5 to Vite (or at least update CLI chain as far as feasible).

2. Contact flow hardening:
- Move form submission behind your own backend endpoint.
- Verify reCAPTCHA token server-side before forwarding email.
- Add rate limiting + bot filtering.
- Remove hardcoded fallback endpoint/site key after env rollout is complete.

3. Config cleanup:
- Merge `vue.config.js` into one export.
- Fix `.eslintrc.js` duplicated `rules`.
- Normalize router/404/index redirect strategy for custom domain.

4. Accessibility and safety:
- Improve form validation messages and required flags consistency.

## Completed In This Branch
1. Fixed duplicated export in [vue.config.js](./vue.config.js).
2. Fixed duplicated `rules` overwrite in [`.eslintrc.js`](./.eslintrc.js).
3. Hardened footer external links and made copyright year dynamic in [src/components/layout/TheFooter.vue](./src/components/layout/TheFooter.vue).
4. Hardened contact form (env config support, honeypot, timeout/error handling, optional FormSubmit captcha) in [src/components/forms/ContactForm.vue](./src/components/forms/ContactForm.vue).
5. Upgraded `axios` to `^1.16.0` and refreshed lockfile.

## Future Implementation Ideas
1. Inquiry management mini-CRM: store contact requests with statuses (`new`, `quoted`, `booked`, `completed`).
2. Occasion/package selector with estimated pricing bands (weddings, events, sympathy, custom).
3. Availability calendar with blackout dates and request-time windows.
4. Portfolio taxonomy (color, style, season, budget) with filter/search.
5. Testimonials + before/after event galleries.
6. Optional newsletter signup with explicit consent capture.
7. Lightweight analytics dashboard (top pages, conversion rate from gallery to contact).

## Verification Notes
- `npm run lint` passes.
- `npm run build` fails in this workspace on Node `v22.15.1` with `uv_interface_addresses` system error (environment/runtime issue, not app code).
- Re-check build under Node 18 LTS (recommended for Vue CLI 5 projects).
