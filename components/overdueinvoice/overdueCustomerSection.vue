<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Start AutoComplete -->
        <v-col cols="12" sm="6">
          <v-text-field
            label="Outlined"
            placeholder="Placeholder"
            outlined
            disabled
            v-model="customer.customername"
          ></v-text-field>
        </v-col>
        <!-- End AutoComplete -->

        <!-- Start user modal -->
        <v-col cols="12" sm="3">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2"
                color="success"
                @click="IndividualsOrCorporations = (customer.orgnummer != '') ?  '2' : '1';"
                v-on="on"
              >Edit</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="overline">Add user Profile</span>
                <v-spacer/>
                <v-icon class="font1" @click="dialog=false ">mdi mdi-close</v-icon>
              </v-card-title>
              <v-divider />
              <v-card-text v-if="customer">
                <!-- Start company or indidviduals -->
                <v-radio-group v-model="IndividualsOrCorporations" row>
                  <v-radio label="Individuals" value="1"></v-radio>
                  <v-radio label="Corporations" value="2"></v-radio>
                </v-radio-group>
                <!-- End company or indidviduals -->

                <v-container>
                  <v-row>
                    <p class="overline">Personal informations</p>
                    <!-- Start customername -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        :label="(IndividualsOrCorporations == 1) ? 'Name*' : 'Company*'"
                        v-model="customer.customername"
                        placeholder="Customer full name"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End customername -->

                    <!-- Start orgnummer -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        v-if="IndividualsOrCorporations == '2'"
                        label="Org-nummer"
                        placeholder="YYYYMMDD-NNNN"
                        outlined
                        v-model="customer.orgnummer"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End orgnummer -->

                    <!-- Start Personal -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        v-if="IndividualsOrCorporations == '1'"
                        label="Personal number"
                        placeholder="YYYYMMDD-NNNN"
                        outlined
                        v-model="customer.kundnummer"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End Personal -->

                    <!-- Start orgnummer -->
                    <v-col class="py-0" cols="12" v-if="IndividualsOrCorporations == 2">
                      <v-text-field
                        label="VAT number"
                        placeholder="YYYYMMDD-NNNN"
                        outlined
                        v-model="customer.vatnummer"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End orgnummer -->

                    <!-- Start kundnummer -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="Kundnummer"
                        placeholder="Kundnummer"
                        v-model="customer.kundnummer"
                        outlined
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End kundnummer -->

                    <v-col class="py-0" cols="12">
                      <v-divider />
                      <h1 class="overline pt-4 pb-4">Contact informations</h1>
                    </v-col>

                    <!-- Start postadress -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="Postadress"
                        placeholder="Postadress"
                        v-model="customer.postadress"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End postadress -->

                    <!-- Start postadress2 -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="Postadress 2"
                        v-model="customer.postadress2"
                        placeholder="Postadress 2"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End postadress2 -->

                    <!-- Start postnummer -->
                    <v-col class="py-0" cols="12" md="6">
                      <v-text-field
                        label="Postnummer"
                        placeholder="Postnummer"
                        outlined
                        v-model="customer.postnummer"
                        type="number"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End postnummer -->

                    <!-- Start stad -->
                    <v-col class="py-0" cols="12" md="6">
                      <v-text-field
                        label="stad"
                        v-model="customer.stad"
                        placeholder="stad"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End stad -->

                    <!-- Start kontaktperson -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="Kontaktperson"
                        v-model="customer.kontaktperson"
                        placeholder="Kontaktperson"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End kontaktperson -->

                    <!-- Start epost -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="E-post"
                        placeholder="E-post"
                        v-model="customer.epost"
                        type="email"
                        outlined
                        dense
                      ></v-text-field>
                      <v-divider />
                    </v-col>
                    <!-- End epost -->

                    <!-- Start verdueinterest -->
                    <v-col class="py-0" cols="12">
                      <v-text-field
                        label="Dröjsmålsränta (%)"
                        placeholder="Dröjsmålsränta"
                        outlined
                        v-model="customer.overdueinterest"
                        dense
                      ></v-text-field>
                    </v-col>
                    <!-- End verdueinterest -->
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <div>
                  <v-btn color="blue darken-1" text @click="dialog= false;">Close</v-btn>
                  <v-btn color="success" @click="editUser">Edit</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
        <!-- End user modal -->
      </v-row>
    </v-col>

    <!-- Start User Details -->
    <v-col cols="12" md="12" v-if="customer.customername != ''">
      <v-row>
        <v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.orgnummer != ''">
          <div class="d-inline-block">
            <p class="my-0 py-0 caption">Org-number</p>
            <b>{{customer.orgnummer}}</b>
          </div>
        </v-col>
        <v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.vatnummer != ''">
          <div class="d-inline-block">
            <p class="my-0 py-0 caption">VAT number</p>
            <b>{{customer.vatnummer}}</b>
          </div>
        </v-col>
        <v-col cols="12" sm="auto" class="align-center d-flex px-8" v-if="customer.epost != ''">
          <div class="d-inline-block">
            <p class="my-0 py-0 caption">Email</p>
            <b>{{customer.epost}}</b>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="auto"
          class="align-center d-flex px-8"
          v-if="customer.postadress != ''"
        >
          <div class="d-inline-block">
            <p class="my-0 py-0 caption">Address</p>
            <b>{{customer.postadress}}</b>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <!-- End User Details -->
  </v-row>
</template>

<script>
export default {
  props: ["overduceCustomerID","customername"],
  data: () => ({
    customer: {
      customername: "",
      orgnummer: "",
      vatnummer: "",
      kundnummer: "",
      postadress: "",
      postadress2: "",
      postnummer: "",
      stad: "",
      kontaktperson: "",
      country: "",
      epost: "",
      dagar: 0,
      overdueinterest: 0
    },
    isLoading: false,
    items: [],
    IndividualsOrCorporations: "1",
    search: null,
    dialog: false,
    editUserModal: false
  }),

  beforeMount() {
    this.getUsers();
  },

  methods: {
    async getUsers() {
      console.log(this.overduceCustomerID)
      await this.$axios.$get(`/invoices/${this.overduceCustomerID}`).then(async res => {
        await this.$axios.$get(`/customers/${res[0].customerid}`).then(res => {
          Object.assign(this.customer, res[0])
        }).catch(err => console.log(err))
        this.$store.commit('setCustomer', res)
      });
    },

    resetModal() {
      this.dialog = false;
      this.editUserModal = false;
    },

    async editUser() {
      await this.$axios.setToken(this.$auth.getToken("local"));
      let customer = this.customer;

      await this.$axios
        .$patch(`/customers/${customer._id}`, customer)
        .then(res => {
          this.dialog = false;
          this.editUserModal = true;
          Object.assign(this.customer, customer);
          this.getUsers();
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
