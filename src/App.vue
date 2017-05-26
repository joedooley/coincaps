<template>
  <v-app>
   <header-component></header-component>
    <main class="grey lighten-2">
      <v-container fluid>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </v-container>
    </main>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
    import HeaderComponent from './components/HeaderComponent.vue'
    import FooterBar from './components/FooterBar.vue'

	export default {
		name: 'app',
        metaInfo: {
			title: 'Crypto Currency Prices and Market Data',
			titleTemplate: '%s | CoinCaps.io'
		},
		components: {
			HeaderComponent,
            FooterBar
		}
	}
</script>

<style lang="stylus">
  @import '../node_modules/vuetify/src/stylus/settings/_colors'

  $theme := {
    primary: $blue-grey.darken-3
    accent: $blue-grey.lighten-1
    secondary: $grey.lighten-2
    info: $blue.darken-4
    warning: $amber.darken-2
    error: $red.accent-4
    success: $green.lighten-2
  }

  @import '../node_modules/vuetify/src/stylus/main'
</style>

<style lang="scss">
  @import "css/style.scss";
</style>