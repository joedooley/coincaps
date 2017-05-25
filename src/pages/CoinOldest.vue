<!--<template>-->
	<!--<div id="coin">-->
		<!--<v-card>-->
			<!--<v-card-title>-->
				<!--<h2 class="table-title text-xs-center">{{ coin.name }} ({{ coin.symbol }})</h2>-->
				<!--<v-spacer class=""></v-spacer>-->

				<!--<v-text-field-->
						<!--append-icon="search"-->
						<!--label="Search Coins..."-->
						<!--single-line-->
						<!--@blur="requestData"-->
						<!--placeholder="npm package name"-->
						<!--v-model="package"-->
				<!--&gt;</v-text-field>-->

				<!--<v-menu-->
						<!--lazy-->
						<!--:close-on-content-click="false"-->
						<!--v-model="periodStartMenu"-->
						<!--transition="v-scale-transition"-->
						<!--offset-y-->
						<!--:nudge-left="56"-->
				<!--&gt;-->
					<!--<v-text-field-->
							<!--slot="activator"-->
							<!--label="Start Date"-->
							<!--v-model="periodStart"-->
							<!--prepend-icon="event"-->
							<!--readonly-->
					<!--&gt;</v-text-field>-->
					<!--<v-date-picker v-model="periodStart" v-on:selected="validateDataRequest()" no-title scrollable dark></v-date-picker>-->
				<!--</v-menu>-->

				<!--<v-menu-->
						<!--lazy-->
						<!--:close-on-content-click="false"-->
						<!--v-model="periodEndMenu"-->
						<!--transition="v-scale-transition"-->
						<!--offset-y-->
						<!--:nudge-left="56"-->
				<!--&gt;-->
					<!--<v-text-field-->
							<!--slot="activator"-->
							<!--label="End Date"-->
							<!--v-model="periodEnd"-->
							<!--prepend-icon="event"-->
							<!--readonly-->
					<!--&gt;</v-text-field>-->
					<!--<v-date-picker v-model="periodEnd" v-on:selected="validateDataRequest()" no-title scrollable dark></v-date-picker>-->
				<!--</v-menu>-->

			<!--</v-card-title>-->

			<!--<div class="error-message" v-if="showError">-->
				<!--{{ errorMessage }}-->
			<!--</div>-->
			<!--<hr>-->
			<!--<div v-if="loading" class="loading">-->
				<!--🔧  Building Charts ...-->
				<!--<div class="sk-cube-grid">-->
					<!--<div class="sk-cube sk-cube1"></div>-->
					<!--<div class="sk-cube sk-cube2"></div>-->
					<!--<div class="sk-cube sk-cube3"></div>-->
					<!--<div class="sk-cube sk-cube4"></div>-->
					<!--<div class="sk-cube sk-cube5"></div>-->
					<!--<div class="sk-cube sk-cube6"></div>-->
					<!--<div class="sk-cube sk-cube7"></div>-->
					<!--<div class="sk-cube sk-cube8"></div>-->
					<!--<div class="sk-cube sk-cube9"></div>-->
				<!--</div>-->
			<!--</div>-->

			<!--<package-info :package-name="packageName" :total-downloads="totalDownloads" :period="formattedPeriod" v-if="loaded"></package-info>-->

			<!--<div class="Chart__container" v-if="loaded">-->
				<!--<div class="Chart__title">-->
					<!--Downloads per Day <span>{{ formattedPeriod }}</span>-->
					<!--<hr>-->
				<!--</div>-->
				<!--<div class="Chart__content">-->
					<!--<line-chart v-if="loaded" :chart-data="downloads" :chart-labels="labels"></line-chart>-->
				<!--</div>-->
			<!--</div>-->

			<!--<div class="Chart__container" v-if="loaded">-->
				<!--<div class="Chart__title">-->
					<!--Downloads per Week <span>{{ formattedPeriod }}</span>-->
					<!--<hr>-->
				<!--</div>-->
				<!--<div class="Chart__content">-->
					<!--<line-chart v-if="loaded" :chart-data="downloadsWeek" :chart-labels="labelsWeek"></line-chart>-->
				<!--</div>-->
			<!--</div>-->

			<!--<div class="Chart__container" v-if="loaded">-->
				<!--<div class="Chart__title">-->
					<!--Downloads per Month <span>{{ formattedPeriod }}</span>-->
					<!--<hr>-->
				<!--</div>-->
				<!--<div class="Chart__content">-->
					<!--<line-chart v-if="loaded" :chart-data="downloadsMonth" :chart-labels="labelsMonth"></line-chart>-->
				<!--</div>-->
			<!--</div>-->

			<!--<div class="Chart__container" v-if="loaded">-->
				<!--<div class="Chart__title">-->
					<!--Downloads per Year <span>{{ formattedPeriod }}</span>-->
					<!--<hr>-->
				<!--</div>-->
				<!--<div class="Chart__content">-->
					<!--<line-chart v-if="loaded" :chart-data="downloadsYear" :chart-labels="labelsYear"></line-chart>-->
				<!--</div>-->
			<!--</div>-->

		<!--</v-card>-->
	<!--</div>-->
<!--</template>-->


<!--<script>-->
	<!--import cc from 'cryptocompare'-->
	<!--import axios from 'axios'-->

	<!--import LineChart from '../components/LineChart.vue'-->
	<!--import PackageInfo from '../components/PackageInfo.vue'-->

	<!--import {-->
		<!--dateToYear,-->
		<!--dateToDay,-->
		<!--dateToMonth,-->
		<!--dateToWeek,-->
		<!--dateBeautify } from '../utils/dateFormatter.js'-->

	<!--import { removeDuplicate, groupData } from '../utils/downloadFormatter.js'-->


	<!--export default {-->
		<!--name: 'coin',-->

		<!--components: {-->
			<!--LineChart,-->
			<!--PackageInfo-->
		<!--},-->

		<!--metaInfo() {-->
			<!--return {-->
				<!--title: `${this.coin.name} Details`,-->
				<!--titleTemplate: '%s | CoinCaps.io',-->
				<!--meta: [-->
					<!--{ vmid: 'description', name: 'description', content: `${this.coin.name} information needs to be updated!` }-->
				<!--]-->
			<!--}-->
		<!--},-->

		<!--data() {-->
			<!--return {-->
				<!--package: null,-->
				<!--packageName: '',-->
				<!--loaded: false,-->
				<!--loading: false,-->
				<!--downloads: [],-->
				<!--downloadsYear: [],-->
				<!--downloadsMonth: [],-->
				<!--downloadsWeek: [],-->
				<!--labels: [],-->
				<!--labelsYear: [],-->
				<!--labelsMonth: [],-->
				<!--labelsWeek: [],-->
				<!--showError: false,-->
				<!--showSettings: false,-->
				<!--errorMessage: 'Please enter a package name',-->
				<!--periodStartMenu: false,-->
				<!--periodEndMenu: false,-->
				<!--periodStart: '',-->
				<!--periodEnd: new Date(),-->
				<!--rawData: '',-->
				<!--totalDownloads: '',-->
				<!--coin: []-->
			<!--}-->
		<!--},-->

		<!--mounted () {-->
			<!--this.coinFetch()-->

			<!--if (this.$route.params.package) {-->
				<!--this.package = this.$route.params.package-->
				<!--this.requestData()-->
			<!--}-->
		<!--},-->

		<!--computed: {-->
			<!--_endDate () {-->
				<!--return dateToDay(this.periodEnd)-->
			<!--},-->
			<!--_startDate () {-->
				<!--return dateToDay(this.periodStart)-->
			<!--},-->
			<!--period () {-->
				<!--return this.periodStart ?  `${this._startDate}:${this._endDate}` : 'last-month'-->
			<!--},-->
			<!--formattedPeriod () {-->
				<!--return this.periodStart ? `${dateBeautify(this._startDate)} - ${dateBeautify(this._endDate)}` : 'last-month'-->
			<!--}-->
		<!--},-->

		<!--methods: {-->
			<!--resetState () {-->
				<!--this.loaded = false-->
				<!--this.showError = false-->
			<!--},-->
			<!--requestData () {-->
				<!--if (this.package === null || this.package === '' || this.package === 'undefined') {-->
					<!--this.showError = true-->
					<!--return-->
				<!--}-->
				<!--this.resetState()-->
				<!--this.loading = true-->
				<!--axios.get(`https://api.npmjs.org/downloads/range/${this.period}/${this.package}`)-->
				<!--.then(response => {-->
					<!--console.log(response)-->

					<!--this.rawData = response.data.downloads-->
					<!--this.downloads = response.data.downloads.map(entry => entry.downloads)-->
					<!--this.labels = response.data.downloads.map(entry => entry.day)-->
					<!--this.packageName = response.data.package-->
					<!--this.totalDownloads = this.downloads.reduce((total, download) => total + download)-->
					<!--this.setURL()-->
					<!--this.groupDataByDate()-->
					<!--this.loaded = true-->
					<!--this.loading = false-->
				<!--})-->
				<!--.catch(err => {-->
					<!--this.errorMessage = err.response.data.error-->
					<!--this.showError = true-->
				<!--})-->
			<!--},-->
			<!--validateDataRequest () {-->
				<!--console.log('ValidateData')-->
				<!--if (this.packageName !== '' && this.periodStart !== '') {-->
					<!--this.requestData()-->
				<!--}-->
			<!--},-->
			<!--groupDataByDate () {-->
				<!--this.formatYear()-->
				<!--this.formatMonth()-->
				<!--this.formatWeek()-->
			<!--},-->
			<!--formatYear () {-->
				<!--this.labelsYear = this.rawData-->
				<!--.map(entry => dateToYear(entry.day))-->
				<!--.reduce(removeDuplicate, [])-->
				<!--this.downloadsYear = groupData(this.rawData, dateToYear)-->
			<!--},-->
			<!--formatMonth () {-->
				<!--this.labelsMonth = this.rawData-->
				<!--.map(entry => dateToMonth(entry.day))-->
				<!--.reduce(removeDuplicate, [])-->
				<!--this.downloadsMonth = groupData(this.rawData, dateToMonth)-->
			<!--},-->
			<!--formatWeek () {-->
				<!--this.labelsWeek = this.rawData-->
				<!--.map(entry => dateToWeek(entry.day))-->
				<!--.reduce(removeDuplicate, [])-->
				<!--this.downloadsWeek = groupData(this.rawData, dateToWeek)-->
			<!--},-->
			<!--setURL () {-->
				<!--history.pushState({ info: `npm-stats ${this.package}` }, this.package, `/#/${this.package}`)-->
				<!--this.$ga.page({-->
					<!--page: `/#/${this.package}`,-->
					<!--title: this.package,-->
					<!--location: window.location.href-->
				<!--})-->
			<!--},-->
			<!--toggleSettings () {-->
				<!--this.showSettings = !this.showSettings-->
				<!--this.$ga.event({-->
					<!--eventCategory: 'Settings',-->
					<!--eventAction: 'toggle'-->
				<!--})-->
			<!--},-->
			<!--coinFetch () {-->
				<!--cc.histoDay(['BURST'], ['BTC'])-->
				<!--.then(prices => {-->
					<!--console.log(prices)-->
				<!--})-->
			<!--}-->
		<!--}-->



<!--//		beforeCreate() {-->
<!--//			const self = this-->
<!--//			const corsProxy = 'https://cors-anywhere.herokuapp.com/'-->
<!--//			const coinIdApi = `${corsProxy}https://api.coinmarketcap.com/v1/ticker/${self.$route.params.id}`-->
<!--//-->
<!--//			axios.get(coinIdApi)-->
<!--//			     .then(response => {-->
<!--//				     this.coin = response.data[0]-->
<!--//				     console.log(this.coin)-->
<!--//			     })-->
<!--//			     .catch(error => {-->
<!--//				     console.log(error)-->
<!--//				     this.coin = []-->
<!--//			     })-->
<!--//		}-->
	<!--}-->
<!--</script>-->


<!--<style lang="stylus">-->
	<!--#coin {-->
	<!--}-->
<!--</style>-->