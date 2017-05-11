import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import Meta from 'vue-meta'
import Home from './pages/Home.vue'
import Coin from './pages/Coin.vue'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Meta)

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/coins/:id', name: 'coin', component: Coin }
]

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	scrollBehavior: () => ({ y: 0 }),
	routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
