<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#top">
        <img
          src="@/assets/images/logo/logo.png"
          alt="Jenny's Flowers Logo"
          height="100"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Gallery
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#occasions">Occasions</a></li>
              <li>
                <a class="dropdown-item" href="#luxe-design">Luxe Design</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#reviews">Reviews</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#faqs">FAQs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>
