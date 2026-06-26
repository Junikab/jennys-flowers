<template>
  <div :class="['gallery-grid', outerClass]">
    <div :class="['gallery-row', rowClass]">
      <div
        v-for="(image, index) in images"
        :key="image.id || index"
        :class="columnClass"
      >
        <figure class="gallery-tile">
          <img
            :src="image.src"
            :alt="image.alt"
            :title="image.title || image.alt"
            :loading="index === 0 ? 'eager' : 'lazy'"
            decoding="async"
            class="gallery-image"
          />
        </figure>
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
      default: 'gallery-block container-fluid px-0'
    },
    rowClass: {
      type: String,
      default: 'row g-3 justify-content-center'
    },
    columnClass: {
      type: String,
      default: 'col-12 col-sm-6 col-lg-4'
    }
  }
}
</script>

<style scoped>
.gallery-row {
  margin: 0;
}

.gallery-tile {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-panel);
  background: var(--color-surface-strong);
  box-shadow: var(--shadow-soft);
  aspect-ratio: 4 / 5;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-tile:hover .gallery-image {
  transform: scale(1.03);
}
</style>
