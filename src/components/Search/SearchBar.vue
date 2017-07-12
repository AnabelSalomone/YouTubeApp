<template>
	<div>
		<nav>
			<div class="nav-wrapper white">
				<div class="input-field col s9">
					<input placeholder="Search" id="search-keyword" type="text" class="validate" v-model="data.searchKeyword" @keyup="callList()">
					<!--<label for="search-keyword">
															<i class="material-icons">search</i>
														</label>-->
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import { Store } from '@/Store.js'

export default {
	name: 'SearchBar',
	data() {
		return {
			data: Store.datas,
		}
	},

	methods: {
		callList() {
			Store.searchData();
		}
	}
}
</script>

<style scoped>
nav .input-field input {
	padding-left: 0px;
}

.nav-wrapper {
	text-align: center;
	color: #333;
}
</style>