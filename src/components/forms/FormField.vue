<!-- /src/components/forms/FormField.vue -->
<template>
  <div class="mb-3" :class="additionalClass">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :required="required"
      :placeholder="placeholder"
      v-model="inputValue"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    id: String,
    label: String,
    modelValue: String,
    type: {
      type: String,
      default: 'text'
    },
    required: Boolean,
    placeholder: String,
    additionalClass: String
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>