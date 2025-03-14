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
        <!-- Company Info -->
        <div class="col-12 mb-0">
          <div class="footer-text mb-3">
            <h3>Jenny's Flowers Event Florist</h3>
            <h5>Sydney, Australia</h5>
          </div>

          <!-- Social Media Links -->
          <div class="social-links my-3 grid gap-5">
            <a
              href="https://www.facebook.com/profile.php?id=61565467934102"
              target="_blank"
              class="footer-text"
              ><i class="fab fa-facebook fa-lg"></i
            ></a>
            <a
              href="https://www.instagram.com/Jennysflowers_au/#"
              target="blank"
              class="footer-text"
              ><i class="fab fa-instagram fa-lg"></i
            ></a>
          </div>
        </div>

        <!-- Quick Links -->
        <!-- <div class="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="/" class="footer-text">Home</a></li>
            <li><a href="/products" class="footer-text">Products</a></li>
            <li><a href="/about" class="footer-text">About</a></li>
            <li><a href="/contact" class="footer-text">Contact</a></li>
          </ul>
        </div> -->

        <!-- Contact Info -->
        <!-- <div class="col-md-4 mb-3">
          <ContactMe
            :showContact="true"
            :showHours="false"
            :showLocation="false"
            :isFooter="true"
            :fullWidth="false"
          />
        </div> -->
      </div>

      <div class="row justify-content-center pt-3 mt-3">
        <div class="col-12">
          <p class="footer-text">
            &copy; 2025 Jenny's Flowers. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// import ContactMe from '@/components/home/ContactMe.vue'
export default {
  name: 'TheFooter',
  components: {
    // ContactMe
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
  color: rgb(180, 98, 152) !important;
  transition: color 0.3s ease;
}
.footer-text {
  /* in case of dark background */
  /* color: aliceblue;  */
  color: rgb(48, 17, 35, 0.8);

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
