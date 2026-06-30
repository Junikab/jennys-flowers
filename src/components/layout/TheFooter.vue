<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer-main">
        <div class="footer-links">
          <h4 class="footer-heading">Quick Links</h4>
          <nav class="footer-nav" aria-label="Footer quick links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/gallery">Gallery</router-link>
            <router-link to="/contact">Contact</router-link>
          </nav>
        </div>

        <div class="footer-brand">
          <img
            src="@/assets/images/icons/jennys_flower_divider_transparent.png"
            alt="Jenny's Flowers divider"
            height="150"
            class="footer__divider"
          />

          <div class="footer-copy">
            <h3>Jenny's Flowers Event Florist</h3>
            <h5>Sydney, Australia</h5>
          </div>
        </div>

        <div class="footer-social" aria-label="Social links">
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

      <div class="footer-bottom">
        <p class="footer-text footer-legal-copy">
          &copy; 2026 Jenny's Flowers | All rights reserved.
        </p>
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
  padding: var(--space-5) 0 var(--space-3);
  background: var(--color-primary);
}

.footer__inner {
  width: calc(90% - 2rem);
  max-width: none;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--space-4) var(--space-6);
  align-items: start;
}

.footer-brand {
  display: grid;
  gap: var(--space-2);
  justify-items: center;
  text-align: center;
}

.footer__divider {
  height: clamp(4.75rem, 9vw, 6.75rem);
  width: auto;
}

.footer a {
  text-decoration: none;
  display: inline-block;
}

.footer a:hover {
  color: var(--color-bg) !important;
  transition: color 0.3s ease;
}

.footer-copy h5,
.footer-text {
  color: var(--color-bg);
}

.footer-copy h3 {
  color: var(--color-bg);
}

.footer-copy {
  display: grid;
  gap: 0.35rem;
}

.footer-heading {
  margin: 0 0 var(--space-2);
  color: var(--color-bg);
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
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

.footer-links {
  display: grid;
  justify-items: start;
  text-align: left;
  align-self: start;
  justify-self: start;
}

.footer-nav {
  display: grid;
  gap: 0.55rem;
}

.footer-nav a {
  color: var(--color-bg);
  font-size: 1rem;
}

.footer-social {
  align-self: end;
  justify-self: end;
}

.social-links {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  margin-top: 0;
}

.footer-bottom {
  margin-top: var(--space-3);
  padding-top: var(--space-2);
  border-top: 1px solid var(--color-primary-light);
}

.footer-legal-copy {
  text-align: left;
}

.social-links a {
  font-size: 1.5rem;
  color: var(--color-bg);
}

@media (max-width: 767.98px) {
  .footer {
    padding: var(--space-4) 0 var(--space-3);
  }

  .footer__inner {
    width: calc(100% - 1.25rem);
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }

  .footer-brand {
    order: 1;
  }

  .footer-links {
    order: 2;
    justify-items: start;
    text-align: left;
  }

  .footer-social {
    order: 3;
    justify-self: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-bottom {
    margin-top: var(--space-3);
  }
}

@media (max-width: 766px) {
  .footer-links {
    justify-items: center;
    text-align: center;
    justify-self: center;
    width: 100%;
  }

  .footer-bottom {
    text-align: center;
  }

  .footer-legal-copy {
    text-align: center;
  }
}
</style>
