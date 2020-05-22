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
						<v-btn @click="exportCustomers" outlined>Export All customers</v-btn>
						<v-btn @click="exportInvoices" outlined>Export All Invoices</v-btn>
						<v-btn @click="exportItems" outlined>Export All Items</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { convert } from "@/plugins/jsexcel.js";

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
    },
    methods: {
        async exportCustomers(){
            await this.$axios.$get('/customers')
                .then(res => {
                    res.forEach(customer => {
                        delete customer.__v;
                        delete customer._id;
                    })
                    convert(res, "customers");
                })
        },
        async exportInvoices(){
            await this.$axios.$get('/invoices')
                .then(res => {                   
                    res.forEach(invoice => {
                        invoice.createdate = invoice.createdate.substr(0, 10)
                        invoice.duedate = invoice.duedate.substr(0, 10)
                        
                        delete invoice.__v;
                        delete invoice._id;
                    })
                    convert(res, "Invoices");
                })
        },
        async exportItems(){
            await this.$axios.$get('/articlepatterns')
                .then(res => {                    
                    res.forEach(article => {
                        delete article.__v;
                        delete article._id;
                    })
                    convert(res,"items");
                })
        },
    }
};
</script>

<style>
</style>