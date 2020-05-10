<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="12">
      <v-row class="pa-4">
       <h1 class="title">Customers</h1>
        <v-spacer></v-spacer>
       <UserModal />
          </v-row>
      </v-col>
       
       <v-col cols="12" md="12">
         <p class="overline"> All customers</p>
          <v-card
          tile
          width="100%"
          class="pa-8"
          >
          <v-row>
           
           <v-spacer></v-spacer>
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
              :items="articles"
              :items-per-page="5"
              class="elevation-1"
              :search="search"
              @click:row="handleClick"
               ></v-data-table>
          </v-card>
       </v-col>
    </v-row>
  </v-layout>  
</template>
<script>
import UserModal from '@/components/UserModal.vue';
export default {
   middleware: 'auth',
    layout : 'admin',
    components : {
        UserModal,
    },
    async fetch() {
      try{
      let response  = await this.$axios.get('/customers/' );
      let result = response.data.map(function(obj) {
         return {
           id: obj.userid,
           customername: obj.customername,
           orgnummer: obj.orgnummer,
           vatnummer: obj.vatnummer,
           postadress: obj.postadress,
           stad: obj.stad,
           kontaktperson: obj.kontaktperson,
           country: obj.country,
           overdueinterest: obj.overdueinterest +" %",

         }
       });
       this.articles = result;
     }
     catch(e){
      console.log(e)
     }
    },
    methods : {
      handleClick(a){
      this.$router.push('/customer/'+a.id);
    }
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Customer Id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'customername', value: 'customername' },
          { text: 'vatnummer', value: 'vatnummer' },
          { text: 'overdueinterest (%)', value: 'overdueinterest'},
        ],
        articles: [],
      }
    },
}
</script>