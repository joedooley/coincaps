<template>
	<v-toolbar fixed>
		<v-toolbar-title>
			<a href="/" title="CoinCaps.io - Cryptocurrency Market Caps">CoinCaps.io</a>
		</v-toolbar-title>
		<v-toolbar-items>
			<v-toolbar-item router :to="{ name: 'home' }">Home</v-toolbar-item>
			<v-toolbar-item router :to="{ name: 'contact' }">Contact</v-toolbar-item>
			<v-menu bottom left offset-y origin="top right" transition="v-slide-y-transition">
				<v-btn icon dark slot="activator" class="white--text">
					<v-icon>more_vert</v-icon>
				</v-btn>
				<v-list>
					<v-list-item v-for="item in dropdown_items" :key="item.id">
						<v-list-tile>
							<v-list-tile-title v-text="item.title"></v-list-tile-title>
						</v-list-tile>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar-items>
	</v-toolbar>
</template>


<script>
	export default {
		name: 'header-toolbar',

		data() {
			return {
				dropdown_items: [{
					id: 1,
					title: "Send Feedback"
				}, {
					id: 2,
					title: "Request Help"
				}, {
					id: 3,
					title: "Contact Developer"
				}]
			}
		}
	}
</script>


<style lang="stylus">
	.toolbar__title {
		h1 {
			font-size: 46px
			margin-bottom: 0
		}
		a {
			color: #fff
			text-decoration: none
		}
	}
</style>