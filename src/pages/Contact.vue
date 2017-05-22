<template>
	<div id="contact">
		<high-charts :id="id" :options="options"></high-charts>
	</div>
</template>


<script>
	import HighCharts from '../components/HighCharts.vue'
	import axios from 'axios'

	export default {
		name: 'contact',

		components: {
			HighCharts
		},

		data() {
			return {
				id: 'contact-chart',
				data: [],
				rawData: '',
				options: {
					chart: {
						renderTo: this.id
					},
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
						type: 'candlestick',
						name: 'BTC/USD',
						data: this.data
					}]
				}
			}
		},

		mounted () {
			console.log(this.data)
			this.requestData()
		},

		methods: {
			requestData () {
				axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=3&e=CCCAGG')
				.then(response => {
					this.rawData = response.data.Data
//					console.log(this.rawData)
				})
				.then(() => {
					const dataPoints = this.rawData.map(rawData => {
						this.data.x = this.data.x.push(rawData.time)
						this.data.open = rawData.open
						this.data.high = rawData.high
						this.data.low = rawData.low
						this.data.close = rawData.close
					})
					console.log(this.data)

				})
				.catch(err => {
					console.log(err)
					this.data = []
				})
			}
		}
	}
</script>


<style lang="scss" scoped>

</style>