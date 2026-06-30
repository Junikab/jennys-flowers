<template>
  <Teleport to="body">
    <div
      v-if="show && image"
      class="lightbox-modal"
      role="dialog"
      aria-modal="true"
      :aria-label="image.title || image.alt || 'Image preview'"
      @click.self="$emit('close')"
    >
      <button
        ref="closeButton"
        type="button"
        class="lightbox-close"
        aria-label="Close image preview"
        @click="$emit('close')"
      >
        &times;
      </button>

      <div
        class="lightbox-stage"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
        @touchcancel="resetTouchState"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :title="image.title || image.alt"
          class="lightbox-image"
        />
      </div>

      <div class="lightbox-nav-row">
        <button
          type="button"
          class="lightbox-nav"
          aria-label="Show previous image"
          :disabled="!canGoPrevious"
          @click="$emit('previous')"
        >
          &#8249;
        </button>
        <button
          type="button"
          class="lightbox-nav"
          aria-label="Show next image"
          :disabled="!canGoNext"
          @click="$emit('next')"
        >
          &#8250;
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: 'LightboxModal',
  emits: ['close', 'previous', 'next'],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    image: {
      type: Object,
      default: null
    },
    canGoPrevious: {
      type: Boolean,
      default: false
    },
    canGoNext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      previousBodyOverflow: '',
      touchStartX: null,
      touchStartY: null
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(isOpen) {
        this.togglePageScroll(isOpen)

        if (isOpen) {
          this.$nextTick(() => {
            this.$refs.closeButton?.focus()
          })
          return
        }

        this.resetTouchState()
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
    this.togglePageScroll(false)
  },
  methods: {
    handleKeydown(event) {
      if (!this.show) {
        return
      }

      if (event.key === 'Escape') {
        this.$emit('close')
        return
      }

      if (event.key === 'ArrowLeft' && this.canGoPrevious) {
        this.$emit('previous')
        return
      }

      if (event.key === 'ArrowRight' && this.canGoNext) {
        this.$emit('next')
      }
    },
    handleTouchStart(event) {
      if (event.touches.length !== 1) {
        this.resetTouchState()
        return
      }

      this.touchStartX = event.touches[0].clientX
      this.touchStartY = event.touches[0].clientY
    },
    handleTouchEnd(event) {
      if (this.touchStartX === null || this.touchStartY === null) {
        return
      }

      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - this.touchStartX
      const deltaY = touch.clientY - this.touchStartY
      const horizontalDistance = Math.abs(deltaX)
      const verticalDistance = Math.abs(deltaY)

      this.resetTouchState()

      if (horizontalDistance < 50 || horizontalDistance <= verticalDistance) {
        return
      }

      if (deltaX < 0 && this.canGoNext) {
        this.$emit('next')
        return
      }

      if (deltaX > 0 && this.canGoPrevious) {
        this.$emit('previous')
      }
    },
    resetTouchState() {
      this.touchStartX = null
      this.touchStartY = null
    },
    togglePageScroll(isOpen) {
      if (typeof document === 'undefined') {
        return
      }

      if (isOpen) {
        this.previousBodyOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return
      }

      document.body.style.overflow = this.previousBodyOverflow
    }
  }
}
</script>

<style scoped>
.lightbox-modal {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  padding-bottom: calc(clamp(1rem, 3vw, 2rem) + 4.75rem);
  background: rgba(47, 47, 42, 0.72);
  backdrop-filter: blur(4px);
  overscroll-behavior: contain;
}

.lightbox-stage {
  width: min(80vw, 72rem);
  max-width: 100%;
  max-height: 80dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: pan-y pinch-zoom;
}

.lightbox-image {
  display: block;
  max-width: 100%;
  max-height: 80dvh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-panel);
  box-shadow: 0 1.25rem 3rem rgba(47, 47, 42, 0.28);
}

.lightbox-nav-row {
  position: fixed;
  left: 50%;
  bottom: max(1rem, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.35rem 0.45rem;
  border: 1px solid var(--color-primary-light);
  border-radius: 999px;
  background: rgba(243, 234, 223, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 1rem 2rem rgba(47, 47, 42, 0.18);
}

.lightbox-nav {
  position: static;
  width: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--color-primary-dark);
  font-size: 2.4rem;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.lightbox-close {
  position: fixed;
  width: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-primary-dark);
  top: max(1rem, env(safe-area-inset-top));
  right: max(1rem, env(safe-area-inset-right));
  font-size: 2rem;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
}

.lightbox-nav:hover,
.lightbox-nav:focus-visible,
.lightbox-close:hover,
.lightbox-close:focus-visible {
  background: var(--color-primary);
  color: var(--color-white);
}

.lightbox-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

@media (max-width: 767px) {
  .lightbox-modal {
    padding: 0.85rem;
    padding-bottom: calc(0.85rem + 4.25rem);
  }

  .lightbox-stage,
  .lightbox-image {
    max-height: 72dvh;
  }

  .lightbox-image {
    width: 100%;
  }

  .lightbox-nav-row {
    gap: 0.7rem;
    bottom: max(0.75rem, env(safe-area-inset-bottom));
    padding: 0.3rem 0.4rem;
  }

  .lightbox-nav,
  .lightbox-close {
    width: 2.75rem;
    height: 2.75rem;
  }

  .lightbox-nav {
    font-size: 2rem;
  }

  .lightbox-close {
    font-size: 1.85rem;
  }
}
</style>
