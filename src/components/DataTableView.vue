<template>
	<div id="data-table">

		<v-progress-linear v-if="loaded"
		                     indeterminate
		                     v-bind:size="70"
		                     v-bind:width="7"
		                     class="purple--text"
		/>

		<v-card v-if="loaded">
			<v-card-title>
				<h2 class="table-title text-xs-center">Top 100 Coins</h2>
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
					v-bind:headers="headers"
					v-model="items"
					v-bind:search="search"
					:rows-per-page="100"
					:rows-per-page-items="[25, 50, 100]"
					class="elevation-1"
			>
				<template slot="items" scope="props">
					<td class="text-xs-right">{{ props.item.rank }}</td>
					<td class="text-xs-right">{{ props.item.symbol }}</td>
					<td>
						<router-link :to="{ name: 'coin', params: { id: props.item.id }}">
							{{ props.item.name }}
						</router-link>
					</td>
					<td class="text-xs-right">${{ props.item.market_cap_usd }}</td>
					<td class="text-xs-right">${{ props.item.price_usd }}</td>
					<td class="text-xs-right">{{ props.item.price_btc }}</td>
					<td class="text-xs-right">{{ props.item.total_supply }}</td>
					<td class="text-xs-right" :class="setUpOrDownClass(props.item.percent_change_24h)">{{ props.item.percent_change_1h }}%</td>
					<td class="text-xs-right" :class="setUpOrDownClass(props.item.percent_change_24h)">{{ props.item.percent_change_24h }}%</td>
					<td class="text-xs-right" :class="setUpOrDownClass(props.item.percent_change_7d)">{{ props.item.percent_change_7d }}%</td>
					<td class="text-xs-right purchase-column">
						<div>
							<a :href="affiliateLinkBuyChangelly" target="_blank"
							   title="Buy Coins instantly with a credit card purchase">
								<v-btn primary dark raised>Buy</v-btn>
							</a>
						</div>
						<div>
							<a :href="affiliateLinkSellChangelly" target="_blank"
							   title="Sell Coins Instantly">
								<v-btn outline class="indigo--text">Sell</v-btn>
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
				loaded: false,
				affiliateLinkBuyChangelly: 'https://changelly.com/exchange/USD/BTC/1?ref_id=29c66a27c64f',
				affiliateLinkSellChangelly: 'https://changelly.com/exchange/USD/BTC/1?ref_id=29c66a27c64f',
				upOrDownClass: '',
				search: null,
				headers: [
					{
						text: "Rank",
						value: "rank"
					}, {
						text: "Symbol",
						value: "symbol",
						sortable: !1
					}, {
						text: "Name",
						left: !0,
						sortable: !1,
						value: "name"
					}, {
						text: "Market Cap",
						value: "market_cap_usd"
					}, {
						text: "Price (USD)",
						value: "price_usd"
					}, {
						text: "Price (BTC)",
						value: "price_btc"
					}, {
						text: "Total Supply",
						value: "total_supply"
					}, {
						text: "% Change (1h)",
						value: "percent_change_1h"
					}, {
						text: "% Change (24h)",
						value: "percent_change_24h"
					}, {
						text: "% Change (7d)",
						value: "percent_change_7d"
					},
					{
						text: "Buy/Sell Coins",
						left: !0,
						sortable: !1,
						value: "buy_sell_coins"
					}
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
							items.market_cap_usd = Number.parseFloat(items.market_cap_usd)
							items.price_usd = Number.parseFloat(items.price_usd)
							items.price_btc = Number.parseFloat(items.price_btc)
							items.total_supply = Number.parseFloat(items.total_supply)
							items.percent_change_1h = Number.parseFloat(items.percent_change_1h)
							items.percent_change_24h = Number.parseFloat(items.percent_change_24h)
							items.percent_change_7d = Number.parseFloat(items.percent_change_7d)
							this.loaded = true
						})
					})
					.catch(error => {
					     console.log(error)
					     this.items = []
					})
			},

			setUpOrDownClass: function (value) {
				return this.upOrDownClass = value > 0 ? 'positive-changes' : 'negative-changes'
			}
		},

		mounted() {
			this.getCoins()
		}
	}
</script>


<style lang="stylus">
	.card__title {
		display: flex;
		flex-direction: column;

		@media (min-width: 576px) {
			flex-direction: row;
		}
	}
		
	table.table thead th {
		text-decoration: underline;
	}
		
	.table-title {
		font-size: 36px;
		margin-bottom: 20px;
	}

	.purchase-column {
		display: flex;
	}

	.positive-changes {
		color: green;
	}

	.negative-changes {
		color: red;
	}
</style>