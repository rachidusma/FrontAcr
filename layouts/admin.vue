<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="white"
      class="pt-4"
    >
     <v-list>
       <v-divider></v-divider>
       <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#336882"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
      <v-toolbar-title><nuxt-link to="/" class="link">   Acredit </nuxt-link></v-toolbar-title>
      <v-spacer />
      <v-spacer></v-spacer>
             <div v-if="$auth.loggedIn">
               <v-btn outlined @click="$auth.logout()">Logout</v-btn>
              </div>
              <div v-else>
                <nuxt-link to="/" class="link">   Home  </nuxt-link>
                <nuxt-link to="/job" class="link">   Calculate  </nuxt-link>
                <v-divider inset vertical></v-divider>
                <nuxt-link to="/signup" class="link">  Register </nuxt-link>
                <v-divider inset vertical></v-divider>
                <nuxt-link to="/login" class="link">   Login </nuxt-link>
              </div>
    </v-app-bar>
    <v-content
    class="gray"
    >
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-file-document',
          title: 'invoice',
          to: '/invoices'
        },
        {
          icon: 'mdi-account-circle-outline',
          title: 'Customer',
          to: '/customer'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Articles',
          to: '/articles'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Acredit'
    }
  }
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
.gray{
  background-color: #f5f7f9;
}
.maintitle{
  font-size: 1.625rem !important;
  font-weight: 401;
letter-spacing: 0.1666666667em !important;
line-height: 1rem;
text-transform: uppercase;
font-family: "Roboto", sans-serif !important;
}
</style>
