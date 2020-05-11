<template>
	<v-layout column>
		<!-- Start header -->
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="items"></v-breadcrumbs>
			</v-col>

			<v-col cols="12">
				<v-row class="justify-space-between">
					<!-- Start Customer Name -->
					<v-col cols="12" md="4">
						<h3>{{ customer.customername }}</h3>
					</v-col>
					<!-- End Customer Name -->

					<!-- Start buttons -->
					<v-col cols="12" md="8" class="justify-end d-flex">
						<v-btn to="/newinvoice" color="success">New Invoice</v-btn>

						<!-- Start Dropdown -->
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn outlined class="ml-2" v-on="on">
									<v-icon class="font1">mdi mdi-dots-horizontal</v-icon>
								</v-btn>
							</template>
							<v-list>
								<!-- Start edit user -->
								<v-list-item>
									<!-- Start user modal -->
									<v-dialog v-model="editUserDialog" persistent max-width="600px">
										<template v-slot:activator="{ on }">
											<v-list-item-title v-on="on">Edit customer</v-list-item-title>
										</template>
										<v-card>
											<!-- Start title -->
											<v-card-title>
												<span class="overline">Add user Profile</span>
												<v-spacer></v-spacer>
												<v-icon class="font1" @click="editUserDialog = false">mdi mdi-close</v-icon>
											</v-card-title>
											<!-- End title -->

											<v-divider></v-divider>

											<v-card-text v-if="customer">
												<!-- Start company or indidviduals -->
												<v-radio-group v-model="IndividualsOrCorporations" row>
													<v-radio label="Individuals" value="1"></v-radio>
													<v-radio label="Corporations" value="2"></v-radio>
												</v-radio-group>
												<!-- End company or indidviduals -->

												<v-container>
													<v-row>
														<p class="overline">Personal informations</p>
														<!-- Start customername -->
														<v-col class="py-0" cols="12">
															<v-text-field
																:label="(IndividualsOrCorporations == 1) ? 'Name*' : 'Company*'"
																v-model="customer.customername"
																placeholder="Customer full name"
																outlined
																dense
															></v-text-field>
														</v-col>
														<!-- End customername -->

														<!-- Start orgnummer -->
														<v-col class="py-0" cols="12">
															<v-text-field
																v-if="IndividualsOrCorporations == '2'"
																label="Org-nummer"
																placeholder="YYYYMMDD-NNNN"
																outlined
																v-model="customer.orgnummer"
																type="number"
																dense
															></v-text-field>
														</v-col>
														<!-- End orgnummer -->

														<!-- Start Personal -->
														<v-col class="py-0" cols="12">
															<v-text-field
																v-if="IndividualsOrCorporations == '1'"
																label="Personal number"
																placeholder="YYYYMMDD-NNNN"
																outlined
																v-model="customer.kundnummer"
																type="number"
																dense
															></v-text-field>
														</v-col>
														<!-- End Personal -->

														<!-- Start orgnummer -->
														<v-col class="py-0" cols="12" v-if="IndividualsOrCorporations == 2">
															<v-text-field
																label="VAT number"
																placeholder="YYYYMMDD-NNNN"
																outlined
																v-model="customer.vatnummer"
																type="number"
																dense
															></v-text-field>
														</v-col>
														<!-- End orgnummer -->

														<!-- Start kundnummer -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="Kundnummer"
																placeholder="Kundnummer"
																v-model="customer.kundnummer"
																outlined
																type="number"
																dense
															></v-text-field>
														</v-col>
														<!-- End kundnummer -->

														<v-col class="py-0" cols="12">
															<v-divider></v-divider>
															<h1 class="overline pt-4 pb-4">Contact informations</h1>
														</v-col>

														<!-- Start postadress -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="Postadress"
																placeholder="Postadress"
																v-model="customer.postadress"
																outlined
																dense
															></v-text-field>
														</v-col>
														<!-- End postadress -->

														<!-- Start postadress2 -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="Postadress 2"
																v-model="customer.postadress2"
																placeholder="Postadress 2"
																outlined
																dense
															></v-text-field>
														</v-col>
														<!-- End postadress2 -->

														<!-- Start postnummer -->
														<v-col class="py-0" cols="12" md="6">
															<v-text-field
																label="Postnummer"
																placeholder="Postnummer"
																outlined
																v-model="customer.postnummer"
																type="number"
																dense
															></v-text-field>
														</v-col>
														<!-- End postnummer -->

														<!-- Start stad -->
														<v-col class="py-0" cols="12" md="6">
															<v-text-field label="stad" v-model="customer.stad" placeholder="stad" outlined dense></v-text-field>
														</v-col>
														<!-- End stad -->

														<!-- Start kontaktperson -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="Kontaktperson"
																v-model="customer.kontaktperson"
																placeholder="Kontaktperson"
																outlined
																dense
															></v-text-field>
														</v-col>
														<!-- End kontaktperson -->

														<!-- Start epost -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="E-post"
																placeholder="E-post"
																v-model="customer.epost"
																type="email"
																outlined
																dense
															></v-text-field>
															<v-divider></v-divider>
														</v-col>
														<!-- End epost -->

														<!-- Start verdueinterest -->
														<v-col class="py-0" cols="12">
															<v-text-field
																label="Dröjsmålsränta (%)"
																placeholder="Dröjsmålsränta"
																outlined
																v-model="customer.overdueinterest"
																dense
															></v-text-field>
														</v-col>
														<!-- End verdueinterest -->
													</v-row>
												</v-container>
												<small>*indicates required field</small>
											</v-card-text>

											<v-card-actions>
												<v-btn color="blue darken-1" text @click="editUserDialog= false;">Close</v-btn>
												<v-spacer></v-spacer>
												<v-btn color="success" @click="editUser">Edit</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</v-list-item>
								<!-- End edit user-->

								<!-- Start Delete customer -->
								<v-list-item>
									<v-dialog v-model="deleteDialog" width="500">
										<template v-slot:activator="{ on }">
											<v-list-item-title v-on="on">Delete Customer</v-list-item-title>
										</template>

										<v-card>
											<v-card-title
												class="headline grey lighten-2"
												primary-title
											>Deleting customer {{ customer.customername }}</v-card-title>

											<v-card-text
												class="py-3"
											>Are you sure you want to remove customer Marika Bengtsson? This cannot be undone!</v-card-text>

											<v-divider></v-divider>

											<v-card-actions>
												<v-btn outlined @click="deleteDialog = false">close</v-btn>
												<v-spacer></v-spacer>
												<v-btn color="primary" text @click="deleteCustomer">Yes, delete</v-btn>
											</v-card-actions>
										</v-card>
									</v-dialog>
								</v-list-item>
								<!-- End Delete customer -->

								<v-list-item>
									<v-list-item-title @click="downloadData">Download Data</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<!-- End header -->

		<!-- Start User info -->
		<v-card class="pa-3" outlined>
			<v-row>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0">Customer type</p>
					<p class="text--primary pa-0 ma-0">{{ (!!customer.orgnummer) ? 'Company' : "Individuals" }}</p>
				</v-col>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.orgnummer">Org-number</p>
					<p class="text--primary pa-0 ma-0">{{ customer.orgnummer }}</p>
				</v-col>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.epost">Email</p>
					<p class="text--primary pa-0 ma-0">{{ customer.epost }}</p>
				</v-col>
				<v-col cols="12" md="3">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.postadress">Address</p>
					<p class="text--primary pa-0 ma-0">{{ customer.postadress }}</p>
				</v-col>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.vatnummer">VAT number</p>
					<p class="text--primary pa-0 ma-0">{{ customer.vatnummer }}</p>
				</v-col>
			</v-row>
		</v-card>
		<!-- End User info -->

		<!-- Start calculations section-->
		<v-row>
			<v-col cols="12" sm="12">
				<div class="blueSection pa-5">
					<v-row justify="center" align="center">
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Overpaid (inc VAT)</h6>
							<h6 class="display-1 text-center">0,00 kr</h6>
						</v-col>

						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Overdue (inc VAT)</h6>
							<h6 class="display-1 text-center">28 375,000 kr</h6>
						</v-col>
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Outstanding (inc VAT)</h6>
							<h6 class="display-1 text-center">28 375,00</h6>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<!-- End calculations section-->
		<v-row>
		<v-btn text small :color="activeclass" @click="activeinvoices">Active invoices</v-btn>
		<v-btn text small :color="allclass" @click="allinvoices">All invoices</v-btn>	
		</v-row>
		<v-card class="pa-3" outlined>
			<v-row>
				<v-col cols="12">
					<v-text-field v-model="search" class="mb-3" append-icon="mdi-magnify" label="Search" outlined hide-details></v-text-field>
					<v-data-table
						:search="search"
						:headers="headers"
						:items="displaiedInvoices"
						:items-per-page="5"
						class="elevation-1"
					></v-data-table>
				</v-col>
			</v-row>
		</v-card>
	</v-layout>
</template>
<script>
export default {
	middleware: "auth",
	layout: "admin",

	data() {
		return {
			search: "",
			activeclass: "primary",
			allclass: "normal",
			customer: {},
			deleteDialog: false,
			editUserDialog: false,
			headers: [
				{
					text: "Invoice number",
					align: "start",
					sortable: false,
					value: "userid"
				},
				{ text: "Customer", value: "customername" },
				{ text: "Invoice amount (inc VAT)", value: "summa" },
				{ text: "status", value: "status" },
				{ text: "Date of invoice", value: "createdate" },
				{ text: "Due date", value: "userid" },
				{ text: "Delivery  date", value: "userid" }
			],
			customerInvoices: [],
			displaiedInvoices: [],
		};
	},
	computed: {
		IndividualsOrCorporations() {
			return !!this.customer.orgnummer ? "2" : "1";
		},
		items() {
			return [
				{ text: "customers", href: "/customer" },
				{
					text: this.customer.customername,
					disabled: true,
					href: "breadcrumbs_link_1"
				}
			];
		}
	},
	methods: {
		async getCustomer() {
			await this.$axios
				.$get(`/customers/${this.$route.params.id}`)
				.then(res => (this.customer = res[0]));
		},
		async deleteCustomer() {
			await this.$axios
				.$delete(`/customers/${this.$route.params.id}`)
				.then(res => this.$router.push("/customer"))
				.catch(err => console.log(err));
		},

		async editUser() {
			await this.$axios.setToken(this.$auth.getToken("local"));
			let customer = this.customer;

			await this.$axios
				.$patch(`/customers/${customer._id}`, customer)
				.then(async res => {
					await this.getCustomer();
				})
				.catch(err => console.log(err));
		},
		async downloadData() {
			// let file = new File(JSON.stringify(this.customer), `${this.customer.customername}.json`, { type: 'json' } );

			var element = document.createElement("a");
			element.setAttribute(
				"href",
				"data:json/application;charset=utf-8," +
					encodeURIComponent(JSON.stringify(this.customer))
			);
			element.setAttribute("download", `${this.customer.customername}.json`);

			element.style.display = "none";
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		},

		activeinvoices() {
			this.displaiedInvoices = this.customerInvoices;
			this.displaiedInvoices = this.customerInvoices.filter(
				invoice => invoice.status != "paid"
			);
			this.activeclass = "primary";
			this.allclass = "normal";
		},
		allinvoices() {
			this.displaiedInvoices = this.customerInvoices;
			this.displaiedInvoices = this.customerInvoices.filter(
				invoice => invoice.status != "draft"
			);
			this.allclass = "primary";
			this.activeclass = "normal";
		},
	},
	async created() {
		await this.getCustomer();
		await this.$axios.$get('/invoices')
			.then(res => {
				this.customerInvoices =  res.filter(i => i.userid = this.customer.userid);
				this.displaiedInvoices = this.customerInvoices;
			})
	}
};
</script>

<style scoped>
.v-list-item {
	cursor: pointer !important;
}
.blueSection {
	display: block;
	width: 100%;
	background-color: #dceaf5;
}
</style>