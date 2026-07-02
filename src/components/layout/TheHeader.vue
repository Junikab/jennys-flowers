<template>
  <nav class="navbar navbar-expand-lg site-header">
    <div class="container site-header__inner">
      <div class="site-branding">
        <router-link class="navbar-brand site-brand" to="/">
          <img
            src="@/assets/images/logo/logoChatGPT.png"
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
          <CopyEmailButton
            email="Jennysflowersau@gmail.com"
            aria-label="Copy email address Jennysflowersau@gmail.com"
            success-message="Email copied"
          >
            <i class="fas fa-envelope" aria-hidden="true"></i>
          </CopyEmailButton>
        </div>
        <TheNavigation />
      </div>
    </div>
  </nav>
</template>

<script>
import CopyEmailButton from '../ui/CopyEmailButton.vue'
import TheNavigation from './TheNavigation.vue'
export default {
  name: 'TheHeader',
  components: {
    CopyEmailButton,
    TheNavigation
  }
}
</script>

<style scoped>
.site-header {
  position: relative;
  z-index: 40;
  background-color: rgba(243, 234, 223, 0.95);
  /* border-bottom: 1px solid var(--color-line); */
}

.site-header__inner {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  max-width: none;
  padding-block: var(--space-2);
  padding-inline: clamp(0.75rem, 2vw, 1.5rem);
}

.site-branding {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--space-5);
  min-width: 0;
}

.site-brand {
  margin-right: 0;
  flex-shrink: 0;
}

.site-logo {
  height: clamp(5.75rem, 11vw, 9.4rem);
  width: auto;
  /* box-shadow: var(--shadow-soft); */
  padding-left: 0.35rem;
}

.site-title {
  color: var(--color-primary-dark);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-family: var(--font-display);
  font-weight: 400;
  line-height: 1.1;
  text-align: left;
  white-space: nowrap;
}

.site-nav {
  margin-left: auto;
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-2);
  flex-shrink: 0;
}

.site-header__mobile-links {
  display: none;
}

.site-header__mobile-links a,
.site-header__mobile-links :deep(.copy-email__button) {
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
.site-header__mobile-links a:focus-visible,
.site-header__mobile-links :deep(.copy-email__button:hover),
.site-header__mobile-links :deep(.copy-email__button:focus-visible) {
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
    position: relative;
    display: block;
    padding-block: var(--space-2);
    padding-right: 6.5rem;
  }

  .site-branding {
    gap: 0.45rem;
  }

  .site-logo {
    height: 4.2rem;
  }

  .site-title {
    font-size: 1.35rem;
    line-height: 0.95;
    white-space: normal;
  }

  .site-nav {
    position: absolute;
    top: var(--space-2);
    right: clamp(0.75rem, 2vw, 1.5rem);
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 0.35rem;
    margin-left: 0;
    z-index: 60;
  }

  .site-header__mobile-links {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .site-header__mobile-links a,
  .site-header__mobile-links :deep(.copy-email__button) {
    width: 2rem;
    height: 2rem;
    font-size: 0.85rem;
  }
}
</style>
