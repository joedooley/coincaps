<template>
	<div id="menu-sidebar">
		<v-sidebar left fixed drawer v-model="nav">
			<v-list>
				<v-list-item v-for="i in 3" :key="i">
					<v-list-tile>
						<v-list-tile-title>Item {{ i }}</v-list-tile-title>
					</v-list-tile>
				</v-list-item>
			</v-list>
		</v-sidebar>
	</div>
</template>


<script>
	export default {
		name: 'menu-sidebar',

//		data() {
//			return {
//				nav: !1
//			}
//		}
	}
</script>


<style lang="stylus">
</style>