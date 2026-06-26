<template>
  <nav class="navbar navbar-expand-lg site-header">
    <div class="container site-header__inner">
      <router-link class="navbar-brand site-brand" to="/">
        <img
          src="@/assets/images/logo/logo.png"
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
      <div class="site-nav">
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
  background-color: rgba(212, 188, 202, 0.95);
  border-bottom: 1px solid var(--color-border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-3);
}

.site-brand {
  margin-right: 0;
}

.site-logo {
  height: clamp(5.75rem, 11vw, 9.4rem);
  width: auto;
  box-shadow: var(--shadow-soft);
}

.site-title {
  color: var(--color-text);
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
}

@media (max-width: 991.98px) {
  .site-header__inner {
    justify-content: center;
  }

  .site-title {
    text-align: center;
  }

  .site-nav {
    width: 100%;
    margin-left: 0;
    justify-content: flex-start;
  }
}

@media (max-width: 575.98px) {
  .site-header__inner {
    gap: var(--space-3);
    padding-block: var(--space-2);
  }
}
</style>
