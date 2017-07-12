<template>
	<div>
		<div class="title">
			<h4>Your favorites</h4>
		</div>
		<ul class="collection">
			<div v-for="item of data.favs">
				<li>
					<div class="row">
						<router-link :to="{name:'VideoCard' , params:{id:item.id}}">
	
							<div class="col s12">
								<span class="title">{{item.title}}</span>
							</div>
						</router-link>
					</div>
				</li>
				<div class="divider"></div>
			</div>
	
		</ul>
	
	</div>
</template>
<script>
import axios from 'axios'
import { Store } from '@/Store.js'

export default {
	name: 'favorites',
	data() {
		return {
			data: Store.datas
		}
	},

	created() {
		console.log('created loadFavs running !')
		axios.get('http://localhost:3000/favlist').then((response) => {
			console.log(this.data.favs);

			this.data.favs = response.data;
			console.log(this.data.favs);
		});
	}
}
</script>

<style scoped>
.title {
	text-align: center;
}
</style>