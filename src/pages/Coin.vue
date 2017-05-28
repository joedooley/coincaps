<template>
	<div class="content">

		<back-to-coins></back-to-coins>
		<highstock :options="options"></highstock>

	</div>
</template>


<script>
	import Highcharts from 'highcharts'
	import _ from 'underscore'
	import axios from 'axios'
	
	import BackToCoins from '../parts/BackToCoins.vue'

	export default {
		name: 'coin',
		components: {
			BackToCoins
		},

		data() {
			return {
				api: 'https://api.coinmarketcap.com/v1/ticker/',
				apiId: this.$route.params.id,
				loaded: false,
				loading: false,
				showError: false,
				errorMessage: 'We did not find your coin. Try searching for Bitcoin or btc.',
				rawData: [],
				options: {
					chart: {
						type: 'line',
						zoomType: 'x',
						height: 520,
						ignoreHiddenSeries: true
					},
					title: {
						text: `${this.$route.params.id}/BTC History`
					},
					subtitle: {
						text: 'Source: cryptocompare.com'
					},
					rangeSelector: {
						allButtonsEnabled: true,
						buttons: [{
							type: 'day',
							count: 1,
							text: '1d'
						}, {
							type: 'week',
							count: 1,
							text: '7d'
						}, {
							type: 'month',
							count: 1,
							text: '1m'
						}, {
							type: 'month',
							count: 3,
							text: '3m'
						}, {
							type: 'year',
							count: 1,
							text: '1y'
						}, {
							type: 'ytd',
							count: 1,
							text: 'YTD'
						}, {
							type: 'all',
							text: 'ALL'
						}],
						selected: 2,
						inputEnabled: true,
						enabled: true
					},
					yAxis: [{
						crosshair: {
							label: {
								enabled: true,
								format: '{value:.8f}' + ' BTC'
							}
						},
						labels: {
							format: '{value:.8f}' + ' BTC',
							align: 'right',
							x: -3
						},
						height: '60%',
						lineWidth: 1
					}, {
						labels: {
							align: 'right',
							x: -3
						},
						title: {
							text: 'Volume'
						},
						top: '65%',
						height: '35%',
						offset: 0,
						lineWidth: 2
					}],
					tooltip: {
//						split: true,
						shared: true,
						valueDecimals: 8
					},
					series: [{
//						type: 'candlestick',
						name: 'BTC',
						data: []
					}, {
						type: 'column',
						name: 'Volume',
						data: [],
						yAxis: 1,
						tooltip: {
							valueDecimals: 2
						},
					}]
				}
			}
		},

		mounted () {
			if (this.options) {
				this.requestData()
			}
		},

		methods: {
			requestData () {
				axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.$route.params.id}&tsym=BTC&limit=30&aggregate=3&e=CCCAGG&allData=true`).
						then((response) => {
						console.log(response)

						this.rawData = response.data.Data
						this.getData()
//						this.getOhlcData()
						this.getVolumeData()
						console.log(this.options)
					}).
					catch(err => {
						console.log(err)
					})
			},

			getData () {
				const timeData = _.pluck(this.rawData, 'time')
				const formattedTimeData = _.map(timeData, entry => entry * 1000)
				const closeData = _.pluck(this.rawData, 'close')

				this.options.series[0].data = _.zip(formattedTimeData, closeData)
			},

			getVolumeData () {
				const timeData = _.pluck(this.rawData, 'time')
				const formattedTimeData = _.map(timeData, entry => entry * 1000)
				const volumeFrom = _.pluck(this.rawData, 'volumefrom')
				const volumeTo = _.pluck(this.rawData, 'volumeto')

				this.options.series[1].data = _.zip(formattedTimeData, volumeTo)
			},

			getOhlcData() {
				const timeData = _.pluck(this.rawData, 'time')
				const formattedTimeData = _.map(timeData, entry => entry * 1000)
				const open = _.pluck(this.rawData, 'open')
				const close = _.pluck(this.rawData, 'close')
				const low = _.pluck(this.rawData, 'low')
				const high = _.pluck(this.rawData, 'high')

				this.options.series[0].data = _.zip(formattedTimeData, open, high, low, close)
			}
		}
	}
</script>


<style lang="scss" scoped>

</style>