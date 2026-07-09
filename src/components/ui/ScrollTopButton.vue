<template>
  <button
    v-show="isVisible"
    type="button"
    class="scroll-top-button"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <i class="fas fa-arrow-up" aria-hidden="true"></i>
  </button>
</template>

<script>
export default {
  name: 'ScrollTopButton',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    this.updateVisibility()
    window.addEventListener('scroll', this.updateVisibility, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.updateVisibility)
  },
  methods: {
    updateVisibility() {
      this.isVisible = window.scrollY > 320
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.scroll-top-button {
  position: fixed;
  right: clamp(0.9rem, 2vw, 1.5rem);
  bottom: clamp(1rem, 2.5vw, 1.75rem);
  z-index: 120;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  background: rgba(250, 246, 239, 0.94);
  color: var(--color-primary-dark);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, background-color 0.25s ease,
    color 0.25s ease, opacity 0.25s ease;
}

.scroll-top-button:hover,
.scroll-top-button:focus-visible {
  background: var(--color-accent);
  color: var(--color-white);
  transform: translateY(-2px);
}

@media (max-width: 575.98px) {
  .scroll-top-button {
    width: 2.7rem;
    height: 2.7rem;
    right: 0.85rem;
    bottom: 0.9rem;
  }
}
</style>
