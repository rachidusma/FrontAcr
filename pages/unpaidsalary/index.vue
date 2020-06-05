<template>
	<v-layout column>
		<v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="$t('unpaid.breadCampItems')"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">{{ $t('unpaid.title') }}</h1>
				</v-row>
			</v-col>
			<!-- End page Header -->

			<v-col cols="12" sm="12">
				<div class="display_section">
					<h6 class="display-1 text-center pt-5">{{ $t('unpaid.blueSection.title') }}</h6>
					<v-row class="center pb-5" style="width:100%;height:100%">
						<v-col cols="12" sm="6">
							<h6 class="grey--text text-center subtitle-1 my-4">{{ $t('unpaid.blueSection.paidNo') }}</h6>
							<h6 class="display-1 text-center">{{ this.totalunpaidnum }}</h6>
						</v-col>

						<v-col cols="12" sm="6">
							<h6 class="grey--text text-center subtitle-1 my-4">{{ $t('unpaid.blueSection.total') }}</h6>
							<h6 class="display-1 text-center">{{ this.totalunpadisumma }} kr</h6>
						</v-col>
					</v-row>
				</div>
			</v-col>

			<v-col cols="12" md="12">
				<v-card tile width="100%" class="pa-8">
					<v-row>
						<v-spacer />
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							:label="$t('filter')"
							hide-details
							solo
							dense
							class="mb-4 pa-4"
							color="#336882"
						/>
					</v-row>
					<v-data-table
						:headers="headers"
						:items="unpaidsalary"
						:items-per-page="10"
						class="elevation-1"
						:search="search"
            :footer-props="{
              itemsPerPageText: $t('rowsForTable')
            }"
					>
						<template v-slot:item.status="{ item }">
							<v-chip color="red" dark>{{ item.status }}</v-chip>
						</template>
						<template v-slot:item.action="{ item }">
							<v-btn dark small color="cyan" @click="handleClick(item)">
								<v-icon small dark>mdi-checkbox-marked-outline</v-icon>{{ $t("unpaid.tableHeaders.action") }}
							</v-btn>
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
			search: "",
			headers: [
				{ text: this.$t("unpaid.tableHeaders.state"), value: "status" },
				{ text: this.$t("unpaid.tableHeaders.name"), value: "customername" },
				{ text: this.$t("unpaid.tableHeaders.no"), value: "userid" },
				{ text: this.$t("unpaid.tableHeaders.ocr"), value: "ocrid" },
				{ text: this.$t("unpaid.tableHeaders.salary"), value: "summa" },
				{ text: this.$t("unpaid.tableHeaders.bank"), value: "bankaccount" },
				{ text: this.$t("unpaid.tableHeaders.action"), value: "action" }
			],
			unpaidsalary: [],
			totalunpaidnum: 0,
			totalunpadisumma: 0,

			selectedunpaidsalary: {}, // remind salary
			totalunpaidsaraly: 0,
			newtotalunpaidsalary: 0,
			remindfee: 60,

			remind_flag: false
		};
	},

	async beforeMount() {
		this.getAllSalary();
	},

	methods: {
		async getAllSalary() {
			await this.$axios
				.$get("/invoices")
				.then(res => {
					res.forEach(inv => {
						if (
							inv.published &&
							!inv.invoicepaid &&
							new Date(inv.duedate) > Date.now()
						)
							inv.status = this.$t(
								"invoice.table.filters.invoiceTypes.published"
							);
						else if (
							inv.published &&
							!inv.invoicepaid &&
							new Date(inv.duedate) < Date.now()
						) {
							inv.status = this.$t(
								"invoice.table.filters.invoiceTypes.overdue"
							);
							this.overdueSum += Number(inv.summa);
						} else if (inv.published && inv.invoicepaid)
							inv.status = this.$t("invoice.table.filters.invoiceTypes.paid");
						else if (!inv.published)
							inv.status = this.$t("invoice.table.filters.invoiceTypes.draft");

						if (inv.duedate) {
							inv.duedate = new Date(inv.duedate)
								.toISOString()
								.substring(0, 10);
							inv.createdate = new Date(inv.createdate)
								.toISOString()
								.substring(0, 10);
						}
						inv.fromDate = inv.createdate || "-";
						inv.deliveryDate = "-";
					});

          let vm = this;
					this.unpaidsalary = res.filter(function(invoice) {
						return invoice.status == vm.$t("invoice.table.filters.invoiceTypes.overdue");
					});
					this.totalunpaidnum = this.unpaidsalary.length;
					let sum = 0;
					for (var i = 0; i < this.totalunpaidnum; i++) {
						if (this.unpaidsalary[i].summa == null) {
							this.unpaidsalary[i].summa = 0;
						}
						sum += this.unpaidsalary[i].summa;
					}
					this.totalunpadisumma = sum;
					console.log("invoice_part", res);
				})
				.catch(err => console.log(err));
			console.log(this.unpaidsalary);
		},

		handleClick(a) {
			console.log(a._id);
			this.$router.push(this.$t('unpaid.link') + "/overdue/" + a._id);
		}
	}
};
</script>

<style scoped>
.display_section {
	display: block;
	width: 100%;
	height: 100%;
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
