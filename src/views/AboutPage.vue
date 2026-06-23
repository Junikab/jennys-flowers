<template>
  <div class="container">
    <div>
      <h2 class="section-heading">My Story</h2>
      <p class="section-body-copy">
        My love for flowers began in my childhood, watching my mother tend to
        our summer garden in Russia. Even though we had only three short months
        of warm weather, those months were always filled with the vibrant colors
        and delicate beauty of blooming flowers. Our garden became a place of
        joy and creativity—a little paradise that left a lasting impression on
        me. <br />That early connection grew into a true passion. I've always
        been fascinated by how many emotions flowers can carry—how something so
        delicate can be both traditional and bold, timeless and deeply personal.
        Every arrangement feels like a new opportunity to create something
        meaningful.
      </p>
    </div>

    <div>
      <h2 class="section-heading">My Mission</h2>
      <p class="section-body-copy">
        I started Jenny's Flowers to explore the full potential of floral
        design. For me, it's more than just arranging blooms—it's about watching
        how emotions flow through flowers and reach the hearts of people. Each
        piece I create is a small expression of love, joy, memory, or
        celebration, and it's an honor to be part of those moments.
      </p>
    </div>

    <div>
      <p class="section-body-copy">Your flower whisper, <br />Jenny</p>
    </div>
  </div>
  <GalleryGrid
    :images="galleryImages"
    container-class="container-fluid px-4 pb-4"
    row-class="row g-2 justify-content-center gallery-row-spaced"
    item-class="col-12 col-md-4"
  />
</template>

<script>
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'
import { aboutGalleryImages } from '@/data/galleryImages'

export default {
  name: 'AboutPage',
  components: {
    GalleryGrid
  },
  data() {
    return {
      galleryImages: aboutGalleryImages
    }
  }
}
</script>
