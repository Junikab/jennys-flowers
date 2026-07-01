<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer-main">
        <div class="footer-links">
          <h4 class="footer-heading">Quick Links</h4>
          <nav class="footer-nav" aria-label="Footer quick links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/gallery">Gallery</router-link>
            <router-link to="/contact">Contact</router-link>
          </nav>
        </div>

        <div class="footer-brand">
          <div class="footer-copy">
            <h3 ref="brandTitle">Jenny's Flowers Event Florist</h3>
            <h5>Sydney, Australia</h5>
          </div>
          <div
            class="footer__divider"
            role="img"
            aria-label="Jenny's Flowers divider"
            :style="dividerStyle"
          ></div>
        </div>

        <div class="footer-social" aria-label="Social links">
          <div class="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61565467934102"
              target="_blank"
              rel="noreferrer"
              class="footer-text"
              ><i class="fab fa-facebook fa-lg"></i
            ></a>
            <a
              href="https://www.instagram.com/Jennysflowers_au/#"
              target="_blank"
              rel="noreferrer"
              class="footer-text"
              ><i class="fab fa-instagram fa-lg"></i
            ></a>
            <CopyEmailButton
              email="Jennysflowersau@gmail.com"
              aria-label="Copy email address Jennysflowersau@gmail.com"
              success-message="Email copied"
            >
              <i class="fas fa-envelope fa-lg"></i>
            </CopyEmailButton>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-text footer-legal-copy">
          &copy; {{ currentYear }} Jenny's Flowers | All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import CopyEmailButton from '../ui/CopyEmailButton.vue'

export default {
  name: 'TheFooter',
  components: {
    CopyEmailButton
  },
  data() {
    return {
      dividerWidth: null
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    dividerStyle() {
      if (!this.dividerWidth) {
        return null
      }

      return {
        width: `${this.dividerWidth}px`
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.syncDividerWidth()
    })

    window.addEventListener('resize', this.syncDividerWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.syncDividerWidth)
  },
  methods: {
    syncDividerWidth() {
      const title = this.$refs.brandTitle

      if (!title) {
        return
      }

      this.dividerWidth = title.offsetWidth
    }
  }
}
</script>

<style scoped>
.footer {
  flex-shrink: 0;
  width: 100%;
  padding: var(--space-5) 0 var(--space-3);
  background: var(--color-primary);
}

.footer__inner {
  width: calc(90% - 2rem);
  max-width: none;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--space-4) var(--space-6);
  align-items: start;
}

.footer-brand {
  display: grid;
  /* gap: var(--space-2); */
  justify-items: center;
  text-align: center;
}

.footer__divider {
  height: clamp(4.75rem, 9vw, 6.75rem);
  width: min(16rem, 42vw);
  max-width: 100%;
  background-color: var(--color-bg);
  -webkit-mask-image: url('../../assets/images/icons/jennys_flower_divider_transparent.png');
  mask-image: url('../../assets/images/icons/jennys_flower_divider_transparent.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}

.footer a {
  text-decoration: none;
  display: inline-block;
}

.footer a:hover {
  color: var(--color-bg) !important;
  transition: color 0.3s ease;
}

.footer-copy h5,
.footer-text {
  color: var(--color-bg);
}

.footer-copy h3 {
  color: var(--color-bg);
}

.footer-copy {
  display: grid;
  gap: 0.35rem;
}

.footer-heading {
  margin: 0 0 var(--space-2);
  color: var(--color-bg);
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 1.9vw, 1.55rem);
}

.footer-copy h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.7rem);
}

.footer-copy h5 {
  margin: 0;
  font-size: clamp(1.15rem, 1.45vw, 1.3rem);
}

.footer-text {
  margin: 0;
  opacity: 0.95;
}

.footer-links {
  display: grid;
  justify-items: start;
  text-align: left;
  align-self: start;
  justify-self: start;
}

.footer-nav {
  display: grid;
  gap: 0.55rem;
}

.footer-nav a {
  color: var(--color-bg);
  font-size: 1rem;
}

.footer-social {
  align-self: end;
  justify-self: end;
}

.social-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  margin-top: 0;
  color: var(--color-bg);
}

.footer-bottom {
  margin-top: var(--space-3);
  padding-top: var(--space-2);
  border-top: 1px solid var(--color-primary-light);
}

.footer-legal-copy {
  text-align: left;
}

.social-links a,
.social-links :deep(.copy-email__button) {
  font-size: 1.5rem;
  color: var(--color-bg);
}

.social-links :deep(.copy-email__message) {
  color: var(--color-bg);
}

.social-links :deep(.copy-email__message--error) {
  color: var(--color-accent-soft);
}

@media (max-width: 767.98px) {
  .footer {
    padding: var(--space-4) 0 var(--space-3);
  }

  .footer__inner {
    width: calc(100% - 1.25rem);
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .footer-brand {
    order: 1;
  }

  .footer-links {
    order: 2;
    justify-items: start;
    text-align: left;
  }

  .footer-social {
    order: 3;
    justify-self: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom {
    margin-top: var(--space-3);
  }
}

@media (max-width: 766px) {
  .footer-links {
    justify-items: center;
    text-align: center;
    justify-self: center;
    width: 100%;
  }

  .footer-bottom {
    text-align: center;
  }

  .footer-legal-copy {
    text-align: center;
  }
}
</style>
