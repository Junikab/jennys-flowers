<template>
  <div class="container-fluid p-0 mt-3" id="contact">
    <div class="row justify-content-center">
      <GalleryGrid
        :images="galleryImages"
        item-class="col-12 col-sm-6 col-md-3 mb-2"
      />

      <div class="info mt-5 text-center brand-text content-limit-xl">
        <div class="location mb-5" v-if="showLocation">
          <h5 class="section-subheading brand-text">LOCATION</h5>
          <ul class="list-unstyled contact-text brand-copy-md brand-text">
            <li>
              Based in Ropes Crossing NSW 2760 <br />
              Servicing Sydney & Beyond
            </li>
          </ul>
        </div>
        <div class="opening" v-if="showHours">
          <h5 class="section-subheading brand-text">OPENING HOURS</h5>
          <ul class="list-unstyled contact-text brand-copy-md brand-text">
            <li>By appointment only</li>
          </ul>
        </div>
      </div>
      <ContactForm />
    </div>
  </div>
</template>

<script>
import GalleryGrid from '@/components/gallery/GalleryGrid.vue'
import ContactForm from '../forms/ContactForm.vue'
import { contactGalleryImages } from '@/data/galleryImages'

export default {
  name: 'ContactMe',
  components: {
    ContactForm,
    GalleryGrid
  },
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
      galleryImages: contactGalleryImages
    }
  }
}
</script>
