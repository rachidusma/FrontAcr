<template>
	<div>
		<oneInvoice :the_invoice="invoice" color="error" type="overdue" :numPages="numPages" />
		<div class="pdf_container">
			<v-btn outlined small class="ma-5" target="_blank" :href="invoice.pdf_link">
				<v-icon class="font1">mdi mdi-download</v-icon>
			</v-btn>
			<client-only>
				<vuePDF v-for="i in numPages" :key="i" :src="invoice.pdf_link" :page="i"></vuePDF>
			</client-only>
		</div>
	</div>
</template>

<script>
var vuePDF;
if (process.browser) {
	vuePDF = require("vue-pdf").default;
}

import oneInvoice from "@/components/oneInvoice";

export default {
	name: "publishedInvoice",
	middleware: "auth",
	layout: "admin",
	data() {
		return {
			invoice: {},
			numPages: null
		};
	},
	components: {
		oneInvoice,
		vuePDF
	},
	async mounted() {
		await this.$axios.$get(`/invoices/${this.$route.params.id}`).then(res => {
			res[0].createdate = new Date(res[0].createdate)
				.toISOString()
				.substring(0, 10);
      this.invoice = res[0];

			var loadingTask = vuePDF
				.createLoadingTask(this.invoice.pdf_link)
				.then(pdf => {
					this.numPages = pdf.numPages;
				});
		});
	}
};
</script>
