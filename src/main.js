import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css'
import i18n from './i18n'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


createApp(App)
    .use(i18n)
    // .use(BootstrapVue)
    // .use(IconsPlugin)
.mount('#app')
