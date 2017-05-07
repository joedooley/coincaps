<template>
  <v-app left>
    <header>
      <v-toolbar>
        <v-toolbar-side-icon @click.native.stop="nav = !nav" />
        <v-toolbar-logo>CoinCaps.io</v-toolbar-logo>
        <v-toolbar-items>
          <v-toolbar-item>
            
          </v-toolbar-item>
        </v-toolbar-items>
      </v-toolbar>
    </header>
    <main>
      <v-sidebar left fixed drawer v-model="nav">
        <v-list>
          <v-list-item v-for="i in 3" :key="i">
            <v-list-tile>
              <v-list-tile-title>Item {{ i }}</v-list-tile-title>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
          <v-data-table
                  v-bind:headers="headers"
                  v-model="items"
                  v-bind:search="search"
                  hide-actions
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
              <td class="text-xs-right">{{ props.item.market_cap_usd }}</td>
              <td class="text-xs-right">{{ props.item.price_usd }}</td>
              <td class="text-xs-right">{{ props.item.price_btc }}</td>
              <td class="text-xs-right">{{ props.item.total_supply }}</td>
              <td class="text-xs-right">{{ props.item.percent_change_1h }}</td>
              <td class="text-xs-right">{{ props.item.percent_change_24h }}</td>
              <td class="text-xs-right">{{ props.item.percent_change_7d }}</td>
            </template>
          </v-data-table>
        </v-container>
      </v-content>
    </main>
    <v-footer>Footer</v-footer>
  </v-app>
</template>

<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				nav: !1,
                search: null,
				headers: [
					{
						text: "Rank",
						value: "rank"
					}, {
					    text: "Symbol",
                        value: "symbol"
                    },{
						text: "Name",
						left: !0,
						sortable: 1,
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
					}
                ],
                items: []
			}
		},

		beforeMount() {
			const ticker = 'https://api.coinmarketcap.com/v1/ticker/?limit=90'
			axios.get(ticker)
			     .then(response => {
				     this.items = response.data
				     console.log(this.items)
			     })
			     .catch(error => {
				     console.log(error)
				     this.data = []
			     })

		}
	}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: $red.darken-2
    accent: $red.accent-2
    secondary: $grey.lighten-1
    info: $blue.lighten-1
    warning: $amber.darken-2
    error: $red.accent-4
    success: $green.lighten-2
  }

  @import '../node_modules/vuetify/src/stylus/main'
  @import './css/main.css'

  body
    background: $grey.lighten-5
</style>