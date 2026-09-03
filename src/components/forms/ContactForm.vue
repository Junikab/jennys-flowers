<template>
  <div class="contact-form-container">
    <ThankYouPopup :show="showThankYou" @close="closePopup" />
    <p class="text-center contact-intro body-copy">
      Please fill in the contact form below or email us at
      <CopyEmailButton
        :email="contactConfig.email"
        :aria-label="contactConfig.copyEmailAriaLabel"
        button-class="contact-email-link"
      />
    </p>
    <div>
      <form @submit.prevent="submitForm" class="contact-form" novalidate>
        <div class="client-info text-start">
          <div class="contact-form__honeypot" aria-hidden="true">
            <label for="website">Website</label>
            <input
              id="website"
              type="text"
              name="website"
              v-model="formData.website"
              tabindex="-1"
              autocomplete="off"
            />
          </div>
          <FormField
            ref="nameField"
            id="name"
            name="name"
            label="Name"
            v-model="formData.name"
            required
            :error="validationErrors.name"
            autocomplete="name"
            maxlength="100"
            @input="clearFieldError('name')"
          />
          <FormField
            ref="phoneField"
            id="tel"
            name="phone"
            label="Phone"
            type="tel"
            v-model="formData.phone"
            :error="validationErrors.phone"
            inputmode="numeric"
            autocomplete="tel"
            maxlength="15"
            @input="handlePhoneInput"
          />
          <FormField
            ref="emailField"
            id="email"
            name="email"
            label="Email address"
            type="email"
            v-model="formData.email"
            required
            :error="validationErrors.email"
            placeholder="name@example.com"
            autocomplete="email"
            maxlength="254"
            additional-class="form-group--spacious"
            @input="clearFieldError('email')"
          />

          <div class="event-details">
            <FormField
              ref="eventDateField"
              id="event-date"
              name="eventDate"
              label="Event date"
              type="date"
              v-model="formData.eventDate"
              required
              :disabled="formData.eventDateUnknown"
              :error="validationErrors.eventDate"
              described-by="event-date-hint"
              @input="clearFieldError('eventDate')"
            >
              <label class="date-unknown-option">
                <input
                  type="checkbox"
                  name="eventDateUnknown"
                  v-model="formData.eventDateUnknown"
                  @change="handleUnknownDateChange"
                />
                <span id="event-date-hint">Date not known yet</span>
              </label>
            </FormField>

            <FormField
              ref="venueLocationField"
              id="venue-location"
              name="venueLocation"
              label="Venue / Location"
              v-model="formData.venueLocation"
              required
              :error="validationErrors.venueLocation"
              hint="Up to 50 characters"
              maxlength="50"
              @input="clearFieldError('venueLocation')"
            />
          </div>

          <FormField
            ref="messageField"
            id="message"
            name="message"
            label="Message"
            v-model="formData.message"
            required
            multiline
            :error="validationErrors.message"
            rows="3"
            maxlength="2000"
            @input="clearFieldError('message')"
          />
          <div class="recaptcha-group">
            <div ref="recaptcha" class="recaptcha-slot"></div>
            <small v-if="recaptchaMessage" class="text-danger">{{
              recaptchaMessage
            }}</small>
          </div>
          <p v-if="submissionError" class="contact-form__error" role="alert">
            {{ submissionError }}
          </p>
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
import ThankYouPopup from '../ui/ThankYouPopup.vue'
import CopyEmailButton from '../ui/CopyEmailButton.vue'
import FormField from './FormField.vue'
import {
  createEmptyContactFormData,
  validateContactForm
} from './contactFormValidation'
import { getContactConfig } from '../../data/contactDetails'
import { loadRecaptchaApi } from '../../services/recaptcha'

const RECAPTCHA_SITE_KEY = '6Ld7xDArAAAAAAvbJMfFCgIcZlzmkXX2W0Tr_JdC'

export default {
  name: 'ContactForm',
  components: {
    ThankYouPopup,
    CopyEmailButton,
    FormField
  },
  data() {
    return {
      formData: createEmptyContactFormData(),
      showThankYou: false,
      submitting: false,
      submissionError: '',
      validationErrors: {},
      recaptchaMessage: '',
      recaptchaReady: false,
      recaptchaWidgetId: null
    }
  },
  computed: {
    contactConfig() {
      return getContactConfig()
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
      } catch {
        this.recaptchaReady = false
        this.recaptchaMessage =
          'Security verification could not load. Please refresh and try again.'
      }
    },

    async submitForm() {
      if (!this.validateForm()) {
        return
      }

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
      this.submissionError = ''
      this.submitting = true

      try {
        const formData = new FormData()

        const submissionFields = {
          name: this.formData.name,
          phone: this.formData.phone,
          email: this.formData.email,
          'Event date': this.formData.eventDateUnknown
            ? 'Date not known yet'
            : this.formData.eventDate,
          'Venue / Location': this.formData.venueLocation,
          message: this.formData.message
        }

        Object.entries(submissionFields).forEach(([key, value]) => {
          formData.append(key, value)
        })

        formData.append('_honey', this.formData.website)
        formData.append('g-recaptcha-response', recaptchaResponse)
        formData.append('_captcha', 'false')
        formData.append('_subject', "New Jenny's Flowers website enquiry")
        formData.append('_template', 'table')

        const response = await fetch(this.contactConfig.formSubmitUrl, {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`Form submit failed with status ${response.status}`)
        }

        this.showThankYou = true
        this.resetForm()

        if (window.grecaptcha && this.recaptchaWidgetId !== null) {
          window.grecaptcha.reset(this.recaptchaWidgetId)
        }
      } catch (error) {
        this.submissionError =
          'Sorry, there was a problem sending your message. Please try again.'
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

    clearFieldError(fieldKey) {
      if (this.validationErrors[fieldKey]) {
        this.validationErrors[fieldKey] = ''
      }
    },

    handlePhoneInput(value) {
      const digitsOnly = value.replace(/\D+/g, '').slice(0, 15)
      this.formData.phone = digitsOnly
      this.clearFieldError('phone')
    },

    handleUnknownDateChange() {
      if (this.formData.eventDateUnknown) {
        this.formData.eventDate = ''
      }

      this.clearFieldError('eventDate')
    },

    validateForm() {
      const { formData, errors, firstInvalidField } = validateContactForm(
        this.formData
      )
      this.formData = formData
      this.validationErrors = errors

      if (firstInvalidField) {
        this.$nextTick(() => {
          this.$refs[`${firstInvalidField}Field`]?.focus()
        })
        return false
      }

      return true
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
      this.formData = createEmptyContactFormData()
      this.validationErrors = {}
      this.recaptchaMessage = ''
      this.submissionError = ''
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

.contact-form__honeypot {
  position: absolute;
  left: -9999px;
}

.contact-form__error {
  margin: 0 0 var(--space-3);
  color: #b42318;
}

.client-info {
  font-size: var(--font-size-body);
}

.recaptcha-group {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.event-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 0 var(--space-4);
  margin-bottom: var(--space-2);
}

.event-details :deep(.form-control) {
  height: 3.75rem;
}

.date-unknown-option {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  width: fit-content;
  color: var(--color-text-muted);
  cursor: pointer;
  line-height: 1.35;
}

.date-unknown-option input {
  width: 1.1rem;
  height: 1.1rem;
  margin: 0;
  accent-color: var(--color-primary);
  cursor: pointer;
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

  .event-details {
    grid-template-columns: 1fr;
    gap: 0;
  }
}

@media (max-width: 430px) {
  .recaptcha-slot {
    transform: scale(0.9);
  }
}
</style>
