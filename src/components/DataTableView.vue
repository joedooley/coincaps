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
					<td class="text-xs-left coin-details-link">
						<router-link :to="{ name: 'coin', params: { id: props.item.symbol }, tag: 'td'}">
							{{ props.item.symbol }}
						</router-link>
					</td>
					<td class="text-xs-left">{{ props.item.name }}</td>
					<td class="text-xs-left">{{ props.item.market_cap_usd }}</td>
					<td class="text-xs-left">{{ props.item.price_usd }}</td>
					<td class="text-xs-left">{{ props.item.price_btc }}</td>
					<td class="text-xs-left split" :class="setUpOrDownClass(props.item.percent_change_1h)">
						<p><span class="value">{{ props.item.percent_change_1h }}</span>
							<v-icon light :right="true" :class="setUpOrDownClass(props.item.percent_change_1h)">{{ setUpOrDownArrow(props.item.percent_change_1h) }}</v-icon></p>
					</td>
					<td class="text-xs-left split" :class="setUpOrDownClass(props.item.percent_change_24h)">
						<p><span class="value">{{ props.item.percent_change_24h }}</span>
						<v-icon light :right="true" :class="setUpOrDownClass(props.item.percent_change_24h)">{{ setUpOrDownArrow(props.item.percent_change_24h) }}</v-icon></p>
					</td>
					<td class="text-xs-left split" :class="setUpOrDownClass(props.item.percent_change_7d)">
						<p><span class="value">{{ props.item.percent_change_7d }}</span>
							<v-icon dark :class="setUpOrDownClass(props.item.percent_change_7d)">{{ setUpOrDownArrow(props.item.percent_change_7d) }}</v-icon></p>
					</td>
					<td class="text-xs-left purchase-column">
						<div>
							<a :href="affiliateLinkBuyChangelly" target="_blank">
								<v-btn :flat="true" class="blue-grey lighten-2 white--text buy-button">Buy/Sell<v-icon light right>shopping_cart</v-icon></v-btn>
							</a>
						</div>
					</td>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>


<script>
	import Vue from 'vue'
	import axios from 'axios'
	import _ from 'underscore'

	import { toNum, toPercent, toUsd, toUsdWholeNum, toBtc } from '../utils/dataFormatter'

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
				upOrDownClass: '',
				upOrDownArrow: '',
				search: null,
				pagination: {
					rowsPerPage: 100
				},
				headers: [
					{ text: "#", value: "rank", left: true },
					{ text: "Symbol", value: "symbol", sortable: false, left: true },
					{ text: "Name", left: true, sortable: false, value: "name" },
					{ text: "Market Cap", value: "market_cap_usd", left: true },
					{ text: "Price (USD)", value: "price_usd", left: true },
					{ text: "Price (BTC)", value: "price_btc", left: true },
					{ text: "% Change (1h)", value: "percent_change_1h", left: true },
					{ text: "% Change (1d)", value: "percent_change_24h", left: true },
					{ text: "% Change (7d)", value: "percent_change_7d", left: true },
					{ text: "Buy/Sell Coins", left: true, sortable: !1, value: "buy_sell_coins" }
				],
				items: []
			}
		},

		created () {
			this.getCoins()
			this.$persist(['items'])
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
						items.rank = toNum(items.rank)
						items.market_cap_usd = toUsdWholeNum(items.market_cap_usd)
						items.price_usd = toUsd(items.price_usd)
						items.price_btc = toBtc(items.price_btc)
						items.percent_change_1h = toPercent(items.percent_change_1h)
						items.percent_change_24h = toPercent(items.percent_change_24h)
						items.percent_change_7d = toPercent(items.percent_change_7d)
					})
					console.log(this.items)

				})
				.catch(error => {
				     console.log(error)
				     this.items = []
				})
			},

			setUpOrDownClass: function (value) {
				if (value) {
					value = value.replace('%', '')
				}
				return this.upOrDownClass = value > 0 ? 'green--text text--darken-2 positive-changes' : 'red--text text--darken-4 negative-changes'
			},

			setUpOrDownArrow: function (value) {
				if (value) {
					value = value.replace('%', '')
				}
				return this.upOrDownArrow = value > 0 ? 'arrow_upward' : 'arrow_downward'
			}
		},

//		mounted() {
//			this.getCoins()
//		}
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
		thead {
			th {
				text-transform: uppercase;
			}
		}
		tbody {
			tr:nth-child(odd) {
				background: rgba(0,0,0,0.06);
			}

			td {
				font-weight: 300;
			}
			.coin-details-link {
				color: #37474f;
				font-weight: 500;
				text-decoration: underline;

				&:hover,
				&:active {
					color: darken(#37474f, 0.2);
				}

			}
			a {
				text-decoration: none;
			}

			.split {
				p {
					display: flex;
					justify-content: flex-start;
					margin-bottom: 0;
				}

				i {
					font-size: 16px;
				}
			}

			.value {
				min-width: 50px;
			}
		}

		tfoot {
			.menu__content {
				top: -174px !important;
			}
		}
	}
</style>