<template>
	<div class="Package">
		<h1 class="Package__title">{{ packageName }}</h1>
		<div class="Package__info">
			<div class="Package__info-item">
				<span>{{ totalDownloads }}</span><span class="info-label">Total Downloads</span>
			</div>
			<div class="Package__info-item">
				<span>{{ period }}</span><span class="info-label">Period</span>
			</div>
			<div class="Package__info-item">
				<span><a :href="packageLink">{{ packageName }} on npm</a></span><span class="info-label">Link</span>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props: {
			packageName: {
				type: String
			},
			totalDownloads: {
				type: Number
			},
			period: {
				type: String
			}
		},
		computed: {
			packageLink () {
				return `https://www.npmjs.com/package/${this.packageName}`
			}
		}
	}
</script>


<style lang="scss" scoped>
	.Package {
		padding: 20px;
		background-color: #4f5566;
		border-radius: 4px;
		box-shadow: 0 2px 16px 0 rgba(0,0,0,0.30);
		color: #fff;
		text-align: center;
		max-width: 400px;

		.Package__title {
			color: #fff;
			margin-top: 0;
			font-size: 30px;
		}

		.Package__info {
			display: flex;
			flex-direction: column;
		}

		.Package__info-item {
			display: flex;
			flex-direction: column;
			margin: 5px 0;

			> span:not(.info-label) {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 5px;
				color: #00c4c9;

				> a {
					color: currentColor;
				}

				.info-label {
					text-transform: uppercase;
					font-size: 12px;
					color: #e8e9ed;
				}
			}
		}
	}
</style>