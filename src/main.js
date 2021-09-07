import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css'
import i18n from './i18n'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChartPie, faRoute, faQuestion, faSignOutAlt)

createApp(App)
    .use(i18n)
    .use(VueSweetalert2)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')



// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
    // .use(BootstrapVue)
    // .use(IconsPlugin)

// Import Bootstrap an BootstrapVue CSS files (order is important)
