<template>
	<div>
		<!-- Start header -->
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="items"></v-breadcrumbs>
			</v-col>

			<div>
				<v-row justify="center">
					<v-dialog v-model="amendInvoiceModalState" scrollable max-width="500px">
						<v-card>
							<v-card-title>
								<h4>Amend invoice</h4>
								<v-spacer></v-spacer>
								<v-icon class="black--text" @click="amendInvoiceModalState = false">mdi mdi-close</v-icon>
							</v-card-title>
							<v-divider></v-divider>

							<v-card-text>
								<div class="py-5">
									<h3 class="text--primary">Undo publish</h3>
									<p>You may undo the latest published invoice. The invoice is not deleted but saved as a draft.</p>
									<v-btn outlined @click="undoModalState = !undoModalState">Undo now</v-btn>
								</div>
								<v-divider></v-divider>
								<div class="py-5">
									<h3 class="text--primary">Edit invoice</h3>
									<p>The invoice can be edited as long as it hasn't been recorded.</p>
									<v-btn outlined :to="'/invoices/draft/'+invoice._id">Edit</v-btn>
								</div>
							</v-card-text>
							<v-divider></v-divider>

							<v-card-actions class="grey lighten-3 pa-5">
								<v-spacer></v-spacer>
								<v-btn color="success" @click="amendInvoiceModalState = false">Done</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="undoModalState" max-width="500px">
						<v-card>
							<v-card-title>
								<h4>Undo publish?</h4>
								<v-spacer></v-spacer>
								<v-icon class="black--text" @click="undoModalState = false">mdi mdi-close</v-icon>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text
								class="py-5"
							>The invoice will be reverted to a draft. You will then be able to edit or delete it.</v-card-text>
							<v-card-actions>
								<v-btn depressed @click="undoModalState = false">Cancel</v-btn>
								<v-spacer></v-spacer>
								<v-btn color="success" @click="undo">Continue</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-row>
			</div>

			<v-col cols="12">
				<v-row class="justify-space-between">
					<!-- Start Customer Name -->
					<v-col cols="12" md="4">
						<h3 class="d-inline-block">{{ invoice.customername }}</h3>
						<v-chip class="mt-3 mx-2" small color="error">Overdue {{ overdueDays }} days ago</v-chip>
					</v-col>
					<!-- End Customer Name -->

					<!-- Start buttons -->
					<v-col cols="12" md="8" class="justify-end d-flex">
						<!-- Start Dropdown -->
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn outlined class="ml-2" v-on="on">
									More
									<v-icon class="font1">mdi mdi-chevron-down</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item @click="amendInvoiceModalState = true">Amend invoice</v-list-item>

								<v-list-item target="_blank" :href="invoice.pdf_link">Download</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-col>

			<!-- start published at -->
			<v-col cols="12 d-flex">
				<v-icon class="d-none d-sm-flex text--black mr-8">mdi mdi-file-document-outline</v-icon>
				<v-card class="px-5 flex-grow-1" outlined tile>
					<v-row>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">Invoice was published:</h4>
							<span>{{ (invoice.createdate) }}</span>
						</v-col>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">Invoice amount (inc VAT):</h4>
							<span>{{ invoice.total }}</span>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<!-- End published at -->

			<!-- start sent with email? -->
			<v-col cols="12 d-flex">
				<v-icon class="d-none d-sm-flex text--black mr-8">mdi mdi-email-outline</v-icon>
				<v-card class="px-5 flex-grow-1" outlined tile>
					<v-row>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">Emailed to eric@dk.se</h4>
							<span>2020-05-14, 17:05</span>
						</v-col>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">Delivery status:</h4>
							<span>Invoice opened</span>
						</v-col>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">Invoice sent as</h4>
							<span>Link and attached PDF</span>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<!-- End sent with email? -->
		</v-row>
		<!-- End header -->

		<div class="pdf_container">
			<v-btn outlined small class="ma-5" target="_blank" :href="invoice.pdf_link">
				<v-icon class="font1">mdi mdi-download</v-icon>
			</v-btn>
			<no-ssr>
				<vuePDF :src="invoice.pdf_link"></vuePDF>
			</no-ssr>
		</div>
	</div>
</template>

<script>
var vuePDF;
if (process.browser) {
	vuePDF = require("vue-pdf").default;
}

export default {
	name: "overdueInvoice",
	middleware: "auth",
	layout: "admin",
	components: {
		vuePDF
	},
	data() {
		return {
			invoice: {},
			overdueDays: 0,
			amendInvoiceModalState: false,
			undoModalState: false
		};
	},
	computed: {
		items() {
			return [
				{ text: "invoices", href: "/invoices" },
				{ text: this.invoice._id, disabled: true }
			];
		}
	},

	methods: {
		async undo() {
			this.undoModalState = false;
			this.invoice.published = false;
			await this.$axios
				.$patch(`/invoices/${this.$route.params.id}`, this.invoice)
				.then(res =>
					this.$router.push(`/invoices/draft/${this.$route.params.id}`)
				)
				.catch(err => {
					console.log(err);
				});
		}
	},
	async mounted() {
		await this.$axios.$get(`/invoices/${this.$route.params.id}`).then(res => {
			res[0].createdate = new Date(res[0].createdate)
				.toISOString()
				.substring(0, 10);
			this.overdueDays = Math.round(
				new Date(res[0].createdate) - new Date(res[0].duedate)
			) / 86400000;
			this.invoice = res[0];
		});
	}
};
</script>

<style>
.pdf_container {
	position: relative !important;
}
.pdf_container a {
	position: absolute !important;
	z-index: 7 !important;
	right: 0 !important;
}
</style>