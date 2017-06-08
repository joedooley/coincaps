export const GET_COINS = (state) => {
	state.loading = true
}

export const LOAD_COINS = (state, {coins}) => {
	state.coins = coins
	state.loading = false
}

