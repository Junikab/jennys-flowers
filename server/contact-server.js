const http = require('http')
const {
  buildConfig,
  createJsonError,
  createRateLimiter,
  forwardContactMessage,
  getAllowedOrigin,
  getClientIp,
  getMissingServerConfig,
  isAllowedOrigin,
  loadLocalEnvFiles,
  parseJsonBody,
  validateContactSubmission,
  verifyRecaptchaToken
} = require('./contact-utils')

loadLocalEnvFiles()

function sendJson(response, statusCode, payload, corsOrigin = '') {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  }

  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers.Vary = 'Origin'
  }

  response.writeHead(statusCode, headers)
  response.end(JSON.stringify(payload))
}

function sendOptions(response, corsOrigin = '') {
  const headers = {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }

  if (corsOrigin) {
    headers['Access-Control-Allow-Origin'] = corsOrigin
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Max-Age'] = '86400'
    headers.Vary = 'Origin'
  }

  response.writeHead(204, headers)
  response.end()
}

function createServer(config = buildConfig()) {
  const rateLimiter = createRateLimiter({
    windowMs: config.rateLimitWindowMs,
    maxRequests: config.rateLimitMaxRequests
  })

  return http.createServer(async (request, response) => {
    const origin = request.headers.origin || ''
    const corsOrigin = getAllowedOrigin(origin, config.allowedOrigins)
    const url = new URL(
      request.url || '/',
      `http://${request.headers.host || 'localhost'}`
    )

    if (url.pathname === '/health') {
      sendJson(
        response,
        200,
        {
          ok: true,
          ready: getMissingServerConfig(config).length === 0
        },
        corsOrigin
      )
      return
    }

    if (url.pathname !== '/api/contact') {
      const errorResponse = createJsonError(
        404,
        'not_found',
        'Not found.'
      )
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
      return
    }

    if (!isAllowedOrigin(origin, config.allowedOrigins)) {
      const errorResponse = createJsonError(
        403,
        'origin_not_allowed',
        'This website is not allowed to use the contact service.'
      )
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
      return
    }

    if (request.method === 'OPTIONS') {
      sendOptions(response, corsOrigin)
      return
    }

    if (request.method !== 'POST') {
      const errorResponse = createJsonError(
        405,
        'method_not_allowed',
        'Only POST is allowed.'
      )
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
      return
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
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
      return
    }

    const clientIp = getClientIp(request)
    const rateLimitResult = rateLimiter.check(clientIp)

    if (!rateLimitResult.allowed) {
      const errorResponse = createJsonError(
        429,
        'rate_limited',
        'Too many attempts. Please wait a few minutes and try again.',
        {
          retryAfterSeconds: rateLimitResult.retryAfterSeconds
        }
      )
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
      return
    }

    try {
      const requestBody = await parseJsonBody(request)
      const validationResult = validateContactSubmission(requestBody, config)

      if (!validationResult.ok) {
        if (validationResult.pretendSuccess) {
          sendJson(response, 202, { ok: true }, corsOrigin)
          return
        }

        const errorResponse = createJsonError(
          validationResult.statusCode,
          validationResult.code,
          validationResult.message
        )
        sendJson(
          response,
          errorResponse.statusCode,
          errorResponse.payload,
          corsOrigin
        )
        return
      }

      const recaptchaResult = await verifyRecaptchaToken({
        secret: config.recaptchaSecret,
        token: validationResult.data.recaptchaToken,
        remoteIp: clientIp
      })

      if (!recaptchaResult.success) {
        const errorResponse = createJsonError(
          400,
          'invalid_captcha',
          'Captcha check failed. Please try again.'
        )
        sendJson(
          response,
          errorResponse.statusCode,
          errorResponse.payload,
          corsOrigin
        )
        return
      }

      await forwardContactMessage(config, validationResult.data)

      sendJson(
        response,
        200,
        {
          ok: true
        },
        corsOrigin
      )
    } catch (error) {
      const statusCode =
        typeof error.statusCode === 'number' ? error.statusCode : 502
      const errorCode = error.code || 'upstream_error'
      const errorDetails =
        config.debugErrors && statusCode >= 500
          ? {
              upstreamStatus: error.upstreamStatus || null,
              upstreamStatusText: error.upstreamStatusText || '',
              upstreamResponse: error.responseText || ''
            }
          : {}
      const message =
        statusCode === 413
          ? 'Message is too large.'
          : statusCode === 400
            ? 'Invalid request.'
            : 'Sorry, the form is not available right now. Please email us instead.'

      if (statusCode >= 500) {
        console.error('Contact service error:', {
          message: error.message,
          code: error.code,
          statusCode,
          upstreamStatus: error.upstreamStatus,
          upstreamStatusText: error.upstreamStatusText,
          responseText: error.responseText
        })
      }

      const errorResponse = createJsonError(
        statusCode,
        errorCode,
        message,
        errorDetails
      )
      sendJson(
        response,
        errorResponse.statusCode,
        errorResponse.payload,
        corsOrigin
      )
    }
  })
}

if (require.main === module) {
  const config = buildConfig()
  const server = createServer(config)

  server.on('error', (error) => {
    console.error('Contact API failed to start:', error)
    process.exit(1)
  })

  server.listen(config.port, config.host, () => {
    const ready = getMissingServerConfig(config).length === 0
    console.log(
      `Contact API listening on http://${config.host}:${config.port} (ready: ${ready})`
    )
  })
}

module.exports = {
  createServer,
  sendJson
}
