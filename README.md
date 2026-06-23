# jennys-flowers

## Project setup
```
npm install
```

## Recommended Node version

Use Node 18 LTS for this project.

Why:
- Vue CLI 5 is more stable on Node 18.
- This repo already showed build problems on newer Node versions.

If you use `nvm`:

```
nvm use
node -v
```

The repo includes `.nvmrc` with `18`.

### Environment setup
```
cp .env.example .env.local
```

Add real values in `.env.local` before using the contact form.

Frontend values:

```
VUE_APP_CONTACT_API_URL=/api/contact
VUE_APP_RECAPTCHA_SITE_KEY=
```

Backend values:

```
CONTACT_HOST=127.0.0.1
CONTACT_PORT=8787
CONTACT_ALLOWED_ORIGINS=http://localhost:8080
CONTACT_FORMSUBMIT_ENDPOINT=
CONTACT_RECAPTCHA_SECRET_KEY=
CONTACT_FORMSUBMIT_CAPTCHA_ENABLED=false
CONTACT_RATE_LIMIT_WINDOW_MS=900000
CONTACT_RATE_LIMIT_MAX_REQUESTS=5
CONTACT_MIN_SUBMIT_SECONDS=3
```

The frontend reads the same `.env.local` file, and the contact API server reads it too. If the client values are missing, the form stays off and the page asks users to email instead.

For local work, keep `CONTACT_HOST=127.0.0.1`. For some production hosts, you may need `CONTACT_HOST=0.0.0.0`.

### Compiles and hot-reloads for development
```
npm run serve
```

### Runs the contact API
```
npm run serve:contact
```

Run `npm run serve:contact` and `npm run serve` together for local contact form testing. The Vue dev server now forwards `/api/contact` and `/health` to the local contact API.

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Tests the contact API helpers
```
npm run test:contact
```

## Known local issue

If you run the project on newer Node versions, `npm run build` may fail with the `uv_interface_addresses` system error. If that happens, switch back to Node 18 and try again.

## Contact flow

The contact form no longer sends straight from the browser to FormSubmit.

Now the flow is:
1. Browser sends the form to `VUE_APP_CONTACT_API_URL`, which should be `/api/contact`.
2. The API checks the honeypot, wait time, rate limit, and reCAPTCHA secret.
3. Only after that does the API forward the message to FormSubmit.

## Netlify serverless production

This repo now includes a Netlify serverless function at `netlify/functions/contact.js` and a `netlify.toml` file that rewrites `/api/contact` to that function in production.

What you need to set in Netlify:

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Functions directory: `netlify/functions`
4. Environment variables:
   - `VUE_APP_CONTACT_API_URL=/api/contact`
   - `VUE_APP_RECAPTCHA_SITE_KEY=...`
   - `CONTACT_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com`
   - `CONTACT_FORMSUBMIT_ENDPOINT=https://formsubmit.co/ajax/your-email@example.com`
   - `CONTACT_RECAPTCHA_SECRET_KEY=...`
   - `CONTACT_FORMSUBMIT_CAPTCHA_ENABLED=false`
   - `CONTACT_RATE_LIMIT_WINDOW_MS=900000`
   - `CONTACT_RATE_LIMIT_MAX_REQUESTS=5`
   - `CONTACT_MIN_SUBMIT_SECONDS=3`

If you use a Netlify preview domain before connecting your real domain, also add that preview domain to `CONTACT_ALLOWED_ORIGINS`.

The old `npm run deploy` script only publishes the static site to GitHub Pages. It does not deploy the serverless function, so do not use that script for the safe production setup.

## Pre-deploy checklist

Before you push any production change:

1. Run `nvm use` and confirm you are on Node 18.
2. Run `npm run lint`.
3. Run `npm run test:contact`.
4. Run `npm run build`.
5. Check the main routes: `/`, `/about`, and `/contact`.
6. Check one contact form submit on the test deploy.
7. Confirm the correct env vars exist in Netlify before publishing.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
