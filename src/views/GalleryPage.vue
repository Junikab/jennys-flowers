<template>
  <section class="gallery-page page-shell section-stack">
    <div class="page-copy">
      <div class="gallery-copy">
        <h1 class="page-heading">Gallery</h1>
        <div class="gallery-filters">
          <button
            v-for="filter in filters"
            :key="filter.value"
            type="button"
            class="pill-button filter-button"
            :class="{ active: activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <GalleryGrid
      :images="filteredImages"
      layout-mode="masonry"
      clickable
      @select="openPreview"
    />
    <LightboxModal
      :show="Boolean(activeImage)"
      :image="activeImage"
      :can-go-previous="activeImageIndex > 0"
      :can-go-next="activeImageIndex < filteredImages.length - 1"
      @close="closePreview"
      @previous="showPreviousImage"
      @next="showNextImage"
    />
  </section>
</template>

<script>
import GalleryGrid from '../components/gallery/GalleryGrid.vue'
import LightboxModal from '../components/ui/LightboxModal.vue'
import {
  getGalleryImages,
  getGalleryImagesByCategory
} from '../data/galleryImages'

export default {
  name: 'GalleryPage',
  components: {
    GalleryGrid,
    LightboxModal
  },
  data() {
    return {
      galleryImages: getGalleryImages(),
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Weddings', value: 'weddings' },
        { label: 'Arrangements', value: 'arrangements' }
      ],
      activeFilter: 'all',
      activeImageId: null
    }
  },
  computed: {
    filteredImages() {
      if (this.activeFilter === 'all') {
        return this.galleryImages
      }

      return getGalleryImagesByCategory(this.activeFilter)
    },
    activeImage() {
      return (
        this.filteredImages.find((image) => image.id === this.activeImageId) ||
        null
      )
    },
    activeImageIndex() {
      return this.filteredImages.findIndex(
        (image) => image.id === this.activeImageId
      )
    }
  },
  watch: {
    activeFilter() {
      this.closePreview()
    }
  },
  methods: {
    openPreview({ image }) {
      this.activeImageId = image.id
    },
    showPreviousImage() {
      if (this.activeImageIndex <= 0) {
        return
      }

      this.activeImageId = this.filteredImages[this.activeImageIndex - 1].id
    },
    showNextImage() {
      if (this.activeImageIndex === -1) {
        return
      }

      if (this.activeImageIndex >= this.filteredImages.length - 1) {
        return
      }

      this.activeImageId = this.filteredImages[this.activeImageIndex + 1].id
    },
    closePreview() {
      this.activeImageId = null
    }
  }
}
</script>

<style scoped>
.gallery-page {
  width: 100%;
  padding-inline: 0;
}

.gallery-copy {
  text-align: center;
}

.gallery-copy .page-heading {
  font-size: clamp(1.35rem, 2.7vw, 2.05rem);
}

.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.filter-button {
  min-height: 2.2rem;
  padding: 0.45rem 0.8rem;
  font-size: 0.8rem;
}

.filter-button.active,
.filter-button:hover,
.filter-button:focus-visible {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}
</style>
