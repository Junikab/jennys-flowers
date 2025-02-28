<template>
  <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="@/assets/images/background/background.jpg"
          class="d-block w-100"
          alt="background"
        />
      </div>
      <div class="carousel-item">
        <img
          src="@/assets/images/background/background1.jpg"
          class="d-block w-100"
          alt="background1"
        />
      </div>
      <div class="carousel-item">
        <img
          src="@/assets/images/background/backgroundYellow.jpg"
          class="d-block w-100"
          alt="backgroundYellow"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TheCarousel'
}
</script>

<style scoped>
.carousel-inner {
  border-radius: 10px;
  width: 100%;
  max-height: 50vh;
  overflow: h;
}
.carousel-item img {
  object-fit: cover; /* Make images cover the area nicely */
  height: 100%;
}
</style>
