<template>
	<div>
		<!-- Start header -->
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="items"></v-breadcrumbs>
			</v-col>

			<div>
				<v-row justify="center">
					<v-dialog v-model="amendInvoiceModalState" max-width="500px">
						<v-card>
							<v-card-title>
								<h4>{{ $t('oneInvoice.dropDown.amend') }}</h4>
								<v-spacer/>
								<v-icon class="black--text" @click="amendInvoiceModalState= false">mdi mdi-close</v-icon>
							</v-card-title>
							<v-divider />

							<v-card-text>
								<div class="py-5">
									<h3 class="text--primary">{{ $t('oneInvoice.modal.undo.title') }}</h3>
									<p>{{ $t('oneInvoice.modal.undo.text') }}</p>
									<v-btn
										outlined
										@click="undoModalState = !undoModalState"
									>{{ $t('oneInvoice.modal.undo.btnText') }}</v-btn>
								</div>
								<v-divider />
								<div class="py-5">
									<h3 class="text--primary">{{ $t('oneInvoice.modal.edit.title') }}</h3>
									<p>{{ $t('oneInvoice.modal.edit.text') }}</p>
									<v-btn
										outlined
										:to="$t('oneInvoice.draftLink')+the_invoice._id"
									>{{ $t('oneInvoice.modal.edit.btnText') }}</v-btn>
								</div>
							</v-card-text>
							<v-divider />

							<v-card-actions class="grey lighten-3 pa-5">
								<v-spacer/>
								<v-btn @click="amendInvoiceModalState = false">{{ $t('oneInvoice.modal.btnText') }}</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>

					<v-dialog v-model="undoModalState" max-width="500px">
						<v-card>
							<v-card-title>{{ $t('oneInvoice.modal.undoConfirm.title') }}</v-card-title>
							<v-divider />
							<v-card-text
								class="py-5"
							>{{ $t('oneInvoice.modal.undoConfirm.text') }}</v-card-text>
							<v-card-actions>
								<v-btn depressed @click="undoModalState = false">{{ $t('cancle') }}</v-btn>
								<v-spacer/>
								<v-btn color="success" @click="undo">{{ $t('continue') }}</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-row>
			</div>

			<v-col cols="12">
				<v-row class="justify-space-between">
					<!-- Start Customer Name -->
					<v-col cols="12" md="4">
						<h3 class="d-inline-block">{{ the_invoice.customername }}</h3>
						<v-chip
							class="mt-3 text--white mx-2"
							small
							:color="color"
						>{{ $t(`invoice.table.filters.invoiceTypes.${type}`) }}</v-chip>
					</v-col>
					<!-- End Customer Name -->

					<!-- Start buttons -->
					<v-col cols="12" md="8" class="justify-end d-flex">
						<!-- Start Dropdown -->
						<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn outlined class="ml-2" v-on="on">
									{{ $t('oneInvoice.dropDown.btnText') }}
									<v-icon class="font1">mdi mdi-chevron-down</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item @click="amendInvoiceModalState = true">{{ $t('oneInvoice.dropDown.amend') }}</v-list-item>

								<v-list-item
									target="_blank"
									:href="the_invoice.pdf_link"
								>{{ $t('oneInvoice.dropDown.download') }}</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-col>

			<v-col cols="12 d-flex">
				<v-icon class="text--black mr-8">mdi mdi-file-document-outline</v-icon>
				<v-card class="px-5 flex-grow-1" outlined tile>
					<v-row>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">{{ $t('oneInvoice.invoiceInfo.dop') }}</h4>
							<span>{{ (the_invoice.createdate) }}</span>
						</v-col>
						<v-col cols="12" md="6">
							<h4 class="text--primary d-inline">{{ $t('oneInvoice.invoiceInfo.amount') }}</h4>
							<span>{{ the_invoice.total }} Kr</span>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<!-- End header -->
	</div>
</template>

<script>
export default {
	props: ["the_invoice", "numPages", "color", "type"],

	data() {
		return {
			invoice: {},
			amendInvoiceModalState: false,
			undoModalState: false
		};
	},
	computed: {
		items() {
			return [
				this.$t("oneInvoice.breadCampItems[0]"),
				{
					text:
						this.$t("oneInvoice.breadCampItems[1].text") + this.the_invoice.ocrid,
					disabled: true
				}
			];
		}
	},
	methods: {
		async undo() {
			this.invoice = this.the_invoice;

			this.undoModalState = false;

			this.invoice.published = false;
			await this.$axios
				.$patch(`/invoices/${this.$route.params.id}`, this.invoice)
				.then(res =>
					this.$router.push(
						`${this.$t("oneInvoice.draftLink")}${this.$route.params.id}`
					)
				)
				.catch(err => {
					console.log(err);
				});
		}
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
