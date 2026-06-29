<template>
  <div
    :class="[
      'gallery-grid',
      outerClass,
      { 'gallery-grid--masonry': layoutMode === 'masonry' }
    ]"
  >
    <div v-if="layoutMode === 'masonry'" class="gallery-masonry">
      <figure
        v-for="(image, index) in images"
        :key="image.id || index"
        class="gallery-tile gallery-tile--masonry"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          :title="image.title || image.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
          class="gallery-image gallery-image--masonry"
        />
      </figure>
    </div>

    <div v-else :class="['gallery-row', rowClass]">
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
    layoutMode: {
      type: String,
      default: 'bootstrap'
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
.gallery-grid--masonry {
  width: min(90vw, 1600px);
  max-width: 100%;
  margin: 0 auto;
}

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

.gallery-masonry {
  column-count: 1;
  column-gap: 0.45rem;
}

.gallery-tile--masonry {
  break-inside: avoid;
  margin-bottom: 0.45rem;
  overflow: hidden;
  aspect-ratio: auto;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-image--masonry {
  height: auto;
  object-fit: contain;
}

.gallery-tile:hover .gallery-image {
  transform: scale(1.03);
}

@media (min-width: 576px) {
  .gallery-masonry {
    column-count: 2;
  }
}

@media (min-width: 900px) {
  .gallery-masonry {
    column-count: 3;
  }
}

@media (min-width: 1200px) {
  .gallery-masonry {
    column-count: 4;
  }
}
</style>
