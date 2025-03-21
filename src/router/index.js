import { createRouter, createWebHashHistory } from 'vue-router'
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
  // Uncomment when ready for payment functionality
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   component: () => import('../views/CheckoutPage.vue')
  // },
]
const router = createRouter({
  history: createWebHashHistory('/jennys-flowers/'),
  routes
})
export default router
