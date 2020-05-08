<template>
  <div id="app">
       <v-app-bar
       color="#336882"
       dark
       >
      <v-toolbar-title><nuxt-link to="/" class="link">   Acredit </nuxt-link></v-toolbar-title>
      <v-spacer></v-spacer>
             <div v-if="$auth.loggedIn">
              <v-list-tile-title><v-btn outlined @click="$auth.logout()">Logout</v-btn></v-list-tile-title>
              </div>
              <div v-else>
                <nuxt-link to="/" class="link">   Home  </nuxt-link>
                <nuxt-link to="/job" class="link">   Calculate  </nuxt-link>
                <nuxt-link to="/newinvoice" class="link">   Calculate  </nuxt-link>
                <v-divider inset vertical></v-divider>
                <nuxt-link to="/signup" class="link">  Register </nuxt-link>
                <v-divider inset vertical></v-divider>
                <nuxt-link to="/login" class="link">   Login </nuxt-link>
              </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.link{
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-left: 20px;
  font-size: 120%;
}
</style>
