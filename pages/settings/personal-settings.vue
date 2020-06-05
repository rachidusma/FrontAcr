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
				<h2 class="d-inline-block">{{ $t('personalSettings.title') }}</h2>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-container>
							<v-text-field :value="user.email" outlined dense :label="$t('email')" disabled></v-text-field>

							<v-text-field v-model="user.name" outlined dense :label="$t('personalSettings.card.fname')" required></v-text-field>
							<v-text-field v-model="user.lastname" outlined dense :label="$t('personalSettings.card.lname')" required></v-text-field>
							<v-text-field v-model="user.telnumber" outlined dense :label="$t('personalSettings.card.tel')" required></v-text-field>

							<v-btn color="success" @click="editUser">{{ $t('save') }}</v-btn>
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
			breadcrumbItems: this.$t("personalSettings.breadcrumbItems"),
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
					await this.$auth.fetchUser();
					this.$router.push(this.$t("personalSettings.link"));
				});
		}
	}
};
</script>
