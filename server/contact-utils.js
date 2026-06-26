const fs = require('fs')
const path = require('path')

const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 5
const DEFAULT_MIN_SUBMIT_SECONDS = 3
const MAX_NAME_LENGTH = 120
const MAX_PHONE_LENGTH = 50
const MAX_EMAIL_LENGTH = 120
const MAX_MESSAGE_LENGTH = 3000
const MAX_BODY_SIZE_BYTES = 25 * 1024
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function loadEnvFile(fileName, cwd = process.cwd()) {
  const filePath = path.join(cwd, fileName)

  if (!fs.existsSync(filePath)) {
    return
  }

  const rawFile = fs.readFileSync(filePath, 'utf8')
  const lines = rawFile.split(/\r?\n/)

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return
    }

    const separatorIndex = trimmedLine.indexOf('=')
    if (separatorIndex === -1) {
      return
    }

    const key = trimmedLine.slice(0, separatorIndex).trim()
    let value = trimmedLine.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) {
      process.env[key] = value
    }
  })
}

function loadLocalEnvFiles(cwd = process.cwd()) {
  loadEnvFile('.env.local', cwd)
  loadEnvFile('.env', cwd)
}

function parseList(value) {
  return String(value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
}

function parsePositiveInt(value, fallback) {
  const parsedValue = Number.parseInt(value, 10)
  return Number.isFinite(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback
}

function buildConfig(env = process.env) {
  return {
    host: String(env.CONTACT_HOST || '127.0.0.1').trim() || '127.0.0.1',
    port: parsePositiveInt(env.CONTACT_PORT, 8787),
    allowedOrigins: parseList(
      env.CONTACT_ALLOWED_ORIGINS || env.CONTACT_ALLOWED_ORIGIN
    ),
    formsubmitEndpoint: String(env.CONTACT_FORMSUBMIT_ENDPOINT || '').trim(),
    recaptchaSecret: String(env.CONTACT_RECAPTCHA_SECRET_KEY || '').trim(),
    formsubmitCaptchaEnabled:
      String(env.CONTACT_FORMSUBMIT_CAPTCHA_ENABLED || 'false') === 'true',
    rateLimitWindowMs: parsePositiveInt(
      env.CONTACT_RATE_LIMIT_WINDOW_MS,
      DEFAULT_RATE_LIMIT_WINDOW_MS
    ),
    rateLimitMaxRequests: parsePositiveInt(
      env.CONTACT_RATE_LIMIT_MAX_REQUESTS,
      DEFAULT_RATE_LIMIT_MAX_REQUESTS
    ),
    minSubmitSeconds: parsePositiveInt(
      env.CONTACT_MIN_SUBMIT_SECONDS,
      DEFAULT_MIN_SUBMIT_SECONDS
    )
  }
}

function getMissingServerConfig(config) {
  const missingSettings = []

  if (!config.formsubmitEndpoint) {
    missingSettings.push('CONTACT_FORMSUBMIT_ENDPOINT')
  }

  if (!config.recaptchaSecret) {
    missingSettings.push('CONTACT_RECAPTCHA_SECRET_KEY')
  }

  return missingSettings
}

function getAllowedOrigin(origin, allowedOrigins) {
  if (!origin) {
    return ''
  }

  return allowedOrigins.includes(origin) ? origin : ''
}

function isAllowedOrigin(origin, allowedOrigins) {
  if (!origin) {
    return true
  }

  if (!allowedOrigins.length) {
    return false
  }

  return allowedOrigins.includes(origin)
}

function getClientIp(request) {
  const forwardedFor = request.headers['x-forwarded-for']

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim()
  }

  return String(request.socket.remoteAddress || '')
    .replace(/^::ffff:/, '')
    .trim()
}

function createRateLimiter({ windowMs, maxRequests }) {
  const requestsByIp = new Map()

  return {
    check(key, now = Date.now()) {
      const currentKey = key || 'unknown'
      const currentEntry = requestsByIp.get(currentKey)

      if (!currentEntry || now - currentEntry.windowStart >= windowMs) {
        requestsByIp.set(currentKey, {
          count: 1,
          windowStart: now
        })

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - 1),
          retryAfterSeconds: 0
        }
      }

      currentEntry.count += 1

      if (currentEntry.count > maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.ceil(
            (windowMs - (now - currentEntry.windowStart)) / 1000
          )
        }
      }

      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - currentEntry.count),
        retryAfterSeconds: 0
      }
    }
  }
}

function sanitizeText(value) {
  return String(value || '').trim()
}

function validateContactSubmission(payload, config, now = Date.now()) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      ok: false,
      statusCode: 400,
      code: 'invalid_payload',
      message: 'Invalid form data.'
    }
  }

  const name = sanitizeText(payload.name)
  const phone = sanitizeText(payload.phone)
  const email = sanitizeText(payload.email)
  const message = sanitizeText(payload.message)
  const website = sanitizeText(payload.website)
  const recaptchaToken = sanitizeText(payload.recaptchaToken)
  const startedAt = Number(payload.startedAt)

  if (website) {
    return {
      ok: false,
      statusCode: 202,
      code: 'bot_accepted',
      message: 'Accepted.',
      pretendSuccess: true
    }
  }

  if (!name || !email || !message) {
    return {
      ok: false,
      statusCode: 400,
      code: 'validation_error',
      message: 'Please fill in name, email, and message.'
    }
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    phone.length > MAX_PHONE_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return {
      ok: false,
      statusCode: 400,
      code: 'validation_error',
      message: 'One or more fields are too long.'
    }
  }

  if (!EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      statusCode: 400,
      code: 'validation_error',
      message: 'Please enter a valid email address.'
    }
  }

  if (!recaptchaToken) {
    return {
      ok: false,
      statusCode: 400,
      code: 'missing_captcha',
      message: 'Please complete the reCAPTCHA.'
    }
  }

  if (!Number.isFinite(startedAt)) {
    return {
      ok: false,
      statusCode: 400,
      code: 'invalid_started_at',
      message: 'Please reload the page and try again.'
    }
  }

  if (now - startedAt < config.minSubmitSeconds * 1000) {
    return {
      ok: false,
      statusCode: 400,
      code: 'bot_detected',
      message: 'Please wait a few seconds and try again.'
    }
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      message,
      recaptchaToken
    }
  }
}

async function verifyRecaptchaToken({ secret, token, remoteIp }) {
  const body = new URLSearchParams({
    secret,
    response: token
  })

  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  const response = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    }
  )

  if (!response.ok) {
    throw Object.assign(new Error('reCAPTCHA verification failed'), {
      statusCode: 502,
      code: 'captcha_service_error'
    })
  }

  return response.json()
}

async function forwardContactMessage(config, submission) {
  const body = new URLSearchParams({
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    message: submission.message,
    _captcha: config.formsubmitCaptchaEnabled ? 'true' : 'false',
    _subject: "New Jenny's Flowers inquiry"
  })

  const response = await fetch(config.formsubmitEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })

  if (!response.ok) {
    const responseText = await response.text()

    throw Object.assign(new Error('Contact delivery failed'), {
      statusCode: 502,
      code: 'upstream_error',
      upstreamStatus: response.status,
      upstreamStatusText: response.statusText,
      responseText
    })
  }

  return response
}

function createJsonError(statusCode, code, message, extra = {}) {
  return {
    statusCode,
    payload: {
      ok: false,
      code,
      message,
      ...extra
    }
  }
}

async function parseJsonBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = ''

    request.on('data', (chunk) => {
      rawBody += chunk

      if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_SIZE_BYTES) {
        reject(
          Object.assign(new Error('Payload too large'), {
            statusCode: 413,
            code: 'payload_too_large'
          })
        )
        request.destroy()
      }
    })

    request.on('end', () => {
      if (!rawBody) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(rawBody))
      } catch (error) {
        reject(
          Object.assign(new Error('Invalid JSON'), {
            statusCode: 400,
            code: 'invalid_json'
          })
        )
      }
    })

    request.on('error', reject)
  })
}

module.exports = {
  buildConfig,
  createJsonError,
  createRateLimiter,
  forwardContactMessage,
  getAllowedOrigin,
  getClientIp,
  getMissingServerConfig,
  isAllowedOrigin,
  loadEnvFile,
  loadLocalEnvFiles,
  parseJsonBody,
  validateContactSubmission,
  verifyRecaptchaToken
}
