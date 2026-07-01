<template>
  <section class="page-shell contact-section" id="contact">
    <GalleryGrid
      v-if="showGallery"
      :images="contactGalleryImages"
      outer-class="container-fluid px-0"
      column-class="col-12 col-sm-6 col-xl-3"
    />

    <div class="contact-info-hero" :style="contactBackgroundStyle">
      <div class="info contact-info-stack">
        <div class="page-panel contact-card" v-if="showLocation">
          <h5 class="section-title">Location</h5>
          <ul class="list-unstyled contact-text">
            <li>
              Based in Ropes Crossing NSW 2760 <br />
              Servicing Sydney & Beyond
            </li>
          </ul>
        </div>
        <div class="page-panel contact-card" v-if="showHours">
          <h5 class="section-title">Opening Hours</h5>
          <ul class="list-unstyled contact-text">
            <li>By appointment only</li>
          </ul>
        </div>
      </div>
    </div>
    <ContactForm />
  </section>
</template>

<script>
import ContactForm from '../forms/ContactForm.vue'
import GalleryGrid from '../gallery/GalleryGrid.vue'
import {
  getGalleryImagesBySection,
  getPrimaryGalleryImageBySection
} from '../../data/galleryImages'

export default {
  name: 'ContactMe',
  props: {
    showHours: {
      type: Boolean,
      default: true
    },
    showLocation: {
      type: Boolean,
      default: true
    },
    showGallery: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contactGalleryImages() {
      if (!this.showGallery) {
        return []
      }

      return getGalleryImagesBySection('contact')
    },
    contactCoverImage() {
      return getPrimaryGalleryImageBySection('contact-cover')
    },
    contactBackgroundStyle() {
      if (!this.contactCoverImage) {
        return null
      }

      return {
        '--contact-background-image': `url('${this.contactCoverImage.src}')`
      }
    }
  },
  components: {
    ContactForm,
    GalleryGrid
  }
}
</script>
<style scoped>
.contact-section {
  display: grid;
  gap: var(--space-5);
  padding-top: 0;
}

.contact-info-hero {
  position: relative;
  isolation: isolate;
  display: grid;
  align-items: center;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  min-height: clamp(18rem, 42vw, 28rem);
  padding: clamp(1rem, 3vw, 2rem);
  overflow: hidden;
}

.contact-info-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: var(--contact-background-image);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.contact-info-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(135, 135, 121, 0.32);
}

.info {
  width: 100%;
  max-width: 100%;
}

.contact-info-stack {
  display: grid;
  gap: var(--space-4);
  width: min(55vw, 64rem);
  margin: 0 auto;
}

.contact-text {
  margin: 0;
  color: var(--color-text-soft);
  font-size: var(--font-size-body);
}

.contact-card {
  width: 100%;
  max-width: 34rem;
}

.contact-card .section-title {
  margin-bottom: var(--space-2);
}

@media (min-width: 768px) {
  .contact-info-stack {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
  }

  .contact-card {
    max-width: none;
  }
}
</style>
