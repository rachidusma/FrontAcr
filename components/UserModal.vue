<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on">create new</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="overline">Add user Profile</span>
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<v-row>
						<p class="overline">Personal informations</p>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Name*" placeholder="Customer full name" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Org-nummer"
								placeholder="YYYYMMDD-NNNN"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="VAT-nummer" placeholder="VAT-nummer" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Kundnummer"
								placeholder="Kundnummer"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-divider></v-divider>
							<h1 class="overline pt-4 pb-4">Contact informations</h1>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Postadress" placeholder="Postadress" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Postadress 2" placeholder="Postadress 2" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-text-field
								label="Postnummer"
								placeholder="Postnummer"
								outlined
								type="number"
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="6">
							<v-text-field label="stad" placeholder="stad" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Kontaktperson" placeholder="Kontaktperson" outlined color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="E-post" placeholder="E-post" type="email" outlined color="#336882"></v-text-field>
							<v-divider></v-divider>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<p class="overline">Term</p>
							<v-text-field label="Dagar*" placeholder="Dagar" outlined type="number" color="#336882"></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field
								label="Dröjsmålsränta (%)"
								placeholder="Dröjsmålsränta"
								outlined
								color="#336882"
							></v-text-field>
						</v-col>
						<v-col cols="12" sm="12" md="12">
							<v-text-field label="Country" placeholder="Country" outlined color="#336882"></v-text-field>
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
	})
};
</script>
<style>
.overline {
	color: #336882;
	font-size: 25px;
}
</style>