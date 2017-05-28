<template>
	<div class="back-to-coins">
		<v-btn :primary="primary" class="white--text" router :href="{ name: 'home' }">
			<v-icon light left>arrow_back</v-icon>Back
		</v-btn>
	</div>
</template>


<script>
	export default {
		name: 'back-to-coins',

		data() {
			return {
				primary: true
			}
		}
	}
</script>


<style lang="scss" scoped>
	.back-to-coins {
		> a {
			margin: 2rem 0;
		}
	}
</style>