<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      We are here to fill your world with fresh blooms and vibrant arrangements
      for every occasion.<br />
      Let our floral designs add a touch of joy and beauty to your special
      moments—and everyday life!
    </p>
    <img
      src="@/assets/images/logo/JennyWisteria.jpg"
      alt="Jenny's Flowers"
      height="400"
    />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>
