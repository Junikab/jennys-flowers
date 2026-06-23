<template>
  <footer class="footer text-light">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-12">
          <img
            src="@/assets/images/icons/divider.png"
            alt="Jenny's Flowers Logo"
            height="150"
            class="d-inline-block align-text-top rounded-circle"
          />
        </div>
        <div class="col-12 mb-0">
          <div class="footer-text mb-3">
            <h3>Jenny's Flowers Event Florist</h3>
            <h5>Sydney, Australia</h5>
          </div>

          <div class="social-links my-3 grid gap-5">
            <a
              href="https://www.facebook.com/profile.php?id=61565467934102"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-text"
              ><i class="fab fa-facebook fa-lg"></i
            ></a>
            <a
              href="https://www.instagram.com/Jennysflowers_au/#"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-text"
              ><i class="fab fa-instagram fa-lg"></i
            ></a>
          </div>
        </div>
      </div>

      <div class="row justify-content-center pt-3 mt-3">
        <div class="col-12">
          <p class="footer-text">
            &copy; {{ currentYear }} Jenny's Flowers. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  flex-shrink: 0;
  color: rgb(240, 248, 255);
  width: 100%;
  text-align: center;
}
.footer a {
  text-decoration: none;
  display: inline-block;
}

.footer a:hover {
  color: var(--brand-accent) !important;
  transition: color 0.3s ease;
}
.footer-text {
  color: var(--brand-text-soft);
  opacity: 0.9;
}
.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-links a {
  font-size: 1.5rem;
}
</style>
