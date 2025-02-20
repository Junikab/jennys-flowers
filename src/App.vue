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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #291422;
}
.body {
  /* background-color: #4d2525; */
  padding-bottom: 250px;
}
</style>
