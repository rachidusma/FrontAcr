<template>
    <v-layout>
        <v-row>
            <v-col cols="12" sm="12">
                <div class="d-flex justify-space-between align-center" style="width: 100%">
			        <p class="py-0 my-0 black--text headline">Invoices</p>
			        <v-btn color="success" to="/newinvoice">New invoice</v-btn>
		        </div>
            </v-col> 
            <v-col cols="12" sm="12">
               <div class="blueSection">
                   <v-row justify="center" align="center" style="width:100%;height:100%">
                       <v-col cols="12" sm="4">
                           <h6 class="grey--text text-center subtitle-1 my-4">Overpaid (inc VAT)</h6>
                           <h6 class="display-1 text-center">0,00 kr</h6>
                       </v-col>

                       <v-col cols="12" sm="4" >
                       <h6 class="grey--text text-center subtitle-1 my-4">Overdue  (inc VAT)</h6>
                       <h6 class="display-1 text-center">28 375,000 kr</h6>
                       </v-col>
                       <v-col cols="12" sm="4">
                       <h6 class="grey--text text-center subtitle-1 my-4">Outstanding  (inc VAT)</h6>
                       <h6 class="display-1 text-center">28 375,00</h6>
                       </v-col>
                   </v-row>
               </div>   
            </v-col>
            <v-col cols="12" sm="12">
                <v-btn text small :color="activeclass" @click="activeinvoices">Active invoices</v-btn><v-btn text small :color="allclass" @click="allinvoices">All invoices</v-btn>
                <v-card>
                    <v-row class="pa-4">
                           <v-col cols="12" sm="3">
                                <v-text-field
                                  v-model="search"
                                  label="Search"
                                  append-icon="mdi-magnify"
                                  single-line
                                  hide-details
                                  solo
                                  dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-select
                                 :items="States"
                                 v-model="state"
                                 item-text="text"
                                 item-value="value"
                                 label="All states"
                                 solo
                                 dense
                                 v-on:change="filterstate"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-select
                                 :items="types"
                                 item-text="text"
                                 item-value="value"
                                 label="All types"
                                 solo
                                 dense
                                ></v-select>
                            </v-col>
                    </v-row>
                    <v-data-table
                     :headers="header"
                     :items="invoicesItem"
                     :search="search"
                     class="elevation-1"
                     @click:row="handleClick"
                    >
                        <template v-slot:item.Status="{ item }">
                           <v-chip :color="getColor(item.Status)" dark>{{ item.Status }}</v-chip>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-layout>
</template>
<script>
export default {
    layout : 'admin',

    data () {
      return {
        search: '',
        activeclass:'primary',
        allclass:'normal',
        items: [],
        state:[{text:'paid',value:'paid'}],
        States: [{text:'All states',value:'All'},{text:'Paid',value:'paid'},{text:'Overdue',value:'overdue'},{text:'Drafts',value:'draft'}],
        types: [{text:'All types',value:'All'},{text:'Invoice',value:'Invoice'},{text:'Cash invoice',value:'cash'},{text:'Credit invoice',value:'credit'}],
        header: [
          {
            text: 'Invoice number',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Customer', value: 'Customer' },
          { text: 'Invoice amount (inc VAT)', value: 'amount'},
          { text: 'Status', value: 'Status' },
          { text: 'Date of invoice', value: 'Date' },
          { text: 'Due date', value: 'Due' },
          { text: 'Delivery  date', value: 'Delivery' },
        ],
        invoices: [
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'paid',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'overdue',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'paid',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'draft',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'draft',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },  
        ],
        invoicesItem: [
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'paid',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'overdue',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'paid',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'draft',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },
          {
            id: 123456,
            name: 'Frozen Yogurt',
            Customer: 159,
            amount: 6.0,
            Status: 'draft',
            Date: '22/06/2020',
            Due: '22/05/2020',
            Delivery : "22/06/2020"
          },  
        ],
        
      }
    },
    methods: {
      getColor (Status) {
        if (Status == 'paid') return 'green'
        else if (Status == 'overdue') return 'red'
      },
      filterstate(a){
           if(a == 'All') {
               this.invoicesItem = this.invoices
           }
           else{
           this.invoicesItem = this.invoices.filter(invoice => invoice.Status == a);
           }
      },
      activeinvoices(){
         this.invoicesItem = this.invoices;
         this.invoicesItem = this.invoices.filter(invoice => invoice.Status != 'paid');
         this.activeclass = "primary"
         this.allclass = "normal"
      },
      allinvoices(){
          this.invoicesItem = this.invoices;
         this.invoicesItem = this.invoices.filter(invoice => invoice.Status != 'draft');
         this.allclass = "primary"
         this.activeclass = "normal"
      },
      handleClick(a){
      if(a.Status == 'draft'){
      this.$router.push('/invoices/draft/'+a.id);
      }
      else if(a.Status == 'overdue'){
          this.$router.push('/invoices/overdue/'+a.id);
      }
      else{
          this.$router.push('/invoices/paid'+a.id);
      }
      }
    },
    created(){
        this.activeinvoices();
    }
}
</script>
<style  scoped>
.blueSection{
    display: block;
    width: 100%;
    height:200px;
    background-color: #dceaf5;
}
.itm{
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