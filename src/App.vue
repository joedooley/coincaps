<template>
  <v-app left>
	<header-toolbar></header-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <v-footer class="purple">
      <div class="text-xs-right">© 2016</div>
    </v-footer>
  </v-app>
</template>

<script>
	import HeaderToolbar from './components/HeaderToolbar.vue'

	export default {
		name: 'app',
        metaInfo: {
			title: 'Crypto Currency Prices and Market Data',
			titleTemplate: '%s | CoinCaps.io'
		},
		components: {
			HeaderToolbar
		}
	}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: $blue-grey.lighten-1
    accent: $blue-grey.lighten-4
    secondary: $grey.lighten-1
    info: $blue.lighten-1
    warning: $amber.darken-2
    error: $red.accent-4
    success: $green.lighten-2
  }

  @import '../node_modules/vuetify/src/stylus/main'
</style>

<style lang="scss">
  @import "css/style.scss";
</style>