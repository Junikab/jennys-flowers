const test = require('node:test')
const assert = require('node:assert/strict')

const {
  createRateLimiter,
  isAllowedOrigin,
  validateContactSubmission
} = require('./contact-utils')

const baseConfig = {
  minSubmitSeconds: 3
}

test('validateContactSubmission accepts a normal contact payload', () => {
  const now = Date.now()
  const result = validateContactSubmission(
    {
      name: 'Jenny',
      phone: '0400 000 000',
      email: 'jenny@example.com',
      message: 'Hello there',
      website: '',
      recaptchaToken: 'token',
      startedAt: now - 5000
    },
    baseConfig,
    now
  )

  assert.equal(result.ok, true)
  assert.equal(result.data.email, 'jenny@example.com')
})

test('validateContactSubmission blocks fast submissions', () => {
  const now = Date.now()
  const result = validateContactSubmission(
    {
      name: 'Jenny',
      email: 'jenny@example.com',
      message: 'Hello there',
      website: '',
      recaptchaToken: 'token',
      startedAt: now - 1000
    },
    baseConfig,
    now
  )

  assert.equal(result.ok, false)
  assert.equal(result.code, 'bot_detected')
})

test('validateContactSubmission treats honeypot as fake success', () => {
  const now = Date.now()
  const result = validateContactSubmission(
    {
      name: 'Jenny',
      email: 'jenny@example.com',
      message: 'Hello there',
      website: 'spam',
      recaptchaToken: 'token',
      startedAt: now - 5000
    },
    baseConfig,
    now
  )

  assert.equal(result.ok, false)
  assert.equal(result.pretendSuccess, true)
})

test('isAllowedOrigin only accepts configured origins', () => {
  assert.equal(
    isAllowedOrigin('https://jennysflowers.example', [
      'https://jennysflowers.example'
    ]),
    true
  )
  assert.equal(
    isAllowedOrigin('https://bad.example', ['https://jennysflowers.example']),
    false
  )
})

test('createRateLimiter blocks after the configured limit', () => {
  const rateLimiter = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 2
  })

  assert.equal(rateLimiter.check('127.0.0.1', 1000).allowed, true)
  assert.equal(rateLimiter.check('127.0.0.1', 2000).allowed, true)
  assert.equal(rateLimiter.check('127.0.0.1', 3000).allowed, false)
})
