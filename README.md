# Jenny's Flowers

A warm, responsive website for Jenny's Flowers. Visitors can explore fresh and
faux floral work, learn about the business, and send an event enquiry through
the contact form.

## What Is Included

- Home, About, Gallery, and Contact pages
- A Cloudinary-powered gallery with filters and a lightbox
- A contact form with clear field and calendar-date validation
- reCAPTCHA protection and direct submission through FormSubmit

The site is built with Vue 3, Vite, and Vite SSG. The build generates real HTML
for every public route, then Vue hydrates that HTML to enable the interactive
features. It remains a front-end-only site hosted on GitHub Pages.

## Run It Locally

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run serve
```

Before sharing a change, check it with:

```bash
npm run lint
npm run build
```

`npm run build` is the production build. It generates and validates:

- `dist/index.html`
- `dist/about/index.html`
- `dist/contact/index.html`
- `dist/gallery/index.html`
- `dist/404.html`

Use `npm run build:staging` to generate the same pages with staging contact and
site configuration. Both builds stop if required public configuration is
missing or if the generated HTML contains the wrong environment's email.

Internal links use trailing slashes for non-home routes, such as `/about/` and
`/contact/`, because those URLs map directly to generated directory indexes on
static hosting.

## Public Build Configuration

The tracked `.env.development`, `.env.staging`, and `.env.production` files
contain values that are intentionally public in the browser: the site origin,
contact email, and reCAPTCHA site key. Update the correct environment file when
one of those public values changes.

Never put Cloudinary API secrets or other private credentials in a `VITE_`
variable. Keep private Cloudinary credentials in `.env.cloudinary.local`, which
is ignored by Git.

## Development Guide

See [WORKFLOW.md](WORKFLOW.md) for the day-to-day development, staging, and
production process.

## Managing Wedding Galleries

Keep each wedding's photos in one Cloudinary folder. Do not copy photos into
the Fresh Flowers or Faux Flowers folders. Instead, add one or both of these
tags to the original asset:

- `fresh-flowers`
- `faux-flowers`

After adding, removing, or tagging gallery photos, refresh the gallery data:

```bash
npm run cloudinary:sync-gallery
```

This requires `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in
`.env.cloudinary.local`.

The command reads the albums listed in
`src/data/galleryCollections.json`, updates
`src/data/galleryCollectionAssets.json`, and records Cloudinary upload dates in
`src/data/galleryUploadDates.json`. Do not edit these generated files by hand.

The All gallery uses those upload dates to show the newest uploads first.
Older projects can be kept at the end of All by setting `showLastInAll: true`
in their gallery catalog entries. The Fresh Flowers, Faux Flowers, and
individual wedding galleries retain their curated order.

To add another wedding, add its title, Cloudinary folder, and cover asset to
`src/data/galleryCollections.json`, then run the sync command. This keeps one
Cloudinary asset per photo while allowing it to appear in Weddings and the
relevant flower categories.
