<template>
  <section class="page-shell about-page">
    <div class="about-block">
      <div class="page-copy about-copy">
        <div class="page-panel about-panel">
          <div class="about-section">
            <h2 class="section-title">My Story</h2>
            <p class="body-copy">
              My love for flowers began in my childhood, watching my mother tend
              to our summer garden in Russia. Even though we had only three
              short months of warm weather, those months were always filled with
              the vibrant colors and delicate beauty of blooming flowers. Our
              garden became a place of joy and creativity—a little paradise that
              left a lasting impression on me. <br />That early connection grew
              into a true passion. I've always been fascinated by how many
              emotions flowers can carry—how something so delicate can be both
              traditional and bold, timeless and deeply personal. Every floral
              piece feels like a new opportunity to create something meaningful.
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

      <figure v-if="aboutImage" class="about-media">
        <img
          :src="aboutImage.src"
          :alt="aboutImage.alt"
          :title="aboutImage.title || aboutImage.alt"
          loading="eager"
          decoding="async"
          class="about-image"
        />
      </figure>
    </div>
  </section>
</template>

<script>
import { getPrimaryGalleryImageBySection } from '../data/galleryImages'

export default {
  name: 'AboutPage',
  data() {
    return {
      aboutImage: getPrimaryGalleryImageBySection('about')
    }
  }
}
</script>

<style scoped>
.about-page {
  width: 90vw;
  max-width: 90vw;
  padding-inline: 0;
}

.about-block {
  display: grid;
  gap: 0;
  align-items: stretch;
}

.about-media {
  width: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-soft);
  aspect-ratio: 4 / 5;
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about-copy {
  width: 100%;
  margin: 0;
}

.about-panel {
  display: grid;
  gap: var(--space-5);
  text-align: left;
  height: 100%;
}

.about-panel .body-copy {
  text-align: justify;
  text-justify: inter-word;
}

.about-section {
  display: grid;
  gap: var(--space-3);
}

.about-signoff {
  text-align: center;
}

@media (min-width: 992px) {
  .about-block {
    grid-template-columns: minmax(18rem, 24rem) minmax(0, 1fr);
    grid-template-areas: 'media copy';
  }

  .about-copy {
    grid-area: copy;
  }

  .about-media {
    grid-area: media;
    height: 100%;
    aspect-ratio: auto;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .about-panel {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
