// import { createApp } from 'vue'
// import Vue from 'vue'
// import App from './App.vue'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// createApp(App).mount('#app')

// Vue.use(BootstrapVue)

// Vue.use(IconsPlugin)

import { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)
app.use(BootstrapVue3)
app.mount('#app')
