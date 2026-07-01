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
            @click="setActiveFilter(filter.value)"
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
        { label: 'Arrangements', value: 'arrangements' },
        { label: 'Fresh Flowers', value: 'fresh-flowers' },
        { label: 'Faux Flowers', value: 'faux-flowers' }
      ],
      activeFilter: 'all',
      activeImageId: null
    }
  },
  computed: {
    filterValues() {
      return this.filters.map((filter) => filter.value)
    },
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
    },
    '$route.query.category': {
      immediate: true,
      handler(category) {
        const normalizedCategory = this.normalizeFilterValue(category)

        if (normalizedCategory !== this.activeFilter) {
          this.activeFilter = normalizedCategory
        }
      }
    }
  },
  methods: {
    normalizeFilterValue(category) {
      if (this.filterValues.includes(category)) {
        return category
      }

      return 'all'
    },
    setActiveFilter(filterValue) {
      const normalizedFilter = this.normalizeFilterValue(filterValue)

      if (normalizedFilter !== this.activeFilter) {
        this.activeFilter = normalizedFilter
      }

      const nextQuery =
        normalizedFilter === 'all' ? {} : { category: normalizedFilter }

      if (this.$route.query.category === nextQuery.category) {
        return
      }

      this.$router.replace({ query: nextQuery })
    },
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
  gap: var(--space-1);
  margin-top: var(--space-2);
}

.filter-button {
  min-height: 2.2rem;
  padding: 0.45rem 0.6rem;
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
