<template>
	<div>
		<!-- Start header -->
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="items"></v-breadcrumbs>
			</v-col>

			<v-col cols="12">
				<v-row class="justify-space-between">
					<!-- Start Customer Name -->
					<v-col cols="12" md="4">
						<h3 class="d-inline-block">{{ invoice.customername }}</h3>
						<v-chip class="mt-3 mx-2" small color="blue">Published</v-chip>
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
								<v-list-item>Amend invoice</v-list-item>

								<v-list-item target="_blank" :href="invoice.pdf_link">Download</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<!-- End header -->

		<div class="pdf_container">
			<v-btn outlined small class="ma-5" target="_blank" :href="invoice.pdf_link" >
				<v-icon class="font1">mdi mdi-download</v-icon>
			</v-btn>

			<pdf :src="invoice.pdf_link"></pdf>
		</div>
	</div>
</template>

<script>
import pdf from "vue-pdf";

export default {
	middleware: "auth",
	layout: "admin",
	components: {
		pdf
	},
	data() {
		return {
			invoice: {}
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

	async mounted() {
		await this.$axios.$get(`/invoices/${this.$route.params.id}`).then(res => {
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