import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home.vue'
import Coin from '../pages/Coin.vue'


Vue.use(Router)

export default new Router ({
	mode: 'history',
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/coins/:id/?convert=USD', name: 'coin', component: Coin },
		{ path: '/:package', component: Coin }
	]
})
