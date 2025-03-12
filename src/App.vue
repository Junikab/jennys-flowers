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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.main-content {
  flex: 1 0 auto; /* This makes the content area grow and push the footer down */
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
}
.body {
  background-color: #e8cece;
}
</style>
