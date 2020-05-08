<template>
  <v-app>
    <Navbar />
    <nuxt />
  </v-app>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
export default {
  components: {
    Navbar,
    Footer
  }
}
</script>
<style>
.main {
  color : rgba(0,88,124)
}
</style>