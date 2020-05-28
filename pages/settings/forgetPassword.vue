<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<nuxt-link to="/settings">
					<v-icon>mdi mdi-chevron-left</v-icon>
				</nuxt-link>
				<h2 class="d-inline-block">Set New Password</h2>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-row justify="center">
						<v-col cols="6">
							<v-form ref="form" v-model="valid">
								<v-container>
									<div class="new-password">
										<v-text-field
											v-model="newPassword"
											:append-outer-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[rules.required, rules.min]"
											:type="showNewPassword ? 'text' : 'password'"
											label="Choose new password"
											outlined
											dense
											:hint="newPasswordHint"
											counter
											@input="checkValid"
											required
											@click:append-outer="showNewPassword = !showNewPassword"
										></v-text-field>

										<v-list-item-avatar
											:key="index"
											v-for="(shape, index) in 4"
											tile
											width="22%"
											height="10"
											:color="color"
										></v-list-item-avatar>
									</div>
									<v-text-field
										v-model="confirmPassword"
										:append-outer-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
										:rules="[rules.passwordMatch, rules.min]"
										:type="showConfirmPassword ? 'text' : 'password'"
										label="Confirm password"
										outlined
										dense
										:hint="ConfirmPasswordHint"
										counter
										required
										class="mt-3"
										@click:append-outer="showConfirmPassword = !showConfirmPassword"
									></v-text-field>
									<v-btn color="success" @click="changePassword" :disabled="!valid">save</v-btn>
								</v-container>
							</v-form>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "changePassword",
	layout: "admin",
	middleware: "auth",

	data() {
		return {
			valid: false,
			rules: {
				required: value => !!value || "Required.",
				min: v => v.length >= 8 || "Min 8 characters",
				passwordMatch: v => v == this.newPassword
			},
			color: "grey",

			newPassword: "",
			confirmPassword: "",
			newPasswordHint: "At least 8 characters",
			ConfirmPasswordHint: "write your new password again",

			showConfirmPassword: false,
			showNewPassword: false
		};
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		},

		saveEnable() {
			if (this.newPassword == "" || this.confirmPassword == "") {
				this.valid = true;
			}
		},
		checkValid() {
			let length = this.newPassword.length;
			if (length >= 1 && length < 4) {
				this.color = "#e63948";
				this.valid = false;
				this.newPasswordHint = "Too short";
			} else if (length >= 4 && length < 8) {
				this.color = "#f7c223";
				this.valid = false;
				this.newPasswordHint = "Too short";
			} else if (length >= 8 && length < 12) {
				this.color = "#28cdaa";
				this.valid = false;
				this.newPasswordHint = "Accepted";
			} else if (length >= 12) {
				this.color = "#28cdaa";
				this.valid = false;
				this.newPasswordHint = "Perfect";
			}
		},
		async changePassword() {
			await this.$axios
				.$post("/users/pass", {
					email: this.$auth.user.email,
					newpassword: this.newPassword
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style scoped>
.v-avatar.v-list-item__avatar.v-avatar--tile {
	margin: 0 !important;
	margin-right: 5px !important;
	border-radius: 10px;
}
</style>