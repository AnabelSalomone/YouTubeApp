<template>
	<div>
		<div v-if="data.results < 1 || data.searchKeyword===''">
			Type your search...
		</div>
	
		<div v-else>
			<ul class="collection">
				<div v-for="item of data.results.items">
	
					<li class="collection-item avatar float-clear">
						<div class="row">
							<router-link :to="{name:'VideoCard' , params:{id:item.id.videoId}}">
								<div class="col s5">
									<img :src=item.snippet.thumbnails.default.url alt="avatar">
								</div>
								<div class="col s7">
									<span class="title">{{item.snippet.title | limitChars}}</span>
									<p class="description">{{item.snippet.description | limitChars}}</p>
								</div>
							</router-link>
						</div>
					</li>
					<div class="divider"></div>
				</div>
	
			</ul>
	
		</div>
	</div>
</template>

<script>
import { Store } from '@/Store.js'

export default {
	name: 'SearchResult',
	data() {
		return {
			data: Store.datas,
		}
	},
	filters: {
		limitChars: function (elt) {
			if (elt) {
				elt = elt[0].toUpperCase() + elt.substring(1, elt.length)
			}

			if (elt.length > 40) {
				return elt.substring(0, 40) + " ..."
			} else {
				return elt
			}
		},
	}
}
</script>

<style scoped>
img {
	max-height: 5em;
}

.collection .collection-item.avatar {
	padding-left: 0px;
	min-height: 0px;
}

.fix-float {
	float: left;
}

.float-clear {
	clear: both;
}

.description {
	font-size: 10px;
}

.title {
	font-weight: bold;
}
</style>