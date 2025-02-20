import { createRouter, createWebHistory } from 'vue-router'
import ContactMe from '../components/home/ContactMe.vue'
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
    component: ContactMe
  }
  // Uncomment when ready for payment functionality
  // {
  //   path: '/checkout',
  //   name: 'Checkout',
  //   component: () => import('../views/CheckoutPage.vue')
  // },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
