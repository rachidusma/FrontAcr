<template>
	<!-- <v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">create new</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="overline">Add user Profile</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<v-row>
						<p class="overline">Personal informations</p>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Name*" placeholder="Customer full name" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Org-nummer"
								placeholder="YYYYMMDD-NNNN"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="VAT-nummer" placeholder="VAT-nummer" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Kundnummer"
								placeholder="Kundnummer"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-divider></v-divider>
							<h1 class="overline pt-4 pb-4">Contact informations</h1>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Postadress" placeholder="Postadress" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Postadress 2" placeholder="Postadress 2" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-text-field
								label="Postnummer"
								placeholder="Postnummer"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-text-field label="stad" placeholder="stad" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Kontaktperson" placeholder="Kontaktperson" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="E-post" placeholder="E-post" type="email" outlined color="#336882"></v-text-field>
							<v-divider></v-divider>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<p class="overline">Term</p>
							<v-text-field label="Dagar*" placeholder="Dagar" outlined type="number" color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Dröjsmålsränta (%)"
								placeholder="Dröjsmålsränta"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Country" placeholder="Country" outlined color="#336882"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>-->
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
					<slot name="header"></slot>
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
				<!-- Start Actions -->
				<v-card-actions>
					<slot name="actions"></slot>
				</v-card-actions>
				<!-- End Actions -->
			</v-card>
		</v-dialog>
	</v-col>
	<!-- End user modal -->
</template>
<script>
export default {

  data() {
    return {
      
			dialog: false,
    }
  },
  	methods: {
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
    }
};
</script>
<style>
.overline {
	color: #336882;
	font-size: 25px;
}
</style>