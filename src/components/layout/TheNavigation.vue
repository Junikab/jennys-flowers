<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid flex-column px-3">
      <button
        class="navbar-toggler custom-toggler no-outline align-self-start"
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
        class="collapse navbar-collapse flex-column align-items-start w-100"
      >
        <ul class="navbar-nav gap-4 mt-4">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">ABOUT</router-link>
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
.nav-link {
  cursor: pointer;
  color: var(--brand-text);
  font-size: 1.5rem;
}
.nav-link:hover {
  color: var(--brand-accent);
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
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(48,17,35)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

@media (max-width: 991.98px) {
  .navbar-collapse {
    border: none;
    margin-top: 10px;
  }
}

.router-link-active {
  color: var(--brand-accent);
  font-weight: bold;
}

.nav-item {
  text-align: left;
}
</style>
