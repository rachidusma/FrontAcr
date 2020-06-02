<template>
	<v-dialog v-model="dialog" persistent scrollable max-width="600px">
		<v-card>
			<v-card-title>
				<h4 v-if="!edit">{{ $t('customer.userModal.title.add') }}</h4>
				<h4 v-else>{{ $t('customer.userModal.title.edit') }}</h4>
				<v-spacer />
				<v-icon class="black--text" @click="close">mdi mdi-close</v-icon>
			</v-card-title>
			<v-divider />

			<v-card-text>
				<v-container>
					<v-form ref="form" v-model="valid">
						<v-row>
							<!-- Start company or indidviduals -->
							<v-radio-group v-model="IndividualsOrCorporations" row>
								<v-radio :label="$t('customer.userModal.form.radio.person') " value="1" />
								<v-radio :label="$t('customer.userModal.form.radio.company') " value="2" />
							</v-radio-group>
							<!-- End company or indidviduals -->

							<!-- Start customername -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="(IndividualsOrCorporations == 1) ? $t('customer.userModal.form.name.nameLabel'): $t('customer.userModal.form.name.companyLabel')"
									:rules="[rules.required]"
									v-model="the_customer.customername"
									:placeholder="$t('customer.userModal.form.name.placeholder')"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End customername -->

							<!-- Start personal number -->
							<v-col v-if="IndividualsOrCorporations == 1" cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.number.label')"
									:placeholder="$t('customer.userModal.form.number.placeholder')"
									outlined
									type="number"
									v-model="the_customer.orgnummer"
									color="#336882"
								/>
							</v-col>
							<!-- End personal number -->

							<!-- Start orgnummer -->
							<v-col v-if="IndividualsOrCorporations == 2" cols="12">
								<v-text-field
									dense
									:rules="[rules.required]"
									:label="$t('customer.userModal.form.orgNumber.label')"
									:placeholder="$t('customer.userModal.form.orgNumber.placeholder')"
									outlined
									type="number"
									v-model="the_customer.orgnummer"
									color="#336882"
								/>
							</v-col>
							<!-- End orgnummer -->

							<!-- Start vatnummer -->
							<v-col v-if="IndividualsOrCorporations == 2" cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.vatNumber')"
									v-model="the_customer.vatnummer"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End vatnummer -->

							<!-- Start kundnummer -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.customerNumber')"
									outlined
									v-model="the_customer.kundnummer"
									type="number"
									color="#336882"
								/>
							</v-col>
							<!-- End kundnummer -->

							<!-- Start postadress -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.postAdress')"
									:rules="[rules.required]"
									v-model="the_customer.postadress"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End postadress -->

							<!-- Start postadress2 -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.postAdress') + '2'"
									v-model="the_customer.postadress2"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End postadress2 -->

							<!-- Start postnummer -->
							<v-col cols="12" sm="12" md="6">
								<v-text-field
									dense
									v-model="the_customer.postnummer"
									:label="$t('customer.userModal.form.zipCode')"
									outlined
									:rules="[rules.required]"
									type="number"
									color="#336882"
								/>
							</v-col>
							<!-- End postnummer -->

							<!-- Start stad -->
							<v-col cols="12" sm="12" md="6">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.city')"
									:rules="[rules.required]"
									v-model="the_customer.stad"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End stad -->

							<v-col cols="12">
								<v-divider />
								<h1 class="overline pt-4 pb-4">{{$t('customer.userModal.form.contctInfo')}}</h1>
							</v-col>

							<!-- Start country -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.country')"
									v-model="the_customer.country"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End country -->

							<!-- Start kontaktperson -->
							<v-col cols="12">
								<v-text-field
									dense
									:label="$t('customer.userModal.form.contactPerson')"
									v-model="the_customer.kontaktperson"
									outlined
									color="#336882"
								/>
							</v-col>
							<!-- End kontaktperson -->

							<!-- Start Epost -->
							<v-col cols="12">
								<v-text-field
									dense
									v-model="the_customer.epost"
									:label="$t('customer.userModal.form.email')"
									type="email"
									outlined
									color="#336882"
								/>
								<v-divider />
							</v-col>
							<!-- End Epost -->

							<v-col cols="12">
								<h1 class="overline pt-4 pb-4">{{ $t('customer.userModal.form.terms') }}</h1>
							</v-col>
							<v-col cols="12">
								<!-- Start Days input -->
								<div class="d-flex align-start">
									<v-text-field
										v-model="the_customer.dagar"
										outlined
										dense
										:label="$t('customer.userModal.form.days.label')"
										required
									/>

									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										{{$t('customer.userModal.form.days.hint')}}
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
										:label="$t('customer.userModal.form.overdue.label')"
										required
									/>
									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										{{$t('customer.userModal.form.overdue.hint')}}
									</v-tooltip>
								</div>
							</v-col>

							<!-- End Interest input -->

							<!-- Start Delivery input -->
							<v-col cols="12">
								<div class="d-flex align-start">
									<v-text-field
										v-model="the_customer.delivery"
										outlined
										dense
										:label="$t('customer.userModal.form.delivery.label')"
										required
									></v-text-field>
									<v-tooltip max-width="300" bottom>
										<template v-slot:activator="{ on }">
											<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
										</template>
										{{$t('customer.userModal.form.delivery.hint')}}
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
				<v-btn text @click="close">{{ $t('cancle') }}</v-btn>
				<v-spacer />
				<v-btn v-if="customerId" color="success" :disabled="!valid" @click="editUser">{{ $t('update') }}</v-btn>
				<v-btn v-else color="success" :disabled="!valid" @click="saveUser">{{ $t('save') }}</v-btn>
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
			if (this.the_customer.dagar)
				this.the_customer.dagar = Number(this.the_customer.dagar);
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
					this.$store.commit("setCustomer", this.the_customer);
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
