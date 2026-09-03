<template>
  <div class="form-group" :class="additionalClass">
    <label :for="id" class="form-label">
      {{ label }}<span v-if="required" aria-hidden="true"> *</span>
    </label>
    <small v-if="error" :id="errorId" class="form-field-error">
      {{ error }}
    </small>

    <textarea
      v-if="multiline"
      ref="control"
      v-bind="$attrs"
      :id="id"
      :name="controlName"
      :required="required"
      :value="modelValue"
      :aria-invalid="Boolean(error)"
      :aria-describedby="ariaDescribedBy"
      class="form-control"
      @input="handleInput"
    ></textarea>
    <input
      v-else
      ref="control"
      v-bind="$attrs"
      :id="id"
      :name="controlName"
      :type="type"
      :required="required"
      :value="modelValue"
      :aria-invalid="Boolean(error)"
      :aria-describedby="ariaDescribedBy"
      class="form-control"
      @input="handleInput"
    />

    <slot></slot>
    <small v-if="hint" :id="hintId" class="form-hint">{{ hint }}</small>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  inheritAttrs: false,
  emits: ['update:modelValue', 'input'],
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    required: Boolean,
    multiline: Boolean,
    error: {
      type: String,
      default: ''
    },
    hint: {
      type: String,
      default: ''
    },
    describedBy: {
      type: String,
      default: ''
    },
    additionalClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    controlName() {
      return this.name || this.id
    },
    errorId() {
      return `${this.id}-error`
    },
    hintId() {
      return `${this.id}-hint`
    },
    ariaDescribedBy() {
      const descriptionIds = [
        this.error ? this.errorId : '',
        this.hint ? this.hintId : '',
        this.describedBy
      ].filter(Boolean)

      return descriptionIds.join(' ') || null
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit('update:modelValue', value)
      this.$emit('input', value)
    },
    focus() {
      this.$refs.control?.focus()
    }
  }
}
</script>

<style scoped>
.form-group {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.form-group--spacious {
  margin-bottom: var(--space-5);
}

.form-label {
  color: var(--color-primary-dark);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.form-field-error {
  margin: -0.35rem 0;
  color: #b42318;
  font-size: 0.9rem;
  line-height: 1.3;
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

.form-control[aria-invalid='true'] {
  border-color: #b42318;
}

.form-control:disabled {
  border-color: var(--color-border);
  background-color: var(--color-surface);
  color: var(--color-text-muted);
  opacity: 1;
}

input[type='date'] {
  color-scheme: light;
  cursor: pointer;
}

input[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.72;
}

input[type='date']:disabled {
  cursor: not-allowed;
}

.form-hint {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

textarea.form-control {
  min-height: 8.75rem;
  resize: vertical;
}
</style>
