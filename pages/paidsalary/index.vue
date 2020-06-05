<template>
  <v-layout column>
    <v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="$t('paid.breadCampItems')"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">{{ $t('paid.title') }}</h1>
				</v-row>
			</v-col>
			<!-- End page Header -->

      <v-col cols="12" sm="12">
        <div class="display_section">
          <h6 class="display-1 text-center pt-5">{{ $t('paid.blueSection.title') }}</h6>
          <v-row class="center pb-5" style="width:100%;height:100%">
            <v-col cols="12" sm="6">
              <h6 class="grey--text text-center subtitle-1 my-4">{{ $t('paid.blueSection.paidNo') }}</h6>
              <h6 class="display-1 text-center">{{ this.totalpaid_num }}</h6>
            </v-col>

            <v-col cols="12" sm="6">
              <h6 class="grey--text text-center subtitle-1 my-4">{{ $t('paid.blueSection.total') }}</h6>
              <h6 class="display-1 text-center">{{ this.totalpaid_summa }} kr</h6>
            </v-col>
          </v-row>
        </div>
      </v-col>

      <v-col cols="12">
        <v-card tile outlined width="100%" class="pa-8">
          <v-row>
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('filter')"
              hide-details
              solo
              dense
              class="mb-4 pa-4"
              color="#336882"
            ></v-text-field>
          </v-row>
          <v-data-table
            :headers="headers"
            :items="paidsalary"
            :items-per-page="5"
            class="elevation-1"
            :search="search"
            @click:row="handleClick"
            :footer-props="{
              itemsPerPageText: $t('rowsForTable')
            }"
          >
            <template v-slot:item.action="{ item }">
              <v-btn fab dark small color="cyan" >
                <v-icon small dark @click="editUser(item)" :disabled="item.block ? true : false">mdi-checkbox-marked-outline</v-icon>
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
        { text: this.$t("paid.tableHeaders.date"), value: "create_date" },
        { text: this.$t("paid.tableHeaders.name"), value: "name" },
        { text: this.$t("paid.tableHeaders.no"), value: "personummer" },
        { text: this.$t("paid.tableHeaders.ocr"), value: "invoiceid" },
        { text: this.$t("paid.tableHeaders.salary"), value: "salary" },
        { text: this.$t("paid.tableHeaders.bank"), value: "bankaccount" },
        { text: this.$t("paid.tableHeaders.action"), value: "action"}
      ],
      paidsalary: [],
      totalpaid_num: 0,
      totalpaid_summa: 0
    };
  },

  async beforeMount() {
    this.getAllSalary();
  },

  methods: {
    async getAllSalary() {
		  await this.$axios.get("/salarys/").then(res => {
        this.paidsalary = res.data;
        this.totalpaid_num = this.paidsalary.length;
        let sum = 0;
        for (var i = 0; i<this.totalpaid_num; i++ ) {
          if (this.paidsalary[i].salary == null) {
            this.paidsalary[i].salary = 0;
          }
          sum += this.paidsalary[i].salary;
        }
        this.totalpaid_summa = sum;
      });
    },
    handleClick(a) {
      // this.$router.push("/customer/" + a._id);
    }
  }
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
