<template>
  <div>
    <TheHeader />
    <HelloWorld msg="Welcome to Jennys Flowers" />
    <TheFooter />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    HelloWorld,
    TheFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
