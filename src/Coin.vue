<template>
	<div id="coin">
		<h2 class="post-title">
			{{coin.name}}
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

		beforeCreate() {
			const self = this
			const coinId = `https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`

			axios.get(coinId)
			     .then(response => {
				     this.coin = response.data
			     })
			     .catch(error => {
				     console.log(error)
				     this.data = []
			     })
		}
	}
</script>


<style lang="stylus">
	#coin {
	}
</style>