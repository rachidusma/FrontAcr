<template>
	<v-row no-gutters>
		<LeftSide />
		<v-col cols="12" md="5" sm="12" style="padding-top : 30px">
			<h6 class="display-2 bold" align="center" style="color :#336882">Login</h6>
			<v-container>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field v-model="userInfo.email" :rules="emailRules" type="email" label="Email"></v-text-field>

					<v-text-field
						v-model="userInfo.password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						:rules="passRules"
						name="password"
						label="Password"
						required
						@click:append="showPassword = !showPassword"
					></v-text-field>

					<v-btn :disabled="!valid" color="success" class="mr-4" @click="userLogin">login</v-btn>
				</v-form>
			</v-container>
		</v-col>
		<v-snackbar v-model="snackbar" :timeout="2000" color="error">
			{{ text }}
			<v-btn color="white" text @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</v-row>
</template>
<script>
import LeftSide from "@/components/LeftSide";

export default {
	name: "login",
	components: {
		LeftSide
	},
	data() {
		return {
			valid: false,
			snackbar: false,
			showPassword: false,
			text: "Wrong email or password",
			emailRules: [
				v => !!v || "E-mail is required",
				v => /.+@.+\..+/.test(v) || "E-mail must be valid"
			],
			passRules: [
				v => !!v || 'Password is required',
			],
			userInfo: {
				email: "eric1@gmail.com",
				password: "123456"
			}
		};
	},
	methods: {
		async userLogin() {
			try {
				await this.$auth
					.loginWith("local", { data: this.userInfo })
					.then(res => {
						this.$router.push("/invoices");
					})
					.catch(err => {
						this.snackbar = true;
					});
			} catch (err) {
				this.snackbar = true;
			}
		},
		validate() {
			this.$refs.form.validate();
		}
	},
	beforeCreate() {
		if (this.$auth.loggedIn) this.$router.push("/invoices");
	}
};
</script>