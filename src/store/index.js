import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	loading: false,
	coins: [],
	coin: {},
	test: 'Hello World'
}

export default new Vuex.Store({
	state,
	actions,
	getters,
	strict: debug
})