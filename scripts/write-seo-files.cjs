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

      if (separatorIndex !== -1) {
        values[line.slice(0, separatorIndex)] = line.slice(separatorIndex + 1)
      }
    })

  return values
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const environmentValues = readEnvironmentFile(environment)
const siteUrl = new URL(environmentValues.VITE_SITE_URL).origin
const robotsLines = ['User-agent: *', 'Allow: /']
const sitemapPath = path.join(outputRoot, 'sitemap.xml')

if (environment === 'production') {
  const sitemapUrls = publicPages
    .map(({ path: canonicalPath }) => {
      const pageUrl = new URL(canonicalPath, `${siteUrl}/`).href

      return `  <url><loc>${escapeXml(pageUrl)}</loc></url>`
    })
    .join('\n')
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    sitemapUrls,
    '</urlset>',
    ''
  ].join('\n')

  fs.writeFileSync(sitemapPath, sitemap)
  robotsLines.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
} else if (fs.existsSync(sitemapPath)) {
  fs.unlinkSync(sitemapPath)
}

fs.writeFileSync(
  path.join(outputRoot, 'robots.txt'),
  `${robotsLines.join('\n')}\n`
)

console.log(`Wrote SEO files for ${environment}.`)
