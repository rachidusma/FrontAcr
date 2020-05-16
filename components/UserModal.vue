<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">create new</v-btn>
		</template>
		<v-card>
			<v-card-title>Add user Profile</v-card-title>
			<v-divider></v-divider>

			<v-card-text>
				<v-container>
					<v-row>
						<p class="overline">Personal informations</p>
						<!-- Start customername -->
						<v-col cols="12">
							<v-text-field
								dense
								label="Name*"
								v-model="the_customer.customername"
								placeholder="Customer full name"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
						<!-- End customername -->

						<!-- Start orgnummer -->
						<v-col cols="12">
							<v-text-field
								dense
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
						<v-col cols="12">
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

						<v-col cols="12">
							<v-divider></v-divider>
							<h1 class="overline pt-4 pb-4">Contact informations</h1>
						</v-col>

						<!-- Start postadress -->
						<v-col cols="12">
							<v-text-field
								dense
								label="Postadress"
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
								v-model="the_customer.stad"
								placeholder="stad"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
						<!-- End stad -->

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

						<!-- Start dagar -->
						<v-col cols="12">
							<p class="overline">Term</p>
							<v-text-field
								dense
								v-model="the_customer.dagar"
								label="Dagar*"
								placeholder="Dagar"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<!-- End dagar -->

						<!-- Start overdueinterest -->
						<v-col cols="12">
							<v-text-field
								dense
								v-model="the_customer.overdueinterest"
								label="Dröjsmålsränta (%)"
								placeholder="Dröjsmålsränta"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
						<!-- End overdueinterest -->

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

					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-btn depressed @click="dialog = false">Close</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="primary" depressed @click="saveUser">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	data() {
		return {
			the_customer: {},
			dialog: false
		};
	},
	methods: {
		async saveUser() {
			await this.$axios.$post('/customers', this.the_customer)
				.then(res => {
					console.log(res);
					this.$emit('updated');
					this.dialog = false;
					this.the_customer = {};
				})
				.catch(err => console.log(err))
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
		}
	}
};
</script>
<style>
.overline {
	color: #336882;
	font-size: 25px;
}
</style>