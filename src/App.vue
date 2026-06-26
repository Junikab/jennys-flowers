<template>
  <div class="app-wrapper">
    <TheHeader />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-5);
}
</style>
