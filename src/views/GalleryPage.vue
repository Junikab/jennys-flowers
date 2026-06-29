<template>
  <section class="gallery-page page-shell section-stack">
    <div class="page-copy">
      <div class="page-panel gallery-copy">
        <h1 class="page-heading">Gallery</h1>
        <!-- <p class="body-copy">
          This is a simple gallery page shell for future work. The page already
          reads from the shared image data, so more photos and groups can be
          added later without rebuilding the page from scratch.
        </p> -->
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

    <GalleryGrid :images="filteredImages" column-class="col-6 col-lg-3" />
  </section>
</template>

<script>
import GalleryGrid from '../components/gallery/GalleryGrid.vue'
import {
  getGalleryImages,
  getGalleryImagesByCategory
} from '../data/galleryImages'

export default {
  name: 'GalleryPage',
  components: {
    GalleryGrid
  },
  data() {
    return {
      galleryImages: getGalleryImages(),
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Weddings', value: 'weddings' },
        { label: 'Arrangements', value: 'arrangements' }
      ],
      activeFilter: 'all'
    }
  },
  computed: {
    filteredImages() {
      if (this.activeFilter === 'all') {
        return this.galleryImages
      }

      return getGalleryImagesByCategory(this.activeFilter)
    }
  }
}
</script>

<style scoped>
.gallery-copy {
  text-align: center;
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0;
}

.gallery-copy .page-heading {
  font-size: clamp(1.35rem, 2.7vw, 2.05rem);
}

.gallery-copy .body-copy {
  width: min(100%, 36rem);
  margin: 0 auto;
  font-size: clamp(0.72rem, 0.97vw, 0.88rem);
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
  background-color: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}
</style>
