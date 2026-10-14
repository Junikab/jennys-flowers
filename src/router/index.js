import HomePage from '../views/HomePage.vue'
import publicPages from '../config/publicPages.json'

const AboutPage = () => import('../views/AboutPage.vue')
const ContactPage = () => import('../views/ContactPage.vue')
const GalleryPage = () => import('../views/GalleryPage.vue')
const NotFoundPage = () => import('../views/NotFoundPage.vue')

const publicPageComponents = {
  HomePage,
  About: AboutPage,
  Gallery: GalleryPage,
  Contact: ContactPage
}

const publicRoutes = publicPages.map(({ name, path, title, description }) => ({
  path,
  name,
  component: publicPageComponents[name],
  meta: {
    seo: { title, description, canonicalPath: path }
  }
}))

const notFoundMeta = {
  seo: {
    title: "Page Not Found | Jenny's Flowers",
    description: 'The requested page could not be found.',
    noindex: true
  }
}

export const routes = [
  ...publicRoutes,
  {
    path: '/404',
    name: 'NotFoundBuild',
    component: NotFoundPage,
    meta: notFoundMeta
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: notFoundMeta
  }
]
