<template>
  <section class="hero-section">
    <HeroSlideshow
      :images="galleryImages"
      :interval-ms="7000"
      aria-label="Jenny's Flowers featured arrangements"
    >
      <div class="page-copy hero-copy">
        <div class="title-container">
          <p class="lead-copy">
            We are here to fill your world with fresh blooms and vibrant
            arrangements for every occasion.
          </p>
        </div>
      </div>
    </HeroSlideshow>

    <div class="home-feature-list">
      <article
        v-for="feature in galleryFeatures"
        :key="feature.category"
        class="home-feature-card"
        :class="`home-feature-card--image-${feature.imageSide}`"
      >
        <div class="home-feature-card__media">
          <img
            :src="feature.imageSrc"
            :alt="feature.imageAlt"
            :title="feature.title"
            loading="lazy"
            decoding="async"
            class="home-feature-card__image"
          />
        </div>

        <div class="home-feature-card__content">
          <div class="home-feature-card__copy">
            <h2 class="section-title">{{ feature.title }}</h2>
            <router-link
              class="pill-button home-feature-card__link"
              :to="{ name: 'Gallery', query: { category: feature.category } }"
            >
              View {{ feature.linkLabel }}
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import HeroSlideshow from '../components/home/HeroSlideshow.vue'
import { getGalleryImagesBySection } from '../data/galleryImages'

export default {
  name: 'HomePage',
  components: {
    HeroSlideshow
  },
  data() {
    return {
      galleryImages: getGalleryImagesBySection('home'),
      galleryFeatures: [
        {
          title: 'Fresh Flowers',
          linkLabel: 'Fresh Flowers Gallery',
          category: 'fresh-flowers',
          imageSrc:
            'https://res.cloudinary.com/djgi23npu/image/upload/v1782864162/Jennys%20Flowers/priceList/PriceFreshSmall_vniz1m.png',
          imageAlt: 'Fresh flowers price list',
          imageSide: 'left'
        },
        {
          title: 'Faux Flowers',
          linkLabel: 'Faux Flowers Gallery',
          category: 'faux-flowers',
          imageSrc:
            'https://res.cloudinary.com/djgi23npu/image/upload/v1782865167/Jennys%20Flowers/priceList/PriceFauxSmall_jaigue.png',
          imageAlt: 'Faux flowers price list',
          imageSide: 'right'
        }
      ]
    }
  }
}
</script>

<style scoped>
.hero-section {
  width: 100%;
  padding: 0;
  display: grid;
  gap: var(--space-5);
}

.hero-copy {
  width: min(90vw, var(--copy-width));
  margin: 0 auto;
}

.title-container {
  text-align: center;
  /* background: rgba(243, 234, 223, 0.88); */
  backdrop-filter: blur(2px);
}

.home-feature-list {
  display: grid;
  gap: var(--space-4);
}

.home-feature-card {
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: var(--color-surface);
  /* border: 1px solid var(--color-border); */
  box-shadow: var(--shadow-soft);
  overflow: hidden;
}

.home-feature-card--image-right .home-feature-card__media {
  order: 2;
}

.home-feature-card--image-right .home-feature-card__content {
  order: 1;
}

.home-feature-card__media {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  background: var(--color-white);
}

.home-feature-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.home-feature-card__content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  min-height: clamp(16rem, 30vw, 22rem);
}

.home-feature-card__copy {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  text-align: center;
}

.home-feature-card__copy .section-title {
  margin-bottom: 0;
}

.home-feature-card__link {
  min-width: min(100%, 16rem);
}

@media (max-width: 767.98px) {
  .hero-section {
    gap: var(--space-4);
  }

  .home-feature-card {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    min-height: 24rem;
  }

  .home-feature-card__media,
  .home-feature-card__content,
  .home-feature-card--image-right .home-feature-card__media,
  .home-feature-card--image-right .home-feature-card__content {
    order: initial;
  }

  .home-feature-card__media {
    min-height: 100%;
  }

  .home-feature-card__image {
    max-height: 100%;
  }

  .home-feature-card__content {
    min-height: 100%;
    padding: var(--space-4);
  }
}
</style>
