<template>
	<div class="body">
		<div class="container" id="container">

			<div class="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>

					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Sign Up</button>
					<br>
					<a id="signIn2">Already have account?</a>
				</form>
			</div>

			<div class="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>

					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<a href="#">Forgot your password?</a>
					<button>Sign In</button>
					<br>
					<a id="signUp2">Don't have account?</a>

				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
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
	</div>
</template>
<script>
export default {
	name: "login",
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
			passRules: [v => !!v || "Password is required"],
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
	},
	mounted() {
		const signUpButton = document.getElementById("signUp");
		const signInButton = document.getElementById("signIn");
		const container = document.getElementById("container");
			
			console.log(this.$route.name);
			
		if (this.$route.name == "index") {
			container.classList.remove("right-panel-active");
		} else {			
			container.classList.add("right-panel-active");
		}
		
		signIn2.addEventListener("click", () => {
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
* {
	box-sizing: border-box;
}

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

h1 {
	font-weight: bold;
	margin: 0;
}

h2 {
	text-align: center;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
}

span {
	font-size: 12px;
}

a {
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
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

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.container {
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
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

@media screen and (max-width: 600px) {

	.body {
		padding: 0 50px !important;
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
		transform: translateX(0%);
		height: 100%;
	}

	.overlay-container {
		display: none;
	}
}

.overlay {
	background: rgb(84, 140, 168);
	background: -webkit-linear-gradient(to right, #336882, rgb(84, 140, 168));
	background: linear-gradient(to right, rgb(51, 104, 130), #548ca8);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
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