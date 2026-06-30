<template>
  <div
    class="hero-slideshow"
    :style="{ '--hero-progress-duration': `${intervalMs}ms` }"
    :aria-label="ariaLabel"
  >
    <div class="hero-slides" aria-hidden="true">
      <div
        v-for="(image, index) in slides"
        :key="image.id || index"
        class="hero-slide"
        :class="{ 'hero-slide--active': index === activeIndex }"
      >
        <img
          :src="image.src"
          :alt="image.alt || image.title || ''"
          :title="image.title || image.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
          class="hero-image"
        />
      </div>
    </div>

    <div class="hero-overlay">
      <slot :active-image="activeImage" :active-index="activeIndex" />
    </div>

    <div v-if="hasMultipleSlides" class="hero-progress" aria-hidden="true">
      <span
        :key="progressKey"
        class="hero-progress-bar"
        :class="{ 'hero-progress-bar--paused': prefersReducedMotion }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroSlideshow',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    intervalMs: {
      type: Number,
      default: 7000
    },
    ariaLabel: {
      type: String,
      default: 'Hero slideshow'
    }
  },
  data() {
    return {
      activeIndex: 0,
      autoplayTimer: null,
      prefersReducedMotion: false,
      progressKey: 0
    }
  },
  computed: {
    slides() {
      return this.images.filter((image) => image && image.src)
    },
    hasMultipleSlides() {
      return this.slides.length > 1
    },
    activeImage() {
      return this.slides[this.activeIndex] || null
    }
  },
  watch: {
    images: {
      deep: true,
      handler() {
        if (this.activeIndex >= this.slides.length) {
          this.activeIndex = 0
        }

        this.progressKey += 1
        this.startAutoplay()
      }
    },
    intervalMs() {
      this.progressKey += 1
      this.startAutoplay()
    }
  },
  mounted() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    }

    this.startAutoplay()
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    startAutoplay() {
      this.stopAutoplay()

      if (!this.hasMultipleSlides || this.prefersReducedMotion) {
        return
      }

      this.autoplayTimer = window.setInterval(() => {
        this.activeIndex = (this.activeIndex + 1) % this.slides.length
        this.progressKey += 1
      }, this.intervalMs)
    },
    stopAutoplay() {
      if (!this.autoplayTimer) {
        return
      }

      window.clearInterval(this.autoplayTimer)
      this.autoplayTimer = null
    }
  }
}
</script>

<style scoped>
.hero-slideshow {
  position: relative;
  width: 100%;
  min-height: clamp(28rem, 68vh, 46rem);
  overflow: hidden;
  background: var(--color-surface);
}

.hero-slides {
  position: absolute;
  inset: 0;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
}

.hero-slide--active {
  opacity: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: clamp(2.5rem, 7vw, 5.5rem) 0 calc(clamp(2.5rem, 7vw, 5.5rem) + 1rem);
}

.hero-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  height: 3px;
  background: rgba(255, 255, 255, 0.28);
}

.hero-progress-bar {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-white);
  transform: scaleX(0);
  transform-origin: left center;
  animation: hero-progress var(--hero-progress-duration) linear forwards;
}

.hero-progress-bar--paused {
  animation: none;
  transform: scaleX(1);
}

@keyframes hero-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@media (max-width: 767.98px) {
  .hero-slideshow {
    min-height: clamp(24rem, 62vh, 34rem);
  }

  .hero-overlay {
    padding: clamp(2rem, 8vw, 3.5rem) 0 calc(clamp(2rem, 8vw, 3.5rem) + 1rem);
  }
}
</style>
