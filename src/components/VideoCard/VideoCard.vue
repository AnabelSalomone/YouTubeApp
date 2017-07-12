<template>
	<div class="cont">
		<div v-if="!loaded" class="container">
			Loading</div>
	
		<!--VIDEO-->
		<div v-else class="video-container">
			<iframe width="853" height="480" :src=video frameborder="0" allowfullscreen></iframe>
		</div>
	
		<div class="row">
	
			<div class="col s12 description">
				<p class="title">{{videoDetails.items[0].snippet.title}}</p>
			</div>
	
			<!--DESCRIPTION-->
			<div class="col s12 description">
				<p class="title">Description</p>
				{{videoDetails.items[0].snippet.description | limitChars}}
			</div>
	
			<!--ICONS-->
			<div class="icons-banner">
				<div class="col s3">
					<div class="row">
						<i class="material-icons">remove_red_eye</i>
					</div>
					<div class="row">
						{{videoDetails.items[0].statistics.viewCount}}
					</div>
				</div>
	
				<!--LIKE-->
				<div class="col s3">
					<div class="row">
						<i class="material-icons">thumb_up</i>
					</div>
					<div class="row">
						{{videoDetails.items[0].statistics.likeCount}}
					</div>
				</div>
	
				<!--DISLIKES-->
				<div class="col s3">
					<div class="row">
						<i class="material-icons">thumb_down</i>
	
					</div>
					<div class="row">
						{{videoDetails.items[0].statistics.dislikeCount}}
					</div>
				</div>
	
				<!--COMMENTS-->
				<div class="col s3">
					<div class="row">
						<i class="material-icons">comment</i>
					</div>
					<div class="row">
						{{videoDetails.items[0].statistics.dislikeCount}}
					</div>
				</div>
			</div>
	
		</div>
		<!--ADD TO FAV-->
		<div class="addfav">
			<a class="btn amber darken-2" @click="callAddFav()">Add video to favorites</a>
		</div>
		<br>
		<br>
	
		<!--SEND EMAIL-->
		<form @submit.prevent="sendNew">
			<input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" placeholder="Send link to a friend" id="email" type="text" v-model="email.email">
			<div v-if="email.email.length >0" v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</div>
			<button type="button" @click="sendEmail()">Send</button>
		</form>
	
		<br>
		<br>
		<br>
	
	</div>
</template>

<script>
import axios from 'axios'
import { Store } from '@/Store.js'


export default {
	name: 'VideoCard',
	data() {
		return {
			data: Store.datas,
			videoDetails: '',
			video: '',
			email: { email: '', video: '' },
			loaded: false
		}
	},

	created() {
		axios.get(`http://localhost:3000/video/${this.$route.params.id}`).then((res) => {
			this.videoDetails = res.data;
			this.newFav = res.data;
			console.log("Store newfav: ", Store.datas.newFav)
			console.log(res.data);
			this.video = `//www.youtube.com/embed/${this.videoDetails.items[0].id}`
			this.email.video = "http:" + this.video;
			this.loaded = true;
			window.scrollTo(0, 0);
		});
	},


	methods: {
		callAddFav() {
			console.log(this.newFav);
			axios.post('http://localhost:3000/calladdfav', this.newFav).then((res) => {
				console.log("RESSSSSSSSSSSSS", res.data);
				if (res.data) {
					axios.post('http://localhost:3000/addfav', this.newFav).then((res) => {
						this.$toasted.show('Added to favorites!').goAway(1500);
					})
				} else {
					this.$toasted.show('Already in favorites!').goAway(1500);

				}
			});
		},


		sendEmail() {

			this.$validator.validateAll().then(() => {
				axios.post('http://localhost:3000/sendEmail', this.email).then((res) => {
					this.$toasted.show('Email sent!').goAway(1500);
					this.email.email = '';
					this.data.num_emails += 1;
				}).catch(() => {
					this.$toasted.show('Try again').goAway(4500);
					alert('Oops, wrong email!');
				});
			})
		}
	},

	filters: {
		limitChars: function (elt) {
			if (elt) {
				elt = elt[0].toUpperCase() + elt.substring(1, elt.length)
			}

			if (elt.length > 250) {
				return elt.substring(0, 250) + " ..."
			} else {
				return elt
			}
		}
	}
}
</script>

<style scoped>
.cont {
	padding-bottom: 2em;
}

.description {
	text-align: justify;
	text-justify: inter-word;
	margin-bottom: 20px;
}

.title {
	font-weight: bold;
}

.icons-banner,
.addfav {
	text-align: center;
}

.addfav {
	padding-top: 30px;
}

.row {
	margin-bottom: 0px;
}
</style>