const PRODUCTION_HOSTS = new Set([
  'jennysflowers.com.au',
  'www.jennysflowers.com.au'
])

const PRODUCTION_EMAIL = 'jennysflowersau@gmail.com'
const STAGING_EMAIL = 'jennydeygin@gmail.com'

function resolveHostname(explicitHostname) {
  if (explicitHostname) {
    return explicitHostname.toLowerCase()
  }

  if (typeof window === 'undefined') {
    return ''
  }

  return window.location.hostname.toLowerCase()
}

export function isProductionHost(explicitHostname) {
  return PRODUCTION_HOSTS.has(resolveHostname(explicitHostname))
}

export function getContactEmail(explicitHostname) {
  return isProductionHost(explicitHostname) ? PRODUCTION_EMAIL : STAGING_EMAIL
}

export function getContactConfig(explicitHostname) {
  const email = getContactEmail(explicitHostname)

  return {
    email,
    copyEmailAriaLabel: `Copy email address ${email}`,
    formSubmitUrl: `https://formsubmit.co/ajax/${email}`
  }
}
