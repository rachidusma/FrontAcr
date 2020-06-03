<template>
	<v-row>
		<v-col cols="12">
			<v-row>
				<!-- Start AutoComplete -->
				<v-col cols="12" sm="6">
					<v-autocomplete
						:label="$t('newInvoice.customer.autoPlaceholder')"

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
							<p class="grey--text mx-2">{{ $t('noData') }}</p>
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
										<i>{{ $t('newinvoice.customer.customerNO') }}</i>
										{{ data.item.kundnummer }}
									</small>
								</div>
							</template>
						</template>
					</v-autocomplete>
				</v-col>
				<!-- End AutoComplete -->

				<v-btn class="mx-2" color="primary" v-if="!editUserModal" @click="dialog = true"> {{ $t('createNew') }} </v-btn>

				<v-btn
					class="mx-2"
					color="success"
					v-else
					@click="IndividualsOrCorporations = (customer.orgnummer != '') ?  '2' : '1'; dialog = true"
				>{{ $t('edit') }}</v-btn>

				<userModal
					@close="dialog = false"
					@UserEdited="dialog = false;editUser($event)"
					@updated="dialog = false; getUsers()"
					:customerId="customer._id"
					:customer="customer"
					:state="dialog"
					:edit="editUserModal"
				/>
			</v-row>
		</v-col>

		<!-- Start User Details -->
		<v-col cols="12" md="9" v-if="customer.customername != ''">
			<v-row>
				<v-col cols="12" sm="3" class="align-center d-flex px-8" v-if="customer.orgnummer != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">{{ $t('oneCustomer.customerInfo.orgNumber') }}</p>
						<b>{{customer.orgnummer || '-'}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="3" class="align-center d-flex px-8" v-if="customer.vatnummer != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">{{ $t('oneCustomer.customerInfo.vat') }}</p>
						<b>{{customer.vatnummer || '-'}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="3" class="align-center d-flex px-8" v-if="customer.epost != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">{{ $t('email') }}</p>
						<b>{{customer.epost || '-'}}</b>
					</div>
				</v-col>
				<v-col cols="12" sm="3" class="align-center d-flex px-8" v-if="customer.postadress != ''">
					<div class="d-inline-block">
						<p class="my-0 py-0 caption">{{ $t('oneCustomer.customerInfo.address') }}</p>
						<b>{{customer.postadress || '-'}}</b>
					</div>
				</v-col>
			</v-row>
		</v-col>

		<!-- End User Details -->
	</v-row>
</template>

<script>
import userModal from "@/components/UserModal";
export default {
	props: ["customername", "customernameFromVuex"],
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
	beforeMount() {
		this.getUsers();
	},
	components: {
		userModal
	},
	watch: {
		customername(val) {
			this.getUsers();
		},
		customer(val) {
			if (val != "undefined" && !!val.dagar && !!val.epost) {
				this.$store.commit("setCustomer", val);
				this.$store.commit("setDagar", val.dagar);
				this.$store.commit("setOverduePayment", val.overdueinterest);
			}
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
			this.$axios.setToken(this.$auth.getToken("local"));

			await this.$axios
				.$get("/customers")
				.then(res => {
					console.log("res", res);

					this.items = res;
					if (!!this.customername || this.customer.customername) {
						let m = res.filter(x => x.customername == this.customername);

						this.$store.commit("setCustomer", m[0]);
						this.editUserModal = true;

						Object.assign(this.customer, m[0]);
					} else if (!!this.customernameFromVuex) {
						console.log(res);

						let m = res.filter(x => x.customername == this.customername);

						this.editUserModal = true;
						console.log(das,m);

						this.$store.commit("setCustomer", m[0]);


						Object.assign(this.customer, m[0]);
					}
				})
				.catch(err => console.log(err));
		},
		initialCustomer(closeModal) {
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
				this.editUserModal = true;
			}
		},
		resetModal() {
			if (!this.editUserModal) {
				this.initialCustomer();
				this.editUserModal = false;
			}
			this.dialog = false;
		},
		async editUser(user) {
			this.customer = {};
			await this.getUsers();
			this.customer = user;
			this.$store.commit("setDagar", user.dagar);
		}
	}
};
</script>

<style scoped>
div.v-card div[class^="col"] {
	padding-top: 0;
	padding-bottom: 0;
}
</style>
