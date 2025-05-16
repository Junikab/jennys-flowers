<template>
  <div class="container">
    <!-- <h1 class="title-container">About Me</h1> -->

    <div>
      <h2>My Story</h2>
      <p>
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
      <h2>My Mission</h2>
      <p>
        I started Jenny's Flowers to explore the full potential of floral
        design. For me, it's more than just arranging blooms—it's about watching
        how emotions flow through flowers and reach the hearts of people. Each
        piece I create is a small expression of love, joy, memory, or
        celebration, and it's an honor to be part of those moments.
      </p>
    </div>

    <div>
      <p>Your flower whisper, <br />Jenny</p>
    </div>
  </div>
  <div class="container-fluid px-4">
    <div class="gellery-container row g-2 justify-content-center">
      <div
        v-for="(image, index) in galleryImages"
        :key="index"
        class="col-12 col-md-4"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="gallery-image rounded shadow img-fluid"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      galleryImages: [
        {
          src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyCrownDown_eembxd.jpg',
          alt: 'Jenny'
        },
        {
          src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/JennyWisteria_htea5b.jpg',
          alt: "Jenny's Flowers"
        },
        {
          src: 'https://res.cloudinary.com/djgi23npu/image/upload/Jennys%20Flowers/jennysPhotos/jennyWhite_gortvp.jpg',
          alt: 'Jenny in white'
        }
      ]
    }
  }
}
</script>

<style scoped>
.title-container {
  background-color: rgba(255, 240, 250, 0.8);
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
}

.gellery-container {
  /* width: 75%;
  margin: 2rem; */
  margin: 0 2rem 2rem;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

p {
  font-size: 1.5rem;
  text-align: justify;
  margin: 2rem;
}

h2 {
  margin-top: 2rem;
}
</style>
