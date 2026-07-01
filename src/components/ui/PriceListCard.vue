<template>
  <article class="price-list-card" :aria-label="title">
    <header v-if="title" class="price-list-card__header">
      <h2 class="price-list-card__heading">{{ title }}</h2>
    </header>

    <div class="price-list-card__items">
      <section
        v-for="item in items"
        :key="item.title"
        class="price-list-card__item"
      >
        <div class="price-list-card__content">
          <div class="price-list-card__copy">
            <h3 class="price-list-card__title">
              {{ item.title }}
              <span v-if="item.subtitle" class="price-list-card__subtitle">
                ({{ item.subtitle }})
              </span>
            </h3>

            <ul v-if="item.details?.length" class="price-list-card__details">
              <li v-for="detail in item.details" :key="detail">
                {{ detail }}
              </li>
            </ul>

            <p v-if="item.note" class="price-list-card__note">
              {{ item.note }}
            </p>
          </div>

          <p class="price-list-card__price">
            <span
              v-if="getPriceParts(item.price).prefix"
              class="price-list-card__price-prefix"
            >
              {{ getPriceParts(item.price).prefix }}
            </span>
            <span class="price-list-card__price-amount">
              {{ getPriceParts(item.price).amount }}
            </span>
          </p>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PriceListCard',
  props: {
    title: {
      type: String,
      default: 'Price list'
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getPriceParts(price) {
      const normalizedPrice = String(price || '').trim()
      const match = normalizedPrice.match(/^([A-Za-z]+)\s+(.+)$/)

      if (!match) {
        return {
          prefix: '',
          amount: normalizedPrice
        }
      }

      return {
        prefix: match[1].toUpperCase(),
        amount: match[2]
      }
    }
  }
}
</script>

<style scoped>
.price-list-card {
  width: 100%;
  height: 100%;
  padding: clamp(1.35rem, 2vw, 2rem);
  text-align: left;
  background: radial-gradient(
      circle at top left,
      rgba(255, 255, 255, 0.92),
      transparent 45%
    ),
    linear-gradient(
      135deg,
      rgba(250, 246, 239, 0.98),
      rgba(243, 234, 223, 0.92)
    );
  color: var(--color-text);
}

.price-list-card__header {
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid rgba(126, 139, 97, 0.22);
}

.price-list-card__heading {
  margin: 0;
  color: var(--color-primary-dark);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.7vw, 1.75rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.price-list-card__items {
  --price-column-width: clamp(6.75rem, 14vw, 8.75rem);
  position: relative;
  display: grid;
  gap: 0.85rem;
}

.price-list-card__items::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(100% - var(--price-column-width));
  width: 1px;
  background: rgba(126, 139, 97, 0.22);
}

.price-list-card__item {
  padding-top: 0.85rem;
  border-top: 1px solid rgba(126, 139, 97, 0.22);
}

.price-list-card__item:first-child {
  padding-top: 0;
  border-top: 0;
}

.price-list-card__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--price-column-width);
  gap: 0;
  align-items: start;
}

.price-list-card__copy {
  display: grid;
  gap: 0.45rem;
  padding-right: 1.2rem;
}

.price-list-card__title {
  margin: 0;
  color: var(--color-primary-dark);
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 1.5vw, 1.55rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.price-list-card__subtitle {
  color: var(--color-text-muted);
  font-size: 0.72em;
  letter-spacing: 0.03em;
}

.price-list-card__details {
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.35rem;
  color: var(--color-text);
  font-size: clamp(0.92rem, 1.05vw, 1.02rem);
  line-height: 1.55;
}

.price-list-card__note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.98rem;
  font-style: italic;
  line-height: 1.45;
}

.price-list-card__price {
  margin: 0;
  padding-left: 1.2rem;
  display: grid;
  gap: 0.18rem;
  color: var(--color-primary-dark);
  font-family: var(--font-display);
  text-align: left;
}

.price-list-card__price-prefix {
  font-size: clamp(0.82rem, 0.95vw, 0.92rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.price-list-card__price-amount {
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (max-width: 575.98px) {
  .price-list-card {
    padding: 1rem;
  }

  .price-list-card__header {
    margin-bottom: 0.85rem;
    padding-bottom: 0.7rem;
  }

  .price-list-card__items {
    --price-column-width: 5.85rem;
  }

  .price-list-card__copy {
    padding-right: 0.9rem;
  }

  .price-list-card__price {
    padding-left: 0.9rem;
  }

  .price-list-card__price-prefix {
    font-size: 0.75rem;
  }

  .price-list-card__price-amount {
    font-size: 0.95rem;
  }
}
</style>
