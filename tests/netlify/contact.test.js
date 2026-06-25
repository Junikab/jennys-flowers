const test = require('node:test')
const assert = require('node:assert/strict')

const {
  createNetlifyContactHandler
} = require('../../netlify/functions/contact')

function createEvent(overrides = {}) {
  return {
    httpMethod: 'POST',
    headers: {
      origin: 'https://jennysflowers.example'
    },
    body: JSON.stringify({
      name: 'Jenny',
      email: 'jenny@example.com',
      message: 'Hello there',
      website: '',
      recaptchaToken: 'token',
      startedAt: Date.now() - 5000
    }),
    ...overrides
  }
}

test('netlify contact handler returns service_unavailable when secrets are missing', async () => {
  const handler = createNetlifyContactHandler({
    allowedOrigins: ['https://jennysflowers.example'],
    formsubmitEndpoint: '',
    recaptchaSecret: '',
    formsubmitCaptchaEnabled: false,
    rateLimitWindowMs: 60_000,
    rateLimitMaxRequests: 5,
    minSubmitSeconds: 3
  })

  const response = await handler(createEvent())

  assert.equal(response.statusCode, 503)
  assert.match(response.body, /CONTACT_FORMSUBMIT_ENDPOINT/)
  assert.match(response.body, /CONTACT_RECAPTCHA_SECRET_KEY/)
})

test('netlify contact handler blocks disallowed origins', async () => {
  const handler = createNetlifyContactHandler({
    allowedOrigins: ['https://jennysflowers.example'],
    formsubmitEndpoint: 'https://formsubmit.co/ajax/test@example.com',
    recaptchaSecret: 'secret',
    formsubmitCaptchaEnabled: false,
    rateLimitWindowMs: 60_000,
    rateLimitMaxRequests: 5,
    minSubmitSeconds: 3
  })

  const response = await handler(
    createEvent({
      headers: {
        origin: 'https://bad.example'
      }
    })
  )

  assert.equal(response.statusCode, 403)
  assert.match(response.body, /origin_not_allowed/)
})
