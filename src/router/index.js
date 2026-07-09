import { createRouter, createWebHistory } from 'vue-router'
import ContactPage from '../views/ContactPage.vue'
import AboutPage from '../views/AboutPage.vue'
import GalleryPage from '../views/GalleryPage.vue'
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
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: GalleryPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
