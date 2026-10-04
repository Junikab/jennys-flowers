function requirePublicValue(key, value) {
  const normalizedValue = value?.trim()

  if (!normalizedValue) {
    throw new Error(`Missing required public environment value: ${key}`)
  }

  return normalizedValue
}

const environment = requirePublicValue(
  'VITE_SITE_ENV',
  import.meta.env.VITE_SITE_ENV
)
const siteUrl = requirePublicValue('VITE_SITE_URL', import.meta.env.VITE_SITE_URL)
const contactEmail = requirePublicValue(
  'VITE_CONTACT_EMAIL',
  import.meta.env.VITE_CONTACT_EMAIL
)
const recaptchaSiteKey = requirePublicValue(
  'VITE_RECAPTCHA_SITE_KEY',
  import.meta.env.VITE_RECAPTCHA_SITE_KEY
)
const displayYear = Number(
  requirePublicValue('VITE_BUILD_YEAR', import.meta.env.VITE_BUILD_YEAR)
)

if (!Number.isInteger(displayYear)) {
  throw new Error('VITE_BUILD_YEAR must be a whole number.')
}

export const siteConfig = Object.freeze({
  environment,
  siteUrl: new URL(siteUrl).origin,
  displayYear,
  recaptchaSiteKey
})

export const contactConfig = Object.freeze({
  email: contactEmail,
  copyEmailAriaLabel: `Copy email address ${contactEmail}`,
  formSubmitUrl: `https://formsubmit.co/ajax/${contactEmail}`
})
