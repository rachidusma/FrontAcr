<template>
	<v-layout>
		<v-row>
			<!-- Strart page Header -->
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="breadCampItems"></v-breadcrumbs>
			</v-col>

			<v-col cols="12" md="12">
				<v-row class="pa-4">
					<h1 class="title">Articles</h1>
					<v-spacer></v-spacer>
					<ArticleModal
						@closed="reset()"
						@updated="getArticles();"
						:editItemObject="selectedItem"
						:editItemId="selectedItem._id"
						:edit="editDialogState"
					/>
				</v-row>
			</v-col>
			<!-- End page Header -->

			<v-col cols="12" md="12">
				<v-card outlined tile class="pa-5">
					<!-- Start Search bar -->
					<v-row>
						<v-spacer></v-spacer>
						<v-text-field
							v-model="search"
							outlined
							append-icon="mdi-magnify"
							label="Search"
							class="mb-4 pa-4"
							color="#336882"
						></v-text-field>
					</v-row>
					<!-- End Search bar -->

					<!-- Start Delete Item -->
					<v-dialog v-model="deleteDialog" max-width="500px">
						<v-card>
							<v-card-title>
								<h4>Delete Items</h4>
								<v-spacer></v-spacer>
								<v-icon class="black--text" @click="deleteDialog = false">mdi mdi-close</v-icon>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text class="pa-5 text-center text-primary">Are you sure you want to delete this item?</v-card-text>

							<v-card-actions class="grey lighten-3 pa-5">
								<v-btn depressed @click="deleteDialog = false">Cancel</v-btn>
								<v-spacer></v-spacer>
								<v-btn depressed color="error" @click="deleteItem">Delete</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<!-- End Delete Item -->

					<v-data-table
						:headers="headers"
						:items="articles"
						:items-per-page="5"
						class="elevation-1"
						:search="search"
					>
						<template v-slot:item.pris_enhet="{item}">{{item.pris_enhet }} kr</template>
						<!-- Start dropdown menu column -->
						<template v-slot:item.actions="{ item }">
							<v-menu>
								<template v-slot:activator="{ on }">
									<v-btn small outlined v-on="on">
										<v-icon class="font1">mdi mdi-dots-horizontal</v-icon>
									</v-btn>
								</template>
								<v-list>
									<!-- start Edit item -->
									<v-list-item @click=" getItem(item); editDialogState = true;">
										<v-list-item-title>Edit</v-list-item-title>
									</v-list-item>
									<!-- End Edit item -->

									<!-- Start delete item -->
									<v-list-item @click="deleteDialog = true; getItem(item)">
										<v-list-item-title>Delete</v-list-item-title>
									</v-list-item>
									<!-- End delete item -->
								</v-list>
							</v-menu>
						</template>
						<!-- End dropdown menu column -->

						<template v-slot:no-data>NO DATA AVILABLE</template>
					</v-data-table>
				</v-card>
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
import ArticleModal from "@/components/ArticleModal.vue";

export default {
	middleware: "auth",
	layout: "admin",
	components: {
		ArticleModal
	},

	data() {
		return {
			search: "",
			breadCampItems: [
				{ text: "Invoices", href: "/invoices" },
				{ text: "Items", disabled: true }
			],
			headers: [
				{ text: "Product code", value: "produktkod" },
				{ text: "Item name", value: "artikelnamn" },
				{ text: "VAT", value: "moms" },
				{ text: "Kind", value: "typ" },
				{ text: "Unit", value: "enhet" },
				{ text: "Price / unit ex VAT", value: "pris_enhet" },
				{ text: "", value: "actions", sortable: false }
			],
			articles: [],
			selectedItem: {},
			deleteDialog: false,
			editDialogState: false
		};
	},

	async mounted() {
		this.getArticles();
	},

	methods: {
		async getArticles() {
			try {
				await this.$axios.get("/articlepatterns/").then(res => {
					this.articles = res.data;
				});
			} catch (e) {
				console.log(e);
			}
		},
		reset() {
			console.log("lol");
			this.editDialogState = false;
			this.selectedItem = {};
		},
		getItem(item) {
			Object.assign(this.selectedItem, item);
		},
		async deleteItem() {
			try {
				this.deleteDialog = false;
				await this.$axios
					.$delete(`/articlepatterns/${this.selectedItem._id}`)
					.then(res => {
						/** Reset the selected item for the article modal */
						Object.assign(this.selectedItem, {});
						/** Get All articles */
						this.getArticles();
					});
			} catch (e) {
				console.log(e);
			}
		}
	}
};
</script>