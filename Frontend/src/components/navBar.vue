<template>
    <nav class="nav">
		<a href="/feed"><h3 class="nav_title">Groupomania</h3></a>
		<ul class="nav_list">
			<router-link to="/user/:id"><li class="nav_item">Compte</li></router-link>
			<router-link 
			to="/login"
			@click="logout()">
				<li class="nav_item">Déconnexion</li>
			</router-link>
		</ul>
	</nav>
</template>

<script>
export default {
	name : "navBar",
	methods :{
		logout(){
			localStorage.clear();
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../style.scss";
.nav {
	background: $font-color;
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	padding-left:10px;
	padding-right: 10px;
}
.nav_list{
	display:flex;
	flex-direction: row;
	list-style-type : none;
	font-weight: 600;
	.nav_item{
	margin-left: 15px;
	margin-left: 15px;
	}
}
a{
	color: white;
	text-decoration: none;
}
</style>