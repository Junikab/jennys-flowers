<template>
  <div class="contact-form-container">
    <ThankYouPopup :show="showThankYou" @close="closePopup" />
    <p class="text-center contact-intro body-copy">
      Please fill in the contact form below or email us at
      <a href="mailto:Jennysflowersau@gmail.com">Jennysflowersau@gmail.com</a>
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
            <div
              ref="recaptcha"
              class="g-recaptcha"
              data-sitekey="6Ld7xDArAAAAAAvbJMfFCgIcZlzmkXX2W0Tr_JdC"
            ></div>
            <small v-if="recaptchaError" class="text-danger"
              >Please complete the reCAPTCHA</small
            >
          </div>
        </div>
        <button
          type="submit"
          class="pill-button submit-button"
          :disabled="submitting"
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
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        message: ''
      },
      showThankYou: false,
      submitting: false,
      recaptchaError: false
    }
  },
  mounted() {
    const existingScript = document.getElementById('google-recaptcha-script')

    if (!existingScript) {
      const script = document.createElement('script')
      script.id = 'google-recaptcha-script'
      script.src = 'https://www.google.com/recaptcha/api.js'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  },
  methods: {
    async submitForm() {
      // Validate reCAPTCHA first
      const recaptchaResponse = this.getRecaptchaResponse()
      if (!recaptchaResponse) {
        this.recaptchaError = true
        return
      }

      this.recaptchaError = false
      this.submitting = true

      try {
        const formData = new FormData()

        // Add all form fields
        Object.entries(this.formData).forEach(([key, value]) => {
          formData.append(key, value)
        })

        // Add reCAPTCHA response
        formData.append('g-recaptcha-response', recaptchaResponse)

        // Add FormSubmit specific fields
        formData.append('_captcha', 'false')

        // Send to FormSubmit
        await axios.post(
          'https://formsubmit.co/ajax/Jennysflowersau@gmail.com',
          formData
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
        alert(
          'Sorry, there was a problem sending your message. Please try again.'
        )
      } finally {
        this.submitting = false
      }
    },

    getRecaptchaResponse() {
      return window.grecaptcha ? window.grecaptcha.getResponse() : ''
    },

    resetForm() {
      this.formData = {
        name: '',
        phone: '',
        email: '',
        message: ''
      }
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

.g-recaptcha {
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
  .g-recaptcha {
    transform: scale(0.9);
  }
}
</style>
