<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="about">ABOUT</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              EVENTS
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#wedding">Wedding</a></li>
              <li><a class="dropdown-item" href="#birthday">Birthday</a></li>
              <li>
                <a class="dropdown-item" href="#anniversary">Anniversary</a>
              </li>
            </ul>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#reviews">Reviews</a>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="#faqs">FAQs</a>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">CONTACT</router-link>
            <!-- <router-link class="nav-link" :to="{ name: 'Contact' }"
              >Contact</router-link
            > -->
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
  cursor: pointer; /* Make sure the cursor changes to pointer on hover */
  color: #fff0fa;
  font-weight: 600;
  font-size: 1.5rem;
}

.nav-link:hover {
  color: #b46298;
}
.nav-item {
  color: #291422;
  font-size: 1.2rem;
}
</style>
