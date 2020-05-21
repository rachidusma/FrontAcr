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
      <v-list
        dense
        shaped
      >
        <div v-if="$auth.loggedIn">
          <v-list-item two-line :class="miniVariant && 'px-0'" class="mb-3">
            <v-badge
              avatar
              bordered
              overlap
              icon="mdi-account-check"
            >
              <v-avatar color="red" class="ml-3">
                <span class="white--text headline">
                  {{ loginUser.name.charAt(0).toUpperCase() }}
                  <span v-if="loginUser.admin">
                    {{ loginUser.lastname.charAt(0).toUpperCase() }}
                  </span>
                </span>
              </v-avatar>
            </v-badge>
            
            <v-list-item-content class="text-center">
              <v-list-item-title>
                {{ loginUser.name }}
                  <span v-if="loginUser.admin">
                    {{ loginUser.lastname }}
                  </span>
              </v-list-item-title>
              <div>
                <v-list-item-subtitle>{{ loginUser.email }}</v-list-item-subtitle>
              </div>
              <div v-if="loginUser.admin">
                <v-list-item-subtitle>Admin</v-list-item-subtitle>
              </div>
              <div v-else>
                <v-list-item-subtitle>Client</v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider></v-divider>

        <v-list-item to="/invoices">
          <v-list-item-action >
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>invoice</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <div v-if="loginUser.admin && $auth.loggedIn">
          <v-list-item to="/user">
            <v-list-item-action>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <v-list-item to="/customer">
          <v-list-item-action>
            <v-icon>mdi-account-multiple-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Customer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/articles">
          <v-list-item-action>
            <v-icon>mdi-folder-multiple-image</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Article</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <div v-if="$auth.loggedIn">
          <div v-if="loginUser.admin">
            <v-list-group
              prepend-icon="mdi-cash-multiple"
              no-action
              >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>Salary</v-list-item-title>
                </v-list-item-content>
              </template>
                <v-list-item to="/uppaidsalary">
                  <v-list-item-icon>
                    <v-icon>mdi-account-cash</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Unpaid Salary</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item to="/paidsalary">
                  <v-list-item-icon>
                    <v-icon>mdi-account-cash-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>Paid Salary</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
            </v-list-group>
          </div>

          <v-divider></v-divider>
          <v-list-item to="/docment">
            <v-list-item-action >
              <v-icon>mdi-folder-multiple-image</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Document</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item to="docment">
            <v-list-item-action>
              <v-icon>mdi-server-security</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>

          <v-list-item to="/profile">
            <v-list-item-action>
              <v-icon>mdi-account-box-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app color="#336882" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" class="link">Acredit</nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-spacer></v-spacer>
      <div v-if="$auth.loggedIn">
        <v-btn outlined @click="logOut()">Logout</v-btn>
        <!-- <v-btn outlined @click="$auth.logout()">Logout</v-btn> -->
      </div>
      <div v-else>
        <nuxt-link to="/" class="link">Home</nuxt-link>
        <nuxt-link to="/job" class="link">Calculate</nuxt-link>
        <v-divider inset vertical></v-divider>
        <nuxt-link to="/signup" class="link">Register</nuxt-link>
        <v-divider inset vertical></v-divider>
        <nuxt-link to="/login" class="link">Login</nuxt-link>
      </div>
    </v-app-bar>

    <v-content class="gray">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      loginUser: this.$auth.$storage.getUniversal('loginuser'),
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Acredit"
    };
  },

methods: {
  async logOut() {
    await this.$auth.logout()
    this.$auth.$storage.removeUniversal('loginuser');
  }
}

};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-left: 20px;
  font-size: 120%;
}
.gray {
  background-color: #f5f7f9;
}
.maintitle {
  font-size: 1.625rem !important;
  font-weight: 401;
  letter-spacing: 0.1666666667em !important;
  line-height: 1rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif !important;
}
</style>
