<template>
	<div>
		<v-dialog v-model="editDraggableDialogState" scrollable max-width="600px">
			<v-card>
				<v-card-title class="headline">
					<h4>Edit product</h4>
					<v-spacer></v-spacer>
					<v-icon class="black--text" @click="editDraggableDialogState = false">mdi mdi-close</v-icon>
				</v-card-title>
				<v-divider></v-divider>
				<!-- Start Modal Body -->
				<v-card-text>
					<v-container>
						<!-- Start Existing Modal -->

						<!-- Start Create new item modal -->
						<v-row v-if="selection_value">
							<!-- Strat Description -->
							<v-col cols="12">
								<v-text-field outlined dense v-model="selection_value.artikelnamn" label="artikelnamn"></v-text-field>
							</v-col>
							<!-- End Description -->

							<!-- Strat number -->
							<v-col cols="12" sm="6">
								<v-text-field
									type="number"
									outlined
									dense
									v-model="selection_value.number"
									label="Quantity"
								></v-text-field>
							</v-col>
							<!-- End number -->

							<!-- Strat Unit -->
							<v-col cols="12" sm="6">
								<v-select
									v-model="selection_value.enhet"
									:items="Unit"
									item-text="slection"
									item-value="slection"
									label="Unit"
									outlined
									dense
								></v-select>
							</v-col>
							<!-- Strat Unit -->

							<!-- Strat Price / unit ex VAT -->
							<v-col cols="12">
								<v-text-field
									v-model="selection_value.pris_enhet"
									dense
									outlined
									value="1"
									type="number"
									label="Price / unit ex VAT"
								></v-text-field>
							</v-col>
							<!-- End Price / unit ex VAT -->

							<!-- Strat VAT -->
							<v-col class="d-flex" cols="12" sm="6">
								<v-select
									v-model="selection_value.moms"
									:items="Vat"
									dense
									:item-text="` ${Vat} %`"
									label="VAT"
									outlined
								></v-select>
							</v-col>
							<!-- End VAT -->

							<!-- Strat Kind -->
							<v-col class="d-flex" cols="12" sm="6">
								<v-select
									v-model="selection_value.typ"
									:items="Kind"
									@change="changeCheckBoxLabel"
									label="Kind"
									outlined
									dense
								></v-select>
							</v-col>
							<!-- End Kind -->

							<!-- Strat Amount ex VAT -->
							<v-col cols="12">
								<p class="font-weight-black">Amount ex VAT</p>
								<p
									class="font-weight-medium"
								>{{ selection_value.pris_enhet * selection_value.number || "0,00" }} Kr</p>
							</v-col>
							<!-- End Amount ex VAT -->
						</v-row>
						<!-- End Create new item modal -->

						<!-- Strat Checkbox -->
						<v-row>
							<v-col v-if="selection_value!=null" cols="12">
								<v-tooltip bottom max-width="200px">
									<template v-slot:activator="{ on }">
										<v-checkbox v-model="checkbox" v-on="on" :label="checkBoxLabel"></v-checkbox>
									</template>
									Rot/Rut will be accounted for if this box is checked AND if you have activated Rot/Rut on the invoice
								</v-tooltip>

								<v-row v-if="selection_value!=null && checkbox">
									<v-col>
										<p class="header">Select type</p>
										<v-radio-group v-model="selection_value.rotRutType" row>
											<v-radio v-for="n in ['Rot', 'Rut']" :key="n" :label="n" :value="n"></v-radio>
										</v-radio-group>
									</v-col>

									<!-- Strat material Type -->
									<v-col class="d-flex" cols="12">
										<v-select
											dense
											v-if="(selection_value.typ == 'Goods')"
											v-model="selection_value.materialType"
											:items=" materialType"
											label="Type of material"
										></v-select>

										<v-select
											dense
											v-else-if="(selection_value.typ == 'services')"
											v-model="selection_value.materialType"
											:items=" serviceType"
											label="Type of service"
										></v-select>
									</v-col>
									<!-- End material Type -->
								</v-row>
							</v-col>
						</v-row>
						<!-- End Checkbox -->
					</v-container>
				</v-card-text>
				<v-divider></v-divider>

				<!-- End Modal Body -->
				<v-card-actions class="grey lighten-3 pa-5">
					<slot name="footer"></slot>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ["selection", "editDraggableDialog", "artikelnamn"],
	data() {
		return {
			editDraggableDialogState: false,
			selection_value: {},
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
			Kind: ["Goods", "services"],
			materialType: [
				"Child Services",
				"Data and IT services",
				"Removal services",
				"Clothing and textile care",
				"Personal help and care",
				"Repair of appliances",
				"Snow shoveling",
				"Cleaning",
				"Gardening"
			],
			serviceType: [
				"Child Services",
				"Data and IT services",
				"Removal services",
				"Clothing and textile care",
				"Personal help and care",
				"Repair of appliances",
				"Snow shoveling",
				"Cleaning",
				"Gardening"
			],
			checkbox: false,
			checkBoxLabel: "Eligible as a Rot/Rut deduction "
		};
	},
	watch: {
    selection_value(val) {
      this.$emit('changed', selection_value)
    },
		editDraggableDialog(val) {
			this.editDraggableDialogState = val;
		},
		artikelnamn(val) {
			Object.assign(this.selection_value, this.selection);
		}
	},
	methods: {
		changeCheckBoxLabel() {
			this.checkBoxLabel = "Eligible as a Rot/Rut " + this.selection_value.typ;
			this.selection_value.materialType = null;
		}
	}
};
</script>

<style>
</style>