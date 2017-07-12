<template>
	<footer>
		<div class="container">
			<div class="row ">
				<div class="col s4">
					<router-link :to="{name:'Search'}">
						<i class="material-icons">home</i>
					</router-link>
				</div>
				<div class="col s4">
					<router-link :to="{name: 'Favorites'}">
						<i class="material-icons">star</i>
					</router-link>
				</div>
				<div class="col s4">
					<router-link :to="{name:'Stats'}">
						<i class="material-icons">show_chart</i>
					</router-link>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
</script>

<style scoped>
footer {
	position: fixed;
	bottom: 0;
	background-color: #333;
	color: white;
	text-align: center;
	font-size: 0.9em;
	width: 100%;
}
</style>
