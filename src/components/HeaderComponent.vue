<template>
	<header id="header-component">
		<v-navigation-drawer
				persistent
				light
				:mini-variant.sync="mini"
				v-model="drawer"
		>
			<v-list class="pa-0">
				<v-list-item>
					<v-list-tile avatar tag="div">
						<v-list-tile-avatar>
							<img src="/static/android-chrome-192x192.png" />
						</v-list-tile-avatar>
						<v-list-tile-content>
							<v-list-tile-title>CoinCaps.io</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<v-btn icon @click.native.stop="mini = !mini">
								<v-icon>chevron_left</v-icon>
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-item>
			</v-list>
			<v-list class="pt-0" dense>
				<v-divider></v-divider>
				<v-list-item v-for="item in items" :key="item">
					<v-list-tile router :href="item.to">
						<v-list-tile-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-toolbar fixed>
			<v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
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
	</header>
</template>


<script>
	export default {
		name: 'header-component',

		data() {
			return {
				items: [
					{ title: 'Home', icon: 'dashboard', to: { name: 'home' } },
					{ title: 'Contact', icon: 'question_answer', to: { name: 'contact' } }
				],
				drawer: true,
				mini: false,
				right: null,
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


<style lang="scss">
	.toolbar__title {
		h1 {
			font-size: 46px;
			margin-bottom: 0;
		}
		a {
			color: #fff;
			text-decoration: none;
		}
	}
</style>