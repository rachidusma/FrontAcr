<template>
	<v-dialog v-model="dialog" persistent scrollable max-width="600px">
		<v-card>
			<v-card-title>
				<h4 v-if="!edit">Add Customer</h4>
				<h4 v-else>Edit customer</h4>
				<v-spacer></v-spacer>
				<v-icon class="black--text" @click="close">mdi mdi-close</v-icon>
			</v-card-title>
			<v-divider></v-divider>

			<v-card-text>
				<v-container>
					<v-form ref="form" v-model="valid">
						<v-row>
							<!-- Start company or indidviduals -->
							<v-radio-group v-model="IndividualsOrCorporations" row>
								<v-radio label="Individuals" value="1"></v-radio>
								<v-radio label="Corporations" value="2"></v-radio>
							</v-radio-group>
							<!-- End company or indidviduals -->

							<!-- Start customername -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="(IndividualsOrCorporations == 1) ? 'Name*': 'Company'"
									:rules="[rules.required]"
									v-model="the_customer.customername"
									placeholder="Customer full name"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End customername -->

							<!-- Start personal number -->
							<v-col v-if="IndividualsOrCorporations == 1" cols="12">
								<v-text-field
									dense
									label="personal number"
									placeholder="YYYYMMDD-NNNN"
									outlined
									type="number"
									v-model="the_customer.orgnummer"
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End personal number -->

							<!-- Start orgnummer -->
							<v-col v-if="IndividualsOrCorporations == 2" cols="12">
								<v-text-field
									dense
									:rules="[rules.required]"
									label="Org-nummer"
									placeholder="YYYYMMDD-NNNN"
									outlined
									type="number"
									v-model="the_customer.orgnummer"
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End orgnummer -->

							<!-- Start vatnummer -->
							<v-col v-if="IndividualsOrCorporations == 2" cols="12">
								<v-text-field
									dense
									label="VAT-nummer"
									v-model="the_customer.vatnummer"
									placeholder="VAT-nummer"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End vatnummer -->

							<!-- Start kundnummer -->
							<v-col cols="12">
								<v-text-field
									dense
									label="Kundnummer"
									placeholder="Kundnummer"
									outlined
									v-model="the_customer.kundnummer"
									type="number"
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End kundnummer -->

							<!-- Start postadress -->
							<v-col cols="12">
								<v-text-field
									dense
									label="Postadress"
									:rules="[rules.required]"
									v-model="the_customer.postadress"
									placeholder="Postadress"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End postadress -->

							<!-- Start postadress2 -->
							<v-col cols="12">
								<v-text-field
									dense
									label="Postadress 2"
									v-model="the_customer.postadress2"
									placeholder="Postadress 2"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End postadress2 -->

							<!-- Start postnummer -->
							<v-col cols="12" sm="12" md="6">
								<v-text-field
									dense
									v-model="the_customer.postnummer"
									label="Postnummer"
									placeholder="Postnummer"
									outlined
									:rules="[rules.required]"
									type="number"
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End postnummer -->

							<!-- Start stad -->
							<v-col cols="12" sm="12" md="6">
								<v-text-field
									dense
									label="stad"
									:rules="[rules.required]"
									v-model="the_customer.stad"
									placeholder="stad"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End stad -->

							<v-col cols="12">
								<v-divider></v-divider>
								<h1 class="overline pt-4 pb-4">Contact informations</h1>
							</v-col>

							<!-- Start country -->
							<v-col cols="12">
								<v-text-field
									dense
									label="Country"
									v-model="the_customer.country"
									placeholder="Country"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End country -->

							<!-- Start kontaktperson -->
							<v-col cols="12">
								<v-text-field
									dense
									label="Kontaktperson"
									v-model="the_customer.kontaktperson"
									placeholder="Kontaktperson"
									outlined
									color="#336882"
								></v-text-field>
							</v-col>
							<!-- End kontaktperson -->

							<!-- Start Epost -->
							<v-col cols="12">
								<v-text-field
									dense
									v-model="the_customer.epost"
									label="E-post"
									placeholder="E-post"
									type="email"
									outlined
									color="#336882"
								></v-text-field>
								<v-divider></v-divider>
							</v-col>
							<!-- End Epost -->

							<v-col cols="12">
								<h1 class="overline pt-4 pb-4">Terms</h1>
							</v-col>
							<v-col cols="12">
								<!-- Start Days input -->
								<div class="d-flex align-start">
									<v-text-field v-model="the_customer.dagar" outlined dense label="Days" required></v-text-field>

									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										Number of days before the payment is due.
									</v-tooltip>
								</div>
							</v-col>

							<!-- End Days input -->

							<!-- Start Interest input -->
							<v-col cols="12">
								<div class="d-flex align-start">
									<v-text-field
										v-model="the_customer.overdueinterest"
										outlined
										dense
										label="Interest on overdue payment"
										required
									></v-text-field>
									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										This is where you define the interest rate added when a payment is overdue. Remember that you must create a new invoice with the added interest rate and send it to your customer. Invoices with interest rates also have to be recorded manually.
									</v-tooltip>
								</div>
							</v-col>

							<!-- End Interest input -->

							<!-- Start Delivery input -->
							<v-col cols="12">
								<div class="d-flex align-start">
									<v-text-field v-model="the_customer.delivery" outlined dense label="Delivery" required></v-text-field>
									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										Define how the goods are delivered. Ex warehouse means that the risk is taken over by the customer as soon as the goods leave the warehouse.
									</v-tooltip>
								</div>
							</v-col>
							<!-- End Delivery input -->
						</v-row>
					</v-form>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions class="grey lighten-3 pa-5">
				<v-btn text @click="close">Close</v-btn>
				<v-spacer></v-spacer>
				<v-btn v-if="customerId" color="success" :disabled="!valid" @click="editUser">update</v-btn>
				<v-btn v-else color="success" :disabled="!valid" @click="saveUser">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	data() {
		return {
			the_customer: {},
			rules: {
				required: value => !!value || "Required.",
				min: v => v.length >= 8 || "Min 8 characters",
				passwordMatch: v => v == this.newPassword
			},
			valid: false,

			dialog: false,
			IndividualsOrCorporations: "1"
		};
	},
	props: ["customerId", "customer", "state", "edit"],
	watch: {
		customerId(val) {
			Object.assign(this.the_customer, this.customer);
		},
		state(val) {
			this.dialog = val;
		}
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		},
		async saveUser() {
			if(this.the_customer.dagar) this.the_customer.dagar = Number(this.the_customer.dagar);
			await this.$axios
				.$post("/customers", this.the_customer)
				.then(res => {
					console.log(res);
					this.$emit("updated", this.the_customer);
					this.dialog = false;
					this.the_customer = {};
				})
				.catch(err => console.log(err));
		},
		async editUser() {
			await this.$axios.setToken(this.$auth.getToken("local"));
			let customer = this.customer;

			await this.$axios
				.$patch(`/customers/${customer._id}`, this.the_customer)
				.then(async res => {

					this.$store.commit("setCustomer",this.the_customer);
					this.$emit("UserEdited", this.the_customer);
					this.dialog = false;
					this.$emit("close");
				})
				.catch(err => console.log(err));
		},
		close() {
			if (!this.edit) {
				this.the_customer = {};
			}

			this.$emit("close");
			this.dialog = false;
		}
	}
};
</script>
<style scoped>
.overline {
	color: #336882;
	font-size: 25px;
}

div.v-card div[class^="col"] {
	padding-top: 0;
	padding-bottom: 0;
}
</style>