<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      We are here to fill your world with fresh blooms and vibrant arrangements
      for every occasion.<br />
      Let our floral designs add a touch of joy and beauty to your special
      moments—and everyday life!
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style> -->
