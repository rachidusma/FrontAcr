<template>
	<v-dialog v-model="dialog" scrollable persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">{{ $t('articles.articleModal.title.btn') }}</v-btn>
		</template>
		<v-card outlined>
			<v-card-title class="py-3 my-1">
				<h4 v-if="editItemId">{{ $t('articles.articleModal.title.edit') }}</h4>
				<h4 v-else>{{ $t('articles.articleModal.title.add') }}</h4>
				<v-spacer />

				<v-icon class="black--text" @click="close">mdi mdi-close</v-icon>
			</v-card-title>

			<v-divider />

			<v-form ref="form" v-model="valid">
				<v-card-text class="py-2">
					<v-text-field
						dense
						v-model="editItem.artikelnamn"
						:label="$t('articles.articleModal.form.name')"
						:rules="nameRules"
						outlined
						required
						color="#336882"
					/>

					<v-text-field
						dense
						v-model="editItem.produktkod"
						:label="$t('articles.articleModal.form.code')"
						outlined
						color="#336882"
					/>

					<v-text-field
						dense
						:label="$t('articles.articleModal.form.price')"
						v-model="editItem.pris_enhet"
						outlined
						type="number"
						color="#336882"
					/>

					<v-select
						v-model="editItem.enhet"
						:items="Unit"
						:label="$t('articles.articleModal.form.unit')"
						outlined
						dense
						color="#336882"
					/>

					<v-select
						v-model="editItem.moms"
						:items="Vat"
						:label="$t('articles.articleModal.form.vat')"
						outlined
						dense
						color="#336882"
					/>

					<v-select
						required
						v-model="editItem.typ"
						:items="Kind"
						:rules="[v => !!v || 'Item is required']"
						:label="$t('articles.articleModal.form.type')"
						outlined
						dense
						color="#336882"
					/>
				</v-card-text>

				<v-card-actions class="grey lighten-3 pa-5">
					<v-btn depressed @click="close">{{ $t('cancle') }}</v-btn>
					<v-spacer />
					<v-btn
						v-if="editItemId"
						depressed
						color="success"
						:disabled="!valid"
						@click="updateArticle"
					>{{ $t('update') }}</v-btn>
					<v-btn v-else color="success" depressed :disabled="!valid" @click="saveArticle">{{$t('save')}}</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
			editItem: {},
			Vat: [0, 6, 12, 25],
			Unit: this.$t('articles.articleModal.units'),
			Kind: this.$t('articles.articleModal.kind'),
			valid: false,
			nameRules: [v => !!v || this.$t('hints.required')]
		};
	},
	mounted() {
		if (!this.editItemId) {
			this.editItem = {
				artikelnamn: null,
				produktkod: null,
				pris_enhet: 0,
				enhet: "-",
				moms: 0,
				typ: null
			};
		}
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
		validate() {
			this.$refs.form.validate();
		},
		close() {
			this.editItem = {};
			this.dialog = false;
			this.valid = false;
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
			if (!this.editItem.artikelnamn) return (this.valid = false);
			if (!this.editItem.typ) return (this.valid = false);
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
div.v-card div[class^="col"] {
	padding-top: 0;
	padding-bottom: 0;
}
.overline {
	color: #336882;
	font-size: 25px;
}
</style>
