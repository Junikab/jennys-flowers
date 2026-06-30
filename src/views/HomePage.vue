<template>
  <section class="hero-section">
    <HeroSlideshow
      :images="galleryImages"
      :interval-ms="7000"
      aria-label="Jenny's Flowers featured arrangements"
    >
      <div class="page-copy hero-copy">
        <div class="title-container">
          <p class="lead-copy">
            We are here to fill your world with fresh blooms and vibrant
            arrangements for every occasion.
          </p>
        </div>
      </div>
    </HeroSlideshow>
  </section>
</template>

<script>
import HeroSlideshow from '../components/home/HeroSlideshow.vue'
import { getGalleryImagesBySection } from '../data/galleryImages'

export default {
  name: 'HomePage',
  components: {
    HeroSlideshow
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
  width: 100%;
  padding: 0;
}

.hero-copy {
  width: min(90vw, var(--copy-width));
  margin: 0 auto;
}

.title-container {
  text-align: center;
  /* background: rgba(243, 234, 223, 0.88); */
  backdrop-filter: blur(2px);
}
</style>
