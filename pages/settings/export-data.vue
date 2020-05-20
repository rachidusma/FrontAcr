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
				<h2 class="d-inline-block">Export data</h2>
			</v-col>

			<v-col cols="12">
				<v-card class="mx-auto py-4" tile outlined>
					<v-card-title>Invoices</v-card-title>
					<v-card-text>
						<v-btn outlined>Export All customers</v-btn>
						<v-btn outlined>Export All Invoices</v-btn>
						<v-btn outlined>Export All Items</v-btn>
					</v-card-text>
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
				{ text: "Export data", disabled: true }
			]
		};
	}
};
</script>

<style>
</style>