<template>
	<v-layout>
		<v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="breadCampItems"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">{{ $t('customer.title') }}</h1>
					<v-spacer/>
					<v-btn
						color="success"
						@click="addCustomerModalState= true"
					>{{ $t('customer.newCustomerbtnText') }}</v-btn>
					<UserModal
						@close="addCustomerModalState = false"
						@updated="getCustomers"
						:state="addCustomerModalState"
					/>
				</v-row>
			</v-col>
			<!-- End page Header -->

			<v-col cols="12">
				<v-card tile outlined class="pa-5">
					<v-row>
						<v-spacer/>
						<v-col cols="12" md="5">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								:label="$t('filter')"
								solo
								dense
								class="pa-4 pb-1"
								color="#336882"
							></v-text-field>
						</v-col>
					</v-row>

					<v-data-table
						:headers="headers"
						:items="customers"
						:items-per-page="5"
						:footer-props="{
                itemsPerPageText: $t('rowsForTable')
              }"
						class="elevation-1"
						:search="search"
						@click:row="handleClick"
					>
						<template v-slot:item.overdueinterest="{ item }">{{ item.overdueinterest }} %</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
import UserModal from "@/components/UserModal.vue";
export default {
	middleware: "auth",
	layout: "admin",
	components: {
		UserModal
	},
	data() {
		return {
			addCustomerModalState: false,
			search: "",
			breadCampItems: this.$t("customer.breadCampItems"),

			headers: [
				{
					text: this.$t("customer.table.headers.id"),
					align: "start",
					sortable: false,
					value: "_id"
				},
				{ text: this.$t("customer.table.headers.name"), value: "customername" },
				{ text: this.$t("customer.table.headers.vat"), value: "vatnummer" },
				{
					text: this.$t("customer.table.headers.interset"),
					value: "overdueinterest"
				}
			],
			customers: []
		};
	},
	async beforeMount() {
		this.getCustomers();
	},
	methods: {
		handleClick(a) {
			this.$router.push("/customer/" + a._id);
		},
		async getCustomers() {
			await this.$axios.get("/customers/").then(res => {
				this.customers = res.data;
			});
		}
	}
};
</script>
