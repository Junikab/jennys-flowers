<template>
  <div class="container">
    <h1 class="title-container">About Me</h1>
    <div>
      <img
        class="img-jenny rounded"
        src="@/assets/images/gallery/JennyWisteria.jpg"
        alt="Jenny's Flowers"
        height="400"
      />
    </div>
    <div>
      <h2>My Story</h2>
      <p>
        Jenny's Flowers is a family-owned and operated business that has been
        providing beautiful flowers and exceptional service.
      </p>
    </div>
    <div>
      <h2>My Mission</h2>
      <p>
        My mission is to provide the highest quality flowers and exceptional
        service to our customers.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
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
p {
  font-size: 1.5rem;
}
h2 {
  margin-top: 1rem;
  font-size: 2rem;
}
</style>
