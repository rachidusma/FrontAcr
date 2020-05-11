<template>
	<v-col cols="12">
		<v-card outlined class="pa-3">
			<v-card-title>
				<h3>Delivery method</h3>
			</v-card-title>

			<v-card-text>
				<v-col cols="12" md="12">
					<table id="basic-table" style="display: none">
						<thead></thead>
						<tbody>
							<tr>
								<td>FAKTURA NR</td>
								<td>Sätts automatiskt</td>
								<td>KUND</td>
								<td>{{ customer.customername }}</td>
							</tr>
							<tr>
								<td>FAKTURADATUM</td>
								<td>{{ invoice.dateFrom }}</td>
								<td>KUNDNR</td>
								<td>{{ customer.kundnummer }}</td>
							</tr>
							<tr>
								<td>RFALLODATUM</td>
								<td>{{ invoice.dateTo }}</td>
								<td>ERT VAT NR</td>
								<td>{{ customer.vatnummer || '' }}</td>
							</tr>
						</tbody>
					</table>

					<table id="products-table" style="display: none">
						<thead>
							<tr>
								<td>BESKRIVNING</td>
								<td>MOMS</td>
								<td>ANTAL</td>
								<td>À-PRIS</td>
								<td>SUMMA</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(prod,index) in draggableItems" :key="index">
								<td>{{ prod.artikelnamn }}</td>
								<td>{{ prod.moms }}</td>
								<td>{{ prod.Quantity }}</td>
								<td>{{ prod.pris_enhet }}</td>
								<td>{{ prod.total }}</td>
							</tr>
						</tbody>
					</table>

					<v-row>
						<v-col cols="12" md="12">
							<v-expansion-panels accordion hover v-model="deliveryMethod">
								<!-- <v-expansion-panel>
                            <v-expansion-panel-header>
                            <template v-slot:default="{ open }">
                                <v-row no-gutters>
                                <v-col cols="4">Get paid right now</v-col>
                                <v-col cols="8" class="text--secondary">
                                    <v-fade-transition leave-absolute>
                                    <span v-if="open" key="0">Sell ​​your invoice through Acredit and get paid within 24h.</span>
                                    <span v-else key="1"></span>
                                    </v-fade-transition>
                                </v-col>
                                </v-row>
                            </template>
                            </v-expansion-panel-header>
                            <v-divider></v-divider>
                            <v-expansion-panel-content class="gray">Here we will put payement function</v-expansion-panel-content>
								</v-expansion-panel>-->

								<v-expansion-panel>
									<v-expansion-panel-header>
										<v-row no-gutters>
											<v-col cols="12">
												<h3 class="text--primary pb-3">Email to customer</h3>
											</v-col>
											<v-col cols="12">
												<p class="pa-0 ma-0 text--secondary">Send the invoice via Email.</p>
											</v-col>
										</v-row>
									</v-expansion-panel-header>

									<v-divider></v-divider>
									<v-expansion-panel-content class="gray">
										<v-container>
											<v-row>
												<v-col cols="12" md="5" sm="12">
													<p class="overline">Type email of the customer</p>
													<v-text-field label="Email" outlined color="#336882" dense></v-text-field>
													<p class="overline">Invoice Delivery options</p>
													<v-radio-group v-model="radioGroup">
														<v-radio label="Send the invoice with a link to PDF" value="v" color="#336882"></v-radio>
														<v-radio label="Send the invoice and attatch PDF File" value="f" color="#336882"></v-radio>
													</v-radio-group>
													<v-btn outlined color="#336882">Send</v-btn>
												</v-col>
												<v-col cols="12" md="5" sm="12">
													<p class="overline">Send Your invoice as an Email</p>
												</v-col>
											</v-row>
										</v-container>
									</v-expansion-panel-content>
								</v-expansion-panel>

								<!-- Start PDF Download -->

								<v-expansion-panel>
									<v-expansion-panel-header>
										<v-row no-gutters>
											<v-col cols="12">
												<h3 class="text--primary pb-3">Download PDF</h3>
											</v-col>
											<v-col cols="12">
												<p class="pa-0 ma-0 text--secondary">You can preview your invoice before publishing it.</p>
											</v-col>
										</v-row>
									</v-expansion-panel-header>
									<v-divider></v-divider>

									<v-expansion-panel-content class="gray pa-5">
										<v-row>
											<v-col cols="6" class="text--secondary">
												<p>You can preview your invoice before publishing it.</p>
												<v-btn @click="downloedPDF('dsa')">Preview PDF</v-btn>
											</v-col>
											<v-col cols="3">
												<img src="@/assets/invoice_img.png" alt="invoice" />
											</v-col>
										</v-row>
									</v-expansion-panel-content>
								</v-expansion-panel>
								<!-- End PDF Download -->

								<!-- <v-expansion-panel>
                            <v-expansion-panel-header v-slot="{ open }">
                            <v-row no-gutters>
                                <v-col cols="4">Send as E-invoice</v-col>
                                <v-col cols="8" class="text--secondary">
                                <v-fade-transition leave-absolute>
                                    <span v-if="open" key="0">Send your invoice with e-invoice only 2 sek</span>
                                    <span v-else key="1"></span>
                                </v-fade-transition>
                                </v-col>
                            </v-row>
                            </v-expansion-panel-header>
                            <v-divider></v-divider>
                            <v-expansion-panel-content class="gray">Here we will put payement function</v-expansion-panel-content>
								</v-expansion-panel>-->
							</v-expansion-panels>
						</v-col>

						<v-col cols="12">
							<v-btn
								class="ma-2"
								:loading="saveInvoiceBtnloading"
								:disabled="saveInvoiceBtnloading"
								color="secondary"
								@click="saveInvoice('')"
							>Save as draft</v-btn>

							<v-btn
								class="ma-2"
								:loading="saveInvoiceBtnloading"
								:disabled="saveInvoiceBtnDisabled"
								color="primary"
								@click="saveInvoice"
							>{{ deliveryMethod == 1 ? "Download and Publish" : "Publish" }}</v-btn>
						</v-col>
					</v-row>
				</v-col>
			</v-card-text>
		</v-card>
	</v-col>
</template>


<script>
import { mapState } from "vuex";
import { v1 as uuidv1 } from "uuid";
import { pdf } from "@/plugins/jspdf.js";

export default {
	data() {
		return {
			radioGroup: "",
			saveInvoiceBtnloading: false,
			pdf_link: "",
			deliveryMethod: null
		};
	},
	props: ["draggableItems", "calculations"],
	computed: {
		saveInvoiceBtnDisabled() {
			if (this.deliveryMethod == 0) return false;
			return !!!this.deliveryMethod;
		},
		...mapState(["customer", "invoice"])
	},
	methods: {
		async downloedPDF(preview) {
			await pdf(preview, this);
		},

		async saveInvoice(draft) {
			this.saveInvoiceBtnloading = true; /** Loading */

			let published = !!draft /** Published? */,
				deliveryMethod = this.deliveryMethod == 1 ? "pdf" : "e-invoice",
				invoce_number = uuidv1();

			/** Delete customer unnecessary data */
			delete this.customer.__v;
			delete this.customer._id;

			await this.$axios.setToken(this.$auth.getToken("local"));
			await this.downloedPDF();

			await this.$axios
				.$post("/invoices", {
					...this.customer,
					id: invoce_number,
					published: published,
					dagar: this.invoice.dagar,
					summa: this.calculations.totalSumToPay,
					extra_info: "",
					leveransmetod: deliveryMethod,
					pdf_link: this.pdf_link,
					invoicepaid: false,
					salarypaid: false,
					createdate: this.invoice.dateFrom,
					paydate: this.invoice.dateTo
				})
				.then(async res => {
					let articles = this.draggableItems;

					articles.forEach(item => {
						item.invoiceId = invoce_number;
					});

					await this.$axios
						.$post("/articles", articles)
						.then(res => console.log(res));
				})
				.catch(err => console.log(err));

			this.saveInvoiceBtnloading = false;
		}
	}
};
</script>