<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="12">
        <v-row class="pa-4">
          <h1 class="title">User Profile</h1>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
      <v-col cols="12" md="12">
        <v-card tile width="100%" class="pa-8">
          <v-card-title>
            <span class="overline">Edit Profile</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4" md="3" sm="12">
              <v-container>
                <v-avatar color="red" size="250">
                  <span style="font-size: 150px;color: white;">
                    {{ userfirstname.charAt(0).toUpperCase() }}
                    <span v-if="loginuserdetail.admin">
                    {{ userlastname.charAt(0).toUpperCase() }}
                    </span>
                  </span>
                </v-avatar>
              </v-container>
            </v-col>
            <v-col cols="12" md="8" sm="12">
              <v-card-text>
                <v-row>
                  <v-col cols="6" sm="12" md="6">
                    <v-text-field
                      label="First Name"
                      placeholder="First Name"
                      outlined
                      color="#336882"
                      v-model="userInfo.name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6" sm="12" md="6">
                    <v-text-field
                      label="Last Name"
                      placeholder="Last Name"
                      outlined
                      color="#336882"
                      v-model="userInfo.lastname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="User Email"
                      placeholder="User Email"
                      outlined
                      type="email"
                      color="#336882"
                      v-model="userInfo.email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="User Phone"
                      placeholder="User Phone"
                      outlined
                      type="text"
                      color="#336882"
                      v-model="userInfo.telnumber"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Current Password"
                      placeholder="Current Password"
                      outlined
                      type="text"
                      color="#336882"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="New Password"
                      placeholder="New Password"
                      outlined
                      type="text"
                      color="#336882"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="Password confirm"
                      placeholder="password confirm"
                      outlined
                      type="text"
                      color="#336882"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <!-- <v-file-input
                      v-model="files"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      multiple
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      outlined
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                        >
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="overline grey--text text--darken-3 mx-2"
                        >
                          +{{ files.length - 2 }} File(s)
                        </span>
                      </template>
                    </v-file-input> -->
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="blue darken-1" text @click="user_edit_flag = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="userDetailUpdateAxios()">Save</v-btn> -->
                <v-btn color="primary" dark>Save</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",
  
  data() {
    return {
      userInfo: {},
      // files: '',
      userfirstname: '',
      userlastname: '',
      loginuserdetail: this.$auth.$storage.getUniversal('loginuser')
    }
  },

  async beforeMount() {
    this.getUserProfile();
  },

  methods: {
    async getUserProfile() {
      console.log(this.loginuserdetail)
		  await this.$axios.get(`/users/${this.loginuserdetail.id}`).then(res => {
        this.userInfo = Object.assign({}, res.data[0]);
        this.userfirstname = this.userInfo.name;
        this.userlastname = this.userInfo.lastname;
        console.log(this.userInfo)
      });
    },
    handleClick(a) {
      // this.$router.push("/customer/" + a._id);
    }
  },
};
</script>

<style>
</style>>