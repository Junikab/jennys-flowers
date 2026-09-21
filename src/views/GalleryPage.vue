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

    <div
      v-if="showCollectionIndex"
      class="gallery-collections"
      aria-label="Wedding galleries"
    >
      <button
        v-for="collection in collectionCards"
        :key="collection.value"
        type="button"
        class="gallery-collection-card"
        :aria-label="`Open ${collection.label} gallery`"
        @click="setActiveCollection(collection.value)"
      >
        <img
          v-if="collection.coverImage"
          :src="collection.coverImage.thumbnailSrc || collection.coverImage.src"
          :alt="`${collection.label} wedding gallery cover`"
          class="gallery-collection-cover"
        />
        <span class="gallery-collection-title">{{ collection.label }}</span>
      </button>
    </div>

    <div v-else-if="activeCollectionOption" class="collection-heading">
      <h2>{{ activeCollectionOption.label }}</h2>
    </div>

    <GalleryGrid
      v-if="!showCollectionIndex"
      :images="displayedImages"
      layout-mode="masonry"
      clickable
      @select="openPreview"
    />
    <button
      v-if="!showCollectionIndex && hasMoreImages"
      type="button"
      class="pill-button load-more-button"
      @click="loadMoreImages"
    >
      Load more photos
    </button>
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
import { galleryFilterOptions } from '../data/galleryCategories'
import {
  getGalleryImages,
  getGalleryImagesByCategory,
  getGalleryImagesByCollection
} from '../data/galleryImages'

const GALLERY_BATCH_SIZE = 24

export default {
  name: 'GalleryPage',
  components: {
    GalleryGrid,
    LightboxModal
  },
  data() {
    return {
      galleryImages: getGalleryImages(),
      filters: galleryFilterOptions,
      activeFilter: 'all',
      activeCollection: null,
      visibleImageCount: GALLERY_BATCH_SIZE,
      activeImageId: null
    }
  },
  computed: {
    activeCollections() {
      return (
        this.filters.find((filter) => filter.value === this.activeFilter)
          ?.collections || []
      )
    },
    activeCollectionOption() {
      return (
        this.activeCollections.find(
          (collection) => collection.value === this.activeCollection
        ) || null
      )
    },
    collectionCards() {
      return this.activeCollections.map((collection) => {
        const collectionImages = getGalleryImagesByCollection(collection.value)
        const coverImage =
          collectionImages.find(
            (image) => image.asset === collection.coverAsset
          ) || collectionImages[0]

        return { ...collection, coverImage }
      })
    },
    showCollectionIndex() {
      return this.activeCollections.length > 0 && !this.activeCollectionOption
    },
    filteredImages() {
      if (this.activeFilter === 'all') {
        return this.galleryImages
      }

      if (this.activeCollectionOption) {
        return getGalleryImagesByCollection(this.activeCollection)
      }

      return getGalleryImagesByCategory(this.activeFilter)
    },
    displayedImages() {
      return this.filteredImages.slice(0, this.visibleImageCount)
    },
    hasMoreImages() {
      return this.displayedImages.length < this.filteredImages.length
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
      this.setActiveCollection(null)
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
      return this.filters.some((filter) => filter.value === category)
        ? category
        : 'all'
    },
    setActiveFilter(filterValue) {
      const normalizedFilter = this.normalizeFilterValue(filterValue)

      if (
        normalizedFilter === this.activeFilter &&
        this.activeCollections.length
      ) {
        this.setActiveCollection(null)
      }

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
    setActiveCollection(collectionValue) {
      this.activeCollection = collectionValue
      this.closePreview()
      this.resetDisplayedImages()
    },
    loadMoreImages() {
      this.visibleImageCount += GALLERY_BATCH_SIZE
    },
    resetDisplayedImages() {
      this.visibleImageCount = GALLERY_BATCH_SIZE
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

.gallery-collections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 360px));
  justify-content: center;
  width: min(90vw, 1600px);
  margin: 0 auto;
}

.gallery-collection-card {
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius-panel);
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-soft);
  color: inherit;
  cursor: pointer;
}

.gallery-collection-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.gallery-collection-cover {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-collection-card:hover .gallery-collection-cover {
  transform: scale(1.03);
}

.gallery-collection-title {
  display: block;
  padding: var(--space-2);
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.25rem);
  letter-spacing: 0.04em;
}

.collection-heading {
  display: grid;
  justify-items: center;
  gap: var(--space-1);
  text-align: center;
}

.collection-heading h2 {
  margin: 0;
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
}

.load-more-button {
  justify-self: center;
  padding: 0.6rem 1rem;
}
</style>
