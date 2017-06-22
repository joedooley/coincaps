<template>
	<v-footer>
		<div class="copyright">
			<p>©2017 <a href="/" title="CoinCaps.io - Cryptocurrency Market Caps">CoinCaps.io</a> - All Rights Reserved</p>
		</div>
		<div class="donations">
			<p>Donate BTC: 1FQTPnqAPgqCZD8YpLj45Bo5f97hf8zauE</p>
			<p>Donate ETH: 0x16cfdDA0671D9C17B12F99f062c8e8D58Eb69939</p>
		</div>
	</v-footer>
</template>


<script>
	export default {
		name: 'footer-bar'
	}
</script>


<style lang="scss" scoped>
	.footer {
		height: auto;
		justify-content: space-between;

		@media (max-width: 768px) {
			flex-direction: column;
		}

		.copyright {
			margin-bottom: 10px;
			margin-top: 10px;
		}

		a {
			color: #fff;
		}

		p {
			margin-bottom: 0;
		}
	}
</style>