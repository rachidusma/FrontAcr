<template>
	<v-app dark>
		<!-- Start Language Dialog -->
		<v-dialog v-model="langDialog" max-width="500">
			<v-card>
				<v-card-title class="headline">
					<h4>Change language</h4>
					<v-spacer></v-spacer>
					<v-icon class="black--text" @click="langDialog = false">mdi mdi-close</v-icon>
				</v-card-title>
				<v-divider></v-divider>

				<v-card-text>
					<v-radio-group v-model="language">
						<div class="d-flex mb-5 align-center">
							<img src="/uk.svg" width="30" class="mr-3" alt="Uk" />
							<v-radio value="uk" class="d-inline-block" label="English"></v-radio>
						</div>
						<div class="d-flex align-center">
							<img src="/sw.svg" width="30" class="mr-3" alt="Uk" />
							<v-radio value="sw" class="d-inline-block" label="Svenska"></v-radio>
						</div>
					</v-radio-group>
				</v-card-text>

				<v-card-actions class="grey lighten-3 pa-5">
					<v-spacer></v-spacer>

					<v-btn color="success" depressed @click="langDialog = false">Change langauge</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- End Language Dialog -->

		<v-navigation-drawer
			v-model="drawer"
			:mini-variant="miniVariant"
			:clipped="clipped"
			fixed
			app
			color="white"
			class="pt-4"
		>
			<v-list dense>
				<div v-if="$auth.loggedIn">
					<v-list-item two-line :class="miniVariant && 'px-0'" class="mb-3">
						<v-badge avatar bordered overlap icon="mdi-account-check">
							<v-avatar color="red" class="ml-3">
								<span class="white--text headline">
									{{ $auth.user.name.charAt(0).toUpperCase() }}
									<span
										v-if="$auth.user.admin"
									>{{ $auth.user.lastname.charAt(0).toUpperCase() }}</span>
								</span>
							</v-avatar>
						</v-badge>

						<v-list-item-content class="text-center">
							<v-list-item-title>
								{{ $auth.user.name }}
								<span v-if="$auth.user.admin">{{ $auth.user.lastname }}</span>
							</v-list-item-title>
							<div>
								<v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
							</div>
							<div v-if="$auth.user.admin">
								<v-list-item-subtitle>Admin</v-list-item-subtitle>
							</div>
							<div v-else>
								<v-list-item-subtitle>Client</v-list-item-subtitle>
							</div>
						</v-list-item-content>
					</v-list-item>
				</div>
				<v-divider></v-divider>

				<v-list-item to="/invoices">
					<v-list-item-action>
						<img src="/invoice.svg" alt="invoice" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>invoice</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<div v-if="$auth.user.admin && $auth.loggedIn">
					<v-list-item to="/user">
						<v-list-item-action>
							<img src="/user.svg" alt="user" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Users</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</div>

				<v-list-item to="/customer">
					<v-list-item-action>
						<img src="/team.svg" alt="team" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Customer</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item to="/articles">
					<v-list-item-action>
						<img src="/article.svg" width="24" alt="article" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Article</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<div v-if="$auth.loggedIn">
					<div v-if="$auth.user.admin">
						<v-list-group no-action>
							<template v-slot:activator>
								<v-list-item-icon>
									<img src="/payment.svg" width="24" alt="payment" />
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>Salary</v-list-item-title>
								</v-list-item-content>
							</template>
							<v-list-item to="/uppaidsalary">
								<v-list-item-icon>
									<v-icon>mdi-account-cash</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>Unpaid Salary</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item to="/paidsalary">
								<v-list-item-icon>
									<v-icon>mdi-account-cash-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>Paid Salary</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</div>

					<v-divider></v-divider>
					<v-list-item to="/docment">
						<v-list-item-action>
							<v-icon>mdi-folder-multiple-image</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Document</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-divider></v-divider>

					<v-list-item to="/settings">
						<v-list-item-action>
							<img src="/settings.svg" width="24" alt="payment" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Settings</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-divider></v-divider>

					<v-list-item to="/profile">
						<v-list-item-action>
							<img src="/profile.svg" width="24" alt="payment" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>Profile</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-divider></v-divider>
				</div>
			</v-list>
		</v-navigation-drawer>

		<!-- Start Navbar -->
		<v-app-bar :clipped-left="clipped" fixed app color="#336882" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />

			<v-toolbar-title>
				<nuxt-link to="/" class="link">Acredit</nuxt-link>
			</v-toolbar-title>
			<v-spacer />
			<v-spacer></v-spacer>

			<!-- Start user dropdown -->
			<div class="text-center mx-2">
				<v-menu
					:close-on-content-click="false"
					offset-y
					nudge-left="300"
					nudge-bottom="10"
					:nudge-width="200"
					offset-x
				>
					<template v-slot:activator="{ on }">
						<v-btn outlined v-on="on">{{ $auth.user.name }}</v-btn>
					</template>
					<v-list class="pa-0">
						<v-list-item class="grey lighten-4 pa-5">
							<v-list-item-title>
								<p
									class="font-weight-black pa-0 ma-0 text--primary"
								>{{ $auth.user.name }} {{ $auth.user.lastname }}</p>
								<small class="text--secondary">{{ $auth.user.email }}</small>
							</v-list-item-title>
						</v-list-item>

						<v-list-item class="py-2" exact to="/settings/personal-settings">Personal Settings</v-list-item>
						<v-divider></v-divider>

						<v-list-item class="py-2" @click="langDialog = true">Change language</v-list-item>

						<v-list-item @click="$auth.logout()" class="grey lighten-4" style="color: red !important">
							<img src="/logout.svg" width="20" class="mr-3" alt="logout" />
							Log out
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
			<!-- End user dropdown -->

			<div v-if="!$auth.loggedIn">
				<nuxt-link to="/" class="link">Login</nuxt-link>
			</div>
		</v-app-bar>
		<!-- End Navbar -->

		<v-content class="gray">
			<v-container>
				<nuxt />
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {
			clipped: true,
			drawer: true,
			fixed: false,
			miniVariant: false,
			right: true,
			langDialog: false,
			language: "uk",
			rightDrawer: false,
			title: "Acredit"
		};
	},

	methods: {
		async logOut() {
			await this.$auth.logout();
		}
	}
};
</script>

<style scoped>
.v-list-item__icon {
	margin-right: 10px !important;
}
.v-navigation-drawer__content
	.v-list-item--active.v-list-item.v-list-item--link.theme--light,
.v-navigation-drawer__content
	.v-list-group__items
	a.v-list-item.v-list-item--link.theme--light {
	color: black !important;
}

.link {
	text-decoration: none;
	color: white;
	font-weight: bold;
	margin-left: 20px;
	font-size: 120%;
}
.gray {
	background-color: #f5f7f9;
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
