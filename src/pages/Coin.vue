<template>
	<div class="content">
		<div class="back-to-coins">
			<v-btn class="orange darken-2 white--text" router to="/">
				<v-icon light left>arrow_back</v-icon>Back
			</v-btn>
		</div>
		<highstock :options="options"></highstock>
	</div>
</template>


<script>
	import _ from 'underscore'
	import axios from 'axios'

	export default {
		name: 'coin',

		data() {
			return {
				loaded: false,
				loading: false,
				showError: false,
				errorMessage: 'We did not find your coin. Try searching for Bitcoin or btc.',
				rawData: [],
				options: {
					title: {
						text: 'BTC/USD History'
					},
					subtitle: {
						text: 'Source: cryptocompare.com'
					},
					rangeSelector: {
						selected: 1
					},
					series: [{
						name: 'BTC',
						data: [],
						tooltip: {
							valueDecimals: 2
						}
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
				axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.$route.params.id}&tsym=USD&limit=30&aggregate=3&e=CCCAGG&allData=true`).
					then((response) => {
						this.rawData = response.data.Data
						this.getData()
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
			}
		}
	}
</script>


<style lang="scss" scoped>

</style>