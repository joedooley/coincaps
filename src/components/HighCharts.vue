<template>
	<div class="highcharts"></div>
</template>


<script>
	import Highcharts from 'highcharts/highstock'

	export default {
		props: {
			id: {
				type: String
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
				default: '400px'
			},
			options: {
				type: Object,
				required: true
			},
			Highcharts: {
				type: String
			}
		},

		data () {
			return {
				chart: null
			}
		},

		mounted () {
			if (!this.chart && this.options) {
				this.init()
			}
		},

		methods: {
			addSeries(options){
				this.delegateMethod('addSeries', options);
			},
			mergeOption(options){
				this.delegateMethod('update', options)
			},
			showLoading(txt){
				this.chart.showLoading(txt);
			},
			hideLoading(){
				this.chart.hideLoading();
			},
			delegateMethod(name, ...args){
				return this.chart[name](...args)
			},
			init() {
				if (!this.chart && this.options) {
					let _Highcharts = this.Highcharts || Highcharts
					this.chart = _Highcharts.stockChart(this.$el, this.options)
				}
			}
		},

		watch: {
			options: function (options) {
				if (!this.chart && options) {
					this._init()
				} else {
					this.chart.update(this.options);
				}
			}
		},

		beforeDestroy(){
			if (this.chart) {
				this.chart.destroy();
			}
		}
	}
</script>
