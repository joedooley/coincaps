<template>
	<div id="coin">
		<v-card>
			<v-card-title>
				<h2 class="table-title text-xs-center">{{ coin.name }} ({{ coin.symbol }})</h2>
				<v-spacer class=""></v-spacer>
				<v-text-field
						append-icon="search"
						label="Search Coins..."
						single-line
						hide-details
						v-model="search"
				></v-text-field>
			</v-card-title>
		</v-card>
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
				search: null,
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
			const corsProxy = 'https://cors-anywhere.herokuapp.com/'
			const coinIdApi = `${corsProxy}https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`

			axios.get(coinIdApi)
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