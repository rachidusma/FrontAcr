<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<h2 class="d-inline-block">{{$t('changePassword.forgetTitle')}}</h2>
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
											:label="$t('changePassword.card.newPass')"
											outlined
											dense
											:hint="newPasswordHint"
											counter
											@input="checkValid"
											required
											@click:append-outer="showNewPassword = !showNewPassword"
										/>

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
										:label="$t('changePassword.card.confNew')"
										outlined
										dense
										:hint="ConfirmPasswordHint"
										counter
										required
										class="mt-3"
										@click:append-outer="showConfirmPassword = !showConfirmPassword"
									/>
									<v-btn color="success" @click="changePassword" :disabled="!valid">{{ $t('save') }}</v-btn>
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
				required: value => !!value || this.$t('hints.required'),
				min: v => v.length >= 8 || this.$t('hints.min'),
				passwordMatch: v => v == this.newPassword
			},
			color: "grey",

			newPassword: "",
			confirmPassword: "",
			newPasswordHint: this.$t('hints.min'),
			ConfirmPasswordHint: this.$t('hints.again'),

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
				this.newPasswordHint = this.$t('hints.short');
			} else if (length >= 4 && length < 8) {
				this.color = "#f7c223";
				this.valid = false;
				this.newPasswordHint = this.$t('hints.short');
			} else if (length >= 8 && length < 12) {
				this.color = "#28cdaa";
				this.valid = false;
				this.newPasswordHint = this.$t('hints.good');
			} else if (length >= 12) {
				this.color = "#28cdaa";
				this.valid = false;
				this.newPasswordHint = this.$t('hints.perfect');
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
