<template>
	<div class="body">
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<v-form class="justify-start justify-md-center" v-model="signUpValid" ref="form">
					<v-row align-content="center" v-if="!signedUp">
						<v-col cols="12">
							<div class="toggleLang">
								<nuxt-link class="mr-3" :to="localePath('Signup', 'en')">
									<img src="/en.svg" width="30" alt="en" />
								</nuxt-link>

								<nuxt-link :to="localePath('Signup', 'sv')">
									<img src="/sv.svg" width="30" alt="sv" />
								</nuxt-link>
							</div>

							<h1>{{ $t('loginForm.signUpForm.label') }}</h1>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:rules="[rules.required]"
								:label="$t('loginForm.signUpForm.fname')"
								v-model="signUpUserInfo.name"
								type="text"
								dense
							/>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:rules="[rules.required]"
								:label="$t('loginForm.signUpForm.lname')"
								v-model="signUpUserInfo.lastname"
								type="text"
								dense
							/>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:label="$t('loginForm.email')"
								:rules="[rules.emailRules, rules.required]"
								v-model="signUpUserInfo.email"
								type="email"
								dense
							/>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								outlined
								:label="$t('loginForm.signUpForm.number')"
								v-model="signUpUserInfo.telnumber"
								:rules="[rules.required]"
								type="number"
								dense
							/>
						</v-col>
						<v-col cols="12" md="6">
							<v-text-field
								v-model="signUpUserInfo.password"
								autocomplete="current-password"
								:value="signUpUserInfo.password"
								:label="$t('loginForm.password')"
								dense
								outlined
								:append-icon="!showPass ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showPass = !showPass"
								:type="!showPass ? 'password' : 'text'"
								@input="_=>userPassword=_"
								:rules="[rules.passRules]"
							/>
						</v-col>

						<v-col cols="12" md="6">
							<v-text-field
								v-model="signUpUserInfo.confirmPass"
								autocomplete="confirm-password"
								:value="signUpUserInfo.confirmPass"
								:label="$t('loginForm.signUpForm.confirmPassword')"
								dense
								outlined
								:rules="[rules.confirmPasswordRules]"
								:append-icon="!showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="showConfirm = !showConfirm"
								:type="!showConfirm ? 'password' : 'text'"
								@input="checkValid"
							/>
						</v-col>

						<v-col cols="12">
							<v-checkbox
								v-model="permession1"
								:label="$t('loginForm.signUpForm.checkBox1')"
								color="#336882"
								hide-details
							/>
						</v-col>

						<v-col cols="12">
							<v-checkbox
								v-model="permession2"
								:label="$t('loginForm.signUpForm.checkBox2')"
								color="#336882"
								hide-details
							/>
						</v-col>

						<v-col cols="12">
							<v-btn
								color="primary"
								@click="userRegister"
								class="mb-2"
								:disabled="!(permession1 && permession2 && signUpValid && checkValid)"
							>{{ $t('loginForm.signUp') }}</v-btn>
							<br />
							<a id="signIn2">{{ $t('loginForm.signUpForm.haveAcc') }}</a>
						</v-col>
					</v-row>
					<v-card outlinde tile class="ma-auto" v-else>
						<v-card-text>
							{{ $t('loginForm.card.text1') }}
							<a id="signIn3">{{ $t('loginForm.signIn') }}</a>
							{{ $t('loginForm.card.text2') }}
						</v-card-text>
					</v-card>
				</v-form>
			</div>

			<!-- Start login -->
			<div class="form-container sign-in-container">
				<v-form v-model="valid" ref="form">
					<v-row align-content="center">
						<v-col cols="12">
							<div class="toggleLang">
								<nuxt-link class="mr-3" :to="localePath('index', 'en')">
									<img src="/en.svg" width="30" alt="en" />
								</nuxt-link>

								<nuxt-link :to="localePath('index', 'sv')">
									<img src="/sv.svg" width="30" alt="sv" />
								</nuxt-link>
							</div>

							<h1>{{ $t('loginForm.signIn') }}</h1>
						</v-col>
						<v-col cols="12">
							<v-text-field
								dense
								outlined
								:rules="rules.emailRules"
								type="email"
								v-model="userInfo.email"
								:label="$t('loginForm.email')"
							/>
							<v-text-field
								dense
								outlined
								type="password"
								:rules="rules.passRules"
								v-model="userInfo.password"
								:label="$t('loginForm.password')"
							/>
						</v-col>
						<v-col cols="12">
							<a href="#">{{ $t('loginForm.forgot') }}</a>
						</v-col>
						<v-col cols="12">
							<v-btn
								color="primary"
								:disabled="!valid"
								class="mb-2"
								@click="userLogin"
							>{{ $t('loginForm.signIn') }}</v-btn>
							<br />
							<a id="signUp2">{{ $t('loginForm.noAcc') }}</a>
						</v-col>
					</v-row>
				</v-form>
			</div>
			<!-- End login -->

			<!-- Start overlay -->
			<div class="overlay-container">
				<div class="overlay">
					<img src="@/assets/loginImage.jpg" alt="login" />
					<div class="overlay-panel overlay-left">
						<h1>{{ $t('loginForm.signUpOverlay.label') }}</h1>
						<p>{{ $t('loginForm.signUpOverlay.text') }}</p>
						<button class="ghost" id="signIn">{{ $t('loginForm.signIn') }}</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>{{ $t('loginForm.signInOverlay.label') }}</h1>
						<p>{{ $t('loginForm.signInOverlay.text') }}</p>
						<button class="ghost" id="signUp">{{ $t('loginForm.signUp') }}</button>
					</div>
				</div>
			</div>
		</div>
		<!-- End overlay -->

		<v-snackbar v-model="snackbar" :color="color">
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
				name: "rachid",
				lastname: "ouannas",
				telnumber: "123123",
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
			signedUp: false,
			permession2: false
		};
	},
	computed: {
		passwordConfirmationRule() {
			return () =>
				this.userInfo.password === this.userInfo.confirmPass ||
				"Password must match";
		}
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		},
		checkValid() {
			return this.signUpUserInfo.confirmPass == this.signUpUserInfo.password;
		},
		async userRegister() {
			try {
				await this.$axios
					.post("users", this.signUpUserInfo)
					.then(res => {
						this.text = "Registration success";
						this.color = "success";
						this.snackbar = true;
						this.signedUp = true;

						this.userInfo.email = this.signUpUserInfo.email;
						this.userInfo.password = this.signUpUserInfo.password;

						this.signUpUserInfo = {};
						this.$nextTick(_ => {
							let signIn3 = document.getElementById("signIn3");
							signIn3.addEventListener("click", () => {
								container.scrollTo(0, 0);
								container.classList.remove("right-panel-active");
							});
						});
					})
					.catch(err => {
						this.text = err.response.data.msg;
						this.color = "error";
						this.snackbar = true;
					});
			} catch {
				this.text = "Check your connection";
				this.color = "error";
				this.snackbar = true;
			}
		},
		async userLogin() {
			try {
				await this.$auth
					.loginWith("local", { data: this.userInfo })
					.then(res => {
						this.$i18n.setLocale(this.$auth.user.lang).then(_ => {
							this.$router.push(this.$t("loginForm.link"));
						});
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
		if (this.$auth.loggedIn) this.$router.push(this.$t("loginForm.link"));
	},
	mounted() {
		const signUpButton = document.getElementById("signUp"),
			signInButton = document.getElementById("signIn"),
			signIn2 = document.getElementById("signIn2"),
			signUp2 = document.getElementById("signUp2"),
			container = document.getElementById("container");

		if (
			this.$route.name == "index___en" ||
			this.$route.name == "index___sv" ||
			this.$route.name == "login___en" ||
			this.$route.name == "login___sv"
		)
			container.classList.remove("right-panel-active");
		else container.classList.add("right-panel-active");

		if (signIn2)
			signIn2.addEventListener("click", () => {
				container.scrollTo(0, 0);
				container.classList.remove("right-panel-active");
			});

		if (signUp2)
			signUp2.addEventListener("click", () => {
				container.classList.add("right-panel-active");
				this.signedUp = false;
			});

		if (signUpButton)
			signUpButton.addEventListener("click", () => {
				container.classList.add("right-panel-active");
				this.signedUp = false;
			});

		if (signInButton)
			signInButton.addEventListener("click", () => {
				container.scrollTo(0, 0);
				container.classList.remove("right-panel-active");
			});
	}
};
</script>


<style scoped>
.body {
	background-image: url("~assets/loginImage.jpg");
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;

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

.overlay img {
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
