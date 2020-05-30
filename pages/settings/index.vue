<template>
	
		<v-row class="flex-wrap">
			<v-col cols="12">
				<p class="py-0 my-0 black--text headline">Settings</p>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-card-title>Invoices</v-card-title>

					<v-list-item to="/settings/invoice-settings" two-line>
						<v-list-item-content>
							<v-list-item-title>Invoices</v-list-item-title>
							<v-list-item-subtitle>Set default values for invoice terms (days, interest on overdue payments, delivery terms), currency rounding, customer and invoice numbers.</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-icon >
							<v-icon>mdi mdi-chevron-right</v-icon>
						</v-list-item-icon>

					</v-list-item>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-card-title>Your account</v-card-title>

					<v-list-item :key="index" v-for="(links, index) in accountLinks" :to="links.link">
						<v-list-item-content>
							{{links.text}}
						</v-list-item-content>

						<v-list-item-icon >
							<v-icon>mdi mdi-chevron-right</v-icon>
						</v-list-item-icon>

					</v-list-item>
				</v-card>
			</v-col>
		</v-row>
	
</template>

<script>
export default {
	name: "settingsPage",
	layout: "admin",
  middleware: "auth",
  
  data() {
    return {
        accountLinks: [
          {text: "Personal settings", link:"/settings/personal-settings"},
          {text: "Change password", link:"/settings/change-password"},
        ]
    }
  },
};
</script>

<style>
</style>