<template>
  <div class="hero-section">
    <div class="container title-container">
      <p>
        We are here to fill your world with fresh blooms and vibrant
        arrangements for every occasion.
      </p>
    </div>
    <div class="images container-fluid px-4">
      <div class="row gx-4 gy-3 m-0">
        <div class="col-12 col-md-4">
          <img
            src="@/assets/images/background/background.jpg"
            class="img-fluid w-100 h-100 object-fit-cover rounded"
            alt="background"
          />
        </div>
        <div class="col-12 col-md-4">
          <img
            src="@/assets/images/background/background1.jpg"
            class="img-fluid w-100 h-100 object-fit-cover rounded"
            alt="background1"
          />
        </div>
        <div class="col-12 col-md-4">
          <img
            src="@/assets/images/background/backgroundYellow.jpg"
            class="img-fluid w-100 h-100 object-fit-cover rounded"
            alt="backgroundYellow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0;
}

.images {
  margin-bottom: 2rem;
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
