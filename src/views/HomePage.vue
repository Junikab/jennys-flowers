<template>
  <div class="hero-section">
    <div class="container title-container">
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.
      </p>
    </div>

    <GalleryGrid :images="galleryImages" item-class="col-12 col-md-3 mb-2" />
  </div>
</template>

<script>
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'
import { homeGalleryImages } from '@/data/galleryImages'

export default {
  name: 'HomePage',
  components: {
    GalleryGrid
  },
  data() {
    return {
      galleryImages: homeGalleryImages
    }
  }
}
</script>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.title-container {
  background-color: rgba(255, 240, 250, 0.8);
  border-radius: 10px;
  margin: 1rem auto;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
}
</style>
