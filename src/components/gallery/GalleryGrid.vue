<template>
  <div :class="outerClass">
    <div :class="rowClass">
      <div
        v-for="(image, index) in images"
        :key="image.id || index"
        :class="columnClass"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="gallery-image rounded shadow img-fluid"
        />
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
    outerClass: {
      type: String,
      default: 'container-fluid px-4'
    },
    rowClass: {
      type: String,
      default: 'row g-2 justify-content-center'
    },
    columnClass: {
      type: String,
      default: 'col-12 col-md-4'
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
