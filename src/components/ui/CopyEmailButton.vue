<template>
  <span class="copy-email">
    <button
      type="button"
      :class="['copy-email__button', buttonClass]"
      :aria-label="resolvedAriaLabel"
      @click="copyEmail"
    >
      <slot>{{ email }}</slot>
    </button>
    <span
      v-if="feedbackText"
      class="copy-email__message"
      :class="{
        'copy-email__message--visible': feedbackVisible,
        'copy-email__message--error': copyState === 'error'
      }"
      role="status"
      aria-live="polite"
    >
      {{ feedbackText }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'CopyEmailButton',
  props: {
    email: {
      type: String,
      required: true
    },
    ariaLabel: {
      type: String,
      default: ''
    },
    buttonClass: {
      type: [String, Array, Object],
      default: ''
    },
    successMessage: {
      type: String,
      default: 'Email copied'
    },
    errorMessage: {
      type: String,
      default: 'Copy failed'
    }
  },
  data() {
    return {
      copyState: 'idle',
      feedbackText: '',
      feedbackVisible: false,
      feedbackTimeoutId: null
    }
  },
  computed: {
    resolvedAriaLabel() {
      return this.ariaLabel || `Copy email address ${this.email}`
    }
  },
  beforeUnmount() {
    this.clearFeedbackTimeout()
  },
  methods: {
    async copyEmail() {
      const copied = await this.writeToClipboard(this.email)

      this.copyState = copied ? 'success' : 'error'
      this.feedbackText = copied ? this.successMessage : this.errorMessage
      this.feedbackVisible = true

      this.clearFeedbackTimeout()
      this.feedbackTimeoutId = window.setTimeout(() => {
        this.feedbackVisible = false
        this.feedbackText = ''
      }, 2200)
    },
    async writeToClipboard(value) {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(value)
          return true
        } catch (error) {
          // Fallback below handles browsers that block clipboard API.
        }
      }

      const fallbackField = document.createElement('textarea')
      fallbackField.value = value
      fallbackField.setAttribute('readonly', '')
      fallbackField.style.position = 'fixed'
      fallbackField.style.opacity = '0'
      document.body.appendChild(fallbackField)
      fallbackField.select()

      try {
        return document.execCommand('copy')
      } catch (error) {
        return false
      } finally {
        document.body.removeChild(fallbackField)
      }
    },
    clearFeedbackTimeout() {
      if (!this.feedbackTimeoutId) {
        return
      }

      window.clearTimeout(this.feedbackTimeoutId)
      this.feedbackTimeoutId = null
    }
  }
}
</script>

<style scoped>
.copy-email {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.copy-email__button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-decoration: inherit;
  cursor: pointer;
}

.copy-email__message {
  color: var(--color-primary-dark);
  font-size: 0.85rem;
  opacity: 0;
  transform: translateY(-1px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.copy-email__message--visible {
  opacity: 1;
  transform: translateY(0);
}

.copy-email__message--error {
  color: var(--color-accent);
}
</style>
