<template>
  <footer class="footer">
    <div class="container footer__inner text-center">
      <div class="row justify-content-center">
        <div class="col-12">
          <img
            src="@/assets/images/icons/divider.png"
            alt="Jenny's Flowers divider"
            height="150"
            class="footer__divider d-inline-block align-text-top rounded-circle"
          />
        </div>
        <div class="col-12 mb-0">
          <div class="footer-copy">
            <h3>Jenny's Flowers Event Florist</h3>
            <h5>Sydney, Australia</h5>
          </div>

          <div class="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61565467934102"
              target="_blank"
              rel="noreferrer"
              class="footer-text"
              ><i class="fab fa-facebook fa-lg"></i
            ></a>
            <a
              href="https://www.instagram.com/Jennysflowers_au/#"
              target="_blank"
              rel="noreferrer"
              class="footer-text"
              ><i class="fab fa-instagram fa-lg"></i
            ></a>
          </div>
        </div>
      </div>

      <div class="row justify-content-center footer-legal">
        <div class="col-12">
          <p class="footer-text">
            &copy; 2026 Jenny's Flowers. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
.footer {
  flex-shrink: 0;
  width: 100%;
  text-align: center;
  padding: var(--space-6) 0 var(--space-4);
  border-top: 1px solid var(--color-border);
}

.footer__inner {
  width: min(100% - 1rem, var(--content-width));
}

.footer__divider {
  height: clamp(6rem, 12vw, 9rem);
  width: auto;
  margin-bottom: var(--space-3);
}

.footer a {
  text-decoration: none;
  display: inline-block;
}

.footer a:hover {
  color: var(--color-accent) !important;
  transition: color 0.3s ease;
}

.footer-copy h3,
.footer-copy h5,
.footer-text {
  color: var(--color-text-soft);
}

.footer-copy {
  display: grid;
  gap: 0.35rem;
}

.footer-copy h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.7rem);
}

.footer-copy h5 {
  margin: 0;
  font-size: 1.05rem;
}

.footer-text {
  margin: 0;
  opacity: 0.95;
}

.social-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.footer-legal {
  margin-top: var(--space-4);
  padding-top: var(--space-3);
}

.social-links a {
  font-size: 1.5rem;
}
</style>
