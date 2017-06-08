import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router/index.js'

import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'

import VueHighcharts from 'vue-highcharts'
import Highcharts from 'highcharts/highstock';

import Axios from 'axios'

Vue.prototype.$http = Axios

const gaTrackingId = 'UA-99027775-1'


Vue.use(Vuetify)
Vue.use(Meta)
Vue.use(VueAnalytics, {
	id: gaTrackingId,
	router
})
Vue.use(VueHighcharts, { Highcharts })

/* eslint-disable no-new */
new Vue({
	store,
    el: '#app',
    router,
    render: h => h(App)
})
