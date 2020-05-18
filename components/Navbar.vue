<template>
	<div>
		<v-app-bar color="#336882" dark>
			<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>
				<nuxt-link to="/" class="link">Acredit</nuxt-link>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<div v-if="$auth.loggedIn">
				<v-btn outlined @click="$auth.logout()">Logout</v-btn>
			</div>
			<div v-else>
				<nuxt-link to="/login" class="link">Login</nuxt-link>
			</div>
		</v-app-bar>

		<v-navigation-drawer color="#336882" dark  v-model="drawer" absolute temporary>
			<v-list-item>
				<nuxt-link to="/" class=" link">Home</nuxt-link>
			</v-list-item>

			<v-list-item>
				<nuxt-link to="/job" class="  link">Calculate</nuxt-link>
			</v-list-item>

			<v-list-item>
				<nuxt-link to="/newinvoice" class=" link">Calculate</nuxt-link>
			</v-list-item>

				<v-divider inset vertical></v-divider>

			<v-list-item>
				<nuxt-link to="/signup" class=" link">Register</nuxt-link>
			</v-list-item>

				<v-divider></v-divider>
			<v-list-item>
				<nuxt-link to="/login" class="  link">Login</nuxt-link>
			</v-list-item>

			<v-divider></v-divider>

		</v-navigation-drawer>
	</div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true
    }
  },
};
</script>

<style scoped>
.link {
	text-decoration: none;
	color: white;
	font-weight: bold;
	margin-left: 20px;
	font-size: 120%;
}
</style>
