<template>
	<div>
		<v-row>
			<v-btn
				text
				small
				:color="activeclass"
				@click="activeinvoices"
			>{{ $t('invoice.table.activeInvoices') }}</v-btn>
			<v-btn text small :color="allclass" @click="allinvoices">{{ $t('invoice.table.allInvoices') }}</v-btn>
		</v-row>
		<v-card class="pa-8">
			<v-row class="pa-4">
				<!-- Start Search input -->
				<v-col cols="12" sm="3">
					<v-text-field
						v-model="search"
						:label="$t('filter')"
						append-icon="mdi-magnify"
						single-line
						hide-details
						solo
						dense
					/>
				</v-col>
				<!-- End Search input -->

				<!-- Start state input -->
				<v-col cols="12" sm="3">
					<v-select
						:items="States"
						v-model="state"
						item-text="text"
						item-value="value"
						label="All states"
						solo
						dense
						v-on:change="filterstate"
					/>
				</v-col>
				<!-- End state input -->

				<!-- Start types input
				<v-col cols="12" sm="3">
					<v-select :items="types" item-text="text" item-value="value" label="All types" solo dense></v-select>
				</v-col>
				End types input-->
			</v-row>

			<!-- Start The data table -->
			<v-data-table
				:headers="headers"
				:items="displaiedInvoices"
				:search="search"
				class="elevation-1"
				:footer-props="{
          itemsPerPageText: $t('rowsForTable')
        }"
				@click:row="handleClick"
			>
				<template v-slot:item.ocrid="{ item }">
					<p class="blue--text">#{{ item.ocrid }}</p>
				</template>
				<template v-slot:item.summa="{ item }">{{ item.summa }} Kr</template>
				<template v-slot:item.status="{ item }">
					<v-chip :color="getColor(item.status)" dark>{{ item.status }}</v-chip>
				</template>
			</v-data-table>
			<!-- Start The data table -->
		</v-card>
	</div>
</template>

<script>
export default {
	props: ["allItems"],
	data() {
		return {
			search: "",
			state: [
				{
					text: this.$t("invoice.table.filters.invoiceTypes.all"),
					value: this.$t("invoice.table.filters.invoiceTypes.all")
				}
			],
			States: [
				{
					text: this.$t("invoice.table.filters.invoiceTypes.all"),
					value: this.$t("invoice.table.filters.invoiceTypes.all")
				},
				{
					text: this.$t("invoice.table.filters.invoiceTypes.draft"),
					value: this.$t("invoice.table.filters.invoiceTypes.draft")
				},
				{
					text: this.$t("invoice.table.filters.invoiceTypes.published"),
					value: this.$t("invoice.table.filters.invoiceTypes.published")
				},
				{
					text: this.$t("invoice.table.filters.invoiceTypes.paid"),
					value: this.$t("invoice.table.filters.invoiceTypes.paid")
				},
				{
					text: this.$t("invoice.table.filters.invoiceTypes.overdue"),
					value: this.$t("invoice.table.filters.invoiceTypes.overdue")
				}
			],
			types: [
				{ text: "All types", value: "All" },
				{ text: "Invoice", value: "Invoice" },
				{ text: "Cash invoice", value: "cash" },
				{ text: "Credit invoice", value: "credit" }
			],
			activeclass: "primary",
			allclass: "normal",
			headers: [
				{
					text: this.$t("invoice.table.header.no"),
					align: "start",
					sortable: false,
					value: "ocrid"
				},
				{
					text: this.$t("invoice.table.header.customer"),
					value: "customername"
				},
				{ text: this.$t("invoice.table.header.amount"), value: "summa" },
				{ text: this.$t("invoice.table.header.status"), value: "status" },
				{ text: this.$t("invoice.table.header.doi"), value: "fromDate" },
				{ text: this.$t("invoice.table.header.due"), value: "duedate" },
				{
					text: this.$t("invoice.table.header.delivery"),
					value: "deliveryDate"
				}
			],
			displaiedInvoices: []
		};
	},
	watch: {
		allItems(val) {
			this.displaiedInvoices = val;
		}
	},
	methods: {
		getColor(status) {
			if (status == this.$t("invoice.table.filters.invoiceTypes.paid"))
				return "green";
			else if (status == this.$t("invoice.table.filters.invoiceTypes.overdue"))
				return "red";
			else if (status == this.$t("invoice.table.filters.invoiceTypes.draft"))
				return "black";
			else if (
				status == this.$t("invoice.table.filters.invoiceTypes.published")
			)
				return "blue";
		},
		filterstate(a) {
			if (a == this.$t("invoice.table.filters.invoiceTypes.all")) {
				this.displaiedInvoices = this.allItems;
			} else {
				this.displaiedInvoices = this.allItems.filter(
					invoice => invoice.status == a
				);
			}
		},
		activeinvoices() {
			// this.displaiedInvoices = this.allItems;
			this.displaiedInvoices = this.allItems.filter(
				invoice => invoice.status != this.$t("invoice.table.filters.invoiceTypes.paid")
			);
			this.activeclass = "primary";
			this.allclass = "normal";
		},
		allinvoices() {
			// this.displaiedInvoices = this.allItems;
			this.displaiedInvoices = this.allItems.filter(
				invoice => invoice.status != this.$t("invoice.table.filters.invoiceTypes.draft")
			);
			this.allclass = "primary";
			this.activeclass = "normal";
		},
		handleClick(a) {
			if (a.status == this.$t("invoice.table.filters.invoiceTypes.draft")) {
				this.$router.push(this.$t("invoice.table.links.draft") + a._id);
			} else if (
				a.status == this.$t("invoice.table.filters.invoiceTypes.overdue")
			) {
				this.$router.push(this.$t("invoice.table.links.overdue") + a._id);
			} else if (
				a.status == this.$t("invoice.table.filters.invoiceTypes.published")
			) {
				this.$router.push(this.$t("invoice.table.links.published") + a._id);
			} else {
				this.$router.push(this.$t("invoice.table.links.paid") + a._id);
			}
		}
	},
	mounted() {
		this.displaiedInvoices = this.allItems;
		this.allinvoices();
	}
};
</script>

<style>
</style>
