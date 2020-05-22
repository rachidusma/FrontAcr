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
				<h2 class="d-inline-block">Personal settings</h2>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-container>
							<v-text-field :value="user.email" outlined dense label="E-mail" disabled></v-text-field>

							<v-text-field v-model="user.name" outlined dense label="First name" required></v-text-field>
							<v-text-field v-model="user.lastname" outlined dense label="Last name" required></v-text-field>
							<v-text-field v-model="user.telnumber" outlined dense label="phone" required></v-text-field>

							<v-btn color="success" @click="editUser">save</v-btn>
						</v-container>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	name: "personalSettings",
	layout: "admin",
	middleware: "auth",

	data() {
		return {
			breadcrumbItems: [
				{ text: "Settings", disabled: false, href: "/settings" },
				{ text: "Personal settings", disabled: true }
			],
			valid: true,
			user: {
				name: "",
				lastname: "",
				telnumbers: null
			}
		};	
	},
	mounted() {
		Object.assign(this.user, this.$auth.user);
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		},
		async editUser() {
			console.log(this.user);
			await this.$axios
				.$patch(`/users/${this.user._id}`, this.user)
				.then(async res => {
					await this.$auth.fetchUser()
					this.$router.push("/invoices");

				});
		},
	}
};
</script>

<style scoped>
</style>