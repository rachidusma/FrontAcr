<template>
  <v-row no-gutters>
    <LeftSide />   
       <v-col
         cols="12"
         md="5"
         sm="12"
         style="padding-top : 30px"
        >
          <h6 class="display-2 bold" align="center" style="color :#336882"> Create Account </h6>
          <v-form>
            <v-container> 
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
                     <v-text-field
                       v-model="userInfo.first"
                       label="First name"
                       required
                     ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
                    <v-text-field
                       v-model="userInfo.last"
                       label="Last name"
                       required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
                      <v-text-field
                       v-model="userInfo.email"
                       :rules="emailRules"
                       label="E-mail"
                       required
                      ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
                    <v-text-field
                       v-model="userInfo.number"
                       label="Number"
                       required
                    ></v-text-field>
                  </v-col>  
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
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
                  <v-col
                    cols="12"
                    md="6"
                    sm="12">
                    <v-text-field
                       v-model="userInfo.confirmPass"
                       autocomplete="confirm-password"
                       :value="userInfo.confirmPass"
                       label="Confirm Password"
                       :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                       :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                       @click:append="() => (value = !value)"
                       :type="value ? 'password' : 'text'"
                       @input="_=>userPassword=_"
                       required
                       ></v-text-field>
                   </v-col>
                </v-row>
                <v-row>
                   <v-col cols="12" sm="12" md="12">
                      <v-checkbox
                        v-model="ex4"
                        label="By creating an account I approve ACREDIT  General  Terms and Conditions "
                        color="#336882"
                        hide-details
                      ></v-checkbox>
                   </v-col>
                </v-row>
                <v-row>
                   <v-col cols="12" sm="12" md="12">
                     <v-checkbox
                       v-model="ex5"
                       label="I consent to the processing of my personal data in accordance with  ACREDIT Privacy Policy"
                       color="#336882"
                       hide-details
                     ></v-checkbox>
                    </v-col> 
                </v-row>
                <v-row align="center">
                    <v-col align="center" justify="center">
                      <v-btn class="ma-2" 
                        tile
                        large 
                        outlined 
                        :disabled="!(ex4&&ex5&&userInfo.password&&(userInfo.password === userInfo.confirmPass))" 
                        color="#336882"
                        @click="userRegister(userInfo)"
                         >
                        Create Account
                      </v-btn>
                    </v-col>
                </v-row>
              </v-container>
           </v-container>
          </v-form>
        </v-col>
        <v-snackbar
           v-model="snackbar"
           :timeout="timeout"
           :color="color"
            >
           {{ text }}
           <v-btn
             color="white"
             text
             @click="snackbar = false"
            >
           Close
          </v-btn>
        </v-snackbar>
    </v-row>
</template>
<script>
import LeftSide from '@/components/LeftSide'
 export default {
   components : {
       LeftSide
   },
   data: () => ({
      snackbar: false,
      timeout: 5000,
      text: '',
      color: '',
      snackbarErr: false,
      valid: true,
      value: true,
      ex4 : false,
      ex5 : false,
      rules: {
        required: value => !!value || "Required.",
      },
      userInfo : {
        first : 'rachid',
        last : 'ouannas',
        number : '123123',
        email: 'usmarachid9@gmail.com',
        password : '123123',
        confirmPass : '123123',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      confirmPasswordRules: [v => !!v || "Password is required"]
    }),
    computed: {
    passwordConfirmationRule() {
      return () =>
        this.userInfo.password === this.userInfo.confirmPass || "Password must match";
      }
    },
    methods: {
      async userRegister (userInfo) {
      try {
        const name = userInfo.first;
        const lastname = userInfo.last;
        const email = userInfo.email;
        const password = userInfo.password;
        let response  = await this.$axios.post('http://localhost:5000/api/users',{ "name" :name , "lastname" : lastname, "email" : email, "password" : password });
        this.text= "Registration success"; 
        this.color = "success";
        this.snackbar = true ;
        this.$router.push('/register');
       }
        catch{
          this.text= "Registration failed, Email already used";
          this.color = "error";
          this.snackbar = true
        }
      },
      validate () {
        this.$refs.form.validate()
      },
    },
}
</script>
<style  scoped>


</style>