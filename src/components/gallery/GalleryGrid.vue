<template>
  <div :class="containerClass">
    <div :class="rowClass">
      <div v-for="image in images" :key="image.src" :class="itemClass">
        <img :src="image.src" :alt="image.alt" :class="imageClass" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryGrid',
  props: {
    images: {
      type: Array,
      default: () => []
    },
    containerClass: {
      type: String,
      default: 'container-fluid px-4'
    },
    rowClass: {
      type: String,
      default: 'row g-2 justify-content-center'
    },
    itemClass: {
      type: String,
      default: 'col-12 col-sm-6 col-md-4'
    },
    imageClass: {
      type: String,
      default: 'gallery-image rounded shadow img-fluid'
    }
  }
}
</script>

<style scoped>
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
