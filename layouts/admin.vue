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
							<img src="/en.svg" width="30" class="mr-3" alt="en" />
							<v-radio value="en" class="d-inline-block" label="English"></v-radio>
						</div>
						<div class="d-flex align-center">
							<img src="/sw.svg" width="30" class="mr-3" alt="Uk" />
							<v-radio value="sw" class="d-inline-block" label="Svenska"></v-radio>
						</div>
					</v-radio-group>
				</v-card-text>

				<v-card-actions class="grey lighten-3 pa-5">
					<v-spacer></v-spacer>

					<v-btn color="success" depressed @click="changeLang">Change langauge</v-btn>
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

				<v-list-item :to="$t('navigationDrewer.invoice.url')">
					<v-list-item-action>
						<img src="/invoice.svg" alt="invoice" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{$t('navigationDrewer.invoice.text')}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<div v-if="$auth.user.admin && $auth.loggedIn">
					<v-list-item :to="$t('navigationDrewer.user.url')">
						<v-list-item-action>
							<img src="/user.svg" alt="user" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{$t('navigationDrewer.user.text')}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</div>

				<v-list-item :to="$t('navigationDrewer.customer.url')">
					<v-list-item-action>
						<img src="/team.svg" alt="team" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{$t('navigationDrewer.customer.text')}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<v-list-item :to="$t('navigationDrewer.article.url')">
					<v-list-item-action>
						<img src="/article.svg" width="24" alt="article" />
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>{{$t('navigationDrewer.article.text')}}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>

				<div v-if="$auth.loggedIn">
					<div v-if="$auth.user.admin">
						<v-list-group no-action>
							<template v-slot:activator>
								<v-list-item-action>
									<img src="/payment.svg" width="24" alt="payment" />
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>{{$t('navigationDrewer.salary.main.text')}}</v-list-item-title>
								</v-list-item-content>
							</template>
							<v-list-item :to="$t('navigationDrewer.salary.unpaid.url')">
								<v-list-item-icon>
									<v-icon>mdi-account-cash</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>{{$t('navigationDrewer.salary.unpaid.text')}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item :to="$t('navigationDrewer.salary.paid.url')">
								<v-list-item-icon>
									<v-icon>mdi-account-cash-outline</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>{{$t('navigationDrewer.salary.paid.text')}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</div>

					<v-divider></v-divider>

					<v-list-item :to="$t('navigationDrewer.settings.url')">
						<v-list-item-action>
							<img src="/settings.svg" width="24" alt="payment" />
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{$t('navigationDrewer.settings.text')}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-divider></v-divider>

					<v-list-item :to="$t('navigationDrewer.statistics.url')">
						<v-list-item-action>
							<v-icon>mdi mdi-chart-bar</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>{{$t('navigationDrewer.statistics.text')}}</v-list-item-title>
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
				<nuxt-link to="/" class="white--text link">Acredit</nuxt-link>
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
						<v-btn outlined v-on="on">
							{{ $auth.user.name }}
							<v-icon>mdi mdi-chevron-down</v-icon>
						</v-btn>
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

						<v-list-item class="py-2" exact :to="$t('appBar.personalSettings.url')">{{ $t('appBar.personalSettings.text') }}</v-list-item>
						<v-divider></v-divider>

						<v-list-item class="py-2" @click="langDialog = true">
							<span>Change language</span>
							<v-spacer></v-spacer>
							<img :src="require(`static/${$i18n.locale}.svg`)" width="30" class="mr-3" :alt="$i18n.locale" />

						</v-list-item>

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
			language: null,
			rightDrawer: false,
			title: "Acredit"
		};
	},

	methods: {
		async logOut() {
			await this.$auth.logout();
		},
		changeLang() {
			this.langDialog = false;
			this.$i18n.setLocale(this.language);
		}
	},
	mounted() {
		this.language = this.$i18n.locale;
	}
};
</script>

<style>
@media screen and (max-width: 600px) {
	.v-data-table__wrapper table tbody tr:nth-child(2n + 1),
	.v-data-table__wrapper
		table
		tbody
		tr.v-data-table__mobile-table-row:nth-child(2n + 1),
	.v-data-table__wrapper table tbody tr:nth-child(2n),
	.v-data-table__wrapper
		table
		tbody
		tr.v-data-table__mobile-table-row:nth-child(2n) {
		display: table-row;
	}
}
.v-data-table__wrapper table tbody tr:nth-child(2n + 1),
.v-data-table__wrapper
	table
	tbody
	tr.v-data-table__mobile-table-row:nth-child(2n + 1) {
	background-color: #fff !important;
}

.v-data-table__wrapper table tbody tr:nth-child(2n),
.v-data-table__wrapper
	table
	tbody
	tr.v-data-table__mobile-table-row:nth-child(2n) {
	background-color: #eee !important;
}

.v-list-item__icon {
	margin-right: 10px !important;
}
img {
	width: 24px;
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
