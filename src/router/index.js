import HomePage from '../views/HomePage.vue'

const AboutPage = () => import('../views/AboutPage.vue')
const ContactPage = () => import('../views/ContactPage.vue')
const GalleryPage = () => import('../views/GalleryPage.vue')
const NotFoundPage = () => import('../views/NotFoundPage.vue')

export const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/contact/',
    name: 'Contact',
    component: ContactPage
  },
  {
    path: '/about/',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/gallery/',
    name: 'Gallery',
    component: GalleryPage
  },
  {
    path: '/404',
    name: 'NotFoundBuild',
    component: NotFoundPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage
  }
]
