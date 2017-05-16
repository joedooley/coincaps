import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'

import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import VueAnalytics from 'vue-analytics'

const gaTrackingId = 'UA-99027775-1'


Vue.use(Vuetify)
Vue.use(Meta)
Vue.use(VueAnalytics, {
	id: gaTrackingId,
	router
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
