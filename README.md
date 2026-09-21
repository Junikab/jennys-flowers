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

## Categorizing Wedding Photos

Wedding photos stay in their wedding folder in Cloudinary. To also show a
photo under Fresh Flowers or Faux Flowers, add one or both of these Cloudinary
tags to the asset:

- `fresh-flowers`
- `faux-flowers`

Tags can be applied to several selected assets at once in Cloudinary. After
updating tags, refresh the site's gallery data with:

```bash
npm run cloudinary:sync-gallery
```

This keeps one Cloudinary asset and one gallery record per photo while allowing
the same photo to appear in Weddings and the relevant flower categories.
