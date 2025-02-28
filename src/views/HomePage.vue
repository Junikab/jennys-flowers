<template>
  <div class="hero-section">
    <div class="container title-container">
      <h1>{{ msg }}</h1>
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.<br />
        Let our floral designs add a touch of joy and beauty to your special
        moments—and everyday life!
      </p>
    </div>
    <div class="carousel-container">
      <TheCarousel />
    </div>
  </div>
</template>

<script>
import TheCarousel from '@/components/carousel/TheCarousel.vue'
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  components: {
    TheCarousel
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh; /* This ensures full height */
}
.hero-section {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.6)
    ),
    url('@/assets/images/background/background.jpg');
  min-height: 80vh;
  max-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem 2rem;
  border-radius: 10px;
  margin: -3rem -15px 0;
  display: flex; /* Added to help with layout */
  flex-direction: column; /* Stack children vertically */
  justify-content: space-between; /* Space out the title and carousel */
}

.hero-section h1,
.hero-section p {
  color: #333;
  text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
  font-weight: bold;
}

.hero-section p {
  font-size: 1.5rem;
}
.title-container {
  background-color: rgb(236, 228, 233, 0.5);
  border-radius: 10px;
  padding: 2rem;
}
.carousel-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  width: 60%; /* Set specific width */
  max-height: 50vh; /* Limit height */
  overflow: hidden; /* Prevent overflow */
}
</style>
