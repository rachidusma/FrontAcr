<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="12">
        <v-row class="pa-4">
          <h1 class="title">Users</h1>
          <v-spacer></v-spacer>
        </v-row>
      </v-col>
      <v-col cols="12" md="12">
        <p class="overline">All users</p>
        <v-card tile width="100%" class="pa-8">
          <v-row>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search_user"
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
            :items="userlist"
            sort-by="name"
            class="elevation-1"
            :search="search_user"
            loading="true"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.fullname="{ item }">
              <p>{{item.name}}  {{item.lastname}}</p>
            </template>
            <template v-slot:item.admin="{ item }">
              <v-switch v-model="item.admin" @mousedown="changeAdminRole(item)" :disabled="item.block ? true : false"></v-switch>
            </template>
            <template v-slot:item.block ="{ item }">
              <v-switch color="red" v-model="item.block" @mousedown="blockUser(item)"></v-switch>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn fab dark small color="cyan" >
                <v-icon small dark @click="editUser(item)" :disabled="item.block ? true : false">mdi-checkbox-marked-outline</v-icon>
              </v-btn>
              <v-btn fab dark small color="red">
                <v-icon small dark @click="deleteUser(item)" :disabled="item.block ? true : false">mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- This modal is for admin role -->
    <div justify="center">
      <v-dialog v-model="role_change_flag" persistent max-width="260">
        <v-card>
          <v-card-title class="headline d-flex justify-center">
            <div class="d-flex flex-no-wrap">
              <v-icon large color="orange darken-2">mdi-alert</v-icon>
              <div class="ml-3 text-center">Admin Role for this account ?</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click=" role_change_flag = false">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
            <v-btn color="green darken-1" text @click="adminRoleAxios()">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- warnning role part -->
    
    <!-- This modal is for delete part -->
    <div justify="center">
      <v-dialog v-model="user_delete_flag" persistent max-width="260">
        <v-card>
          <v-card-title class="headline d-flex justify-center">
            <div class="d-flex flex-no-wrap">
              <v-icon large color="red darken-2">mdi-delete-variant</v-icon>
              <div class="ml-3 text-center">Are you sure ?</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="user_delete_flag = false, userID = ''">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
            <v-btn color="green darken-1" text @click="deleteAxios(userID)">
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- end delete part -->

    <!-- This modal is for block part -->
    <div justify="center">
      <v-dialog v-model="user_block_flag" persistent max-width="280">
        <v-card>
          <v-card-title class="headline d-flex justify-center">
            <div class="d-flex flex-no-wrap">
              <v-icon large color="red darken-2">mdi-block-helper</v-icon>
              <div class="ml-3 text-center">Block this user?</div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="user_block_flag = false, userID = ''">
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
            <v-btn color="green darken-1" text >
              <v-icon @click="userBlockAxios()">mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- end block part -->

    <!-- This part is for edit part -->
    <v-dialog v-model="user_edit_flag" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="overline">Edit user</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <p class="overline">User informations</p>
              <v-row>
                <v-col cols="6" sm="12" md="6">
                  <template >
                    <v-switch 
                      v-model="useredit.admin"
                      label="User Role"
                    ></v-switch>
                  </template>
                </v-col>
                <v-col cols="6" sm="12" md="6">
                  <template >
                    <v-switch 
                      v-model="useredit.block"
                      label="User Block"
                    ></v-switch>
                  </template>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field 
                    label="User Name" 
                    placeholder="User Name" 
                    outlined color="#336882"
                    v-model="useredit.name"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                  <v-text-field 
                    label="User Name" 
                    placeholder="User Name" 
                    outlined color="#336882"
                    v-model="useredit.lastname"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="User Email"
                    placeholder="User Email"
                    outlined
                    type="email"
                    color="#336882"
                    v-model="useredit.email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="User Phone"
                    placeholder="User Phone"
                    outlined
                    type="text"
                    color="#336882"
                    v-model="useredit.telnumber"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="user_edit_flag = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="userDetailUpdateAxios()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- End edit part -->
  </v-layout>
</template>

<script>
export default {
  middleware: "auth",
  layout: "admin",

  data() {
    return {
      search_user: "",

      role_change_flag: false,
      user_delete_flag: false,
      user_edit_flag: false,
      user_block_flag: false,

      userID: '', // current userID

      search: "",
      headers: [
        { text: "User ID", value: "_id" },
        { text: "Name", value: "fullname" },
        { text: "Email", value: "email" },
        { text: "Telephone", value: "telnumber" },
        { text: "Register Date", value: "register_date" },
        { text: "Admin Role", value: "admin" },
        { text: "Block User", value: "block" },
        { text: "Actions", value: "actions", sortable: false }
      ],

      userlist: [], // total user
      useredit: {}, // edit user
      userrole: {}, // user role
      userblock: {}, // user block


      simpleuserblock : {
        admin: "",
        block: "",
        email: "",
        lastname: "",
        name: "",
        password: "",
        register_date: "",
        __v: "",
        _id: ""
      }
    };
  },

  beforeMount() {
    this.getAllUsers();
  },

  methods: {
    async  getAllUsers() {
      await this.$axios.post("/users/admin/", { admin: this.$auth.user.admin }).then(res => {
        this.userlist = res.data;
        console.log("customers_list", res);
      });
    },

    // This functions is for adminRole
    changeAdminRole(item) {
      this.userrole = Object.assign({}, item);
      this.role_change_flag = true;
    },
    async adminRoleAxios() {
      this.role_change_flag = false;
      this.userrole.admin = !this.userrole.admin;
      await this.$axios
        .$patch(`/users/${this.userrole._id}`, this.userrole)
        .then(async res => {
          await this.getAllUsers();
          this.userrole = null;
        })
        .catch(err => console.log(err));
    },
    // End for Role

    // This part is for editing user
    editUser(item) {
      this.useredit = Object.assign({}, item);
      console.log(this.useredit);
      this.user_edit_flag = true;
    },
    async userDetailUpdateAxios() {
      console.log('edit user' ,this.useredit)
      await this.$axios
        .$patch(`/users/${this.useredit._id}`, this.useredit)
        .then(async res => {
          await this.getAllUsers();
          this.user_edit_flag = false;
          this.useredit = Object.assign({}, this.simpleuserblock);
        })
        .catch(err => console.log(err));
    },
    // End edit

    // Delete user 
    deleteUser(item) {
      this.userID = item._id;
      this.user_delete_flag = true;
    },
    async deleteAxios(id) {
      console.log(id);
      await this.$axios
        .$delete(`/users/${id}`)
        .then(res => { 
          console.log(res);
          this.user_delete_flag = false;
          this.userID = '';
          this.getAllUsers();
        })
        .catch(err => console.log(err));
    },
    // End delete
  
    // Block user part
    blockUser(item) {
      this.userblock = Object.assign({}, item);
      this.user_block_flag = true;
    },
    async userBlockAxios() {
      this.user_block_flag = false;
      this.userblock.block = !this.userblock.block;
      await this.$axios
        .$patch(`/users/${this.userblock._id}`, this.userblock)
        .then(async res => {
          await this.getAllUsers();
          this.userblock = null;
        })
        .catch(err => console.log(err));
    },
    // End Block user part

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.close();
    }
  }
};
</script>
