<template>
	<v-dialog v-model="dialog" scrollable persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">Add new</v-btn>
		</template>
		<v-card outlined>
			<v-card-title class="py-3 my-1">
				<h4 v-if="editItemId">Edit article</h4>
				<h4 v-else>Add article</h4>
				<v-spacer></v-spacer>

				<v-icon class="black--text" @click="close">mdi mdi-close</v-icon>
			</v-card-title>

			<v-divider></v-divider>
			<v-card-text class="py-2">
				<v-container>
					<v-row>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								v-model="editItem.artikelnamn"
								label="Artikelnamn*"
								placeholder="Artikelnamn"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								v-model="editItem.produktkod"
								label="Produktkod"
								placeholder="Produktkod"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								label="Pris enhet"
								placeholder="Pris enhet"
								v-model="editItem.pris_enhet"
								outlined
								type="nymber"
								color="#336882"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-select
								v-model="editItem.enhet"
								:items="Unit"
								label="Enhet"
								outlined
								dense
								color="#336882"
							></v-select>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-select v-model="editItem.moms" :items="Vat" label="Moms" outlined dense color="#336882"></v-select>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-select v-model="editItem.typ" :items="Kind" label="typ" outlined dense color="#336882"></v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions class="grey lighten-3 pa-5">
				<v-btn depressed @click="close">Close</v-btn>
				<v-spacer></v-spacer>
				<v-btn v-if="editItemId" depressed color="success" @click="updateArticle">Update</v-btn>
				<v-btn v-else color="success" depressed @click="saveArticle">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			editItem: {},
			Vat: ["0", "6", "12", "25"],
			Unit: [
				"hours",
				"pound",
				"pieces",
				"hours",
				"days",
				"months",
				"kilograms",
				"grams",
				"liters",
				"meters",
				"centimeters",
				"millimeters",
				"m²",
				"m³",
				"miles",
				"kms"
			],
			Kind: ["Goods", "services"]
		};
	},
	props: ["editItemId", "editItemObject", "edit"],
	watch: {
		editItemId(newVal) {
			Object.assign(this.editItem, this.editItemObject);
		},
		edit(val) {
			this.dialog = val;
		}
	},
	methods: {
		close() {
			this.dialog = false;
			this.editItem = {};
			this.$emit("closed");
		},
		async updateArticle() {
			await this.$axios
				.$patch(`/articlepatterns/${this.editItem._id}`, this.editItem)
				.then(res => {
					this.modalUpadted();
				})
				.catch(err => {
					console.log(err);
				});
		},
		async saveArticle() {
			await this.$axios
				.$post("/articlepatterns", this.editItem)
				.then(res => {
					this.modalUpadted();
				})
				.catch(err => {
					console.log(err);
				});
		},
		modalUpadted() {
			this.$emit("updated");
			this.editItem = {};
			this.$emit("closed");
			this.dialog = false;
		}
	}
};
</script>

<style scoped>
div.v-card div[class^='col'] {
    padding-top: 0;
    padding-bottom: 0;
}
.overline {
	color: #336882;
	font-size: 25px;
}
</style>