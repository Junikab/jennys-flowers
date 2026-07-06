# Jenny's Flowers Workflow

Updated July 6, 2026.

This file is the simple day-to-day workflow for this project.

## 1. Branch Meaning

- `main` = live production branch
- `dev` = working branch

Simple rule:

- do not work directly on `main`
- do your normal work in `dev`

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

After that, check:

- `https://junikab.github.io/`
- Home
- About
- Gallery
- Contact
- mobile menu
- gallery lightbox
- contact form

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

This deploy keeps the live custom domain:

- `jennysflowers.com.au`

## 6. The Safe Simple Rule

Use this rule every time:

- build in `dev`
- test in staging
- merge to `main`
- deploy production from `main`

## 7. Commands You Will Use Most

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

Deploy staging:

```bash
npm run deploy:staging
```

Deploy production:

```bash
npm run deploy:prod
```

## 8. One Important Warning

Do not run production deploy from `dev`.

Best habit:

- staging deploy from `dev`
- production deploy from `main`
