<template>
  <div class="hero-section">
    <div class="container title-container">
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.
      </p>
    </div>
    <div class="images container-fluid px-5">
      <div class="row g-2 m-0 justify-content-center">
        <div
          v-for="(image, index) in galleryImages"
          :key="index"
          class="col-12 col-md-3 mb-2"
        >
          <img
            :src="image.src"
            class="img-fluid w-100 h-100 object-fit-cover rounded shadow"
            :alt="image.alt"
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
          src: require('@/assets/images/background/orchid.jpg'),
          alt: 'orchid'
        },
        {
          src: require('@/assets/images/background/rusty.jpg'),
          alt: 'rusty'
        },
        {
          src: require('@/assets/images/background/rusty1.jpg'),
          alt: 'rusty1'
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

.hero-section h1,
.hero-section p {
  color: rgb(48, 17, 35, 0.8);
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
  font-weight: lighter;
}

.hero-section p {
  font-size: 1.5rem;
}

.title-container {
  background-color: rgba(255, 240, 250, 0.8);
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
}

.title-container p {
  color: #301123;
  font-size: 1.5rem;
  margin-bottom: 0;
}

.images {
  margin-top: 0rem;
}

.object-fit-cover {
  object-fit: cover;
  height: 300px;
}

@media (max-width: 768px) {
  .object-fit-cover {
    height: 250px;
  }
}
</style>
