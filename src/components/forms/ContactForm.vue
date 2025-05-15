<template>
  <div class="contact-form-container">
    <!-- Thank you popup -->
    <div v-if="showThankYou" class="thank-you-popup">
      <div class="popup-content">
        <button @click="closePopup" class="close-btn">&times;</button>
        <p>Thank you for choosing us!</p>
      </div>
    </div>

    <!-- <div class="col-12">
      <img
        src="@/assets/images/icons/divider.png"
        alt="Jenny's Flowers Logo"
        height="150"
        class="d-inline-block align-text-top rounded-circle"
      />
    </div> -->
    <p class="text-center contact-intro">
      Please fill in the contact form below or email us at
      <a href="mailto:Jennysflowersau@gmail.com">Jennysflowersau@gmail.com</a>
    </p>
    <div>
      <form @submit.prevent="submitForm" class="mt-4">
        <!-- Form inputs remain the same, just removed action/method attributes -->
        <div class="client-info text-start">
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
            <label for="tel" class="form-label">Phone *</label>
            <input
              type="tel"
              name="phone"
              v-model="formData.phone"
              class="form-control"
              id="tel"
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
              required
            ></textarea>
          </div>
          <div class="mb-4">
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
          class="btn btn-dark px-4 py-2"
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

export default {
  name: 'ContactForm',
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
    // Load Google reCAPTCHA script
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
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
        console.error('Error submitting form:', error)
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.contact-intro {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 1.3rem;
}
.client-info {
  font-size: 1.3rem;
}

.form-control {
  border: 2px solid #333;
  border-radius: 0;
  padding: 0.75rem;
}

.form-control:focus {
  box-shadow: none;
  border-color: rgb(48, 17, 35, 0.8);
}

.btn {
  min-width: 120px;
  background-color: rgb(48, 17, 35, 0.8);
  border-radius: 0;
  font-size: 1.3rem;
}
.btn:hover {
  background-color: rgb(180, 98, 152);
}

/* Thank you popup styling */
.thank-you-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: rgba(48, 17, 35, 0.9);
  color: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  max-width: 400px;
  width: 90%;
}

.popup-content p {
  font-size: 1.5rem;
  margin-bottom: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

/* Make the form look good on phones */
@media (max-width: 768px) {
  .contact-form-container {
    padding: 10px;
  }
}
</style>
