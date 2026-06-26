<template>
  <section class="page-shell about-page">
    <div class="page-copy">
      <div class="page-panel about-panel">
        <h1 class="page-heading">About Jenny</h1>

        <div class="about-section">
          <h2 class="section-title">My Story</h2>
          <p class="body-copy">
            My love for flowers began in my childhood, watching my mother tend
            to our summer garden in Russia. Even though we had only three short
            months of warm weather, those months were always filled with the
            vibrant colors and delicate beauty of blooming flowers. Our garden
            became a place of joy and creativity—a little paradise that left a
            lasting impression on me. <br />That early connection grew into a
            true passion. I've always been fascinated by how many emotions
            flowers can carry—how something so delicate can be both traditional
            and bold, timeless and deeply personal. Every arrangement feels like
            a new opportunity to create something meaningful.
          </p>
        </div>

        <div class="about-section">
          <h2 class="section-title">My Mission</h2>
          <p class="body-copy">
            I started Jenny's Flowers to explore the full potential of floral
            design. For me, it's more than just arranging blooms—it's about
            watching how emotions flow through flowers and reach the hearts of
            people. Each piece I create is a small expression of love, joy,
            memory, or celebration, and it's an honor to be part of those
            moments.
          </p>
        </div>

        <div class="about-signoff">
          <p class="lead-copy">Your flower whisper, <br />Jenny</p>
        </div>
      </div>
    </div>
    <GalleryGrid :images="galleryImages" />
  </section>
</template>

<script>
import GalleryGrid from '../components/gallery/GalleryGrid.vue'
import { getGalleryImagesBySection } from '../data/galleryImages'

export default {
  name: 'AboutPage',
  components: {
    GalleryGrid
  },
  data() {
    return {
      galleryImages: getGalleryImagesBySection('about')
    }
  }
}
</script>

<style scoped>
.about-page {
  display: grid;
  gap: var(--space-4);
}

.about-panel {
  display: grid;
  gap: var(--space-5);
  text-align: left;
}

.about-section {
  display: grid;
  gap: var(--space-3);
}

.about-signoff {
  text-align: center;
}
</style>
