# Jenny's Flowers

Updated July 3, 2026.

## What This Repo Is

- Vue 3 static website
- pages:
  - Home
  - About
  - Gallery
  - Contact
- images hosted on Cloudinary
- contact form uses browser reCAPTCHA + direct FormSubmit

## Quick Start

Install:

```bash
npm install
```

Run local dev:

```bash
npm run serve
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

Staging deploy:

```bash
npm run deploy:staging
```

Production deploy:

```bash
npm run deploy:prod
```

## Most Important Rules

- the real image list is `src/data/galleryCatalog.js`
- the gallery now uses only:
  - `all`
  - `fresh-flowers`
  - `faux-flowers`
- the old `arrangements` category is gone
- use these sort ranges:
  - faux = `200+`
  - fresh = `500+`
- normal gallery imports do not need manual `id`
- special page images can use manual `id`
- `cloudinary-exports/` files are helper files only
- the contact form is still front-end only

## Cloudinary Export Workflow

Create:

- `.env.cloudinary.local`

Add:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Export the full project tree:

```bash
npm run cloudinary:export-folder
```

Export one folder:

```bash
npm run cloudinary:export-folder -- --folder="fauxFlowers"
```

Export one subfolder:

```bash
npm run cloudinary:export-folder -- --folder="fauxFlowers/Blue wedding"
```

Important:

- the script can auto-pick the next highest `sortOrder`
- but for this project, manual `--sort-start` is often better
- this helps keep faux images in the `200+` range and fresh images in the `500+` range

## Add Gallery Photos Fast

1. Run the Cloudinary export
2. Open the generated `.snippet.js`
3. Copy only the lines you need into `src/data/galleryCatalog.js`
4. Set or check the `sortOrder`
5. Run `npm run lint`
6. Refresh localhost and check the result

If you added only a few photos:

- if possible, keep them in a new Cloudinary subfolder
- export only that subfolder
- if they are mixed with old photos, export the folder again and copy only the new lines

## Before Publish

1. Run `npm run lint`
2. Run `npm run build`
3. Check Home, About, Gallery, and Contact
4. Check gallery filters and lightbox
5. Check the contact form
6. Check the mobile header and footer

## Project Docs

- `README.md`
  - quick start
- `WORKFLOW.md`
  - simple day-to-day dev, staging, and production flow
- `NOTES.md`
  - simple memory guide for the whole project
- `PLAN.md`
  - current stable state and next checks
- `IDEAS.md`
  - future improvements
