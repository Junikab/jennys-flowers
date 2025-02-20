<template>
  <div class="app-wrapper">
    <TheHeader />
    <!-- <HomePage msg="Welcome to Jennys Flowers" /> -->
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
// import HomePage from './views/HomePage.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    // HomePage,
    TheFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #291422;
}
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.body {
  background-color: #e8cece;
  /* padding-bottom: 250px; */
}
</style>
