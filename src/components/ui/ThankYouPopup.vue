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
</style>