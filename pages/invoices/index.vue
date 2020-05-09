<template>
	<v-layout>
		<v-row>
			<v-col cols="12" sm="12">
				<div class="d-flex justify-space-between align-center" style="width: 100%">
					<p class="py-0 my-0 black--text headline">Invoices</p>
					<v-btn color="success" to="/newinvoice">New invoice</v-btn>
				</div>
			</v-col>
			<v-col cols="12" sm="12">
				<div class="blueSection">
					<v-row justify="center" align="center" style="width:100%;height:100%">
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4">Overpaid (inc VAT)</h6>
							<h6 class="display-1 text-center">0,00 kr</h6>
						</v-col>

						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4">Overdue (inc VAT)</h6>
							<h6 class="display-1 text-center">28 375,000 kr</h6>
						</v-col>
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4">Outstanding (inc VAT)</h6>
							<h6 class="display-1 text-center">28 375,00</h6>
						</v-col>
					</v-row>
				</div>
			</v-col>
			<v-col cols="12" sm="12">
				<v-card class="pa-8">
					<v-btn small :color="activeclass" @click="activeinvoices">Active invoices</v-btn>
					<v-btn small :color="allclass" @click="allinvoices">All invoices</v-btn>

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

						<!-- Start types input -->
						<v-col cols="12" sm="3">
							<v-select :items="types" item-text="text" item-value="value" label="All types" solo dense></v-select>
						</v-col>
						<!-- End types input -->
					</v-row>

					<!-- Start The data table -->
					<v-data-table
						:headers="header"
						:items="invoicesItem"
						:search="search"
						class="elevation-1"
						@click:row="handleClick"
					>
						<template v-slot:item.Status="{ item }">
							<v-chip :color="getColor(item.Status)" dark>{{ item.Status }}</v-chip>
						</template>
					</v-data-table>
					<!-- Start The data table -->
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>
<script>
export default {
	layout: "admin",

	data() {
		return {
			search: "",
			activeclass: "primary",
			allclass: "normal",
			items: [],
			state: [{ text: "paid", value: "paid" }],
			States: [
				{ text: "All states", value: "All" },
				{ text: "Paid", value: "paid" },
				{ text: "Overdue", value: "overdue" },
				{ text: "Drafts", value: "draft" }
			],
			types: [
				{ text: "All types", value: "All" },
				{ text: "Invoice", value: "Invoice" },
				{ text: "Cash invoice", value: "cash" },
				{ text: "Credit invoice", value: "credit" }
			],
			header: [
				{
					text: "Invoice number",
					align: "start",
					sortable: false,
					value: "userid"
				},
				{ text: "Customer", value: "userid" },
				{ text: "Invoice amount (inc VAT)", value: "summa" },
				{ text: "Status", value: "published" },
				{ text: "Date of invoice", value: "createdate" },
				{ text: "Due date", value: "userid" },
				{ text: "Delivery  date", value: "userid" }
			],
			invoices: [],
			invoicesItem: [
        {
          __v: 0,
          _id: "5eb6810640e692325ce5b8f1",
          createdate: "2020-05-09",
          extra_info: "",
          invoicepaid: false,
          leveransmetod: "pdf",
          pdf_link: "",
          published: true,
          salarypaid: false,
          summa: 0,
          userid: "5e9edbb41122c0297c06ccff"
        },
        {
          __v: 0,
          _id: "5eb6810640e692325ce5b8f1",
          createdate: "2020-05-09",
          extra_info: "",
          invoicepaid: false,
          leveransmetod: "pdf",
          pdf_link: "",
          published: false,
          salarypaid: false,
          summa: 0,
          userid: "5e9edbb41122c0297c06ccff"
        },
        {
          __v: 0,
          _id: "5eb6810640e692325ce5b8f1",
          createdate: "2020-05-09",
          extra_info: "",
          invoicepaid: false,
          leveransmetod: "pdf",
          pdf_link: "",
          published: true,
          salarypaid: true,
          summa: 0,
          userid: "5e9edbb41122c0297c06ccff"
        },

      ]
		};
	},
	methods: {
		getColor(Status) {
			if (Status == "paid") return "green";
			else if (Status == "overdue") return "red";
		},
		filterstate(a) {
			if (a == "All") {
				this.invoicesItem = this.invoices;
			} else {
				this.invoicesItem = this.invoices.filter(
					invoice => invoice.Status == a
				);
			}
		},
		activeinvoices() {
			this.invoicesItem = this.invoices;
			this.invoicesItem = this.invoices.filter(
				invoice => invoice.Status != "paid"
			);
			this.activeclass = "primary";
			this.allclass = "normal";
		},
		allinvoices() {
			this.invoicesItem = this.invoices;
			this.invoicesItem = this.invoices.filter(
				invoice => invoice.Status != "draft"
			);
			this.allclass = "primary";
			this.activeclass = "normal";
		},
		handleClick(a) {
			if (a.Status == "draft") {
				this.$router.push("/invoices/draft/" + a.id);
			} else if (a.Status == "overdue") {
				this.$router.push("/invoices/overdue/" + a.id);
			} else {
				this.$router.push("/invoices/paid" + a.id);
			}
		}
	},
	created() {
    /*this.$axios.$get('/invoices')
      .then(res => {
        res.forEach(invoice => {
          invoice.createdate = new Date(invoice.createdate).toISOString().substring(0, 10)
        });
        this.invoices = res;
        console.log(res);
      })
      .catch(err => console.log(err));
		this.activeinvoices(); */
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