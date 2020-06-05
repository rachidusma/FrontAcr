<template>
	<v-container>
		<v-row>
      <!-- Start header -->
			<v-col cols="12">
				<v-breadcrumbs :items="breadcrumbItems">
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</v-col>
      <!-- End header -->

			<v-col cols="12">
				<nuxt-link to="/settings">
					<v-icon>mdi mdi-chevron-left</v-icon>
				</nuxt-link>
				<h2 class="d-inline-block">{{ $t('invoiceSettings.title') }}</h2>
			</v-col>

			<!-- Start invoice -->
			<v-col cols="12">
				<v-card class="mx-auto py-4 d-block" tile outlined>
					<v-row>
						<v-col cols="12" md="8">
							<v-card-title>{{ $t('invoiceSettings.title') }}</v-card-title>
							<v-card-subtitle>{{ $t('invoiceSettings.subtitle') }}</v-card-subtitle>

							<v-form ref="form" v-model="invoiceValid" lazy-validation>
								<v-container>
									<!-- Start Days input -->
									<div class="d-flex align-start">
										<v-text-field
											v-model="info.dagar"
											:rules="reiquiredRules"
											outlined
											dense
											:label="$t('invoiceSettings.card.daysLabel')"
											required
										/>

										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>
											{{ $t('invoiceSettings.card.daysHint') }}
										</v-tooltip>
									</div>
									<!-- End Days input -->

									<!-- Start Interest input -->
									<div class="d-flex align-start">
										<v-text-field
											v-model="info.Interest"
											outlined
											dense
											:rules="reiquiredRules"
											:label="$t('invoiceSettings.card.intersetLabel')"
											required
										/>
										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>
											{{ $t('invoiceSettings.card.intersetHint') }}
										</v-tooltip>
									</div>
									<!-- End Interest input -->

									<!-- Start Delivery input -->
									<div class="d-flex align-start">
										<v-text-field
											v-model="info.delivery"
											:rules="reiquiredRules"
											outlined
											dense
										  :label="$t('invoiceSettings.card.deliveryLabel')"
											required
										/>
										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>
											{{ $t('invoiceSettings.card.deliveryHint') }}
										</v-tooltip>
									</div>
									<!-- End Delivery input -->

									<v-btn color="success" :disabled="!invoiceValid" @click="editUser">{{ $t('save') }}</v-btn>
								</v-container>
							</v-form>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<!-- End invoice -->
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
			invoiceValid: true,
			reiquiredRules: [v => !!v || "Must be filled in"],

			info: {
				dagar: "",
				Interest: "",
				delivery: ""
			},
			breadcrumbItems: this.$t('invoiceSettings.breadcrumbItems')
		};
	},
	methods: {
		validate() {
			this.$refs.form.validate();
		}
	}
};
</script>

<style>
</style>
