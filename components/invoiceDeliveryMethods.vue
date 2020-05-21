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
                            <v-radio
                              label="Send the invoice with a link to PDF"
                              value="v"
                              color="#336882"
                            ></v-radio>
                            <v-radio
                              label="Send the invoice and attatch PDF File"
                              value="f"
                              color="#336882"
                            ></v-radio>
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
                        <p
                          class="pa-0 ma-0 text--secondary"
                        >You can preview your invoice before publishing it.</p>
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
      await pdf(preview, this);
    },
    async saveInvoice(draft) {
      this.saveInvoiceBtnloading = true; /** Loading */
      const arr = new Array();  

      console.log('This is Invoice id part',this.invoiceId);

      let published = !!draft /** Published? */,
        deliveryMethod = this.deliveryMethod == 1 ? "pdf" : "e-invoice",
        invoce_number = this.invoiceId || uuidv1(null, arr, -12).join(""),
        publishDate = !!draft ? null : Date.now();

      await this.$axios.setToken(this.$auth.getToken("local"));
      await this.downloedPDF();

      if (!!this.$route.params.id) {
        console.log('arrived_addnewInvoice_delivery', this.$route.params.id)
        await this.$axios
          .$patch(`/invoices/${this.$route.params.id}`, {
            orcid: invoce_number,
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
            fromDate: this.invoice.dateFrom,
            invoicepaid: false,
            salarypaid: false
          })
          .then(async res => {
            let articles = this.draggableItems;

            articles.forEach(item => {
              item.invoiceId = invoce_number;
            });

            await this.$axios
              .$post("/articles", articles)
              .then(res => console.log("patched"));
          })
          .catch(err => console.log(err));
      } else {
        await this.$axios
          .$post("/invoices", {
            orcid: invoce_number,
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

            fromDate: this.invoice.dateFrom,

            invoicepaid: false,
            salarypaid: false
          })
          .then(async res => {
            let articles = this.draggableItems;

            articles.forEach(item => {
              item.invoiceId = invoce_number;
            });

            await this.$axios
              .$post("/articles", articles)
              .then(res => this.$router.push("/invoices"));
          })
          .catch(err => console.log(err));
      }

      this.saveInvoiceBtnloading = false;
    }
  }
};
</script>