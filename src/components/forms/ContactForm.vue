<template>
  <div class="contact-form-container">
    <ThankYouPopup :show="showThankYou" @close="closePopup" />
    <p class="text-center contact-intro brand-copy-md">
      Please fill in the contact form below or email us at
      <a href="mailto:Jennysflowersau@gmail.com">Jennysflowersau@gmail.com</a>
    </p>
    <p v-if="configError" class="text-danger text-center mb-0">
      {{ configError }}
    </p>
    <div>
      <form @submit.prevent="submitForm" class="mt-4">
        <div class="client-info text-start brand-copy-md">
          <div class="mb-3">
            <label for="name" class="form-label">Name *</label>
            <input
              type="text"
              name="name"
              v-model="formData.name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              v-model="formData.phone"
              class="form-control"
              id="tel"
              maxlength="50"
            />
          </div>
          <div class="mb-5">
            <label for="email" class="form-label">Email address *</label>
            <input
              type="email"
              name="email"
              v-model="formData.email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              maxlength="120"
              required
            />
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">Message *</label>
            <textarea
              class="form-control"
              name="message"
              v-model="formData.message"
              id="message"
              rows="3"
              maxlength="3000"
              required
            ></textarea>
          </div>
          <input
            v-model="formData.website"
            type="text"
            name="website"
            class="honeypot"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />
          <div class="mb-4">
            <div
              v-if="recaptchaSiteKey"
              ref="recaptcha"
              class="g-recaptcha"
              :data-sitekey="recaptchaSiteKey"
            ></div>
            <small v-if="recaptchaError" class="text-danger"
              >Please complete the reCAPTCHA</small
            >
            <small v-if="submitError" class="text-danger d-block mt-2">
              {{ submitError }}
            </small>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-dark px-4 py-2"
          :disabled="submitting || Boolean(configError)"
        >
          {{ submitting ? 'Sending...' : 'Send' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ThankYouPopup from '../ui/ThankYouPopup.vue'

export default {
  name: 'ContactForm',
  components: {
    ThankYouPopup
  },
  data() {
    const contactApiUrl = (process.env.VUE_APP_CONTACT_API_URL || '').trim()
    const recaptchaSiteKey = (
      process.env.VUE_APP_RECAPTCHA_SITE_KEY || ''
    ).trim()

    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        message: '',
        website: ''
      },
      showThankYou: false,
      submitting: false,
      formStartedAt: Date.now(),
      recaptchaError: false,
      submitError: '',
      contactApiUrl,
      recaptchaSiteKey
    }
  },
  computed: {
    configError() {
      const missingSettings = []

      if (!this.contactApiUrl) {
        missingSettings.push('contact API URL')
      }

      if (!this.recaptchaSiteKey) {
        missingSettings.push('reCAPTCHA key')
      }

      if (missingSettings.length) {
        return `Contact form is not set up yet. Missing: ${missingSettings.join(
          ', '
        )}. Please email us instead.`
      }

      return ''
    }
  },
  mounted() {
    if (!this.recaptchaSiteKey) {
      return
    }

    const existingScript = document.querySelector(
      'script[src="https://www.google.com/recaptcha/api.js"]'
    )
    if (existingScript) {
      return
    }

    // Load Google reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.referrerPolicy = 'origin'
    document.head.appendChild(script)
  },
  methods: {
    async submitForm() {
      this.submitError = ''
      this.recaptchaError = false

      if (this.configError) {
        this.submitError = this.configError
        return
      }

      // Honeypot trap for basic bots
      if (this.formData.website.trim()) {
        this.showThankYou = true
        this.resetForm()
        return
      }

      // Validate reCAPTCHA first
      const recaptchaResponse = this.getRecaptchaResponse()
      if (!recaptchaResponse) {
        this.recaptchaError = true
        return
      }

      this.recaptchaError = false
      this.submitting = true

      try {
        await axios.post(
          this.contactApiUrl,
          {
            ...this.formData,
            recaptchaToken: recaptchaResponse,
            startedAt: this.formStartedAt
          },
          {
            headers: {
              Accept: 'application/json'
            },
            timeout: 10000
          }
        )

        // Show thank you popup
        this.showThankYou = true

        // Reset form
        this.resetForm()

        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } catch (error) {
        this.handleSubmitError(error)
      } finally {
        this.submitting = false
      }
    },

    getRecaptchaResponse() {
      return window.grecaptcha ? window.grecaptcha.getResponse() : ''
    },

    handleSubmitError(error) {
      if (window.grecaptcha) {
        window.grecaptcha.reset()
      }

      const errorCode = error?.response?.data?.code || ''

      if (error.code === 'ECONNABORTED') {
        this.submitError =
          'The form took too long to send. Please try again or email us instead.'
        return
      }

      if (errorCode === 'invalid_captcha' || errorCode === 'missing_captcha') {
        this.recaptchaError = true
        this.submitError = 'Please complete the reCAPTCHA and try again.'
        return
      }

      if (errorCode === 'rate_limited') {
        this.submitError =
          'Too many tries in a short time. Please wait a few minutes and try again.'
        return
      }

      if (errorCode === 'bot_detected') {
        this.submitError =
          'Please wait a few seconds and then send the form again.'
        return
      }

      if (errorCode === 'validation_error') {
        this.submitError = error.response.data.message
        return
      }

      if (errorCode === 'service_unavailable') {
        this.submitError =
          'The contact form is not ready right now. Please email us instead.'
        return
      }

      this.submitError =
        'Sorry, there was a problem sending your message. Please try again.'
    },

    resetForm() {
      this.formData = {
        name: '',
        phone: '',
        email: '',
        message: '',
        website: ''
      }
      this.formStartedAt = Date.now()
      this.submitError = ''
      this.recaptchaError = false
    },

    closePopup() {
      this.showThankYou = false
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.contact-intro {
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-control {
  border: 2px solid #333;
  border-radius: 0;
  padding: 0.75rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: var(--brand-text-soft);
}

.btn {
  min-width: 120px;
  background-color: var(--brand-text-soft);
  border-radius: 0;
}
.btn:hover {
  background-color: var(--brand-accent);
}

.honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

/* Make the form look good on phones */
@media (max-width: 768px) {
  .contact-form-container {
    padding: 10px;
  }
}
</style>
