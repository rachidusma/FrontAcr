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

					<!-- Statrt Edit Dialog -->
					<UserModal
						:state="editUserDialog"
						@UserEdited="getCustomer"
						@close="editUserDialog = false"
						:customerId="customer._id"
						:customer="customer"
						:edit="true"
					/>
					<!-- End Edit Dialog -->

					<!-- Start Delete Dialog -->
					<v-dialog v-model="deleteDialog" width="500">
						<v-card>
							<v-card-title>
								<h4>Deleting customer {{ customer.customername }}</h4>
								<v-spacer></v-spacer>
								<v-icon class="black--text" @click="deleteDialog = false">mdi mdi-close</v-icon>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text
								class="py-3"
							>Are you sure you want to remove customer Marika Bengtsson? This cannot be undone!</v-card-text>

							<v-divider></v-divider>

							<v-card-actions class="grey lighten-3 pa-5">
								<v-btn text @click="deleteDialog = false">close</v-btn>
								<v-spacer></v-spacer>
								<v-btn color="error" depressed @click="deleteCustomer">Yes, delete</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<!-- End Delete Dialog -->

					<!-- Start buttons -->
					<v-col cols="12" md="8" class="justify-end d-flex">
						<v-btn @click="addInvoiceWithCustomer" color="success">New Invoice</v-btn>

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
									<v-list-item-title @click="editUserDialog = true">Edit User</v-list-item-title>
								</v-list-item>
								<!-- End edit user-->

								<!-- Start Delete customer -->
								<v-list-item>
									<v-list-item-title @click="deleteDialog= true">Delete Customer</v-list-item-title>
								</v-list-item>
								<!-- End Delete customer -->

								<!-- Start Download  -->
								<v-list-item>
									<v-list-item-title @click="downloadData">Download Data</v-list-item-title>
								</v-list-item>
								<!-- End Download  -->
							</v-list>
						</v-menu>
						<!-- End Dropdown -->
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
					<p class="text--primary pa-0 ma-0">{{ (!!customer.orgnummer) ? 'Company' : "Individuals" || '-' }}</p>
				</v-col>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.orgnummer">Org-number</p>
					<p class="text--primary pa-0 ma-0">{{ customer.orgnummer || '-' }}</p>
				</v-col>
				<v-col cols="12" md="2">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.epost">Email</p>
					<p class="text--primary pa-0 ma-0">{{ customer.epost || '-' }}</p>
				</v-col>
				<v-col cols="12" md="3">
					<p class="text--secondary pa-0 ma-0" v-if="!!customer.postadress">Address</p>
					<p class="text--primary pa-0 ma-0">{{ customer.postadress || '-' }}</p>
				</v-col>
				<v-col cols="12" md="2" v-if="!!customer.vatnummer">
					<p class="text--secondary pa-0 ma-0" >VAT number</p>
					<p class="text--primary pa-0 ma-0">{{ customer.vatnummer || '-' }}</p>
				</v-col>
			</v-row>
		</v-card>
		<!-- End User info -->

		<calculations :overdue="overdueSum" />

		<dateTable :allItems="customerInvoices" />
	</v-layout>
</template>

<script>
import dateTable from "@/components/dataTable.vue";
import UserModal from "@/components/UserModal.vue";
import calculations from "@/components/calculationSection.vue";
export default {
	middleware: "auth",
	layout: "admin",

	components: {
		dateTable,
		UserModal,
		calculations
	},
	data() {
		return {
			customer: {},
			deleteDialog: false,
			editUserDialog: false,
			customerInvoices: [],
			overdueSum: 0
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
		addInvoiceWithCustomer() {
			this.$store.commit("setCustomer", this.customer);
			this.$router.push("/newinvoice");
		},
		async downloadData() {
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
		}
	},
	async beforeMount() {
		await this.getCustomer();

		await this.$axios
			.$get("/invoices")
			.then(res => {
				let m = res.filter(x => x.customername == this.customer.customername);
				m.forEach(inv => {
					if (
						inv.published &&
						!inv.invoicepaid &&
						new Date(inv.duedate) > Date.now()
					)
						inv.status = "Published";
					else if (
						inv.published &&
						!inv.invoicepaid &&
						new Date(inv.duedate) < Date.now()
					) {
						inv.status = "Overdue";
						this.overdueSum += inv.summa;
					} else if (inv.published && inv.invoicepaid) inv.status = "Paid";
					else if (!inv.published) inv.status = "Draft";

					if (inv.duedate) {
						inv.duedate = new Date(inv.duedate).toISOString().substring(0, 10);
					}
					inv.fromDate = "-";
					inv.deliveryDate = "-";
				});

				this.customerInvoices = m;
			})
			.catch(err => console.log(err));
	}
};
</script>

<style scoped>
.v-list-item {
	cursor: pointer !important;
}
</style>