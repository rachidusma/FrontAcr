<template>
	<v-app dark>
		<!-- Start The Drawer -->
		<v-navigation-drawer v-model="drawer" fixed app clipped class="pt-4">
			<v-list>
				<v-list-group no-action value="true">
					<template v-slot:activator>
						<v-list-item-icon>
							<img src="/invoice.svg" alt="invoice" />
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>Invoice</v-list-item-title>
						</v-list-item-content>
					</template>

					<v-divider></v-divider>
					<v-list-item link color="#f5f7f9" to="/invoices">
						<v-list-item-title>Invoice</v-list-item-title>
					</v-list-item>
					<v-divider></v-divider>

					<v-list-item link color="#f5f7f9" to="/customer">
						<v-list-item-title>Customer</v-list-item-title>
					</v-list-item>
					<v-divider></v-divider>

					<v-list-item link color="#f5f7f9" to="/articles">
						<v-list-item-title>Articles</v-list-item-title>
					</v-list-item>
				</v-list-group>
			</v-list>
		</v-navigation-drawer>
		<!-- End The Drawer -->

		<v-app-bar :clipped-left="clipped" fixed app color="#336882" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />

			<v-toolbar-title>
				<nuxt-link to="/" class="link">Acredit</nuxt-link>
			</v-toolbar-title>
			<v-spacer />
			<v-spacer></v-spacer>
			<div v-if="$auth.loggedIn">
				<v-btn outlined @click="$auth.logout()">Logout</v-btn>
			</div>
			<div v-else>
				<nuxt-link to="/login" class="link">Login</nuxt-link>
			</div>
		</v-app-bar>
		<v-content class="gray">
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
	data() {
		return {
			clipped: true,
			drawer: true,

			title: "Acredit"
		};
	}
};
</script>
<style scoped>
.v-list-item__icon {
  margin-right: 10px !important;
}
.v-list-item--active.v-list-item.v-list-item--link.theme--light{
  color: black !important;
}
.gray {
	background-color: #f5f7f9;
}
.link {
	text-decoration: none;
	color: white;
	font-weight: bold;
	margin-left: 20px;
	font-size: 120%;
}
.maintitle {
	font-size: 1.625rem !important;
	font-weight: 401;
	letter-spacing: 0.1666666667em !important;
	line-height: 1rem;
	text-transform: uppercase;
	font-family: "Roboto", sans-serif !important;
}
</style>


