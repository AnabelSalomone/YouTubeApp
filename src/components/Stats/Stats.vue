<template>
	<div v-if="loaded" class="cont">
		<div class="emails">
			<i class="material-icons">email</i>
			<br> {{data.num_emails}} recommendations sent!
		</div>
	
		<div class="favs">
			<i class="material-icons">star</i>
			<br> {{num_favs}} videos added to favorite
		</div>
	</div>
	
	<div v-else>
		Loading...
	</div>
</template>

<script>
import axios from 'axios'
import { Store } from '@/Store.js'

export default {
	name: 'SearchResult',
	data() {
		return {
			data: Store.datas,
			num_favs: 0,
			loaded: false
		}
	},

	created() {
		axios.get(`http://localhost:3000/favcount`).then((res) => {
			console.log("Estoy en stats created");
			this.num_favs = res.data;
			console.log(this.num_favs);
			this.loaded = true;
		});
	},
}
</script>

<style scoped>
.cont,
.emails,
.favs {
	margin-left: 10px;
	text-align: center;
	font-size: 30px;
	padding-top: 30px;
}
</style>