<template>
  <nav class="navbar navbar-expand-lg body">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Jenny's Flowers Logo"
          height="150"
          class="d-inline-block align-text-top rounded-circle"
        />
      </router-link>
      <div>
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
</style>
