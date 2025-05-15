<template>
  <div class="hero-section">
    <div class="container title-container">
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.
      </p>
    </div>

    <div class="container-fluid px-4">
      <div class="row g-2 justify-content-center">
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="col-12 col-md-3 mb-2"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="gallery-image rounded shadow img-fluid"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      galleryImages: [
        {
          src: require('@/assets/images/background/orcidCrown.jpg'),
          alt: 'orcidCrown'
        },
        {
          src: require('@/assets/images/background/orchid.jpg'),
          alt: 'orchid'
        },
        {
          src: require('@/assets/images/background/rusty.jpg'),
          alt: 'rusty'
        }
      ]
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

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
