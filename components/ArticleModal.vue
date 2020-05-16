<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">Add new</v-btn>
		</template>
		<v-card>
			<v-card-title>Add article</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<v-row>
						<p class="overline">Article informations</p>

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
							<v-text-field
								dense
								label="Enhet"
								v-model="editItem.enhet"
								placeholder="Enhet"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								label="Moms (%)"
								placeholder="Moms"
								v-model="editItem.moms"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								label="typ"
								v-model="editItem.typ"
								placeholder="typ"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>

			<v-card-actions>
				<v-btn depressed @click="close">Close</v-btn>
				<v-spacer></v-spacer>
				<v-btn v-if="editItemId" depressed color="success" @click="updateArticle">Update</v-btn>
				<v-btn v-else color="primary" depressed @click="saveArticle">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			editItem: {}
		};
	},
	props: ["editItemId", "editItemObject", "edit"],
	watch: {
		editItemId(newVal) {
			console.log("Prop changed: ", newVal);
			Object.assign(this.editItem, this.editItemObject);
		},

		edit(val) {
			console.log(val);
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
				.$patch(`/articles/${this.editItem._id}`, this.editItem)
				.then(res => {
					console.log(res);
					this.modalUpadted();
				})
				.catch(err => {
					console.log(err);
				});
		},
		async saveArticle() {
			await this.$axios
				.$post("/articles", this.editItem)
				.then(res => {
					console.log(res);
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

<style>
.overline {
	color: #336882;
	font-size: 25px;
}
</style>