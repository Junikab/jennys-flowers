# Jenny's Flowers

A warm, responsive website for Jenny's Flowers. Visitors can explore fresh and
faux floral work, learn about the business, and send an event enquiry through
the contact form.

## What Is Included

- Home, About, Gallery, and Contact pages
- A Cloudinary-powered gallery with filters and a lightbox
- A contact form with clear field and calendar-date validation
- reCAPTCHA protection and direct submission through FormSubmit

The site is built with Vue 3 and is currently front-end only.

## Run It Locally

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run serve
```

Before sharing a change, check it with:

```bash
npm run lint
npm run build
```

## Development Guide

See [WORKFLOW.md](WORKFLOW.md) for the day-to-day development, staging, and
production process.

## Managing Wedding Galleries

Keep each wedding's photos in one Cloudinary folder. Do not copy photos into
the Fresh Flowers or Faux Flowers folders. Instead, add one or both of these
tags to the original asset:

- `fresh-flowers`
- `faux-flowers`

After adding, removing, or tagging wedding photos, refresh the gallery data:

```bash
npm run cloudinary:sync-gallery
```

This requires `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in
`.env.cloudinary.local`.

The command reads the albums listed in
`src/data/galleryCollections.json` and updates
`src/data/galleryCollectionAssets.json`. Do not edit the generated asset file
by hand.

To add another wedding, add its title, Cloudinary folder, and cover asset to
`src/data/galleryCollections.json`, then run the sync command. This keeps one
Cloudinary asset per photo while allowing it to appear in Weddings and the
relevant flower categories.
