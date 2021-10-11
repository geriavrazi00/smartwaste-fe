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
import { faDumpster } from '@fortawesome/free-solid-svg-icons'
import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css'
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios'
import VueAxios from 'vue-axios'

library.add(faChartPie, faRoute, faQuestion, faSignOutAlt, faDumpster, faChartArea, faTruck, faEllipsisH)

createApp(App)
    .use(i18n)
    .use(VueSweetalert2)
    .use(router)
    .use(VueCollapsiblePanel)
    .use(VueApexCharts)
    .use(VueAxios, axios)
    .component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')