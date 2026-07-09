<!-- /src/components/ui/ThankYouPopup.vue -->
<template>
  <div v-if="show" class="thank-you-popup">
    <div class="popup-content">
      <button @click="$emit('close')" class="close-btn">&times;</button>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYouPopup',
  props: {
    show: Boolean,
    message: {
      type: String,
      default: 'Thank you for choosing us!'
    }
  }
}
</script>

<style scoped>
.thank-you-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(47, 47, 42, 0.42);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: var(--color-surface);
  color: var(--color-primary-dark);
  padding: 2rem 1.5rem;
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-panel);
  text-align: center;
  position: relative;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-soft);
}

.popup-content p {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin-bottom: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 24px;
  cursor: pointer;
}
</style>
