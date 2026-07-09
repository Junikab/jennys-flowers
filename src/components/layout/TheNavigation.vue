<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid flex-column nav-shell">
      <button
        class="navbar-toggler custom-toggler no-outline align-self-end"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarNav"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        id="navbarNav"
        :class="['nav-collapse', { 'nav-collapse--open': isMenuOpen }]"
      >
        <ul class="navbar-nav nav-list">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="closeMenu"
              >HOME</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" @click="closeMenu"
              >ABOUT</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/gallery" @click="closeMenu"
              >GALLERY</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" @click="closeMenu"
              >CONTACT</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigation',
  data() {
    return {
      isMenuOpen: false
    }
  },
  watch: {
    $route() {
      this.closeMenu()
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 0;
  overflow: visible;
}

.nav-shell {
  position: relative;
  padding-inline: 0;
  align-items: flex-end;
  overflow: visible;
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
    position: static;
    width: auto;
    min-width: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
  }

  .nav-list {
    flex-direction: row;
    align-items: center;
    margin-top: 0;
  }
}

@media (max-width: 991.98px) {
  .nav-collapse {
    position: absolute;
    top: 0;
    right: calc(100% + 0.65rem);
    z-index: 80;
    width: max-content;
    min-width: 12rem;
    padding: 0.85rem 1rem;
    border-radius: var(--radius-panel);
    background: rgba(250, 246, 239, 0.96);
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(10px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(0.75rem);
    transition: opacity 0.25s ease, transform 0.25s ease,
      visibility 0s linear 0.25s;
  }

  .nav-collapse--open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(0);
    transition-delay: 0s;
  }

  .navbar-nav {
    margin-top: 0;
    gap: var(--space-3) !important;
  }

  .nav-link {
    display: block;
    white-space: nowrap;
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
