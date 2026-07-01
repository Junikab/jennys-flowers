<template>
  <nav class="navbar navbar-expand-lg site-header">
    <div class="container site-header__inner">
      <div class="site-branding">
        <router-link class="navbar-brand site-brand" to="/">
          <img
            src="@/assets/images/logo/logoGreen.jpg"
            alt="Jenny's Flowers Logo"
            height="150"
            class="site-logo d-inline-block align-text-top rounded-circle"
          />
        </router-link>
        <div class="site-title">
          <span class="d-inline-block"
            >Jenny's<br class="d-md-none" />
            Flowers</span
          >
        </div>
      </div>
      <div class="site-nav">
        <div class="site-header__mobile-links" aria-label="Social links">
          <a
            href="https://www.facebook.com/profile.php?id=61565467934102"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Jenny's Flowers on Facebook"
          >
            <i class="fab fa-facebook-f" aria-hidden="true"></i>
          </a>
          <a
            href="https://www.instagram.com/Jennysflowers_au/#"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Jenny's Flowers on Instagram"
          >
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </div>
        <TheNavigation />
      </div>
    </div>
  </nav>
</template>

<script>
import TheNavigation from './TheNavigation.vue'
export default {
  name: 'TheHeader',
  components: {
    TheNavigation
  }
}
</script>

<style scoped>
.site-header {
  background-color: rgba(243, 234, 223, 0.95);
  /* border-bottom: 1px solid var(--color-line); */
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-2);
}

.site-branding {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
}

.site-brand {
  margin-right: 0;
  flex-shrink: 0;
}

.site-logo {
  height: clamp(5.75rem, 11vw, 9.4rem);
  width: auto;
  box-shadow: var(--shadow-soft);
}

.site-title {
  color: var(--color-primary-dark);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.1;
  text-align: left;
}

.site-nav {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  flex-shrink: 0;
}

.site-header__mobile-links {
  display: none;
}

.site-header__mobile-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-primary-dark);
  text-decoration: none;
  transition: color 0.25s ease, background-color 0.25s ease,
    transform 0.25s ease;
}

.site-header__mobile-links a:hover,
.site-header__mobile-links a:focus-visible {
  background: var(--color-primary-light);
  color: var(--color-primary);
  transform: translateY(-1px);
}

@media (max-width: 991.98px) {
  .site-branding {
    gap: var(--space-1);
  }
}

@media (max-width: 575.98px) {
  .site-header__inner {
    gap: var(--space-3);
    padding-block: var(--space-2);
  }

  .site-nav {
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 0.35rem;
  }

  .site-header__mobile-links {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .site-header__mobile-links a {
    width: 2rem;
    height: 2rem;
    font-size: 0.85rem;
  }
}
</style>
