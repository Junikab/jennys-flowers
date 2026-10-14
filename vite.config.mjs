import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const publicPages = JSON.parse(
  fs.readFileSync(
    fileURLToPath(new URL('./src/config/publicPages.json', import.meta.url)),
    'utf8'
  )
)
const STATIC_ROUTES = [...publicPages.map((page) => page.path), '/404']
const REQUIRED_PUBLIC_ENV = [
  'VITE_SITE_ENV',
  'VITE_SITE_URL',
  'VITE_CONTACT_EMAIL',
  'VITE_RECAPTCHA_SITE_KEY'
]

function validatePublicEnvironment(mode) {
  const environment = loadEnv(mode, process.cwd(), 'VITE_')

  REQUIRED_PUBLIC_ENV.forEach((key) => {
    if (!environment[key]?.trim()) {
      throw new Error(`Missing required public environment value: ${key}`)
    }
  })

  if (!['development', 'staging', 'production'].includes(environment.VITE_SITE_ENV)) {
    throw new Error(`Unsupported VITE_SITE_ENV: ${environment.VITE_SITE_ENV}`)
  }

  const siteUrl = new URL(environment.VITE_SITE_URL)

  if (siteUrl.pathname !== '/') {
    throw new Error('VITE_SITE_URL must be an origin without a path.')
  }

  if (!environment.VITE_CONTACT_EMAIL.includes('@')) {
    throw new Error('VITE_CONTACT_EMAIL must be a valid email address.')
  }
}

export default defineConfig(({ mode }) => {
  validatePublicEnvironment(mode)

  return {
    plugins: [vue()],
    base: '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    define: {
      'import.meta.env.VITE_BUILD_YEAR': JSON.stringify(
        String(new Date().getFullYear())
      )
    },
    ssgOptions: {
      entry: 'src/main.js',
      dirStyle: 'nested',
      beastiesOptions: false,
      includedRoutes() {
        return STATIC_ROUTES
      },
      htmlFileName(filename) {
        return filename.replaceAll('\\', '/') === '404/index.html'
          ? '404.html'
          : undefined
      }
    }
  }
})
