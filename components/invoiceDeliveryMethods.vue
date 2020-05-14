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
	props: ["draggableItems", "calculations", "invoiceId"],
	computed: {
		saveInvoiceBtnDisabled() {
			if (this.deliveryMethod == 0) return false;
			return !!!this.deliveryMethod;
		},
		...mapState(["customer", "invoice"])
	},
	methods: {
		async downloedPDF(preview) {
			let location,
				vm = this;

			if (!!preview) {
				pdf(preview, this);
			}
			if (!preview) {
				let pdfFile = pdf(preview, this).data,
					doc = pdf(preview, this).doc;

				return new Promise(function(resolve, reject) {
					vm.$axios
						.$post("/profile/file-upload", pdfFile, {
							headers: {
								accept: "application/json",
								"Accept-Language": "en-US,en;q=0.8",
								"Content-Type": `multipart/form-data;`
							}
						})
						.then(response => {
							console.log(response["location"]);
							vm.pdf_link = response["location"];
							console.log(response["location"]);
							resolve(vm.pdf_link);
							doc.save("dsa.pdf");
							return;
							if (200 === response.status) {
								// If file size is larger than expected.
								if (response.data.error) {
									if ("LIMIT_FILE_SIZE" === response.data.error.code) {
										alert("Max size: 2MB", "red");
									} else {
										console.log(response.data);
										// If not the given file type
										alert(response.data.error, "red");
									}
								} else {
									// Success
									let fileName = response.data;
									console.log("filedata", fileName);

									alert("File Uploaded", "#3089cf");
								}
							}
						})
						.catch(err => {
							reject(err);
						});
				});
			}
		},
		async saveInvoice(draft) {
			this.saveInvoiceBtnloading = true; /** Loading */
			const arr = new Array();

			let published = !!draft /** Published? */,
				deliveryMethod = this.deliveryMethod == 1 ? "pdf" : "e-invoice",
				invoce_number = this.invoiceId || uuidv1(null, arr, -12).join(""),
				publishDate = !!draft ? null : Date.now();

			this.$axios.setToken(this.$auth.getToken("local")); /** Set token */

			await this.downloedPDF(); /** Generate the pdf and get its link */

			if (!!this.$route.params.id) {
				await this.$axios
					.$patch(`/invoices/${this.$route.params.id}`, {
						ocrid: invoce_number,
						customerid: this.customer._id,
						customername: this.customer.customername,
						duedate: this.invoice.dateTo,
						overdueinterest: this.customer.overdueinterest,
						summa: this.calculations.amountExVAT,
						total: this.calculations.totalSumToPay,
						extra_info: "",
						leveransmetod: deliveryMethod,
						published: published,
						createdate: this.invoice.dateFrom,
						pdf_link: this.pdf_link,
						dagar: this.invoice.dagar,

						// fromDcreatedateate: this.invoice.dateFrom,

						invoicepaid: false,
						salarypaid: false
					})
					.then(async res => {
						/** EDIT INVOICE */
						let articles = this.draggableItems;
						articles.forEach(item => {
							item.invoiceid = invoce_number;
							
							delete item._id;
							delete item.id;
							delete item.__v;
							delete item.total;
							console.log(item);
						});

						await this.$axios
							.$post("/articles", articles)
							.then(res => console.log("patched"));
					})
					.catch(err => console.log(err));
			} else {
				await this.$axios
					.$post("/invoices", {
						ocrid: invoce_number,
						customerid: this.customer._id,
						customername: this.customer.customername,
						duedate: this.invoice.dateTo,
						overdueinterest: this.customer.overdueinterest,
						summa: this.calculations.amountExVAT,
						total: this.calculations.totalSumToPay,
						extra_info: "",
						leveransmetod: deliveryMethod,
						published: published,
						publishDate: publishDate,
						pdf_link: this.pdf_link,
						dagar: this.invoice.dagar,

						createdate: this.invoice.dateFrom,

						invoicepaid: false,
						salarypaid: false
					})
					.then(async res => {
						/** NEW INVOICE */
						let articles = this.draggableItems;
						articles.forEach(item => {
							item.invoiceid = invoce_number;
							item.produktkod;
							item.enhet = item.produktkod;

							delete item._id;
							delete item.id;
							delete item.__v;
							delete item.total;
						});

						await this.$axios
							.$post("/articles", articles)
							.then(res => console.log(res));
					})
					.catch(err => console.log(err));
			}

			this.saveInvoiceBtnloading = false;
		}
	}
};
</script>