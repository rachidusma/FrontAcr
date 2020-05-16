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
							<v-text-field dense label="Artikelnamn*" placeholder="Artikelnamn" outlined color="#336882"></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field dense label="Produktkod" placeholder="Produktkod" outlined color="#336882"></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								label="Pris enhet"
								placeholder="Pris enhet"
								outlined
								type="nymber"
								color="#336882"
							></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field dense label="Enhet" placeholder="Enhet" outlined type="number" color="#336882"></v-text-field>
						</v-col>

						<v-col cols="12" sm="12" md="12">
							<v-text-field
								dense
								label="Moms (%)"
								placeholder="Moms"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field dense label="typ" placeholder="typ" outlined color="#336882"></v-text-field>
						</v-col>
					</v-row>
				</v-container>
				<small>*indicates required field</small>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
				<v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
			</v-card-actions>

		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data: () => ({
		dialog: false
  }),
  props: ["item"],


};
</script>

<style>
.overline {
	color: #336882;
	font-size: 25px;
}
</style>