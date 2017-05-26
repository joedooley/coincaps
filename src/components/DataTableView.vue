<template>
	<div id="data-table">
		<v-card class="grey lighten-4">
			<v-card-title>
				<h2 class="table-title text-xs-center blue-grey--text text--darken-3">Top 100 Coins</h2>
				<v-spacer class=""></v-spacer>
				<v-text-field
						append-icon="search"
						label="Search Coins..."
						single-line
						hide-details
						v-model="search"
				></v-text-field>
			</v-card-title>

			<v-data-table
					:headers="headers"
					:items="items"
					:search="search"
					:pagination.sync="pagination"
					class="elevation-1"
			>

				<template slot="items" scope="props">
					<td class="text-xs-left">{{ props.item.rank }}</td>
					<td class="text-xs-left">{{ props.item.symbol }}</td>
					<td class="text-xs-left">
						<router-link :to="{ name: 'coin', params: { id: props.item.symbol }, tag: 'td'}">
							<a>{{ props.item.name }}</a>
						</router-link>
					</td>
					<td class="text-xs-left">{{ props.item.market_cap_usd }}</td>
					<td class="text-xs-left">{{ props.item.price_usd }}</td>
					<td class="text-xs-left">{{ props.item.price_btc }}</td>
					<td class="text-xs-left" :class="setUpOrDownClass(props.item.percent_change_24h)">{{ props.item.percent_change_1h }}%</td>
					<td class="text-xs-left" :class="setUpOrDownClass(props.item.percent_change_24h)">{{ props.item.percent_change_24h }}%</td>
					<td class="text-xs-left" :class="setUpOrDownClass(props.item.percent_change_7d)">{{ props.item.percent_change_7d }}%</td>
					<td class="text-xs-left purchase-column">
						<div>
							<a :href="affiliateLinkBuyChangelly" target="_blank"
							   title="Buy Coins instantly with a credit card purchase">
								<v-btn :flat="true" class="blue-grey lighten-2 white--text buy-button">Buy</v-btn>
							</a>
						</div>
						<div>
							<a :href="affiliateLinkSellChangelly" target="_blank"
							   title="Sell Coins Instantly">
								<v-btn :flat="true" class="blue-grey lighten-3 white--text sell-button">Sell</v-btn>
							</a>
						</div>
					</td>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>


<script>
	import axios from 'axios'
	import _ from 'underscore'

	export default {
		name: 'data-table-component',

		props: {
			apiUrl: {
				type: String,
				default: 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=100'
			}
		},

		data() {
			return {
				loading: true,
				affiliateLinkBuyChangelly: 'https://changelly.com/exchange/USD/BTC/1?ref_id=29c66a27c64f',
				affiliateLinkSellChangelly: 'https://changelly.com/exchange/USD/BTC/1?ref_id=29c66a27c64f',
				upOrDownClass: '',
				search: null,
				pagination: {
					rowsPerPage: 100
				},
				headers: [
					{ text: "Rank", value: "rank", left: true },
					{ text: "Symbol", value: "symbol", sortable: false, left: true },
					{ text: "Name", left: true, sortable: false, value: "name" },
					{ text: "Market Cap", value: "market_cap_usd", left: true },
					{ text: "Price (USD)", value: "price_usd", left: true },
					{ text: "Price (BTC)", value: "price_btc", left: true },
					{ text: "% Change (1h)", value: "percent_change_1h", left: true },
					{ text: "% Change (24h)", value: "percent_change_24h", left: true },
					{ text: "% Change (7d)", value: "percent_change_7d", left: true },
					{ text: "Buy/Sell Coins", left: !0, sortable: !1, value: "buy_sell_coins" }
				],
				items: []
			}
		},

		methods: {
			getCoins(api) {
				const corsProxy = 'https://cors-anywhere.herokuapp.com/'
				api = corsProxy + this.apiUrl

				axios.get(api)
				.then(response => {
					this.items = response.data
				})
				.then(() => {
					const toNumbers = this.items.map(items => {
						items.rank = Number.parseFloat(items.rank)
						items.market_cap_usd = Number.parseFloat(items.market_cap_usd).toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' })
						items.price_usd = Number.parseFloat(items.price_usd).toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol', minimumFractionDigits: 8 })
						items.price_btc = Number.parseFloat(items.price_btc).toLocaleString('en-US', { minimumFractionDigits: 8 })
						items.percent_change_1h = Number.parseFloat(items.percent_change_1h)
						items.percent_change_24h = Number.parseFloat(items.percent_change_24h)
						items.percent_change_7d = Number.parseFloat(items.percent_change_7d)
					})
				})
				.catch(error => {
				     console.log(error)
				     this.items = []
				})
			},

			setUpOrDownClass: function (value) {
				return this.upOrDownClass = value > 0 ? 'green--text text--darken-2 positive-changes' : 'red--text text--darken-4 negative-changes'
			}
		},

		mounted() {
			this.getCoins()
		}
	}
</script>


<style lang="scss">
	.card__title {
		display: flex;
		flex-direction: column;

		@media (min-width: 576px) {
			flex-direction: row;
		}
	}
		
	.table-title {
		font-size: 36px;
		margin-bottom: 20px;
	}

	.purchase-column {
		display: flex;
	}

	#data-table {
		tfoot {
			.menu__content {
				top: -174px !important;
			}
		}
	}
</style>