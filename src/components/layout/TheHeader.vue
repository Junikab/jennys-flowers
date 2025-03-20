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
        <span>Jenny's Flowers</span>
      </div>
      <div class="d-flex justify-content-center align-items-center">
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
  background-color: rgb(48, 17, 35, 0.8);
}
.topper-info {
  color: #fff0fa;
  font-size: 3rem;
  font-family: 'Aboreto', serif;
  /* font-weight: 200; */
}
</style>
