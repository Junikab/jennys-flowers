<template>
  <section class="page-shell not-found-page">
    <div class="page-copy">
      <div class="page-panel not-found-panel">
        <h1 class="page-heading">Page not found</h1>
        <p class="body-copy">
          Sorry, the page you were looking for does not exist.
        </p>
        <router-link class="pill-button not-found-link" to="/">
          Return home
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.not-found-page {
  display: grid;
  place-items: center;
  flex: 1;
}

.not-found-panel {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  text-align: center;
}

.not-found-panel :is(.page-heading, .body-copy) {
  margin: 0;
}

.not-found-link {
  text-decoration: none;
}
</style>
