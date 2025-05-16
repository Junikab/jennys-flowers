<template>
  <nav class="navbar navbar-expand-lg body">
    <div class="container topper">
      <router-link class="navbar-brand" to="/">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Jenny's Flowers Logo"
          height="150"
          class="d-inline-block align-text-top rounded-circle"
        />
      </router-link>
      <div class="topper-info">
        <span class="d-inline-block"
          >Jenny's<br class="d-md-none" />
          Flowers</span
        >
      </div>
      <div class="d-flex justify-content-center align-items-left">
        <TheNavigation />
      </div>
    </div>
  </nav>
</template>

<script>
import TheNavigation from './TheNavigation.vue'
export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  }
}
</script>

<style scoped>
.body {
  /* background-color: rgb(48, 17, 35, 0.8); */
  background-color: rgb(212, 188, 202);
}
.topper-info {
  /* color: #fff0fa; */
  color: rgb(48, 17, 35);
  font-size: 2.5rem;
  font-family: 'Aboreto', serif;
  font-weight: 400;
}
</style>
