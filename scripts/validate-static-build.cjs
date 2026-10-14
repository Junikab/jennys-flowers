const fs = require('fs')
const path = require('path')
const publicPages = require('../src/config/publicPages.json')

const projectRoot = path.resolve(__dirname, '..')
const outputRoot = path.join(projectRoot, 'dist')
const environmentArgument = process.argv.find((argument) =>
  argument.startsWith('--environment=')
)
const environment = environmentArgument?.split('=')[1]

if (!['production', 'staging'].includes(environment)) {
  throw new Error('Use --environment=production or --environment=staging.')
}

function readEnvironmentFile(name) {
  const filePath = path.join(projectRoot, `.env.${name}`)
  const values = {}

  fs.readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .forEach((rawLine) => {
      const line = rawLine.trim()

      if (!line || line.startsWith('#')) {
        return
      }

      const separatorIndex = line.indexOf('=')

      if (separatorIndex === -1) {
        return
      }

      values[line.slice(0, separatorIndex)] = line.slice(separatorIndex + 1)
    })

  return values
}

function readOutputFile(relativePath) {
  const filePath = path.join(outputRoot, relativePath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing generated file: dist/${relativePath}`)
  }

  return fs.readFileSync(filePath, 'utf8')
}

function assertIncludes(html, value, relativePath) {
  if (!html.includes(value)) {
    throw new Error(`dist/${relativePath} is missing: ${value}`)
  }
}

function assertExcludes(html, value, relativePath) {
  if (html.includes(value)) {
    throw new Error(`dist/${relativePath} must not contain: ${value}`)
  }
}

function assertEquals(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label} must be "${expected}", received "${actual}".`)
  }
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function getTitle(html, relativePath) {
  const matches = [...html.matchAll(/<title>(.*?)<\/title>/gs)]

  if (matches.length !== 1) {
    throw new Error(`dist/${relativePath} must contain exactly one title.`)
  }

  return decodeHtml(matches[0][1])
}

function getHeadTagAttribute(html, selector, attribute) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/g) || []
  const tag = tags.find((candidate) => candidate.includes(selector))

  if (!tag) {
    return null
  }

  const value = tag.match(new RegExp(`\\b${attribute}="([^"]*)"`))

  return value ? decodeHtml(value[1]) : null
}

function getOutputPath(canonicalPath) {
  return canonicalPath === '/'
    ? 'index.html'
    : `${canonicalPath.slice(1)}index.html`
}

const currentEnvironment = readEnvironmentFile(environment)
const otherEnvironment = readEnvironmentFile(
  environment === 'production' ? 'staging' : 'production'
)
const expectedEmail = currentEnvironment.VITE_CONTACT_EMAIL
const unexpectedEmail = otherEnvironment.VITE_CONTACT_EMAIL
const siteUrl = new URL(currentEnvironment.VITE_SITE_URL).origin
const pageMarkers = {
  HomePage: 'From intimate gatherings to grand events',
  About: 'My Story',
  Contact: 'Please fill in the contact form below',
  Gallery: '>Gallery</h1>'
}
const expectedPages = Object.fromEntries(
  publicPages.map((page) => [getOutputPath(page.path), pageMarkers[page.name]])
)
expectedPages['404.html'] = 'Page not found'

Object.entries(expectedPages).forEach(([relativePath, pageMarker]) => {
  const html = readOutputFile(relativePath)

  assertIncludes(html, 'data-server-rendered="true"', relativePath)
  assertIncludes(html, pageMarker, relativePath)
  assertIncludes(html, expectedEmail, relativePath)
  assertExcludes(html, '<div id="app"></div>', relativePath)
  assertExcludes(html, 'URLSearchParams(window.location.search)', relativePath)
  assertExcludes(html, 'Redirecting...', relativePath)

  if (unexpectedEmail !== expectedEmail) {
    assertExcludes(html, unexpectedEmail, relativePath)
  }
})

publicPages.forEach((page) => {
  const relativePath = getOutputPath(page.path)
  const html = readOutputFile(relativePath)
  const canonicalUrl = new URL(page.path, `${siteUrl}/`).href

  assertEquals(getTitle(html, relativePath), page.title, `${relativePath} title`)
  assertEquals(
    getHeadTagAttribute(html, 'name="description"', 'content'),
    page.description,
    `${relativePath} description`
  )
  assertEquals(
    getHeadTagAttribute(html, 'rel="canonical"', 'href'),
    canonicalUrl,
    `${relativePath} canonical URL`
  )

  const headingCount = (html.match(/<h1\b/g) || []).length
  assertEquals(headingCount, 1, `${relativePath} H1 count`)

  if (environment === 'production') {
    assertExcludes(html, 'name="robots" content="noindex, nofollow"', relativePath)
  } else {
    assertIncludes(html, 'name="robots" content="noindex, nofollow"', relativePath)
  }
})

const notFoundHtml = readOutputFile('404.html')

assertEquals(
  getTitle(notFoundHtml, '404.html'),
  "Page Not Found | Jenny's Flowers",
  '404.html title'
)
assertEquals(
  getHeadTagAttribute(notFoundHtml, 'name="description"', 'content'),
  'The requested page could not be found.',
  '404.html description'
)
assertIncludes(notFoundHtml, 'name="robots" content="noindex, nofollow"', '404.html')
assertEquals((notFoundHtml.match(/<h1\b/g) || []).length, 1, '404.html H1 count')
assertEquals(
  getHeadTagAttribute(notFoundHtml, 'rel="canonical"', 'href'),
  null,
  '404.html canonical URL'
)

const homeHtml = readOutputFile('index.html')

for (const canonicalPath of ['/about/', '/contact/', '/gallery/']) {
  assertIncludes(homeHtml, `href="${canonicalPath}"`, 'index.html')
}

if (fs.existsSync(path.join(outputRoot, '404', 'index.html'))) {
  throw new Error('The Not Found page must be generated as dist/404.html only.')
}

const robots = readOutputFile('robots.txt')

assertIncludes(robots, 'User-agent: *', 'robots.txt')
assertIncludes(robots, 'Allow: /', 'robots.txt')

if (environment === 'production') {
  const sitemap = readOutputFile('sitemap.xml')

  publicPages.forEach((page) => {
    const canonicalUrl = new URL(page.path, `${siteUrl}/`).href
    assertIncludes(sitemap, `<loc>${canonicalUrl}</loc>`, 'sitemap.xml')
  })

  assertEquals(
    (sitemap.match(/<url>/g) || []).length,
    publicPages.length,
    'sitemap.xml URL count'
  )
  assertExcludes(sitemap, '/404', 'sitemap.xml')
  assertIncludes(robots, `Sitemap: ${siteUrl}/sitemap.xml`, 'robots.txt')
} else {
  if (fs.existsSync(path.join(outputRoot, 'sitemap.xml'))) {
    throw new Error('The staging build must not generate a sitemap.xml file.')
  }

  assertExcludes(robots, 'Sitemap:', 'robots.txt')
}

console.log(
  `Validated ${Object.keys(expectedPages).length} static HTML files for ${environment}.`
)
