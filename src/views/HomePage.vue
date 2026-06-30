<template>
  <section class="page-shell hero-section">
    <div class="page-copy">
      <div class="page-panel title-container">
        <p class="lead-copy">
          We are here to fill your world with fresh blooms and vibrant
          arrangements for every occasion.
        </p>
      </div>
    </div>

    <GalleryGrid
      :images="galleryImages"
      column-class="col-12 col-sm-6 col-xl-4"
    />
  </section>
</template>

<script>
import GalleryGrid from '../components/gallery/GalleryGrid.vue'
import { getGalleryImagesBySection } from '../data/galleryImages'

export default {
  name: 'HomePage',
  components: {
    GalleryGrid
  },
  data() {
    return {
      galleryImages: getGalleryImagesBySection('home')
    }
  }
}
</script>

<style scoped>
.hero-section {
  width: 90vw;
  max-width: 90vw;
  padding-inline: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.title-container {
  text-align: center;
}
</style>
