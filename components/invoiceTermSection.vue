<template>
	<v-col cols="12">
		<!-- <div class="overline mb-4">Term</div> -->
		<v-card outlined class="pa-3">
			<v-card-title>
				<h3 class="pa-0 ma-0">
					Term
					<v-tooltip bottom color="rgba(0, 0, 0, 1)" max-width="250">
						<template v-slot:activator="{ on }">
							<v-icon class="font1" v-on="on">mdi mdi-information</v-icon>
						</template>
						<span>
							<b>Days</b>
							<br />Number of days before the payment is due.
							<br />
							<br />
							<b>Interest on overdue payments</b>
							<br />This is where you define the interest rate added when a payment is overdue. Remember that you must create a new invoice with the added interest rate and send it to your customer. Invoices with interest rates also have to be recorded manually.
							<br />
							<br />
							<b>Delivery</b>
							<br />Define how the goods are delivered. Warehouse means that the risk is taken over by the customer as soon as the goods leave the warehouse.
						</span>
					</v-tooltip>
				</h3>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" width="500">
					<template v-slot:activator="{ on }">
						<!-- <v-spacer></v-spacer> -->
						<v-btn color="success" dark right v-on="on">Edit</v-btn>
					</template>
					<v-card>
						<v-card-title class="headline white lighten-2" primary-title>
							<h3>Terms</h3>
							<v-spacer></v-spacer>
							<v-icon class="font1" @click="dialog = false">mdi mdi-close</v-icon>
						</v-card-title>
						<v-divider></v-divider>

						<v-card-text>
							<v-col cols="12">
								<v-text-field v-model="overduePayment" label="Interest on overdue payment"></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="delivery" label="Delivery"></v-text-field>
							</v-col>
						</v-card-text>

						<v-divider></v-divider>

						<v-card-actions>
							<v-btn depressed text @click="dialog = false">Close</v-btn>
							<v-spacer></v-spacer>
							<v-btn color="primary" text @click="dialog = false">Save</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-card-title>

			<v-card-text>
				<v-row>
					<v-col cols="12" lg="3">
						<v-menu
							v-model="menu2"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
							max-width="290px"
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									v-model="computedDateFormatted"
									label="From Date"
									hint="MM/DD/YYYY format"
									persistent-hint
									readonly
									dense
									outlined
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
						</v-menu>
					</v-col>

					<v-col cols="12" lg="3">
						<v-menu
							v-model="menu1"
							:close-on-content-click="false"
							transition="scale-transition"
							offset-y
							max-width="290px"
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									v-model="computedToDateFormatted"
									label="To Date"
									hint="MM/DD/YYYY format"
									persistent-hint
									readonly
									dense
									outlined
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker v-model="toDate" no-title @input="menu1 = false"></v-date-picker>
						</v-menu>
					</v-col>

					<v-col cols="12" lg="2">
						<p class="py-0 my-0">Days</p>
						{{ days }}
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" sm="auto">
						<p class="text--secondary">Delivery</p>
						<span class="text--primary">{{ delivery }}</span>
					</v-col>
					<v-col cols="12" sm="auto">
						<p class="text--secondary">Interest on overdue payment</p>
						<span class="text--primary">{{ overduePayment }}</span>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
export default {
	props: ["todatefromDraft","datefromDraft"],
	data: vm => ({
		date: new Date().toISOString().substr(0, 10),
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),

		toDate: new Date().toISOString().substr(0, 10),
		toDateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		delivery: "Fritt vårt lager",
		overduePayment: "12%",
		menu1: false,
		menu2: false,
		dialog: false
	}),

	computed: {
		days() {
			let days = (new Date(this.toDate) - new Date(this.date)) / 86400000;
			if (days >= 0) {
				return days;
			}
			return 0;
		},
		computedDateFormatted() {
			return this.formatDate(this.date);
		},
		computedToDateFormatted() {
			return this.formatDate(this.toDate);
		}
	},

	mounted() {
		this.delivery = "Fritt vårt lager";
		this.overduePayment = "12%";

		if (!!this.fromDraft) 
			this.assignDates(this.fromDraft);
	},
	watch: {
		todatefromDraft(val) {
			this.assignDates();
		},
		datefromDraft(val) {
			this.assignDates();
		},
		delivery(val) {
			this.$store.commit("setDelivery", val);
		},
		overduePayment(val) {
			this.$store.commit("setOverduePayment", val);
		},
		date(val) {
			this.dateFormatted = this.formatDate(this.date);
			this.$store.commit("dateFrom", val);
		},
		toDate(val) {
			this.toDateFormatted = this.formatDate(this.toDate);
			this.$store.commit("dateTo", val);
		}
	},

	methods: {
		assignDates() {		
			this.toDate = this.todatefromDraft;
			this.date = this.datefromDraft;
		},
		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split("-");
			return `${month}/${day}/${year}`;
		}
	}
};
</script>