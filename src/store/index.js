import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import coin from './modules/coin'
import coins from './modules/coins'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	loading: false,
	coins: [],
	coin: {}
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	modules: {
		coin,
		coins
	},
	strict: debug
})