# REVIEW.md

## Scope
Review date: 2026-05-19  
Project type: Vue 3 static site (portfolio + contact form)  
Method: codebase audit + dependency audit (`npm audit --package-lock-only --json`)

## Executive Summary
- The site is clean and understandable, but has security and maintainability gaps that should be addressed before adding new functionality.
- Highest risks are dependency vulnerabilities, weak anti-spam posture in contact submission, and config inconsistencies around routing/build setup.

## Findings (Prioritized)

### High
1. Dependency vulnerability exposure is significant.
- Evidence: `npm audit` reports `48` vulnerabilities total (`1 critical`, `26 high`, `17 moderate`, `4 low`).
- Directly relevant package: `axios` in [package.json](./package.json) (`^1.9.0`) is flagged with multiple advisories in the audit output.
- Dev toolchain (`@vue/cli-service` and related packages) also carries multiple high/moderate issues.
- Impact: supply-chain and build/runtime risk; future maintenance friction.

2. Contact anti-spam and abuse controls are weak.
- `g-recaptcha-response` is validated only client-side; server-side verification is not under your control in current flow.
- FormSubmit built-in captcha is disabled: [src/components/forms/ContactForm.vue:145](./src/components/forms/ContactForm.vue#L145).
- Public endpoint/email is hardcoded: [src/components/forms/ContactForm.vue:149](./src/components/forms/ContactForm.vue#L149).
- Impact: spam/abuse risk, unreliable protection assumptions.

3. External third-party assets/scripts are loaded without integrity pinning.
- CDN CSS in [public/index.html:11](./public/index.html#L11).
- Google Fonts/Font CDN dependencies in [public/index.html:12](./public/index.html#L12).
- Dynamic reCAPTCHA script insertion in [src/components/forms/ContactForm.vue:116](./src/components/forms/ContactForm.vue#L116).
- Impact: third-party availability/supply risk.

### Medium
4. Build config is accidentally overwritten.
- `module.exports` is declared twice in [vue.config.js](./vue.config.js); second export replaces first.
- `transpileDependencies: true` from lines 1-4 is effectively dropped by lines 6-8.

5. ESLint config has duplicated `rules` object.
- Earlier `prettier/prettier` rule is overwritten by later `rules` block: [`.eslintrc.js`](./.eslintrc.js).
- Impact: expected lint enforcement is silently reduced.

6. Routing/base-path logic is inconsistent.
- Router uses production `/` and development `/jennys-flowers/`: [src/router/index.js:26](./src/router/index.js#L26).
- 404 redirect hardcodes `/jennys-flowers/`: [public/404.html:9](./public/404.html#L9).
- Index redirect script rewrites to root path: [public/index.html:23](./public/index.html#L23).
- Impact: fragile behavior when hosting setup changes; harder to reason about routing.

7. External links should use safer target attributes.
- `target="blank"` typo in [src/components/layout/TheFooter.vue:30](./src/components/layout/TheFooter.vue#L30).
- Missing `rel="noopener noreferrer"` for new-tab links in [src/components/layout/TheFooter.vue:23](./src/components/layout/TheFooter.vue#L23).

### Low
8. Dead/unused code increases maintenance overhead.
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

9. Minor UX/data quality mismatches.
- Phone label has `*` but field is not `required`: [src/components/forms/ContactForm.vue:39](./src/components/forms/ContactForm.vue#L39).
- Footer year is hardcoded to 2025: [src/components/layout/TheFooter.vue:63](./src/components/layout/TheFooter.vue#L63).

## Simplification Suggestions
1. Centralize gallery image data in one module (for Home/About/Contact sections) and render via shared component.
2. Reuse `ThankYouPopup.vue` instead of duplicating popup markup in `ContactForm.vue`.
3. Remove dead files/components and commented-out blocks after confirming they are not planned.
4. Consolidate route/base-path handling into one source of truth (`publicPath` + router history base derived from env var).
5. Use one lint config `rules` block and keep Prettier rule active.

## Fixes Recommended (Short-Term Plan)
1. Security baseline:
- Upgrade `axios` to latest safe release.
- Refresh lockfile and re-run audit.
- Plan migration away from Vue CLI 5 to Vite (or at least update CLI chain as far as feasible).

2. Contact flow hardening:
- Move form submission behind your own backend endpoint.
- Verify reCAPTCHA token server-side before forwarding email.
- Add rate limiting + bot filtering + honeypot field.
- Move recipient email and site key to env-based config.

3. Config cleanup:
- Merge `vue.config.js` into one export.
- Fix `.eslintrc.js` duplicated `rules`.
- Normalize router/404/index redirect strategy for custom domain.

4. Accessibility and safety:
- Fix all `target` attributes and add `rel="noopener noreferrer"`.
- Improve form validation messages and required flags consistency.

## Future Implementation Ideas
1. Inquiry management mini-CRM: store contact requests with statuses (`new`, `quoted`, `booked`, `completed`).
2. Occasion/package selector with estimated pricing bands (weddings, events, sympathy, custom).
3. Availability calendar with blackout dates and request-time windows.
4. Portfolio taxonomy (color, style, season, budget) with filter/search.
5. Testimonials + before/after event galleries.
6. Optional newsletter signup with explicit consent capture.
7. Lightweight analytics dashboard (top pages, conversion rate from gallery to contact).

## Verification Notes
- In this workspace, dependency installation was inconsistent under Node `v22.15.1`/npm `11.5.2`, so `npm run lint` and `npm run build` could not be validated end-to-end here.
- Static code findings above are still valid; run checks again in a clean Node 18 LTS environment.
