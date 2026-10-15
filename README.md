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

Open the URL printed by Vite, normally `http://localhost:5173/`.

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
- `dist/sitemap.xml`
- `dist/robots.txt`

Use `npm run build:staging` to generate the same pages with staging contact and
site configuration. Both builds stop if required public configuration is
missing or if the generated HTML contains the wrong environment's email.

Internal links use trailing slashes for non-home routes, such as `/about/` and
`/contact/`, because those URLs map directly to generated directory indexes on
static hosting.

To inspect the finished production files in a browser, run `npx vite preview`
after a build. Its usual `http://localhost:4173/` address exists only while
that preview command is running.

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

## Gallery Ordering

- All shows the newest Cloudinary uploads first.
- The older Blue Wedding and Christmas groups are deliberately pushed to the
  end of All.
- Fresh Flowers and Faux Flowers keep their curated `sortOrder` sequence.
- Weddings shows a card for each wedding, then preserves that album's synced
  photo order.

Cloudinary upload time is only an approximate date. It may differ from the date
the floral work was actually created.

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
in their gallery catalog entries. This setting does not change the order in
Fresh Flowers or Faux Flowers.

To add another wedding, add its title, Cloudinary folder, and cover asset to
`src/data/galleryCollections.json`, then run the sync command. This keeps one
Cloudinary asset per photo while allowing it to appear in Weddings and the
relevant flower categories.

If every photo in a wedding uses the same flower type, add
`defaultCategories` to that wedding's definition. New photos added to the
folder will inherit that category during the next sync without needing an
individual Cloudinary tag.

The current albums are:

- Lauren & Matthew: category membership comes from each photo's Cloudinary
  tags.
- Eden & Arthur: uses `IMG_7807_cqaugz` as its cover and assigns every photo to
  Fresh Flowers through `defaultCategories`. It currently contains 11 photos.

## Search And Privacy

Production builds contain unique page titles and descriptions, canonical
links, one visible H1 per page, a four-page sitemap, and a robots file. Staging
builds are marked `noindex` and do not publish a sitemap.

The business address is a private home and must not be added to the website or
structured data. The public wording “By appointment only” is intentional.
