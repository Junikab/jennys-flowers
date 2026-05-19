# AGENTS.md

## Purpose
This repository hosts Jenny's Flowers public website (Vue 3 SPA). It showcases portfolio images and provides a contact form that sends messages through FormSubmit.

## Stack
- Vue 3 (Options API)
- Vue Router (`createWebHistory`)
- Bootstrap + bootstrap-vue-3
- Axios (contact form submit)
- Static hosting (GitHub Pages/custom domain workflow via `gh-pages`)

## Key Files
- `src/main.js`: app bootstrap and plugin wiring
- `src/router/index.js`: routes + history base path
- `src/components/forms/ContactForm.vue`: contact/email submission flow
- `src/views/*.vue`: page content
- `public/index.html`, `public/404.html`: static shell + redirect behavior
- `package.json`: scripts/dependencies

## Working Rules
- Keep production behavior stable: no route/base-path changes without testing direct URL loads and refreshes.
- Treat contact flow as critical: validate UX, spam protection, and error handling after changes.
- Keep secrets/config out source files; prefer env vars for keys/endpoints.
- Remove dead files/components when confirmed unused to keep maintenance cost low.
- Favor small, targeted commits with clear intent.

## Local Verification
- Install deps: `npm install`
- Run dev server: `npm run serve`
- Lint: `npm run lint`
- Build: `npm run build`

## Notes
- Vue CLI 5 projects are generally most stable on Node 18 LTS. Newer Node/npm versions can cause tooling issues.
