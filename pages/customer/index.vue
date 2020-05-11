<template>
	<v-layout>
		<v-row>
			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">Customers</h1>
					<v-spacer></v-spacer>
					<UserModal />
				</v-row>
			</v-col>

			<v-col cols="12" md="12">
				<p class="overline">All customers</p>
				<v-card tile width="100%" class="pa-8">
					<v-row>
						<v-spacer></v-spacer>
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							solo
							dense
							class="mb-4 pa-4"
							color="#336882"
						></v-text-field>
					</v-row>
					<v-data-table
						:headers="headers"
						:items="customers"
						:items-per-page="5"
						class="elevation-1"
						:search="search"
						@click:row="handleClick"
					></v-data-table>
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
	async beforeMount() {
		await this.$axios.get("/customers/").then(res => {
			this.customers = res.data;
		});
	},
	methods: {
		handleClick(a) {
			this.$router.push("/customer/" + a._id);
		}
	},
	data() {
		return {
			search: "",
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
	}
};
</script>