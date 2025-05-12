import { createRouter, createWebHistory } from 'vue-router'
import ContactPage from '../views/ContactPage.vue'
import AboutPage from '../views/AboutPage.vue'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    props: { msg: 'Welcome to Jennys Flowers' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

// Determine the base URL based on environment
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? '/' // Use root path in production (for custom domain)
    : '/jennys-flowers/' // Use the repository path for GitHub Pages development/testing

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes
})
export default router
