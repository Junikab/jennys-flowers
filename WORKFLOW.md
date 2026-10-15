# Jenny's Flowers Workflow

Updated October 15, 2026.

This file is the simple day-to-day workflow for this project.

## 1. Branch Meaning

- `main` = live production branch
- `dev` = working branch
- a named feature or fix branch = isolated work that must be reviewed and
  merged before deployment

Simple rule:

- do not work directly on `main`
- do your normal work in `dev`
- use a dedicated branch for larger or riskier changes

## 2. Staging Meaning

- staging repo: `Junikab/Junikab.github.io`
- staging site: `https://junikab.github.io/`

This staging site is for:

- client review
- online testing
- final checks before production

## 3. Normal Daily Work

When starting work:

```bash
git checkout dev
git pull
```

Run local dev:

```bash
npm run serve
```

Before pushing:

```bash
npm run lint
```

If your change is important or visual, also run:

```bash
npm run build
```

This creates the production static HTML and validates that every public route
contains real content, the production contact details, unique search metadata,
canonical URLs, and the four-page sitemap. To check the staging configuration
without deploying, run:

```bash
npm run build:staging
```

The staging build uses staging canonical URLs, marks every page as `noindex`,
and does not generate a sitemap. This prevents the review site from competing
with the live website in search results.

For a browser preview of the completed production files, run:

```bash
npx vite preview
```

The usual `http://localhost:4173/` address works only while that command is
running. Normal development remains on the Vite address, usually
`http://localhost:5173/`.

Then save your work:

```bash
git add .
git commit -m "your short message"
git push
```

## 4. When You Want To Update Staging

Make sure you are on `dev`:

```bash
git checkout dev
git pull
```

Then deploy staging:

```bash
npm run deploy:staging
```

This command always runs the staging build first. It removes the production
`CNAME` from the generated staging files, writes staging deployment metadata,
and publishes to the staging repository.

After that, check:

- `https://junikab.github.io/`
- Home
- About
- Gallery
- Contact
- mobile menu
- gallery filters and Load more button
- both Weddings covers and albums
- Eden & Arthur appears in Fresh Flowers
- gallery lightbox
- contact form

When checking the contact form, confirm that:

- an empty event date asks the visitor to choose a date or select
  "Date not known yet"
- an invalid calendar date shows "Please enter a valid event date."
- a valid event date is accepted
- "Date not known yet" works without a date
- reCAPTCHA completes and the form can be submitted

Important:

- staging deploy is manual
- nothing goes to staging unless you run the command

## 5. When You Want To Publish To Live Site

First, make sure `dev` is good:

- test the site locally
- test the staging site
- confirm the final fixes are done

Then merge `dev` into `main`.

If you use GitHub:

- open a pull request from `dev` to `main`
- review it
- merge it

Then update local `main`:

```bash
git checkout main
git pull
```

Then publish production:

```bash
npm run deploy:prod
```

This command always runs the production build and generated-HTML validation
before publishing. The production build keeps `public/CNAME` so the custom
domain remains attached.

This deploy keeps the live custom domain:

- `jennysflowers.com.au`

After publishing, also check:

- `https://jennysflowers.com.au/sitemap.xml`
- `https://jennysflowers.com.au/robots.txt`

## 6. The Safe Simple Rule

Use this rule every time:

- build in `dev`
- test in staging
- merge to `main`
- deploy production from `main`

## 7. Updating Wedding Photos

Keep each wedding in its own Cloudinary folder. After adding, removing, or
tagging photos, run:

```bash
npm run cloudinary:sync-gallery
```

The command updates both generated data files:

- `src/data/galleryCollectionAssets.json`
- `src/data/galleryUploadDates.json`

Do not edit those two files manually. The sync needs the private Cloudinary API
key and secret in `.env.cloudinary.local`; never put those credentials in a
tracked file or a `VITE_` variable.

For a new wedding, first add its label, URL-safe value, exact Cloudinary folder,
and cover asset to `src/data/galleryCollections.json`. Use photo tags when the
Fresh/Faux category differs per photo. Use `defaultCategories` when the whole
album shares a category.

After syncing, check:

- the image count printed by the command
- the Weddings card and cover
- every photo in the album
- All and the relevant Fresh/Faux filter
- the lightbox

Current special rule: Eden & Arthur defaults to Fresh Flowers, so future photos
in that album inherit Fresh Flowers on the next sync.

## 8. Commands You Will Use Most

Local dev:

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

Build with staging configuration:

```bash
npm run build:staging
```

Deploy staging:

```bash
npm run deploy:staging
```

Deploy production:

```bash
npm run deploy:prod
```

Sync wedding galleries:

```bash
npm run cloudinary:sync-gallery
```

## 9. One Important Warning

Do not run production deploy from `dev`.

Best habit:

- staging deploy from `dev`
- production deploy from `main`

The client's address is a private home. Do not add it to public page text,
metadata, or structured data. “By appointment only” is intentional.
