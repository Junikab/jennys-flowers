<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button
        class="navbar-toggler mx-auto custom-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-5">
          <li class="nav-item">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="about">ABOUT</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="events">EVENTS</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">CONTACT</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigation'
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
  color: #fff0fa;
  font-size: 1.5rem;
}

.nav-link:hover {
  color: #b46298;
}

.custom-toggler {
  border-color: #fff0fa;
  border: none;
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,240,250, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}
</style>
