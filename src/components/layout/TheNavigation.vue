<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid flex-column nav-shell">
      <button
        class="navbar-toggler custom-toggler no-outline align-self-end"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarNav"
        class="collapse navbar-collapse flex-column align-items-start nav-collapse"
      >
        <ul class="navbar-nav nav-list">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">ABOUT</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery">GALLERY</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">CONTACT</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: 'TheNavigation' }
</script>

<style scoped>
.navbar {
  padding: 0;
}

.nav-shell {
  padding-inline: 0;
  align-items: flex-end;
}

.navbar-nav {
  align-items: flex-start;
}

.nav-list {
  gap: var(--space-4);
}

.nav-link {
  cursor: pointer;
  color: var(--color-primary-dark);
  font-size: clamp(1.05rem, 1.8vw, 1.35rem);
  letter-spacing: 0.08em;
  padding: 0.15rem 0;
  transition: color 0.25s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

.navbar-toggler,
.custom-toggler,
.no-outline {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler:hover,
.navbar-toggler:visited,
.custom-toggler:focus,
.custom-toggler:active,
.custom-toggler:hover,
.custom-toggler:visited,
.no-outline:focus,
.no-outline:active,
.no-outline:hover {
  outline: 0 !important;
  box-shadow: none !important;
  border-color: transparent !important;
  border: 0 !important;
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(63, 71, 40)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

@media (min-width: 992px) {
  .nav-shell {
    align-items: stretch;
  }

  .nav-collapse {
    width: auto;
  }

  .nav-list {
    flex-direction: row;
    align-items: center;
    margin-top: 0;
  }
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    border: none;
    /* margin-top: var(--space-3); */
    /* padding-top: var(--space-3); */
    /* border-top: 1px solid var(--color-line); */
  }

  .nav-collapse {
    width: max-content;
    min-width: 12rem;
    align-self: flex-end;
  }

  .navbar-nav {
    margin-top: var(--space-3);
    gap: var(--space-3) !important;
  }
}

.router-link-active {
  color: var(--color-primary);
  font-weight: bold;
}

.nav-item {
  text-align: left;
}
</style>
