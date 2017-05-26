<template>
	<div id="home">
		<keep-alive>
			<data-table-component apiUrl="https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100"></data-table-component>
		</keep-alive>
	</div>
</template>


<script>
	import DataTableComponent from '../components/DataTableView.vue'

	export default {
		name: 'home',
		metaInfo: {
			title: 'Top 100 Coins By Market Cap',
			titleTemplate: '%s | CoinCaps.io'
		},
		components: {
			DataTableComponent
		},

		data() {
			return {}
		}
	}
</script>
