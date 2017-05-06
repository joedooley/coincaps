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
			const postId = `https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`

			axios.get(postId)
			     .then(response => {
				     this.post = response.data
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