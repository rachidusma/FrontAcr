<template>
	<v-layout>
		<v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="breadCampItems"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">Customers</h1>
					<v-spacer></v-spacer>
					<v-btn color="success" @click="addCustomerModalState= true">Create Customer</v-btn>
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
						<v-spacer></v-spacer>
						<v-col cols="12" md="5">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								label="Search"
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
						class="elevation-1"
						:search="search"
						@click:row="handleClick"
					>
					<template v-slot:item.overdueinterest="{ item }">
						{{ item.overdueinterest }} %
					</template>
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
			breadCampItems: [
				{ text: "Invoices", href: "/invoices" },
				{ text: "Customers", disabled: true }
			],

			headers: [
				{
					text: "Customer Id",
					align: "start",
					sortable: false,
					value: "_id"
				},
				{ text: "customername", value: "customername" },
				{ text: "vatnummer", value: "vatnummer" },
				{ text: "overdueinterest (%)", value: "overdueinterest" }
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