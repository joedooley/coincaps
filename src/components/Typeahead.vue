<template>
	<div class="Typeahead">

		<i class="fa fa-spinner fa-spin" v-if="loading"></i>
		<template v-else>
			<i class="fa fa-search" v-show="isEmpty"></i>
			<i class="fa fa-times" v-show="isDirty" @click="reset"></i>
		</template>

		<input class="Typeahead__input"
		       placeholder="Search Coins..."
		       autocomplete="off"
		       v-model="query"
		       @keydown.down="down"
		       @keydown.up="up"
		       @keydown.enter="hit"
		       @keydown.esc="reset"
		       @blur="reset"
		       @input="update"
		/>

		<ul v-show="hasItems">
			<li
					v-for="(item, $item) in items"
					:class="activeClass($item)"
					@mousedown="hit"
					@mousemove="setActive($item)"
			>
				<span class="name" v-text="item.name"></span>
				<span class="screen-name" v-text="item.symbol"></span>
			</li>
		</ul>

	</div>
</template>


<script>
	import router from 'vue-router'
	import axios from 'axios'
	import { _, pick } from 'underscore'

	import VueTypeahead from 'vue-typeahead'

	export default {
		name: 'typeahead',

		extends: VueTypeahead,

		data() {
			return {
				src: 'https://cors-anywhere.herokuapp.com/https://api.coinmarketcap.com/v1/ticker/?convert=USD',
				data: {},
				limit: 5,
				minChars: 3,
				selectFirst: false,
				queryParamName: 'q',
				items: [],
				searchItems: []
			}
		},

		methods: {
			fetch () {
//				let items = [
//					{ name: 'abc' },
//					{ name: 'aabc' },
//					{ name: 'aaabc' },
//					{ name: 'aaaabc' }
//				]
//
//				return Promise.resolve({
//					data: items.filter((item) => {
//						console.log(item)
//						return item.name.startsWith(this.query)
//					})
//				})


				this.getCoins()

				return Promise.resolve({
					data: this.searchItems.filter((item) => {
						console.log(item)
						return item.name.startsWith(this.query)
					})
				})
			},

			onHit (item) {
				console.log(item)
				this.$router.push({ name: 'coin', params: { id: item.symbol } })
			},

			getCoins(api) {
				api = this.src

				axios.get(api).
					then(response => {
						this.items = response.data

						this.searchItems = this.items.map(item => {
							return item.name.toLowerCase()
						})

						console.log(this.searchItems)

					}).
					catch(error => {
						console.log(error)
						this.items = []
					})
			},

//			prepareResponseData (data) {
//				console.log(data)
////				return data
//			}
		}
	}
</script>


<style lang="scss" scoped>
	.Typeahead {
		position: relative;
	}
	.Typeahead__input {
		width: 100%;
		font-size: 14px;
		color: #fff;
		line-height: 1.42857143;
		box-shadow: inset 0 1px 4px rgba(0,0,0,.4);
		transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
		font-weight: 300;
		padding: 12px 26px;
		border: none;
		border-radius: 22px;
		letter-spacing: 1px;
		box-sizing: border-box;
	}
	.Typeahead__input:focus {
		border-color: #4fc08d;
		outline: 0;
		box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px #4fc08d;
	}
	.fa-times {
		cursor: pointer;
	}
	i {
		float: right;
		position: relative;
		top: 30px;
		right: 29px;
		opacity: 0.4;
	}
	ul {
		position: absolute;
		padding: 0;
		margin-top: 8px;
		min-width: 100%;
		background-color: #fff;
		list-style: none;
		border-radius: 4px;
		box-shadow: 0 0 10px rgba(0,0,0, 0.25);
		z-index: 1000;
	}
	li {
		padding: 10px 16px;
		border-bottom: 1px solid #ccc;
		cursor: pointer;
	}
	li:first-child {
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}
	li:last-child {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		border-bottom: 0;
	}
	span {
		display: block;
		color: #2c3e50;
	}
	.active {
		background-color: #3aa373;
	}
	.active span {
		color: white;
	}
	.name {
		font-weight: 700;
		font-size: 18px;
	}
	.screen-name {
		font-style: italic;
	}
</style>