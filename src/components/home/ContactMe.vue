<template>
  <div class="container-fluid p-0 mt-3" id="contact">
    <div class="row justify-content-center">
      <!-- Gallery Images -->
      <div class="container-fluid px-4">
        <div class="row g-2 justify-content-center">
          <div
            v-for="(image, index) in galleryImages"
            :key="index"
            class="col-12 col-sm-6 col-md-3 mb-2"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="gallery-image rounded shadow img-fluid"
            />
          </div>
        </div>
      </div>

      <div class="info mt-5">
        <div class="location mb-5" v-if="showLocation">
          <h5>LOCATION</h5>
          <ul class="list-unstyled contact-text">
            <li>
              Based in Ropes Crossing NSW 2760 <br />
              Servicing Sydney & Beyond
            </li>
          </ul>
        </div>
        <div class="opening" v-if="showHours">
          <h5>OPENING HOURS</h5>
          <ul class="list-unstyled contact-text">
            <li>By appointment only</li>
          </ul>
        </div>
      </div>
      <ContactForm />
    </div>
  </div>
</template>

<script>
import ContactForm from '../forms/ContactForm.vue'
export default {
  name: 'ContactMe',
  props: {
    showContact: {
      type: Boolean,
      default: true
    },
    showHours: {
      type: Boolean,
      default: true
    },
    showLocation: {
      type: Boolean,
      default: true
    },
    isFooter: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      galleryImages: [
        {
          src: require('@/assets/images/background/orchidsRing.jpg'),
          alt: 'Jenny with orchid ring'
        },
        {
          src: require('@/assets/images/background/rustyWedding.jpg'),
          alt: 'Rustic wedding flowers'
        },
        {
          src: require('@/assets/images/background/blueBride.jpg'),
          alt: 'Blue wedding bouquet'
        },
        {
          src: require('@/assets/images/gallery/jennyCrown1.jpg'),
          alt: 'Jenny with flower crown'
        }
      ]
    }
  },
  components: {
    ContactForm
  }
}
</script>

<style scoped>
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info {
  color: #301123;
  text-align: center;
  width: 100%;
  max-width: 1200px;
}

.contact-text {
  color: #301123;
  font-size: 1.3rem;
}

h5 {
  color: #301123;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
