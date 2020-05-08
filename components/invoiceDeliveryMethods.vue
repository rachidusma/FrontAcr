<template>
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
				<div class="overline mb-4">Delivery method</div>
				<v-expansion-panels v-model="deliveryMethod">
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
						<v-expansion-panel-header v-slot="{ open }">
							<v-row no-gutters>
								<v-col cols="4">Email to customer</v-col>
								<v-col cols="8" class="text--secondary">
									<v-fade-transition leave-absolute>
										<span v-if="open" key="0">Send the invoice via Email</span>
										<span v-else key="1"></span>
									</v-fade-transition>
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
						<v-expansion-panel-header v-slot="{ open }">
							<v-row no-gutters>
								<v-col cols="4">Download PDF</v-col>
								<v-col cols="8" class="text--secondary">
									<v-fade-transition leave-absolute>
										<span v-if="open" key="0">Download the invoice Pdf and send it to the customer yourself</span>
										<span v-else key="1"></span>
									</v-fade-transition>
								</v-col>
							</v-row>
						</v-expansion-panel-header>
						<v-divider></v-divider>
						<v-expansion-panel-content class="gray">
							<p>You can preview your invoice before publishing it.</p>
							<v-btn @click="downloedPDF">Download</v-btn>
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
					:disabled="saveInvoiceBtnloading"
					color="primary"
					@click="saveInvoice"
				>Publish</v-btn>
			</v-col>
		</v-row>
	</v-col>
</template>


<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			radioGroup: "",
			saveInvoiceBtnloading: false,
			deliveryMethod: null
		};
	},
	props: ["draggableItems", "calculations"],
	computed: {
		...mapState(["customer", "invoice"])
	},
	methods: {
		downloedPDF() {
			let doc = new jsPDF(),
				vm = this,
				res = doc.autoTableHtmlToJson(document.getElementById("basic-table")),
				product = doc.autoTableHtmlToJson(
					document.getElementById("products-table")
				),
				start = 20,
				end = 200,
				mid = 105;

			function header() {
				doc.text("acredit", start, 20);
				doc.text("invoice Title", start, 30);
				doc.text(vm.customer.customername || "", mid, 25);
				doc.text(vm.customer.postadress || "", mid, 30);
				doc.text(vm.customer.postadress || "", mid, 20);
				doc.line(start, 35, end, 35);
				doc.autoTable(res.columns, res.data, {
					margin: { top: 40, left: start, right: start, bottom: 10 },
					theme: "plain"
				});

				doc.line(start, 65, end, 65);
			}

			function footer() {
				doc.setFontSize(20);

				doc.line(20, 265, 190, 265);
				doc.text("acredit", 90, 272);

				doc.setFontSize(10.0);
				doc.text("Godkänd för F-skatt", 85, 276);
				doc.line(20, 280, 190, 280);

				doc.text("RUDSJÖTERRASSEN 3", 30, 285);
				doc.text("136 40 Handen", 35, 290);

				doc.text("Org.nr 5590303797", 85, 285);
				doc.text("VAT-nummer", 90, 290);

				doc.textWithLink("Vist StackOverflow here", 150, 290, {
					url: "https://stackoverflow.com/"
				});
			}

			function pays() {
				doc.setFillColor(164, 172, 212);
				doc.rect(start, 200, 170, 35, "f");

				doc.setFontStyle("bold");
				doc.setTextColor(0);
				doc.setFontSize(10);

				let startY = 207;
				doc.text("SUMMA EX MOMS", mid, startY);
				doc.text(String(vm.calculations.amountExVAT), mid + 60, startY);

				let x = startY;
				if (vm.calculations.vat6) {
					doc.text("MOMS 25%", mid, x + 6);
					doc.text(String(vm.calculations.vat6), mid + 60, x + 6);
					x += 6;
				}

				if (vm.calculations.vat12) {
					doc.text("MOMS 12%", mid, x + 6);
					doc.text(String(vm.calculations.vat12), mid + 60, x + 6);
					x += 6;
				}

				if (vm.calculations.vat25) {
					doc.text("MOMS 6%", mid, x + 6);
					doc.text(String(vm.calculations.vat25), mid + 60, x + 6);
					x += 6;
				}

				doc.text("ÖRESAVRUNDNING", mid, x + 6);
				doc.text(String(vm.calculations.RoundedSum), mid + 60, x + 6);

				doc.setFillColor(54, 64, 107);
				doc.rect(start, startY + 25, 170, 6, "f");

				doc.setFontSize(12);
				doc.text("ANGE REFERENS", start, startY + 36);
				doc.setFontSize(10);
				doc.text("<Sätts automatiskt>", start, startY + 41);

				doc.setFontSize(12);
				doc.text("TILL BANKGIRO", start + 42, startY + 36);
				doc.setFontSize(10);
				doc.text("5124-4093", start + 42, startY + 41);

				doc.setFontSize(12);
				doc.text("FÖRFALLODATUM", start + 80, startY + 36);
				doc.setFontSize(10);
				doc.text(String(vm.invoice.dateTo), start + 80, startY + 41);

				doc.setFontSize(12);
				doc.text("SUMMA ATT BETALA", start + 125, startY + 36);
				doc.setFontSize(10);
				doc.setFontStyle("bold");
				doc.text(`${vm.calculations.totalSumToPay} kr`, 177, startY + 41);

				doc.setFontSize(12);
				doc.text("BETALNINGSVILLKOR", start + 124, startY + 50);
				doc.setFontSize(10);
				doc.setFontStyle("bold");
				doc.text(`${vm.invoice.dagar} Dagar`, 177, startY + 56);
			}

			pays();
			if (this.draggableItems.length > 15) {
				doc.text("Se fakturaspecifikation på följande sidor", start, 90);

				doc.addPage();

				doc.autoTable(product.columns, product.data, {
					margin: { top: 70, left: start, right: start, bottom: 60 },
					headStyles: { fillColor: "#0d5892" }
				});

				let pagesNo = doc.internal.getNumberOfPages();
				for (let i = 1; i <= pagesNo; i++) {
					doc.setPage(i);
					header();
					footer();
					doc.setFontSize(10);
					doc.text(`Page ${i} of ${pagesNo}`, 5, 292);
				}
				// window.open(doc.output("bloburl"));
				doc.save("fixed.pdf");
			} else {
				header();
				doc.autoTable(product.columns, product.data, {
					margin: { top: 70, left: start, right: start, bottom: 60 },
					pageBreak: "avoid"
				});
				footer();
				doc.setFontSize(10);
				doc.text(`Page 1 of 1`, 5, 292);

				doc.save("fixed.pdf");
			}
		},

		saveInvoice(draft) {
			this.saveInvoiceBtnloading = true; /** Loading */

			let published = !!draft /** Published? */,
				deliveryMethod = this.deliveryMethod == 1 ? "pdf" : "e-invoice";

			/** Delete customer unnecessary data */
			delete this.customer.__v;
			delete this.customer._id;

			this.$axios.setToken(this.$auth.getToken("local"));
			this.$axios
				.$post("/invoices", {
					...this.customer,
					published: published,
					dagar: this.invoice.dagar,
					summa: this.calculations.totalSumToPay,
					extra_info: "",
					leveransmetod: deliveryMethod,
					pdf_link: "",
					invoicepaid: false,
					salarypaid: false
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => conole.log(err));

			this.saveInvoiceBtnloading = false;
		}
	}
};
</script>