<template>
	<v-row>
		<v-col cols="12">
			<v-row>
				<!-- Start AutoComplete -->
				<v-col cols="12" sm="6">
					<v-autocomplete
						label="Search Customer"
						placeholder="Search for customer"
						v-model="customer"
						clearable
						outlined
						dense
						hide-selected
						autofocus
						:items="items"
						item-text="customername"
						:return-object="true"
						:loading="isLoading"
						:search-input.sync="search"
						@change="initialCustomer(null)"
					>
						<template v-slot:selection="{ attr, on, item  }">
							<span class="py-0 my-0" v-text="item.customername"></span>
						</template>

						<template v-slot:no-data>
							<p class="grey--text mx-2">No DATA</p>
						</template>
						<template v-slot:item="data">
							<template v-if="typeof data.item !== 'object'">
								<span>{{ data.item }}</span>
							</template>
							<template v-else>
								<div class="d-flex justify-space-between align-center py-5 px-2" style="width: 100%">
									<p class="py-0 my-0 black--text">{{ data.item.customername }}</p>
									<small v-if="data.item.orgnummer != ''" class="grey--text">
										<i>Org.No:</i>
										{{ data.item.orgnummer }}
									</small>
									<small v-else class="grey--text">
										<i>Customer number:</i>
										{{ data.item.postnummer }}
										<!-- TODO: Add Personal Number HERE -->
									</small>
								</div>
							</template>
						</template>
					</v-autocomplete>
				</v-col>
				<!-- End AutoComplete -->

				<!-- Start user modal -->
				<v-col cols="12" sm="3">
					<v-dialog v-model="dialog" persistent max-width="600px">
						<template v-slot:activator="{ on }">
							<v-btn class="mx-2" color="primary" v-if="!editUserModal" v-on="on">create new</v-btn>
							<v-btn
								class="mx-2"
								color="success"
								v-else
								@click="IndividualsOrCorporations = (customer.orgnummer != '') ?  '2' : '1';"
								v-on="on"
							>Edit</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="overline">Add user Profile</span>
								<v-spacer></v-spacer>
								<v-icon class="font1" @click="initialCustomer(2);dialog=false "> mdi mdi-close </v-icon>
							</v-card-title>
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
								<v-spacer></v-spacer>
								<div v-if="editUserModal == false">
									<v-btn color="blue darken-1" text @click="resetModal">Close</v-btn>
									<v-btn color="primary" @click="saveUser">Save</v-btn>
								</div>

								<div v-else-if="editUserModal == true">
									<v-btn color="blue darken-1" text @click="dialog= false;">Close</v-btn>
									<v-btn color="success" @click="editUser">Edit</v-btn>
								</div>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-col>
				<!-- End user modal -->
			</v-row>
		</v-col>

		<!-- Start User Details -->
		<v-col cols="12" md="6" v-if="customer.customername != ''">
			<v-row>
				<v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.orgnummer != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">Org-number</p>
						<b>{{customer.orgnummer}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.vatnummer != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">VAT number</p>
						<b>{{customer.vatnummer}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.epost != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">Email</p>
						<b>{{customer.epost}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.postadress != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">Address</p>
						<b>{{customer.postadress}}</b>
					</div>
				</v-col>
			</v-row>
		</v-col>

		<!-- End User Details -->
	</v-row>
</template>

<script>
export default {
	data: () => ({
		customer: {
			customername: "",
			orgnummer: "",
			vatnummer: "",
			kundnummer: "",
			postadress: "",
			postadress2: "",
			postnummer: "",
			stad: "",
			kontaktperson: "",
			country: "",
			epost: "",
			dagar: 0,
			overdueinterest: 0
		},
		isLoading: false,
		items: [],
		IndividualsOrCorporations: "1",
		search: null,
		dialog: false,
		editUserModal: false
	}),
	created() {
		this.getUsers();
	},
	watch: {
		customer(val) {
			if (val != "undefined") this.$store.commit("setCustomer", val);
		},
		search(val) {
			// Items have already been loaded
			if (this.items.length > 0) return;

			this.isLoading = true;

			// Lazily load input items
			let token = this.$auth.getToken("local");

			this.getUsers();
		}
	},
	methods: {
		async getUsers() {
			await this.$axios.setToken(this.$auth.getToken("local"));

			await this.$axios
				.$get("/customers")
				.then(res => (this.items = res))
				.catch(err => console.log(err));
		},
		initialCustomer(closeModal) {
			console.log(closeModal);
			if (this.customer == undefined || closeModal) {
				this.editUserModal = false;
				this.customer = {
					customername: "",
					orgnummer: "",
					vatnummer: "",
					kundnummer: "",
					postadress: "",
					postadress2: "",
					postnummer: "",
					stad: "",
					kontaktperson: "",
					country: "",
					epost: "",
					dagar: 0,
					overdueinterest: 0
				};
			} else {
				console.log('here');
				
				this.editUserModal = true;
			}
		},
		resetModal() {
			this.initialCustomer();
			this.dialog = false;
			this.editUserModal = false;
		},
		async saveUser() {
			await this.$axios.setToken(this.$auth.getToken("local"));
			console.log(this.customer);
			await this.$axios
				.$post("/customers", this.customer)
				.then(res => {
					this.resetModal();
					this.getUsers();
					this.customer = {
						customername: "",
						orgnummer: "",
						vatnummer: "",
						kundnummer: "",
						postadress: "",
						postadress2: "",
						postnummer: "",
						stad: "",
						kontaktperson: "",
						country: "",
						epost: "",
						dagar: 0,
						overdueinterest: 0
					};
				})
				.catch(err => console.log(err));
		},
		async editUser() {
			await this.$axios.setToken(this.$auth.getToken("local"));
			let customer = this.customer;

			await this.$axios
				.$patch(`/customers/${customer._id}`, customer)
				.then(res => {
					console.log(customer);
					this.dialog = false;
					this.editUserModal = true;
					Object.assign(this.customer, customer);
				})
				.catch(err => console.log(err));
		}
	}
};
</script>