<template>
	<div id="home">
		<keep-alive>
			<data-table-component
					apiUrl="https://api.coinmarketcap.com/v1/ticker/?convert=USD"
					:tableTitle="tableTitle"
			>

			</data-table-component>
		</keep-alive>
	</div>
</template>


<script>
	import DataTableComponent from '../components/DataTableView.vue'

	export default {
		name: 'all-coins',
		metaInfo: {
			title: 'All Coins By Market Cap',
			titleTemplate: '%s | CoinCaps.io'
		},
		components: {
			DataTableComponent
		},

		data() {
			return {
				tableTitle: 'All Coins'
			}
		}
	}
</script>
