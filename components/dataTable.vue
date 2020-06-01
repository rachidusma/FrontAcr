<template>
	<div>
		<v-row>
			<v-btn text small :color="activeclass" @click="activeinvoices">Active invoices</v-btn>
			<v-btn text small :color="allclass" @click="allinvoices">All invoices</v-btn>
		</v-row>
		<v-card class="pa-8">
			<v-row class="pa-4">
				<!-- Start Search input -->
				<v-col cols="12" sm="3">
					<v-text-field
						v-model="search"
						label="Search"
						append-icon="mdi-magnify"
						single-line
						hide-details
						solo
						dense
					></v-text-field>
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
					></v-select>
				</v-col>
				<!-- End state input -->

				<!-- Start types input 
				<v-col cols="12" sm="3">
					<v-select :items="types" item-text="text" item-value="value" label="All types" solo dense></v-select>
				</v-col>
				End types input -->
			</v-row>

			<!-- Start The data table -->
			<v-data-table
				:headers="headers"
				:items="displaiedInvoices"
				:search="search"
				class="elevation-1"
				@click:row="handleClick"
			>
				<template v-slot:item.ocrid="{ item }">
					<P class="blue--text">#{{ item.ocrid }}</p>
				</template>
				<template v-slot:item.summa="{ item }">
					{{ item.summa }} Kr
				</template>
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
			state: [{ text: "All states", value: "All" }],
			States: [
				{ text: "All states", value: "All" },
				{ text: "Paid", value: "Paid" },
				{ text: "Published", value: "Published" },
				{ text: "Overdue", value: "Overdue" },
				{ text: "Drafts", value: "Draft" }
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
					text: "Invoice number",
					align: "start",
					sortable: false,
					value: "ocrid"
				},
				{ text: "Customer", value: "customername" },
				{ text: "Invoice amount (inc VAT)", value: "summa" },
				{ text: "status", value: "status" },
				{ text: "Date of invoice", value: "fromDate" },
				{ text: "Due date", value: "duedate" },
				{ text: "Delivery  date", value: "deliveryDate" }
			],
			displaiedInvoices: []
		};
  },
  watch: {
    allItems(val) {
      this.displaiedInvoices = val
    }
  },
	methods: {
		getColor(status) {
			if (status == "Paid") return "green";
			else if (status == "Overdue") return "red";
			else if (status == "Draft") return "black";
			else if (status == "Published") return "blue";
		},
		filterstate(a) {
			if (a == "All") {
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
				invoice => invoice.status != "Paid"
			);
			this.activeclass = "primary";
			this.allclass = "normal";
		},
		allinvoices() {
			// this.displaiedInvoices = this.allItems;
			this.displaiedInvoices = this.allItems.filter(
				invoice => invoice.status != "Draft"
			);
			this.allclass = "primary";
			this.activeclass = "normal";
		},
		handleClick(a) {
			if (a.status == "Draft") {
				this.$router.push("/invoices/draft/" + a._id);
			} else if (a.status == "Overdue") {
				this.$router.push("/invoices/overdue/" + a._id);
			} else if (a.status == "Published") {
				this.$router.push("/invoices/published/" + a._id);
			} else {
				this.$router.push("/invoices/paid/" + a._id);
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