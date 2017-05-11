<template>
	<div id="coin">
		<h2 class="post-title">
			{{ coin.name }} ({{ coin.symbol }})
		</h2>
	</div>
</template>


<script>
	import axios from 'axios'

	export default {
		name: 'coin',
		data() {
			return {
				coin: []
			}
		},
		metaInfo() {
			return {
				title: `${this.coin.name} Details`,
				titleTemplate: '%s | CoinCaps.io',
				meta: [
					{ vmid: 'description', name: 'description', content: `${this.coin.name} information needs to be updated!` }
				]
			}
		},

		beforeCreate() {
			const self = this
			const coinId = `https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`

			axios.get(coinId)
			     .then(response => {
				     this.coin = response.data[0]
				     console.log(this.coin)
			     })
			     .catch(error => {
				     console.log(error)
				     this.coin = []
			     })
		}
	}
</script>


<style lang="stylus">
	#coin {
	}
</style>