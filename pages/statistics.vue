<template>
	<v-container>
		<!-- Start header -->
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" tile outlined>
					<v-card-title>Income and expenses</v-card-title>
					<v-card-text>
						<v-row>
							<v-col cols="12" md="5">
								<div class="text-center flex-grow-1">
									<p>Total income</p>
									<h3>32 800 Kr</h3>
								</div>
							</v-col>
							<v-col cols="12" md="1">
								<v-spacer></v-spacer>
								<v-divider vertical></v-divider>
							</v-col>

							<v-col cols="12" md="6">
								<div class="text-center flex-grow-1">
									<p>Total expenses</p>
									<h3>-</h3>
								</div>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<!-- End header -->

		<!-- Start Incomes chart -->
		<v-row>
			<v-col cols="12">
				<v-card class="mx-auto" tile outlined>
					<v-card-title>
						<h4>Income and expenses</h4>
						<v-spacer></v-spacer>
						<div class="mx-2">
							<v-list-item-avatar tile class="ma-0" size="10" color="blue"></v-list-item-avatar>
							<small>Income</small>
						</div>
					</v-card-title>

					<v-card-text>
						<Chart />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<!-- End Incomes chart -->

		<!-- Start Top 5 charts -->
		<v-row>
			<v-col md="6" :key="index" v-for="(chart, index) in charts">
				<v-card v-if="chart.chartData">
					<v-card-title class="justify-space-between d-flex">
						<h4>{{ chart.title.text }}</h4>
						<v-spacer></v-spacer>
						<small>
							<nuxt-link :to="chart.title.url">{{ chart.title.urlText }}</nuxt-link>
						</small>
					</v-card-title>
					<v-card-text>
						<v-row>
							<v-col cols="12">
								<PieChart
									:chartColors="chart.chartColors"
									:chartData="chart.chartData"
									:labels="chart.chartLabel"
								/>
							</v-col>

							<!-- <v-col cols="12" md="6" class="d-flex align-center justify-center">
								<div>
									<div class="my-2">
										<div class="d-flex justify-between align-center">
											<v-list-item-avatar tile class="ma-0 mx-2" size="10" color="green"></v-list-item-avatar>
											<p class="d-inline pa-0 ma-0">Income</p>
											<v-spacer></v-spacer>
											<p class="d-inline pa-0 ma-0">31 000 kr</p>
										</div>
									</div>

									<div class="my-2">
										<div class="d-flex justify-between align-center">
											<v-list-item-avatar tile class="ma-0 mx-2" size="10" color="blue"></v-list-item-avatar>
											<p class="d-inline pa-0 ma-0">Income</p>
											<v-spacer></v-spacer>
											<p class="d-inline pa-0 ma-0">31 000 kr</p>
										</div>
									</div>
								</div>
							</v-col>-->
						</v-row>
					</v-card-text>
				</v-card>

				<v-sheet v-else color="grey lighten-4" class="px-3 pt-3 pb-3">
					<v-skeleton-loader class="mx-auto"  type="card"></v-skeleton-loader>
				</v-sheet>
			</v-col>
		</v-row>
		<!-- End Top 5 charts -->

		<!-- Strat invoices statistics -->
		<v-row>
			<v-col cols="12" md="6" :key="index" v-for="(card, index) in cards">
				<v-card>
					<v-card-title class="d-block text-center">
						<h4>{{ card.title.text }}</h4>
						<p>{{ card.title.money }} Kr</p>
					</v-card-title>

					<v-card-text>
						<div :key="index" v-for="(info, index) in card.infos" class="pa-1">
							<div class="my-1 d-flex">
								<span>{{ info.label }}</span>
								<v-spacer></v-spacer>
								<span>{{ info.money }} Kr</span>
							</div>
							<v-divider></v-divider>
						</div>
					</v-card-text>

					<v-card-actions>
						<v-btn color="success" :to="card.actions.btn.url">{{ card.actions.btn.text }}</v-btn>
						<v-spacer></v-spacer>
						<nuxt-link :to="card.actions.text.text">{{card.actions.text.text}}</nuxt-link>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
		<!-- End invoices statistics -->

		<!-- Start fiscal year -->
		<v-row>
			<v-col cols="12">
				<v-card class="pa-5 d-flex align-center justify-space-between">
					<p>This year profit</p>
					<p class="green--text">0,00 Kr</p>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card>
					<v-card-title class="pa-5 d-flex align-center justify-space-between">
						<p>
							<v-icon>mdi mdi-bank</v-icon>Account balances
						</p>
						<p class="green--text">31 564.00 Kr</p>
					</v-card-title>

					<v-divider></v-divider>

					<v-card-text>
						<div class="py-2 d-flex align-center justify-space-between">
							<p>Someone</p>
							<p class="green--text">31 564.00 Kr</p>
						</div>
					</v-card-text>
				</v-card>
			</v-col>

			<v-col cols="12" md="6">
				<v-card>
					<v-card-title class="pa-5 d-flex align-center justify-space-between">
						<p>
							<v-icon>mdi mdi-currency-usd</v-icon>This year texes
						</p>
						<p class="red--text">0,00 Kr</p>
					</v-card-title>

					<v-divider></v-divider>

					<v-card-text>
						<div class="d-flex py-2 align-center justify-space-between">
							<p>profit</p>
							<p class="green--text">0.00 Kr</p>
						</div>
						<div class="d-flex py-2 align-center justify-space-between">
							<p>Textable result adjustment</p>
							<p class="green--text">0.00 Kr</p>
						</div>
						<div class="d-flex py-2 align-center justify-space-between">
							<p>Local tax rate</p>
							<p class="red--text">21.4 %</p>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<!-- End fiscal year -->
	</v-container>
</template>

<script>
import Chart from "@/components/charts/RandomChart.vue";
import PieChart from "@/components/charts/PieChart.vue";

export default {
	middleware: "auth",
	layout: "admin",

	components: {
		Chart,
		PieChart
	},
	data() {
		return {
			radios: "customers",
			customerChartDate: null,
			customerChartLables: null,
			ItemChartData: null,
			ItemChartLabels: null,

			cards: [],
			charts: [
				{
					title: {
						text: "Top 5 Items",
						url: "/articles",
						urlText: "View Items"
					},
					chartColors: ["#2d2d3b", "#ffccc7", "#b66d60", "#ecb278", "#983e3e "],
					chartData: null,
					chartLabel: null
				},
				{
					title: {
						text: "Top 5 customers",
						url: "/customer",
						urlText: "View Customers"
					},
					chartColors: ["#2d2d3b", "#ffccc7", "#b66d60", "#ecb278", "#983e3e "],
					chartData: null,
					chartLabel: null
				}
			]
		};
	},
	async mounted() {
		var t0 = performance.now();

		const promises = [
			this.$axios.$get("/customers"),
			this.$axios.$get("/invoices"),
			this.$axios.$get("/articlepatterns")
		];
		await Promise.all(promises).then(async res => {
			let customers = res[0],
				invoices = res[1],
				articlePatterns = res[2],
				invoicesCustomers = [],
				allArticles = [];

			for (let i = 0; i < invoices.length; i++) {
				const invoice = invoices[i];

				/** extrach name in another array */
				if (invoice.customername !== "undefined")
					invoicesCustomers.push(invoice.customername);

				/** Get articles for each invoice */
				await this.$axios
					.$get(`articles/invoice/${invoice.ocrid}`)
					.then(res => allArticles.push(...res));
			}

			this.invoicesCalculations(invoices);
			this.getMostRepeatedValue(invoicesCustomers);
			this.getMostRepeatedItem(articlePatterns, allArticles);

			var t1 = performance.now();
			console.log("Mount takes: " + (t1 - t0) + " milliseconds.");
		});
	},
	methods: {
		getMostRepeatedValue(arr) {
			let array = arr.sort(),
				item = null,
				times = 0,
				finalArr = [],
				names = [],
				frequanty = [];

			array.forEach(e => {
				if (finalArr.length == 0) {
					finalArr.push({ name: e, times: times });
					names.push(e);
					frequanty.push(times);
					item = e;
				} else if (item == e) {
					frequanty[frequanty.length - 1]++; /** increase the  */
				} else if (finalArr.length < 5 && item !== e) {
					times = 1;
					item = e;
					finalArr.push({ name: e, times: times });
					names.push(e);
					frequanty.push(times);
				}
			});

			this.charts[1].chartData = frequanty;
			this.charts[1].chartLabel = names;
		},
		invoicesCalculations(arr) {
			let summation = 0,
				Overdue = 0,
				to_7 = 0,
				to_14 = 0,
				to_21 = 0,
				plus21 = 0;

			arr.forEach(invoice => {
				summation += invoice.total;
				let days = Math.round(
					(new Date(invoice.duedate) - new Date(invoice.createdate)) / 86400000
				);

				if (days < 0) {
					Overdue += invoice.total;
				} else if (days > 0 && days <= 7) {
					to_7 += invoice.total;
				} else if (days > 7 && days <= 14) {
					to_14 += invoice.total;
				} else if (days > 14 && days <= 21) {
					to_21 += invoice.total;
				} else if (days > 21) {
					plus21 += invoice.total;
				}
			});

			this.cards.unshift({
				title: { text: "Invoices owed to you", money: summation },
				infos: [
					{ label: "Overdue", money: Overdue },
					{ label: "Due today", money: "0" },
					{ label: "1 -7 days", money: to_7 },
					{ label: "8-14 days", money: to_14 },
					{ label: "15-21 days", money: to_21 },
					{ label: "> 21 days", money: plus21 }
				],
				actions: {
					btn: { text: "Create Invoice", url: "/newinvoice" },
					text: { text: "View all active invoices", url: "/invoices" }
				}
			});
		},
		getMostRepeatedItem(patterns, allItems) {
			let data = [],
				labels = [];

			patterns.forEach(pattern => {
				/** Check if we have already 5 items */
				allItems.forEach(article => {
					if (pattern.artikelnamn == article.artikelnamn) {
						if (data.length == 0) {
							/** If this is the first element */
							data.push(1);
							labels.push(pattern.artikelnamn);
						} else {
							/** check if we already have it */
							let i = labels.indexOf(pattern.artikelnamn);
							if (i != -1) {
								/** If existed increase its number*/
								data[i]++;
							} else {
								if (data.length < 5) {
									/** If not existed */
									labels.push(pattern.artikelnamn);
									data.push(1);
								}
							}
						}
					}
				});
			});

			this.charts[0].chartData = data;
			this.charts[0].chartLabel = labels;
		}
	}
};
</script>

<style>
p {
	margin: 0 !important;
	padding: 0 !important;
}
</style>