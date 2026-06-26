<template>
  <section class="page-shell contact-section" id="contact">
    <GalleryGrid
      :images="galleryImages"
      outer-class="container-fluid px-0"
      column-class="col-12 col-sm-6 col-xl-3"
    />

    <div class="info info-stack">
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
    <ContactForm />
  </section>
</template>

<script>
import ContactForm from '../forms/ContactForm.vue'
import GalleryGrid from '../gallery/GalleryGrid.vue'
import { getGalleryImagesBySection } from '../../data/galleryImages'

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
    }
  },
  data() {
    return {
      galleryImages: getGalleryImagesBySection('contact')
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
}

.info {
  width: 100%;
  max-width: 100%;
}

.contact-text {
  margin: 0;
  color: var(--color-text-soft);
  font-size: var(--font-size-body);
}

.contact-card {
  width: min(100%, 34rem);
}

.contact-card .section-title {
  margin-bottom: var(--space-2);
}
</style>
