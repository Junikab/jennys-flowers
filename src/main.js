import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router/index.js'
import './assets/styles/base.scss'

import 'bootstrap/dist/css/bootstrap.css'

export const createApp = ViteSSG(
  App,
  {
    base: import.meta.env.BASE_URL,
    routes
  },
  undefined,
  {
    hydration: import.meta.env.PROD
  }
)
