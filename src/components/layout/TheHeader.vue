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
        <span>Call us: 0420 450 149</span>
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
  background-color: #5b2344;
}
.topper-info {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
