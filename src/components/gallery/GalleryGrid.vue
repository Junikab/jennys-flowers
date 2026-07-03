<template>
  <div
    :class="[
      'gallery-grid',
      outerClass,
      { 'gallery-grid--masonry': layoutMode === 'masonry' }
    ]"
  >
    <div
      v-if="layoutMode === 'masonry'"
      ref="masonryGrid"
      class="gallery-masonry"
    >
      <figure
        v-for="(image, index) in images"
        :key="image.id || index"
        class="gallery-tile gallery-tile--masonry"
      >
        <button
          v-if="clickable"
          type="button"
          class="gallery-image-trigger gallery-tile-media"
          :aria-label="`Open ${image.title || image.alt}`"
          @click="selectImage(image, index)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            :title="image.title || image.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            class="gallery-image gallery-image--masonry"
            @load="scheduleMasonryLayout"
          />
        </button>
        <img
          v-else
          :src="image.src"
          :alt="image.alt"
          :title="image.title || image.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
          class="gallery-image gallery-image--masonry gallery-tile-media"
          @load="scheduleMasonryLayout"
        />
      </figure>
    </div>

    <div v-else :class="['gallery-row', rowClass]">
      <div
        v-for="(image, index) in images"
        :key="image.id || index"
        :class="columnClass"
      >
        <figure class="gallery-tile">
          <button
            v-if="clickable"
            type="button"
            class="gallery-image-trigger"
            :aria-label="`Open ${image.title || image.alt}`"
            @click="selectImage(image, index)"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              :title="image.title || image.alt"
              :loading="index === 0 ? 'eager' : 'lazy'"
              decoding="async"
              class="gallery-image"
            />
          </button>
          <img
            v-else
            :src="image.src"
            :alt="image.alt"
            :title="image.title || image.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            class="gallery-image"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

const DEFAULT_MASONRY_ROW_HEIGHT = 8

export default {
  name: 'GalleryGrid',
  emits: ['select'],
  props: {
    images: {
      type: Array,
      default: () => []
    },
    layoutMode: {
      type: String,
      default: 'bootstrap'
    },
    outerClass: {
      type: String,
      default: 'gallery-block container-fluid px-0'
    },
    rowClass: {
      type: String,
      default: 'row g-3 justify-content-center'
    },
    columnClass: {
      type: String,
      default: 'col-12 col-sm-6 col-lg-4'
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      masonryFrame: null
    }
  },
  watch: {
    images() {
      this.scheduleMasonryLayout()
    },
    layoutMode() {
      this.scheduleMasonryLayout()
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.scheduleMasonryLayout, {
        passive: true
      })
    }

    this.scheduleMasonryLayout()
  },
  beforeUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.scheduleMasonryLayout)
      window.cancelAnimationFrame(this.masonryFrame)
    }
  },
  methods: {
    scheduleMasonryLayout() {
      if (typeof window === 'undefined' || this.layoutMode !== 'masonry') {
        return
      }

      window.cancelAnimationFrame(this.masonryFrame)
      this.masonryFrame = window.requestAnimationFrame(() => {
        nextTick(() => {
          this.updateMasonryLayout()
        })
      })
    },
    updateMasonryLayout() {
      const grid = this.$refs.masonryGrid

      if (!grid) {
        return
      }

      const styles = window.getComputedStyle(grid)
      const rowHeight =
        Number.parseFloat(
          styles.getPropertyValue('--gallery-masonry-row-height')
        ) || DEFAULT_MASONRY_ROW_HEIGHT
      const rowGap = Number.parseFloat(styles.rowGap) || 0
      const tileElements = grid.querySelectorAll('.gallery-tile--masonry')

      tileElements.forEach((tileElement) => {
        const mediaElement = tileElement.querySelector('.gallery-tile-media')

        if (!mediaElement) {
          return
        }

        const mediaHeight = mediaElement.getBoundingClientRect().height
        const span = Math.max(
          1,
          Math.ceil((mediaHeight + rowGap) / (rowHeight + rowGap))
        )

        tileElement.style.gridRowEnd = `span ${span}`
      })
    },
    selectImage(image, index) {
      if (!this.clickable) {
        return
      }

      this.$emit('select', { image, index })
    }
  }
}
</script>

<style scoped>
.gallery-grid--masonry {
  width: min(90vw, 1600px);
  max-width: 100%;
  margin: 0 auto;
}

.gallery-row {
  margin: 0;
}

.gallery-tile {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-panel);
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-soft);
  aspect-ratio: 4 / 5;
}

.gallery-masonry {
  --gallery-masonry-row-height: 8px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: var(--gallery-masonry-row-height);
  gap: 0.45rem;
  align-items: start;
}

.gallery-image-trigger {
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  display: block;
  cursor: zoom-in;
}

.gallery-image-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.gallery-tile--masonry {
  grid-row-end: span 1;
  margin-bottom: 0;
  overflow: hidden;
  aspect-ratio: auto;
  border-radius: var(--radius-panel);
  background: transparent;
  box-shadow: none;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-image--masonry {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.gallery-tile:hover .gallery-image {
  transform: scale(1.03);
}

@media (min-width: 900px) {
  .gallery-masonry {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .gallery-masonry {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
