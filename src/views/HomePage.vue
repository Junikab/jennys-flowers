<template>
  <div class="hero-section">
    <div class="container title-container">
      <h1>{{ msg }}</h1>
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.
      </p>
    </div>
    <div class="images container-fluid mt-4">
      <div class="row">
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <img
            src="@/assets/images/background/background.jpg"
            class="img-fluid w-100 h-100 object-fit-cover"
            alt="background"
          />
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <img
            src="@/assets/images/background/background.jpg"
            class="img-fluid w-100 h-100 object-fit-cover"
            alt="background"
          />
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <img
            src="@/assets/images/background/background.jpg"
            class="img-fluid w-100 h-100 object-fit-cover"
            alt="background"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh; /* This ensures full height */
}

.hero-section {
  min-height: 80vh;
  max-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem 2rem;
  /* padding: 4rem 0 0 0; */
  margin: -3rem -15px 0;
  /* margin: -3rem 0 0 0; */
  border-radius: 10px;
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
  border-radius: 10px;
  padding: 2rem;
}

.object-fit-cover {
  object-fit: cover;
}
</style>
