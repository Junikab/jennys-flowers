import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/styles/base.scss'

import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
