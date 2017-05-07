import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import Coin from './Coin.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
	{ path: '/coins/:id', name: 'coin', component: Coin }
]

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
