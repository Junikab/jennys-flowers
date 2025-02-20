<template>
  <div>
    <TheHeader />
    <HomePage msg="Welcome to Jennys Flowers" />
    <TheFooter />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    HomePage,
    TheFooter
  }
}
</script>

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->
