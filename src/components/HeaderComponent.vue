<template>
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
			<v-toolbar-side-icon light @click.native.stop="drawer = !drawer" v-tooltip:right="{ html: 'Click to open navigation' }"></v-toolbar-side-icon>
			<v-toolbar-title>
				<a href="/" title="CoinCaps.io - Cryptocurrency Market Caps">CoinCaps.io</a>
			</v-toolbar-title>
			<v-text-field prepend-icon="search" label="Search..." hide-details single-line light></v-text-field>
		</v-toolbar>

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
				clipped: true,
				mini: false,
				right: null
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