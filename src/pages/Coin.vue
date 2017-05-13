<template>
	<div id="coin">
		<v-card>
			<v-card-title>
				<h2 class="table-title text-xs-center">{{ coin.name }} ({{ coin.symbol }})</h2>
				<v-spacer class=""></v-spacer>
				<v-text-field
						append-icon="search"
						label="Search Coins..."
						single-line
						@blur="requestData"
						placeholder="npm package name"
						v-model="package"
				></v-text-field>

				<!--<div class="Search__container">-->
					<!--<input-->
							<!--class="Search__input"-->
							<!--@keyup.enter="requestData"-->
							<!--placeholder="npm package name"-->
							<!--type="search" name="search"-->
							<!--v-model="package"-->
					<!--&gt;-->
					<!--&lt;!&ndash;<button class="Search__button" @click="requestData">Find</button>&ndash;&gt;-->
				<!--</div>-->
			</v-card-title>

			<div class="error-message" v-if="showError">
				{{ errorMessage }}
			</div>

			<hr>

			<h1 class="title" v-if="loaded">{{ packageName }}</h1>

			<div class="Chart__container" v-if="loaded">
				<div class="Chart__title">
					Downloads per Day <span>{{ period }}</span>
					<hr>
				</div>
				<div class="Chart__content">
					<line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>
				</div>
			</div>

		</v-card>
	</div>
</template>


<script>
	import axios from 'axios'
	import LineChart from '../components/LineChart.vue'

	export default {
		name: 'coin',

		components: {
			LineChart
		},

		metaInfo() {
			return {
				title: `${this.coin.name} Details`,
				titleTemplate: '%s | CoinCaps.io',
				meta: [
					{ vmid: 'description', name: 'description', content: `${this.coin.name} information needs to be updated!` }
				]
			}
		},

		data() {
			return {
				package: null,
				packageName: '',
				period: 'last-month',
				loaded: false,
				downloads: [],
				labels: [],
				showError: false,
				errorMessage: 'Please enter a package name',
				coin: []
			}
		},

		mounted () {
			if (this.$route.params.package) {
				this.package = this.$route.params.package
				this.requestData()
			}
		},

		methods: {
			resetState () {
				this.loaded = false
				this.showError = false
			},

			requestData () {
				if (this.package === null || this.package === '' || this.package === 'undefined') {
					this.showError = true
					return
				}

				this.resetState()

				axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${this.package}`)
				.then(response => {
					console.log(this)

					this.downloads = response.data.downloads.map(download => download.downloads)
					this.labels = response.data.downloads.map(download => download.day)
					this.packageName = response.data.package
					this.setUrl()
					this.loaded = true
				})
				.catch(err => {
					this.errorMessage = err.response.data.error
					this.showError = true
				})
			},

			setUrl () {
				history.pushState(
					{ info: `npm-stats ${this.package}` },
					this.package,
					`/#/${this.package}`
				)
			}
		},

//		beforeCreate() {
//			const self = this
//			const corsProxy = 'https://cors-anywhere.herokuapp.com/'
//			const coinIdApi = `${corsProxy}https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`
//
//			axios.get(coinIdApi)
//			     .then(response => {
//				     this.coin = response.data[0]
//				     console.log(this.coin)
//			     })
//			     .catch(error => {
//				     console.log(error)
//				     this.coin = []
//			     })
//		}
	}
</script>


<style lang="stylus">
	#coin {
	}
</style>