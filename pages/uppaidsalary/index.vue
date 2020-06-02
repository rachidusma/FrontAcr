<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="12">
        <v-row class="pa-4">
          <h1 class="title">Salary</h1>
          <v-spacer/>
        </v-row>
      </v-col>

      <v-col cols="12" sm="12">
        <div class="display_section">
          <h6 class="display-1 text-center pt-5"> Statistic  (last 3 months) </h6>
          <v-row class="center pb-5" style="width:100%;height:100%">
            <v-col cols="12" sm="6">
              <h6 class="grey--text text-center subtitle-1 my-4">Paid Number</h6>
              <h6 class="display-1 text-center">{{ this.totalunpaidnum }}</h6>
            </v-col>

            <v-col cols="12" sm="6">
              <h6 class="grey--text text-center subtitle-1 my-4">Paid Summa</h6>
              <h6 class="display-1 text-center">{{ this.totalunpadisumma }} kr</h6>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="12" md="12">
        <p class="overline">All Salary</p>
        <v-card tile width="100%" class="pa-8">
          <v-row>
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              solo
              dense
              class="mb-4 pa-4"
              color="#336882"
            ></v-text-field>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="unpaidsalary"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.status="{ item }">
              <v-chip color="red" dark>{{ item.status }}</v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn dark small color="cyan" @click="handleClick(item)" >
                <v-icon small dark >mdi-checkbox-marked-outline</v-icon> Action
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

    </v-row>
  </v-layout>
</template>

<script>
import UserModal from "@/components/UserModal.vue";
export default {
  middleware: "auth",
  layout: "admin",
  components: {
    UserModal
  },

  data() {
    return {
      search: "",
      headers: [
        { text: "State", value: "status" },
        { text: "Name", value: "customername" },
        { text: "Person Number", value: "userid" },
        { text: "Ocr Number", value: "ocrid" },
        { text: "Salary", value: "summa" },
        { text: "Bank", value: "bankaccount" },
        { text: "Action", value: "action"}
      ],
      unpaidsalary: [],
      totalunpaidnum: 0,
      totalunpadisumma: 0,

      selectedunpaidsalary: {}, // remind salary
      totalunpaidsaraly: 0,
      newtotalunpaidsalary: 0,
      remindfee: 60,

      remind_flag: false
    };
  },

  async beforeMount() {
    this.getAllSalary();
  },

  methods: {
    async getAllSalary() {
      await this.$axios
        .$get("/invoices")
        .then(res => {
          res.forEach(inv => {
            if (inv.published && !inv.invoicepaid && new Date(inv.duedate) > Date.now())
              inv.status = "Published";
            else if (inv.published && !inv.invoicepaid && new Date(inv.duedate) < Date.now() )
              inv.status = "Overdue";
            else if (inv.published && inv.invoicepaid) inv.status = "Paid";
            else if (!inv.published) inv.status = "Draft";

            if (inv.duedate) {
              inv.duedate = new Date(inv.duedate).toISOString().substring(0, 10);
              inv.createdate = new Date(inv.createdate).toISOString().substring(0, 10);
            }
            inv.fromDate = inv.createdate || "-";
            inv.deliveryDate = "-";
          });

          this.unpaidsalary = res.filter(function(invoice) { return invoice.status == 'Overdue' });
          this.totalunpaidnum = this.unpaidsalary.length;
          let sum = 0;
          for (var i = 0; i<this.totalunpaidnum; i++ ) {
            if (this.unpaidsalary[i].summa == null) {
              this.unpaidsalary[i].summa = 0;
            }
            sum += this.unpaidsalary[i].summa;
          }
          this.totalunpadisumma = sum;
          console.log("invoice_part", res);
        })
        .catch(err => console.log(err));
        console.log(this.unpaidsalary)
    },

    handleClick(a) {
      console.log(a._id);
      this.$router.push("/invoices/overdue/" + a._id);
    }
  },
};
</script>

<style scoped>
  .display_section {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #dceaf5;
  }
  .itm {
    display: block;
    width: 100%;
    height: 100%;
    align-items: center;
    margin: auto;
  }
  th {
    vertical-align: top;
  }
</style>
