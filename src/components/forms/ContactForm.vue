<template>
  <div class="contact-form-container">
    <ThankYouPopup :show="showThankYou" @close="closePopup" />
    <p class="text-center contact-intro body-copy">
      Please fill in the contact form below or email us at
      <CopyEmailButton
        email="Jennysflowersau@gmail.com"
        aria-label="Copy email address Jennysflowersau@gmail.com"
        button-class="contact-email-link"
      />
    </p>
    <div>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="client-info text-start">
          <div class="form-group">
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
          <div class="form-group">
            <label for="tel" class="form-label">Phone</label>
            <input
              type="tel"
              name="phone"
              v-model="formData.phone"
              class="form-control"
              id="tel"
            />
          </div>
          <div class="form-group form-group--spacious">
            <label for="email" class="form-label">Email address *</label>
            <input
              type="email"
              name="email"
              v-model="formData.email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message *</label>
            <textarea
              class="form-control"
              name="message"
              v-model="formData.message"
              id="message"
              rows="3"
              required
            ></textarea>
          </div>
          <div class="form-group form-group--recaptcha">
            <div ref="recaptcha" class="recaptcha-slot"></div>
            <small v-if="recaptchaMessage" class="text-danger">{{
              recaptchaMessage
            }}</small>
          </div>
        </div>
        <button
          type="submit"
          class="pill-button submit-button"
          :disabled="submitting || !recaptchaReady"
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
import CopyEmailButton from '../ui/CopyEmailButton.vue'

const RECAPTCHA_SITE_KEY = '6Ld7xDArAAAAAAvbJMfFCgIcZlzmkXX2W0Tr_JdC'
const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-script'
const RECAPTCHA_ONLOAD_CALLBACK = '__jennysFlowersRecaptchaOnload'

let recaptchaApiPromise = null

function waitForRecaptchaApi(timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startedAt = Date.now()
    const intervalId = window.setInterval(() => {
      if (window.grecaptcha?.render) {
        window.clearInterval(intervalId)
        resolve(window.grecaptcha)
        return
      }

      if (Date.now() - startedAt >= timeout) {
        window.clearInterval(intervalId)
        reject(new Error('reCAPTCHA API did not become available in time.'))
      }
    }, 50)
  })
}

function loadRecaptchaApi() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(
      new Error('reCAPTCHA can only be loaded in a browser environment.')
    )
  }

  if (window.grecaptcha?.render) {
    return Promise.resolve(window.grecaptcha)
  }

  if (recaptchaApiPromise) {
    return recaptchaApiPromise
  }

  recaptchaApiPromise = new Promise((resolve, reject) => {
    const handleError = () => {
      delete window[RECAPTCHA_ONLOAD_CALLBACK]
      recaptchaApiPromise = null
      reject(new Error('Failed to load the reCAPTCHA API.'))
    }

    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID)
    if (existingScript) {
      waitForRecaptchaApi()
        .then(resolve)
        .catch((error) => {
          recaptchaApiPromise = null
          reject(error)
        })
      return
    }

    window[RECAPTCHA_ONLOAD_CALLBACK] = () => {
      delete window[RECAPTCHA_ONLOAD_CALLBACK]
      resolve(window.grecaptcha)
    }

    const script = document.createElement('script')
    script.id = RECAPTCHA_SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?onload=${RECAPTCHA_ONLOAD_CALLBACK}&render=explicit`
    script.async = true
    script.defer = true
    script.onerror = handleError
    document.head.appendChild(script)
  })

  return recaptchaApiPromise
}

export default {
  name: 'ContactForm',
  components: {
    ThankYouPopup,
    CopyEmailButton
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
      showThankYou: false,
      submitting: false,
      recaptchaMessage: '',
      recaptchaReady: false,
      recaptchaWidgetId: null
    }
  },
  mounted() {
    this.initializeRecaptcha()
  },
  methods: {
    async initializeRecaptcha() {
      try {
        const grecaptcha = await loadRecaptchaApi()

        if (!this.$refs.recaptcha || this.recaptchaWidgetId !== null) {
          return
        }

        this.recaptchaWidgetId = grecaptcha.render(this.$refs.recaptcha, {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: this.handleRecaptchaVerified,
          'expired-callback': this.handleRecaptchaExpired,
          'error-callback': this.handleRecaptchaError
        })
        this.recaptchaReady = true
        this.recaptchaMessage = ''
      } catch (error) {
        console.error('Failed to initialize reCAPTCHA.', error)
        this.recaptchaReady = false
        this.recaptchaMessage =
          'Security verification could not load. Please refresh and try again.'
      }
    },

    async submitForm() {
      if (!this.recaptchaReady || this.recaptchaWidgetId === null) {
        this.recaptchaMessage =
          'Security verification is still loading. Please wait a moment and try again.'
        return
      }

      const recaptchaResponse = this.getRecaptchaResponse()
      if (!recaptchaResponse) {
        this.recaptchaMessage = 'Please complete the reCAPTCHA.'
        return
      }

      this.recaptchaMessage = ''
      this.submitting = true

      try {
        const formData = new FormData()

        Object.entries(this.formData).forEach(([key, value]) => {
          formData.append(key, value)
        })

        formData.append('g-recaptcha-response', recaptchaResponse)
        formData.append('_captcha', 'false')

        await axios.post(
          'https://formsubmit.co/ajax/Jennysflowersau@gmail.com',
          formData
        )

        this.showThankYou = true
        this.resetForm()

        if (window.grecaptcha && this.recaptchaWidgetId !== null) {
          window.grecaptcha.reset(this.recaptchaWidgetId)
        }
      } catch (error) {
        alert(
          'Sorry, there was a problem sending your message. Please try again.'
        )
      } finally {
        this.submitting = false
      }
    },

    handleRecaptchaVerified() {
      this.recaptchaMessage = ''
    },

    handleRecaptchaExpired() {
      this.recaptchaMessage = 'Please complete the reCAPTCHA.'
    },

    handleRecaptchaError() {
      this.recaptchaMessage =
        'Security verification failed. Please refresh and try again.'
    },

    getRecaptchaResponse() {
      if (!window.grecaptcha || this.recaptchaWidgetId === null) {
        return ''
      }

      try {
        return window.grecaptcha.getResponse(this.recaptchaWidgetId)
      } catch {
        return ''
      }
    },

    resetForm() {
      this.formData = {
        name: '',
        phone: '',
        email: '',
        message: ''
      }
      this.recaptchaMessage = ''
    },

    closePopup() {
      this.showThankYou = false
    }
  }
}
</script>

<style scoped>
.contact-form-container {
  width: min(100%, 52rem);
  margin: 0 auto;
  padding: clamp(1.25rem, 2vw, 2rem);
  position: relative;
  background: var(--color-bg);
  /* border: 1px solid var(--color-border); */
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-soft);
}

.contact-intro {
  margin-bottom: var(--space-4);
}

.contact-intro :deep(.contact-email-link) {
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-color: var(--color-primary-light);
}

.contact-form {
  margin-top: var(--space-3);
}

.client-info {
  font-size: var(--font-size-body);
}

.form-group {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.form-group--spacious {
  margin-bottom: var(--space-5);
}

.form-group--recaptcha {
  margin-bottom: var(--space-4);
}

.form-label {
  color: var(--color-primary-dark);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.form-control {
  border: 1.5px solid var(--color-primary-light);
  border-radius: 0.8rem;
  padding: 0.85rem 1rem;
  background-color: var(--color-white);
  color: var(--color-text);
}

.form-control::placeholder {
  color: var(--color-text-muted);
  opacity: 0.85;
}

.form-control:focus {
  box-shadow: 0 0 0 0.18rem rgba(126, 139, 97, 0.16);
  border-color: var(--color-primary);
}

textarea.form-control {
  min-height: 8.75rem;
  resize: vertical;
}

.submit-button {
  min-width: 8.75rem;
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.1rem;
  letter-spacing: 0.04em;
}

.submit-button:hover,
.submit-button:focus-visible {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
  color: var(--color-white);
}

.submit-button:disabled {
  opacity: 0.8;
}

.recaptcha-slot {
  transform-origin: left top;
}

@media (max-width: 767.98px) {
  .contact-form-container {
    padding: 1rem;
  }

  .submit-button {
    width: 100%;
  }
}

@media (max-width: 430px) {
  .recaptcha-slot {
    transform: scale(0.9);
  }
}
</style>
