<template>
	<v-col cols="12">
		<!-- <div class="overline mb-4">Term</div> -->
		<v-card outlined class="pa-3">
			<v-card-title>
				<h3 class="pa-0 ma-0">
					{{ $t('newInvoice.termSection.title') }}
					<v-tooltip bottom color="rgba(0, 0, 0, 1)" max-width="250">
						<template v-slot:activator="{ on }">
							<v-icon class="font1" v-on="on">mdi mdi-information</v-icon>
						</template>
						<span>
							<b>{{ $t('newInvoice.termSection.hint.days') }}</b>
							{{ $t('newInvoice.termSection.hint.daysText') }}
							<br />
							<br />

							<b>{{ $t('newInvoice.termSection.hint.interest') }}</b>

							{{ $t('newInvoice.termSection.hint.interestText') }}
							<br />
							<br />
							<b>{{ $t('newInvoice.termSection.delivery') }}</b>
							{{ $t('newInvoice.termSection.hint.deliveryText') }}
						</span>
					</v-tooltip>
				</h3>
				<v-spacer />
				<v-dialog v-model="dialog" width="500">
					<template v-slot:activator="{ on }">
						<!-- <v-spacer/> -->
						<v-btn color="success" dark right v-on="on">{{ $t('edit') }}</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<h4>{{ $t('newInvoice.termSection.title') }}</h4>
							<v-spacer />
							<v-icon class="black--text" @click="dialog = false">mdi mdi-close</v-icon>
						</v-card-title>
						<v-divider />

						<v-card-text>
							<v-col cols="12">
								<v-text-field
									v-model="overduePayment"
									type="number"
									:label="$t('newInvoice.termSection.interset')"
									:hint="$t('newInvoice.termSection.modal.overdue.hint')"
								 />
							</v-col>
							<v-col cols="12">
								<v-text-field v-model="delivery" :label="$t('newInvoice.termSection.delivery')" />
							</v-col>
						</v-card-text>

						<v-divider />

						<v-card-actions class="grey lighten-3 pa-5">
							<v-btn text @click="dialog = false">{{ $t('cancle') }}</v-btn>
							<v-spacer />
							<v-btn color="success" @click="dialog = false">{{ $t('save') }}</v-btn>
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
									v-model="date"
									:label="$t('newInvoice.termSection.fromDateText')"
									hint="YYYY-MM-DD format"
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
									v-model="toDate"
									:label="$t('newInvoice.termSection.toDateText')"
									hint="YYYY-MM-DD format"
									persistent-hint
									readonly
									dense
									outlined
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker v-model="toDate" no-title @input="menu1 = false; toDateChanged($event)"></v-date-picker>
						</v-menu>
					</v-col>

					<v-col cols="12" lg="2">
						<p class="py-0 my-0">{{ $t('newInvoice.termSection.days') }}</p>
						{{ (invoice.dagar > 0 ) ? invoice.dagar : "-"}}
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" sm="auto">
						<p class="text--secondary">{{ $t('newInvoice.termSection.delivery') }}</p>
						<span class="text--primary">{{ invoice.Delivery || "-" }}</span>
					</v-col>
					<v-col cols="12" sm="auto">
						<p class="text--secondary">{{ $t('newInvoice.termSection.interset') }}</p>
						<span
							class="text--primary"
						>{{ (invoice.OverduePayment) ? `${invoice.OverduePayment} %` : "-" }}</span>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-col>
</template>

<script>
import { mapState } from "vuex";
Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

let todate = new Date().toISOString().substr(0, 10);
export default {
	props: ["todatefromDraft", "datefromDraft"],
	data: vm => ({
		date: new Date().toISOString().substr(0, 10),
		toDate: !!todate ? todate : new Date().toISOString().substr(0, 10),

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
		overduePayment: {
			get: function() {
				return this.$store.state.invoice.OverduePayment;
			},
			set: function(val) {
				this.$store.commit("setOverduePayment", val);
			}
		},
		delivery: {
			get: function() {
				return this.$store.state.invoice.Delivery;
			},
			set: function(val) {
				this.$store.commit("setDelivery", val);
			}
		},
		dagar() {
			return this.invoice.dagar;
		},
		...mapState(["invoice"])
	},

	mounted() {
		if (!!this.fromDraft) this.assignDates(this.fromDraft);
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
			this.$store.commit("dateFrom", val);
		},
		dagar(val) {
			console.log("val", val);
			console.log(this.toDate);
			this.toDate = this.invoice.dateTo;
		}
	},

	methods: {
		toDateChanged(val) {
			console.log("dsaasd", val);

			let dagar = (new Date(this.toDate) - new Date(this.date)) / 86400000;
			console.log("dagar", dagar);

			this.$store.commit("setDagar", dagar);
		},
		assignDates() {
			this.toDate = this.todatefromDraft;
			this.date = this.datefromDraft;
		}
	}
};
</script>
