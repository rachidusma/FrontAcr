<template>
  <v-row no-gutters>
    <LeftSide />
    <v-col cols="12" md="5" sm="12" style="padding-top : 30px">
      <h6 class="display-2 bold" align="center" style="color :#336882">Login</h6>
      <v-form>
        <v-container>
          <v-container>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-text-field v-model="userInfo.email" :rules="emailRules" label="E-mail" required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="userInfo.password"
                  autocomplete="current-password"
                  :value="userInfo.password"
                  label="Password"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  @input="_=>userPassword=_"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row align="center">
              <v-col align="center" justify="center">
                <v-btn
                  class="ma-2"
                  tile
                  :disabled="!(userInfo.password&&userInfo.email)"
                  large
                  outlined
                  color="#336882"
                  @click="userLogin(userInfo)"
                >Login</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-form>
    </v-col>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="error">
      {{ text }}
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-row>
</template>
<script>
import LeftSide from "@/components/LeftSide";


export default {
  components: {
    LeftSide
  },
  data: () => ({
    snackbar: false,
    text: "Wrong email or password",
    timeout: 2000,
    valid: true,
    value: true,
    rules: {
      required: value => !!value || "Required."
    },
    userInfo: {
      email: "eric1@gmail.com",
      password: "123456"
    },
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),

  methods: {
    async userLogin(userInfo) {
      try {
        await this.$auth
          .loginWith("local", { data: userInfo })
          .then(res => {
            this.$auth.$storage.setUniversal('loginuser', res.data.user);
            this.$store.commit("setUser", res.data);
            this.$router.push("/invoices");
          })
          .catch(err => console.log(err));
        this.snackbar = true;
      } catch (err) {
        this.snackbar = true;
      }
    },
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>