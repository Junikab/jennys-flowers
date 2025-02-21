<template>
  <footer class="footer text-light py-4 mt-5">
    <div class="container">
      <div class="row">
        <!-- Company Info -->
        <div class="col-md-4 mb-3">
          <h5>Jenny's Flowers</h5>
          <p class="text-muted">
            Bringing beauty and freshness to your special moments.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="/" class="text-muted">Home</a></li>
            <li><a href="/products" class="text-muted">Products</a></li>
            <li><a href="/about" class="text-muted">About</a></li>
            <li><a href="/contact" class="text-muted">Contact</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-md-4 mb-3">
          <ContactMe
            :showContact="true"
            :showHours="false"
            :showLocation="false"
            :isFooter="true"
            :fullWidth="false"
          />
        </div>
      </div>

      <!-- Social Media Links -->
      <div class="row border-top pt-3 mt-3">
        <div class="col-md-6">
          <p class="mb-0 text-muted">
            &copy; 2025 Jenny's Flowers. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <a
            href="https://www.facebook.com/profile.php?id=61565467934102"
            target="_blank"
            class="text-muted me-3"
            ><i class="fab fa-facebook"></i
          ></a>
          <a
            href="https://www.instagram.com/Jennysflowers_au/#"
            target="blank"
            class="text-muted me-3"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import ContactMe from '@/components/home/ContactMe.vue'
export default {
  name: 'TheFooter',
  components: {
    ContactMe
  }
}
</script>

<style scoped>
.footer {
  margin-top: auto;
  background-color: #5b2344;
  /* bottom: 0;
  width: 100%; */
  /* height: 150px; */
}
.footer a {
  text-decoration: none;
}

.footer a:hover {
  color: #b46298 !important;
  transition: color 0.3s ease;
}
</style>
