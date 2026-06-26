const {
  buildConfig,
  createJsonError,
  createRateLimiter,
  forwardContactMessage,
  getAllowedOrigin,
  getMissingServerConfig,
  isAllowedOrigin,
  validateContactSubmission,
  verifyRecaptchaToken
} = require('../../server/contact-utils')

function buildCorsHeaders(origin, allowedOrigins) {
  const corsOrigin = getAllowedOrigin(origin, allowedOrigins)
  const headers = {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff'
  }

  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers.Vary = 'Origin'
  }

  return headers
}

function createResponse(statusCode, payload, headers = {}) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(payload)
  }
}

function getEventIp(event) {
  const forwardedIp =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for'] ||
    ''

  if (forwardedIp) {
    return String(forwardedIp).split(',')[0].trim()
  }

  return ''
}

function parseEventBody(event) {
  if (!event.body) {
    return {}
  }

  return JSON.parse(event.body)
}

function createNetlifyContactHandler(
  config = buildConfig(),
  {
    verifyRecaptcha = verifyRecaptchaToken,
    forwardContact = forwardContactMessage
  } = {}
) {
  const rateLimiter = createRateLimiter({
    windowMs: config.rateLimitWindowMs,
    maxRequests: config.rateLimitMaxRequests
  })

  return async function handler(event) {
    const origin = event.headers.origin || event.headers.Origin || ''
    const headers = buildCorsHeaders(origin, config.allowedOrigins)

    if (!isAllowedOrigin(origin, config.allowedOrigins)) {
      const errorResponse = createJsonError(
        403,
        'origin_not_allowed',
        'This website is not allowed to use the contact service.'
      )
      return createResponse(
        errorResponse.statusCode,
        errorResponse.payload,
        headers
      )
    }

    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers
      }
    }

    if (event.httpMethod !== 'POST') {
      const errorResponse = createJsonError(
        405,
        'method_not_allowed',
        'Only POST is allowed.'
      )
      return createResponse(
        errorResponse.statusCode,
        errorResponse.payload,
        headers
      )
    }

    const missingConfig = getMissingServerConfig(config)
    if (missingConfig.length) {
      const errorResponse = createJsonError(
        503,
        'service_unavailable',
        `Contact service is not set up yet. Missing: ${missingConfig.join(
          ', '
        )}.`
      )
      return createResponse(
        errorResponse.statusCode,
        errorResponse.payload,
        headers
      )
    }

    const rateLimitResult = rateLimiter.check(getEventIp(event))
    if (!rateLimitResult.allowed) {
      const errorResponse = createJsonError(
        429,
        'rate_limited',
        'Too many attempts. Please wait a few minutes and try again.',
        {
          retryAfterSeconds: rateLimitResult.retryAfterSeconds
        }
      )
      return createResponse(
        errorResponse.statusCode,
        errorResponse.payload,
        headers
      )
    }

    try {
      const requestBody = parseEventBody(event)
      const validationResult = validateContactSubmission(requestBody, config)

      if (!validationResult.ok) {
        if (validationResult.pretendSuccess) {
          return createResponse(202, { ok: true }, headers)
        }

        const errorResponse = createJsonError(
          validationResult.statusCode,
          validationResult.code,
          validationResult.message
        )
        return createResponse(
          errorResponse.statusCode,
          errorResponse.payload,
          headers
        )
      }

      const recaptchaResult = await verifyRecaptcha({
        secret: config.recaptchaSecret,
        token: validationResult.data.recaptchaToken,
        remoteIp: getEventIp(event)
      })

      if (!recaptchaResult.success) {
        const errorResponse = createJsonError(
          400,
          'invalid_captcha',
          'Captcha check failed. Please try again.'
        )
        return createResponse(
          errorResponse.statusCode,
          errorResponse.payload,
          headers
        )
      }

      await forwardContact(config, validationResult.data)

      return createResponse(200, { ok: true }, headers)
    } catch (error) {
      const statusCode =
        typeof error.statusCode === 'number' ? error.statusCode : 502
      const errorCode = error.code || 'upstream_error'
      const message =
        statusCode === 413
          ? 'Message is too large.'
          : statusCode === 400
            ? 'Invalid request.'
            : 'Sorry, the form is not available right now. Please email us instead.'

      if (statusCode >= 500) {
        console.error('Netlify contact function error:', {
          message: error.message,
          code: error.code,
          statusCode,
          upstreamStatus: error.upstreamStatus,
          upstreamStatusText: error.upstreamStatusText,
          responseText: error.responseText
        })
      }

      const errorResponse = createJsonError(statusCode, errorCode, message)
      return createResponse(
        errorResponse.statusCode,
        errorResponse.payload,
        headers
      )
    }
  }
}

const handler = createNetlifyContactHandler()

module.exports = {
  createNetlifyContactHandler,
  handler
}
