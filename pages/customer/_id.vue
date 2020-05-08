<template>
 <v-layout>
    <h3>{{ this.articles}}</h3>
 </v-layout>
</template>
<script>
export default {
    middleware: 'auth',
    layout : 'admin',
     async fetch() {
      try{
      let response  = await this.$axios.get('/customers/');
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
       this.articles = result.filter(customer => customer.id == this.$route.params.id);
     }
     catch(e){
      console.log(e)
     }
    },
    data(){
    return {
        articles : [],
    }
    }
}

</script>