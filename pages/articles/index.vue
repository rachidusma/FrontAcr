<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="12">
        <v-row class="pa-4">
          <h1 class="title">Articles</h1>
          <v-spacer></v-spacer>
          <ArticleModal />
        </v-row>
      </v-col>
      <v-col cols="12" md="12">
        <p class="overline">All Articles</p>
        <v-card tile width="100%" class="pa-8">
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
import ArticleModal from "@/components/ArticleModal.vue";
export default {
  middleware: "auth",
  layout: "admin",
  components: {
    ArticleModal
  },
  async fetch() {
    try {
      let response = await this.$axios.get("/articles/");
      let result = response.data.map(function(obj) {
        return {
          id: obj.userid,
          invoiceid: obj.invoiceid,
          artikelnamn: obj.artikelnamn,
          produktkod: obj.produktkod,
          pris_enhet: obj.pris_enhet,
          enhet: obj.enhet,
          moms: obj.moms,
          typ: obj.typ
        };
      });
      this.articles = result;
    } catch (e) {
      // console.log(e)
    }
  },
  methods: {
    handleClick(a) {
      this.$router.push("/articles/" + a.id);
    }
  },
  data() {
    return {
      all: [],
      search: "",
      Allarticles: [],
      selected: [],
      headers: [
        { text: "id", value: "id" },
        { text: "invoiceid", value: "invoiceid" },
        { text: "produktkod", value: "produktkod" },
        { text: "pris_enhet", value: "pris_enhet" },
        { text: "enhet", value: "enhet" },
        { text: "moms", value: "moms" },
        { text: "typ", value: "typ" }
      ],
      articles: []
    };
  }
};
</script>