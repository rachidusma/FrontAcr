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
			<!-- Start Top 5 expenditures -->
			<v-col>
				<v-card>
					<v-card-title class="justify-space-between d-flex">
						<h4>Top 5 expenditures</h4>
						<small>
							<nuxt-link to="/">View Profit & Loss report</nuxt-link>
						</small>
					</v-card-title>

					<v-card-text>
						<v-row>
							<v-col cols="12" md="6">
								<PieChart
									:chartColors="['rgba(0,0,0,0.3)','rgba(0,0,0,0.3)','rgba(0,0,0,0.3)','rgba(0,0,0,0.3)','rgba(0,0,0,0.3)']"
									:chartData="[30,120,548,50,90]"
								/>
							</v-col>

							<v-col cols="12" md="6" class="d-flex align-center justify-center">
								<div>
									<p>As soon as you've started recording some expenses, you'll see your top 5 expenses here</p>
									<v-btn color="success" class="mt-3">Record expenses</v-btn>
								</div>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
			<!-- End Top 5 expenditures -->

			<!-- Start Top 5  customers/items< -->
			<v-col>
				<v-card>
					<v-card-title class="justify-space-between d-flex">
						<h4>Top 5 customers/items</h4>
						<v-spacer></v-spacer>
						<nuxt-link to="/">View Customers</nuxt-link>
					</v-card-title>
					<v-card-text>
						<v-row>
							<v-col cols="12" md="6">
								<PieChart
									:chartColors="['green', 'blue']"
									:chartData="[30,120 ]"
									:labels="['green', 'blue']"
								/>
							</v-col>

							<v-col cols="12" md="6" class="d-flex align-center justify-center">
								<div>
									<v-radio-group v-model="radios" color="primary" row>
										<v-radio label="Customers" value="customers"></v-radio>
										<v-radio label="Item" value="item"></v-radio>
									</v-radio-group>

									<v-divider></v-divider>

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
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
			<!-- Start Top 5  customers/items< -->
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
			cards: [
				{
					title: { text: "Invoices owed to you", money: "97 671" },
					infos: [
						{ label: "Overdue", money: "55 654" },
						{ label: "Due today", money: "0" },
						{ label: "1 -7 days", money: "0" },
						{ label: "8-14 days", money: "41 017" },
						{ label: "15-21 days", money: "0" },
						{ label: "> 21 days", money: "1000" }
					],
					actions: {
						btn: { text: "Create Invoice", url: "/newinvoice" },
						text: { text: "View all active invoices", url: "/invoices" }
					}
				},
				{
					title: { text: "Supplier invoices you need to pay", money: "0" },
					infos: [
						{ label: "Overdue", money: "0" },
						{ label: "Due today", money: "0" },
						{ label: "1-7 days", money: "0" },
						{ label: "8-14 days", money: "0" },
						{ label: "15-21 days", money: "0" },
						{ label: "> 21 days", money: "0" }
					],
					actions: {
						btn: { text: "New supplier invoice", url: "/newinvoice" },
						text: {
							text: "View all active supplier invoices",
							url: "/invoices"
						}
					}
				}
			]
		};
	}
};
</script>

<style>
p {
	margin: 0 !important;
	padding: 0 !important;
}
</style>