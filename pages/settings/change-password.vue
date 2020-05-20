<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs :items="breadcrumbItems">
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</v-col>

			<v-col cols="12">
				<nuxt-link to="/settings">
					<v-icon>mdi mdi-chevron-left</v-icon>
				</nuxt-link>
				<h2 class="d-inline-block">Change password</h2>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-row>
						<v-col cols="6">
							<v-form ref="form" v-model="valid" lazy-validation>
								<v-container>
									<v-text-field
										v-model="currentPassword"
										:append-outer-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
										:rules="[rules.required]"
										:type="showCurrentPassword ? 'text' : 'password'"
										label="Current password"
										outlined
										dense
										required
										hint="At least 8 characters"
										@input="saveEnable" 
                                        @click:append-outer="showCurrentPassword = !showCurrentPassword"
									></v-text-field>

									<div class="new-password">
										<v-text-field
											v-model="newPassword"
											:append-outer-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[rules.required]"
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
										:rules="[rules.passwordMatch]"
										:type="showConfirmPassword ? 'text' : 'password'"
										label="Confirm password"
										outlined
										dense
										:hint="ConfirmPasswordHint"
										counter
										@input="confirm"
										required
                                        class="mt-3"
										@click:append-outer="showConfirmPassword = !showConfirmPassword"
									></v-text-field>

									<v-btn color="success" :disabled="!valid">save</v-btn>
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
			breadcrumbItems: [
				{ text: "Settings", disabled: false, href: "/settings" },
				{ text: "Change password", disabled: true }
			],
			valid: false,
			rules: {
				required: value => !!value || "Required.",
				min: v => v.length >= 8 || "Min 8 characters",
				passwordMatch: (v) => v == this.newPassword
			},
            color: "grey",

			currentPassword: "",
			newPassword: "",
            confirmPassword: '',
			newPasswordHint: "At least 8 characters",
            ConfirmPasswordHint: 'write your new password again',

            showConfirmPassword: false,
			showCurrentPassword: false,
			showNewPassword: false
		};
	},
	methods: {
		validate() {
			this.$refs.form.validate();
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
				this.valid = true;
				this.newPasswordHint = "Accepted";
			} else if (length >= 12) {
				this.color = "#28cdaa";
				this.valid = true;
				this.newPasswordHint = "Perfect";
			}
        },
        saveEnable() {
            if (this.newPassword == '' || this.confirmPassword == '') {
                this.valid = false
            }
        },
        confirm() {
            if(this.confirmPassword == this.newPassword) {

            } 
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