const fs = require('fs')
const path = require('path')

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

const currentEnvironment = readEnvironmentFile(environment)
const otherEnvironment = readEnvironmentFile(
  environment === 'production' ? 'staging' : 'production'
)
const expectedEmail = currentEnvironment.VITE_CONTACT_EMAIL
const unexpectedEmail = otherEnvironment.VITE_CONTACT_EMAIL
const expectedPages = {
  'index.html': 'From intimate gatherings to grand events',
  'about/index.html': 'My Story',
  'contact/index.html': 'Please fill in the contact form below',
  'gallery/index.html': '>Gallery</h1>',
  '404.html': 'Page not found'
}

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

const homeHtml = readOutputFile('index.html')

for (const canonicalPath of ['/about/', '/contact/', '/gallery/']) {
  assertIncludes(homeHtml, `href="${canonicalPath}"`, 'index.html')
}

if (fs.existsSync(path.join(outputRoot, '404', 'index.html'))) {
  throw new Error('The Not Found page must be generated as dist/404.html only.')
}

console.log(
  `Validated ${Object.keys(expectedPages).length} static HTML files for ${environment}.`
)
