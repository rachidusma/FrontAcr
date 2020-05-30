<template>
	<div class="body">
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<v-form v-model="signUpValid" ref="form">
					<v-row align-content="center">
						<v-col cols="12">
							<h1>Create Account</h1>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:rules="[rules.required]"
								label="First Name"
								placeholder="First Name"
								v-model="signUpUserInfo.first"
								type="text"
								dense
							></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:rules="[rules.required]"
								label="Last Name"
								placeholder="Last Name"
								v-model="signUpUserInfo.last"
								type="text"
								dense
							></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								label="Email"
								:rules="[rules.emailRules, rules.required]"
								v-model="signUpUserInfo.email"
								type="email"
								dense
								placeholder="Email"
							></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								label="Numebr"
								v-model="signUpUserInfo.number"
								:rules="[rules.required]"
								type="number"
								dense
								placeholder="Numebr"
							></v-text-field>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								v-model="signUpUserInfo.password"
								autocomplete="current-password"
								:value="signUpUserInfo.password"
								label="Password"
								dense
								outlined
								:append-icon="!showPass ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPass = !showPass"
								:type="!showPass ? 'password' : 'text'"
								@input="_=>userPassword=_"
								:rules="[rules.passRules]"
							></v-text-field>
						</v-col>

						<v-col cols="12" md="6">
							<v-text-field
								v-model="signUpUserInfo.confirmPass"
								autocomplete="confirm-password"
								:value="signUpUserInfo.confirmPass"
								label="Confirm Password"
								dense
								outlined
								:rules="[rules.confirmPasswordRules]"
								:append-icon="!showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showConfirm = !showConfirm"
								:type="!showConfirm ? 'password' : 'text'"
								@input="checkValid"
							></v-text-field>
						</v-col>

							<v-col cols="12">
								<v-checkbox
									v-model="permession1"
									label="By creating an account I approve ACREDIT  General  Terms and Conditions "
									color="#336882"
									hide-details
								></v-checkbox>
							</v-col>

							<v-col cols="12" >
								<v-checkbox
									v-model="permession2"
									label="I consent to the processing of my personal data in accordance with  ACREDIT Privacy Policy"
									color="#336882"
									hide-details
								></v-checkbox>
							</v-col>
							
						<v-col cols="12">
							<v-btn color="primary" @click="userRegister" :disabled="!(permession1 && permession2 && signUpValid && checkValid)">Sign Up</v-btn>
							<br />
							<a id="signIn2">Already have account?</a>
						</v-col>
					</v-row>
				</v-form>
			</div>

			<div class="form-container sign-in-container">
				<v-form v-model="valid" ref="form">
					<v-row align-content="center">
						<v-col cols="12">
							<h1>Sign in</h1>
						</v-col>
						<v-col cols="12">
							<v-text-field
								dense
								outlined
								:rules="rules.emailRules"
								type="email"
								v-model="userInfo.email"
								label="Email"
								placeholder="Email"
							/>
							<v-text-field
								dense
								outlined
								type="password"
								:rules="rules.passRules"
								v-model="userInfo.password"
								label="Password"
								placeholder="Password"
							/>
						</v-col>
						<v-col cols="12">
							<a href="#">Forgot your password?</a>
						</v-col>
						<v-col cols="12">
							<v-btn color="primary" :disabled="!valid" class="mb-2" @click="userLogin">Sign In</v-btn>
							<br />
							<a id="signUp2">Don't have account?</a>
						</v-col>
					</v-row>
				</v-form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<img src="@/assets/loginImage.jpg" alt="login">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>To keep connected with us please login with your personal info</p>
						<button class="ghost" id="signIn">Sign In</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button class="ghost" id="signUp">Sign Up</button>
					</div>
				</div>
			</div>
		</div>

		<v-snackbar v-model="snackbar">
			{{ text }}
			<v-btn color="white" text @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>
<script>
export default {
	name: "login",
	data() {
		return {
			valid: false,
			signUpValid: false,
			snackbar: false,
			showPassword: false,
			text: "Wrong email or password",
			rules: {
				emailRules: [
					v => !!v || "E-mail is required",
					v => /.+@.+\..+/.test(v) || "E-mail must be valid"
				],
				passRules: [v => !!v || "Password is required"],
				required: v => !!v || "required",
				confirmPasswordRules: v => v == this.signUpUserInfo.password
			},
			userInfo: {
				email: "eric1@gmail.com",
				password: "123456"
			},

			signUpUserInfo: {
				first: "rachid",
				last: "ouannas",
				number: "123123",
				email: "usmarachid9@gmail.com",
				password: "123123",
				confirmPass: "123123"
			},
			snackbar: false,
			timeout: 5000,
			color: "",
			showPass: false,
			showConfirm: false,
			permession1: false,
			permession2: false,
		};
	},
	computed: {
		passwordConfirmationRule() {
			return () =>
				this.userInfo.password === this.userInfo.confirmPass ||
				"Password must match";
		},
		checkValid() {
			return this.signUpUserInfo.confirmPass == this.signUpUserInfo.password;
		}
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		},
		async userRegister(userInfo) {
			try {
				const name = userInfo.first;
				const lastname = userInfo.last;
				const email = userInfo.email;
				const password = userInfo.password;
				let response = await this.$axios.post(
					"http://localhost:5000/api/users",
					{ name: name, lastname: lastname, email: email, password: password }
				);
				this.text = "Registration success";
				this.color = "success";
				this.snackbar = true;
				this.$router.push("/register");
			} catch {
				this.text = "Registration failed, Email already used";
				this.color = "error";
				this.snackbar = true;
			}
		},
		async userLogin() {
			try {
				await this.$auth
					.loginWith("local", { data: this.userInfo })
					.then(res => {
						this.$router.push("/invoices");
					})
					.catch(err => {
						console.log(err);

						this.snackbar = true;
					});
			} catch (err) {
				console.log(err);

				this.snackbar = true;
			}
		},
		validate() {
			this.$refs.form.validate();
		}
	},
	beforeCreate() {
		if (this.$auth.loggedIn) this.$router.push("/invoices");
	},
	mounted() {
		const signUpButton = document.getElementById("signUp");
		const signInButton = document.getElementById("signIn");
		const container = document.getElementById("container");

		if (this.$route.name == "index" || this.$route.name == "login") {
			container.classList.remove("right-panel-active");
		} else {
			container.classList.add("right-panel-active");
		}

		signIn2.addEventListener("click", () => {			
			container.scrollTo(0,0);
			container.classList.remove("right-panel-active");
		});
		signUp2.addEventListener("click", () => {
			
			container.classList.add("right-panel-active");
		});
		signUpButton.addEventListener("click", () => {
			
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener("click", () => {
			
			container.classList.remove("right-panel-active");
		});
	}
};
</script>


<style scoped>
.body {
	background-image: linear-gradient(
		to right top,
		#d16ba5,
		#c777b9,
		#ba83ca,
		#aa8fd8,
		#9a9ae1,
		#989de5,
		#959fe9,
		#92a2ed,
		#9f9def,
		#ad96ef,
		#bd8fec,
		#ce86e7
	);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100vh;
}

button {
	border-radius: 20px;
	border: 1px solid #336882;
	background-color: rgb(51, 104, 130);
	color: #ffffff;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

button.ghost {
	background-color: transparent;
	border-color: #ffffff;
}

form {
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

.container {
	background-color: #fff;
	border-radius: 0px;
	box-shadow: 0 px;
	position: relative;
	overflow: hidden;
	max-width: 100%;
	height: 100%;
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.container.right-panel-active .sign-in-container {
	transform: translateX(100%);
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

.container.right-panel-active .sign-up-container {
	transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	animation: show 0.6s;
}

@keyframes show {
	0%,
	49.99% {
		opacity: 0;
		z-index: 1;
	}

	50%,
	100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.container.right-panel-active .overlay-container {
	transform: translateX(-100%);
}

@media screen and (max-width: 768px) {
	h1 {
		font-size: 22px;
	}
	.form-container.sign-up-container > .v-form {
		justify-content: start;
	}
	.form-container.sign-in-container {
		height: 100%;
	}
	.body {
		padding: 0 10px !important;

	}
	.container {
		max-height: 90%;
		max-width: 100%;
		height: 100%;
	}
	
	.container.right-panel-active {
		overflow-y: scroll;
	}

	.sign-in-container {
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.sign-up-container {
		top: 0;
		width: 100%;
		height: 50%;
		opacity: 0;
		z-index: 1;
	}

	.container.right-panel-active .sign-up-container {
		visibility: visible;
		transform: translateX(0%);
		height: 100%;
	}

	.overlay-container {
		display: none;
	}
}

.overlay img{ 
	filter: brightness(50%);
	background-position: 0 0;
	height: 100%;
	width: 100%;
}

.overlay {
	color: #ffffff;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
	transform: translateX(50%);
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
	transform: translateX(0);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

.container.right-panel-active .overlay-right {
	transform: translateX(20%);
}

.social-container {
	margin: 20px 0;
}

.social-container a {
	border: 1px solid #dddddd;
	border-radius: 50%;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin: 0 5px;
	height: 40px;
	width: 40px;
}

footer {
	background-color: #222;
	color: #fff;
	font-size: 14px;
	bottom: 0;
	position: fixed;
	left: 0;
	right: 0;
	text-align: center;
	z-index: 999;
}

footer p {
	margin: 10px 0;
}

footer i {
	color: red;
}

footer a {
	color: #3c97bf;
	text-decoration: none;
}
</style>