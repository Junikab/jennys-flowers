<template>
  <header class="site-header">
    <div class="logo-container">
      <img src="@/assets/images/logo/logo.png" alt="Jenny's Flowers Logo" />
    </div>
    <TheNavigation />
  </header>
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
