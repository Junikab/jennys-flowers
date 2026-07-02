# Jenny's Flowers

Light Vue 3 site for Jenny's Flowers.
This branch was updated heavily between June 28, 2026 and July 2, 2026.

## Current branch highlights

- warm brand palette and shared design tokens
- responsive header and footer updates
- copy-email button in header, footer, and contact form
- home hero slideshow with progress bar
- home price guide intro and reusable price list cards
- gallery masonry layout, filters, lightbox preview, keyboard arrows, and mobile swipe
- flexible About page image and text block
- contact hero background image driven by gallery data
- scroll-to-top button
- Cloudinary image catalog helpers and local export script

## Setup

Recommended:
- Node 18 LTS

Install:

```bash
npm install
```

Run locally:

```bash
npm run serve
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Auto-fix formatting:

```bash
npm run lint:fix
```

Deploy the static site:

```bash
npm run deploy
```

## Cloudinary export workflow

There is now a local export script for pulling asset lists from Cloudinary.

Create:
- `.env.cloudinary.local`

Add:

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Export the full `Jennys Flowers` folder tree:

```bash
npm run cloudinary:export-folder
```

Export only one branch:

```bash
npm run cloudinary:export-folder -- --folder="fauxFlowers"
```

This creates local files in:
- `cloudinary-exports/`

Those export files are ignored by git.

## Common workflows

### Add gallery photos fast

1. Export the folder tree from Cloudinary.
2. Open the generated `.snippet.js` file.
3. Copy only the blocks you really need into `src/data/galleryCatalog.js`.
4. Remove duplicates before keeping them.
5. Run `npm run lint:fix`.

### Check the site before publish

1. Run `npm run lint`
2. Run `npm run build`
3. Check Home, About, Gallery, and Contact
4. Check gallery filters and lightbox
5. Check the contact form
6. Check mobile header and footer

## Important current notes

- The current contact form posts directly to FormSubmit from the browser.
- reCAPTCHA is loaded and checked in the browser only.
- There is no local backend endpoint in this branch right now.
- Cloudinary exports can include duplicates, odd attachment-like files, and HEIC images. Review before pasting into the catalog.

## Repo docs

- `README.md`
  Quick setup and workflow notes.
- `NOTES.md`
  Main codebase guide and architecture notes.
- `PLAN.md`
  Current branch status and next-step checklist.
