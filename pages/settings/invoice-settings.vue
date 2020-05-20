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
				<h2 class="d-inline-block">Invoice settings</h2>
			</v-col>

      <!-- Start invoice -->
			<v-col cols="12">
				<v-card class="mx-auto py-4 d-block" tile outlined>
					<v-row>
						<v-col cols="12" md="8">
							<v-card-title>Invoice terms</v-card-title>
							<v-card-subtitle>Set default invoice terms so that you don't have to change it individually for each new customer.</v-card-subtitle>

							<v-form ref="form" v-model="invoiceValid" lazy-validation>
								<v-container>
                  <!-- Start Days input -->
									<div class="d-flex align-start">
										<v-text-field v-model="info.dagar" :rules="reiquiredRules" outlined dense label="Days" required></v-text-field>

										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>
											Number of days before the payment is due.
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
											label="Interest on overdue payment"
											required
										></v-text-field>
										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>
											This is where you define the  interest rate added when a  payment is overdue. Remember that you must create a new invoice with the added interest  rate and send it  to your customer. Invoices with interest  rates also have to be recorded manually.
										</v-tooltip>
									</div>
                  <!-- End Interest input -->
                  
                  <!-- Start Delivery input -->
									<div class="d-flex align-start">
										<v-text-field v-model="info.delivery" :rules="reiquiredRules" outlined dense label="Delivery" required></v-text-field>
										<v-tooltip max-width="300" bottom>
											<template v-slot:activator="{ on }">
												<v-icon class="ma-2" v-on="on">mdi mdi-alert-circle</v-icon>
											</template>

											Define how the goods are delivered. Ex warehouse means that the risk is taken over by the customer as soon as the goods leave the warehouse.
										</v-tooltip>
									</div>
                  <!-- End Delivery input -->

									<v-btn color="success" :disabled="!invoiceValid" @click="editUser">save</v-btn>
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
			breadcrumbItems: [
				{ text: "Settings", disabled: false, href: "/settings" },
				{ text: "Invoice settings", disabled: true }
			]
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