<template>
	<v-layout>
		<v-row>
			<v-col cols="12" sm="12">
				<div class="d-flex justify-space-between align-center" style="width: 100%">
					<p class="py-0 my-0 black--text headline">Invoices</p>
					<v-btn color="success" to="/newinvoice">New invoice</v-btn>
				</div>
			</v-col>
		<calculations :overdue="overdueSum" />

		<v-col cols="12" sm="12">
			<dateTable :allItems.sync="invoices" />
		</v-col>
		</v-row>
	</v-layout>
</template>
<script>
import dateTable from "@/components/dataTable.vue";
import calculations from "@/components/calculationSection.vue";

export default {
	middleware: "auth",
	layout: "admin",

	components: {
		dateTable,
		calculations
	},
	data() {
		return {
			invoices: [],
			overdueSum: 0
		};
	},
	methods: {},
	async beforeMount() {
		await this.$axios
			.$get("/invoices")
			.then(res => {
				res.forEach(inv => {
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
						this.overdueSum += Number(inv.summa);
					} else if (inv.published && inv.invoicepaid) inv.status = "Paid";
					else if (!inv.published) inv.status = "Draft";

					if (inv.duedate) {
						inv.duedate = new Date(inv.duedate).toISOString().substring(0, 10);
						inv.createdate = new Date(inv.createdate)
							.toISOString()
							.substring(0, 10);
					}
					inv.fromDate = inv.createdate || "-";
					inv.deliveryDate = "-";
				});

				this.invoices = res;

				// this.activeinvoices();
				console.log(res);
			})
			.catch(err => console.log(err));
	}
};
</script>
<style  scoped>
.blueSection {
	display: block;
	width: 100%;
	height: 200px;
	background-color: #dceaf5;
}
.itm {
	display: block;
	width: 100%;
	height: 100%;
	align-items: center;
	margin: auto;
}
th {
	vertical-align: top;
}
</style>