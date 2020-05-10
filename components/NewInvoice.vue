<template>
	<v-layout>
		<v-row>
			<v-col cols="12">
				<h1>Skapa en faktura</h1>
			</v-col>

			<!-- Start Customer -->
			<v-col cols="12">
				<!-- <div class="overline mb-4">Your customer:</div> -->
				<v-card outlined class="pa-3">
					<h3 class="text--primary pb-3">Customer:</h3>
					<customerSection />
				</v-card>
			</v-col>
			<!-- End Customer -->

			<!-- Start Product -->
			<v-col cols="12">
				<!-- <div class="overline mb-4">Articles :</div> -->
				<v-card outlined class="pa-5">
					<h3 class="mb-3">Items/services:</h3>
					<!-- <v-divider class="mb-4"></v-divider> -->
					<!-- Start Add row MODAL -->

					<v-dialog v-model="dialog" persistent scrollable max-width="600px">
						<!-- Start Open Dialog button -->
						<template v-slot:activator="{ on }">
							<div style="border: 1px dashed #aaa;" class="pa-3 mt-3">
								<v-btn dark v-on="on">Add new row</v-btn>

								<!-- Start Add Text -->
								<v-dialog v-model="addTextDialog" v-if="!hideAddText" width="500">
									<template v-slot:activator="{ on }">
										<v-btn color="red lighten-2" dark v-on="on">Add text</v-btn>
									</template>

									<v-card>
										<v-card-title class="headline grey lighten-2" primary-title>Add new row</v-card-title>

										<v-card-text>
											<v-row>
												<v-col cols="12">
													<v-textarea outlined name="add-text" label="Description" v-model="addTextVal"></v-textarea>
												</v-col>
											</v-row>
										</v-card-text>

										<v-divider></v-divider>

										<v-card-actions>
											<v-btn color="error" v-if="edit" @click="deleteText">Delet</v-btn>
											<v-btn @click="addTextDialog = false">Close</v-btn>
											<v-spacer></v-spacer>
											<v-btn color="primary" text @click="addText()">Add to invoice</v-btn>
										</v-card-actions>
									</v-card>
								</v-dialog>
								<!-- End Add Text -->
							</div>
						</template>
						<!-- End Open Dialog button -->

						<v-card>
							<!-- Start Modal Title -->
							<v-card-title>
								<span class="headline">Add new row</span>
							</v-card-title>
							<!-- End Modal Title -->

							<!-- Start Modal Body -->
							<v-card-text>
								<v-container>
									<!-- Start Existing Modal -->
									<v-row v-if="!createNewModal">
										<v-col cols="12">
											<v-row>
												<!-- Start Autocomplete -->
												<v-col>
													<v-autocomplete
														v-model="selection_value"
														:items="articles"
														@change="setQuantity"
														clearable
														dense
														color="blue-grey lighten-2"
														label="Description"
														item-text="artikelnamn"
														:return-object="true"
													>
														<!-- Start The Selected Value -->
														<template v-slot:selection="data" class="pa-8">
															<span class="black--text">{{ data.item.artikelnamn }}</span>
														</template>
														<!-- End The Selected Value -->

														<!-- Start The Create New Button in the autocomplete -->
														<template v-slot:prepend-item>
															<v-btn class="m-2" outlined large block @click="createNewModalfn">+ Create new</v-btn>
														</template>
														<!-- End The Create New Button in the autocomplete -->

														<!-- Start if No data -->
														<template v-slot:no-data>
															<p class="grey--text mx-2">No DATA</p>
														</template>
														<!-- End if No data -->

														<!-- Start the options -->
														<template v-slot:item="data">
															<template v-if="typeof data.item !== 'object'">
																<span>{{ data.item }}</span>
															</template>

															<template v-else>
																<!-- satrt An option -->
																<div class="d-flex justify-space-between align-center" style="width: 100%">
																	<p class="black--text">{{ data.item.artikelnamn }}</p>
																	<small class="grey--text">
																		<i>pris_enhet:</i>
																		{{ data.item.pris_enhet }}
																	</small>
																</div>
																<!-- end An option -->
															</template>
														</template>
														<!-- Start the options -->
													</v-autocomplete>
												</v-col>
												<!-- End Autocomplete -->

												<!-- Start Edit more -->
												<v-col v-if="selection_value != null" cols="12" md="3">
													<v-btn @click="createNewModal = true">Edit more</v-btn>
												</v-col>
												<!-- End Edit more -->
											</v-row>
										</v-col>

										<!-- Start Standard Edit -->
										<v-row v-if="selection_value != null">
											<!-- Strat Quantity -->
											<v-col cols="12" sm="6">
												<v-text-field
													v-model="selection_value.Quantity"
													:value="selection_value.Quantity"
													:suffix="selection_value.unit"
													label="Quantity"
													type="number"
													dense
												></v-text-field>
											</v-col>
											<!-- End Quantity -->

											<!-- Strat Price / unit ex VAT -->
											<v-col cols="12" sm="6">
												<v-text-field
													v-model="selection_value.pris_enhet"
													:value="selection_value.pris_enhet"
													label="Price / unit ex VAT"
													type="number"
													dense
												></v-text-field>
											</v-col>
											<!-- End Price / unit ex VAT -->

											<!-- Strat Amount ex VAT -->
											<v-col cols="12">
												<p class="font-weight-black">Amount ex VAT</p>
												<p
													class="font-weight-medium"
												>{{ (selection_value.pris_enhet * selection_value.Quantity) || "0,00" }} Kr</p>
											</v-col>
											<!-- End Amount ex VAT -->
										</v-row>
										<!-- End Standard Edit -->

										<v-btn
											class="m-2 text-left"
											v-if="selection_value == null"
											text
											large
											@click="createNewModalfn"
										>+ Create new</v-btn>
									</v-row>
									<!-- Start Existing Modal -->

									<!-- Start Create new item modal -->
									<v-row v-else>
										<!-- Strat Description -->
										<v-col cols="12">
											<v-text-field dense v-model="selection_value.artikelnamn" label="artikelnamn"></v-text-field>
										</v-col>
										<!-- End Description -->

										<!-- Strat Quantity -->
										<v-col cols="12" sm="6">
											<v-text-field type="number" dense v-model="selection_value.Quantity" label="Quantity"></v-text-field>
										</v-col>
										<!-- End Quantity -->

										<!-- Strat Unit -->
										<v-col class="d-flex" cols="12" sm="6">
											<!-- TODO: Add UNIT HERE enhet-->
											<v-select
												v-model="selection_value.produktkod"
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
											>{{ selection_value.pris_enhet * selection_value.Quantity || "0,00" }} Kr</p>
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
							<!-- End Modal Body -->

							<!-- Start Modal Footer -->
							<v-card-actions class="gray">
								<!-- Start For Add New Customar  -->
								<div>
									<v-btn class="mt-2" @click="resetModal">Cancel</v-btn>
									<v-btn
										class="mt-2 d-block d-sm-inline"
										@click="saveAsItem"
										:disabled="saveAsItemBtnState"
									>Save as item</v-btn>
								</div>
								<v-spacer></v-spacer>
								<div>
									<v-btn
										class="mt-2"
										:disabled="!(!!selection_value)"
										@click="addToInvoice"
										color="success"
									>Add to invoice</v-btn>
								</div>
								<!-- End For Add New Customar  -->
							</v-card-actions>
							<!-- End Modal Footer -->
						</v-card>
					</v-dialog>
					<!-- End Add row MODAL -->

					<!-- Start Draggable -->
					<v-row>
						<!-- Start Draggable header -->
						<v-col cols="12" v-if="draggableItems.length > 0">
							<v-row>
								<v-col cols="4" md="4">
									<span class="item" style="padding-left: 15px">artikelnamn</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">moms</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">Quantity</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">Unit price</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">Total (ex tax)</span>
								</v-col>
							</v-row>
						</v-col>
						<!-- End Draggable header -->

						<!-- Start Draggable Content -->
						<draggable
							v-model="draggableItems"
							v-bind="dragOptions"
							ghost-class="ghost"
							@end="onEnd"
							class="items"
						>
							<transition-group type="transition" :name="!drag ? 'flip-list' : null">
								<div
									@click.stop="editDraggable(element)"
									class="sortable mx-3"
									:id="index"
									v-for="(element, index) in draggableItems"
									:key="`${index}-${element.artikelnamn}`"
								>
									<v-row>
										<v-col cols="4">
											<v-btn icon>
												<v-icon>mdi-menu</v-icon>
											</v-btn>
											<strong class="item">{{ element.artikelnamn }}</strong>
										</v-col>
										<v-col cols="2" md="2">
											<span class="item">{{ element.moms }}</span>
										</v-col>
										<v-col cols="2" md="2">
											<span class="item">{{ element.Quantity }}</span>
										</v-col>
										<v-col cols="2" md="2">
											<span class="item" v-if="!element.text">{{ element.pris_enhet }} Kr</span>
											<span class="item" v-if="element.text"></span>
										</v-col>
										<v-col cols="2" md="2">
											<span class="item" v-if="!element.text">{{ element.total }} Kr</span>
											<span class="item" v-if="element.text"></span>

										</v-col>
									</v-row>
								</div>
							</transition-group>
						</draggable>
						<!-- End Draggable Content -->

						<v-dialog v-model="editDraggableDialog" max-width="600px">
							<v-card>
								<v-card-title class="headline">Edit product</v-card-title>

								<!-- Start Modal Body -->
								<v-card-text>
									<v-container>
										<!-- Start Existing Modal -->

										<!-- Start Create new item modal -->
										<v-row v-if="selection_value">
											<!-- Strat Description -->
											<v-col cols="12">
												<v-text-field dense v-model="selection_value.artikelnamn" label="artikelnamn"></v-text-field>
											</v-col>
											<!-- End Description -->

											<!-- Strat Quantity -->
											<v-col cols="12" sm="6">
												<v-text-field type="number" dense v-model="selection_value.Quantity" label="Quantity"></v-text-field>
											</v-col>
											<!-- End Quantity -->

											<!-- Strat Unit -->
											<v-col class="d-flex" cols="12" sm="6">
												<!-- TODO: Add UNIT HERE enhet-->
												<v-select
													v-model="selection_value.produktkod"
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
												>{{ selection_value.pris_enhet * selection_value.Quantity || "0,00" }} Kr</p>
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
								<!-- End Modal Body -->
								<v-card-actions>
									<!-- Start For Edit Customar  -->

									<div>
										<v-btn class="mt-2" color="error" @click="Delete">Delete</v-btn>
										<v-btn class="mt-2" @click="resetDraggableModal">Cancel</v-btn>
										<v-btn
											class="mt-2 d-block d-sm-inline"
											@click="saveAsItem"
											:disabled="saveAsItemBtnState"
										>Save as item</v-btn>
									</div>
									<v-spacer></v-spacer>

									<div>
										<v-btn class="mt-2" @click="update" color="success">Update</v-btn>
									</div>
									<!-- End For Edit Customar  -->
								</v-card-actions>
							</v-card>
						</v-dialog>

						<!-- Start Draggable Footer -->
						<v-col cols="12" class="flex-wrap" v-if="draggableItems.length > 0">
							<v-row>
								<v-col class="align-center d-flex">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">Total sum to pay</p>
										<b>{{ calculations.RoundedSumState ? Math.round(calculations.totalSumToPay.toFixed(2)) : calculations.totalSumToPay.toFixed(2) }} kr</b>
									</div>
									<v-divider class="mx-4" vertical></v-divider>
								</v-col>

								<v-col class="align-center d-flex">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">Amount ex VAT</p>
										<b>{{ calculations.amountExVAT.toFixed(2) }} kr</b>
									</div>
								</v-col>

								<!-- Add VAT Calculation here -->
								<v-col class="align-center d-flex" v-if="calculations.vat6 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">VAT 6%</p>
										<b>{{ calculations.vat6.toFixed(2) }} Kr</b>
									</div>
								</v-col>

								<v-col class="align-center d-flex" v-if="calculations.vat12 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">VAT 12%</p>
										<b>{{ calculations.vat12.toFixed(2) }} Kr</b>
									</div>
								</v-col>

								<v-col class="align-center d-flex" v-if="calculations.vat25 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">VAT 25%</p>
										<b>{{ calculations.vat25.toFixed(2) }} Kr</b>
									</div>
								</v-col>
								<!-- Add VAT Calculation here -->

								<v-col class="align-center d-flex">
									<div class>
										<p class="my-0 py-0 caption">Enable rounded sum</p>
										<v-switch class="ma-0 pa-0" v-model="calculations.RoundedSumState" inset></v-switch>
									</div>
								</v-col>

								<v-col v-if="calculations.RoundedSumState" class="align-center d-flex">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">Rounded sum</p>
										<b>{{ calculations.RoundedSum.toFixed(2) }} kr</b>
									</div>
								</v-col>
							</v-row>
						</v-col>
						<!-- End Draggable Footer -->
					</v-row>
					<!-- End Draggable -->
				</v-card>
			</v-col>
			<!-- End Product -->
			<termSection />

			<dividerySection :calculations="calculations" :draggableItems="draggableItems" />
		</v-row>
	</v-layout>
</template>
<script>
import draggable from "vuedraggable";
import customerSection from "@/components/invoiceCustomerSection";
import dividerySection from "@/components/invoiceDeliveryMethods";
import termSection from "@/components/invoiceTermSection";

import ArticleModal from "@/components/ArticleModal";

import { mapState } from "vuex";

export default {
	data: vm => ({
		drag: false,
		createNewModal: false,
		dialog: false,
		articles: [],
		selection_value: null,
		addTextDialog: false,
		addTextVal: null,
		hideAddText: false,
		/** Selection Options */
		Vat: ["0%", "6%", "12%", "25%"],
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
		draggableItems: [],
		editDraggableDialog: false,
		checkbox: false,
		checkBoxLabel: "Eligible as a Rot/Rut deduction ",
		/** End Selection Options */
		edit: false,
		indexBedoreEdit: null,
		/** draggable Footer calculations */
		calculations: {
			vat6: 0,
			vat12: 0,
			vat25: 0,
			totalSumToPay: 0,
			amountExVAT: 0,
			RoundedSumState: false,
			RoundedSum: 0
		},

		oldIndex: "",
		newIndex: ""
	}),
	components: {
		customerSection,
		termSection,
		ArticleModal,
		dividerySection,
		draggable
	},
	props: ["draft"],
	computed: {
		dragOptions() {
			return {
				animation: 200,
				group: "description",
				disabled: false,
				ghostClass: "ghost"
			};
		},

		saveAsItemBtnState() {
			if (this.selection_value && this.createNewModal == true)
				return (
					typeof this.selection_value.artikelnamn == "object" ||
					typeof this.selection_value.pris_enhet == "object" ||
					typeof this.selection_value.moms == "object" ||
					typeof this.selection_value.typ == "object"
				);
			else return true;
		},
		slection() {
			return this.selection_value.unit;
		},
		...mapState(["customer", "invoice"])
	},

	created() {
		this.getArticles();

		if (!!this.draft) {
			// console.log(this.$route.params.id)

			this.selection_value = this.draft;
		}
	},

	methods: {
		sort() {
			this.list = this.list.sort((a, b) => a.order - b.order);
		},
		resetDraggableModal() {
			this.editDraggableDialog = false;
			this.edit = false;
			this.createNewModal = false;

			this.selection_value = null;
		},
		resetModal() {
			this.dialog = false;
			this.edit = false;
			this.createNewModal = false;

			this.selection_value = null;
		},
		createNewModalfn() {
			this.createNewModal = true;
			this.selection_value = {
				artikelnamn: null,
				produktkod: null,
				pris_enhet: null,
				moms: null,
				typ: null,

				Quantity: 1,
				rotRutType: null,
				materialType: null
			};
		},
		changeCheckBoxLabel() {
			this.checkBoxLabel = "Eligible as a Rot/Rut " + this.selection_value.typ;
			this.selection_value.materialType = null;
		},
		setQuantity() {
			if (this.selection_value) this.selection_value.Quantity = 1;
		},
		addToInvoice() {
			let rows = this.draggableItems;
			var clonedObj = Object.assign({}, this.selection_value);
			this.selection_value = null;

			if (this.editedIndex > -1) {
				clonedObj.id = 0;
				Object.assign(rows[this.editedIndex], clonedObj);
				this.doCalculations(rows);
			} else {
				clonedObj.id = rows.length;
				clonedObj.total = clonedObj.Quantity * clonedObj.pris_enhet;

				rows.push(clonedObj);

				// pass a function to map
				this.doCalculations(rows);
			}
			this.resetModal();
		},
		async saveAsItem() {
			await this.$axios.setToken(this.$auth.getToken("local"));

			let x = this.selection_value.moms.slice(
				0,
				this.selection_value.moms.length - 1
			);
			await this.$axios
				.$post("/articlepatterns", {
					artikelnamn: this.selection_value.artikelnamn,
					produktkod: this.selection_value.produktkod,
					pris_enhet: Number(this.selection_value.pris_enhet),
					moms: x,
					typ: this.selection_value.typ
				})
				.then(res => {
					this.getArticles();
					this.resetModal();

					console.log("save res", res);
				})
				.catch(err => console.log(err));
		},
		Delete() {
			let index = this.draggableItems.findIndex(
				i => i.id === this.selection_value.id
			);
			this.draggableItems.splice(index, 1);

			this.resetDraggableModal();
			this.doCalculations(this.draggableItems);
		},
		update() {
			var clonedObj = Object.assign({}, this.selection_value);
			this.selection_value = null;

			clonedObj.total = clonedObj.Quantity * clonedObj.pris_enhet;

			let index = this.draggableItems.findIndex(i => i._id === clonedObj._id);
			if (index > -1) {
				Object.assign(this.draggableItems[index], clonedObj);
				this.resetDraggableModal();
				this.doCalculations(this.draggableItems);
			} else {
				console.log(index);
			}
		},
		deleteText() {
			let index = this.draggableItems.findIndex(i => i.text == true);
			this.draggableItems.splice(index, 1);
			this.addTextDialog = false;
			this.hideAddText = false;
			this.edit = false;
			this.addTextVal = null
		},
		addText() {
			this.selection_value = {
				artikelnamn: this.addTextVal,
				text: true
			};

			if (this.edit) {
				let index = this.draggableItems.findIndex(i => i.text == true);
				if (index > -1) {
					Object.assign(this.draggableItems[index], this.selection_value);
					this.addTextDialog = false;
					this.hideAddText = true;
				} else {
					console.log(index);
				}
			} else {
				this.addToInvoice();
				this.addTextDialog = false;
				this.hideAddText = true;
			}
		},
		async getArticles() {
			await this.$axios.setToken(this.$auth.getToken("local"));

			await this.$axios
				.$get("/articlepatterns")
				.then(res => {
					this.articles = res;
				})
				.catch(err => console.log(err));
		},
		editDraggable(element) {
			if (element.text) {
				this.addTextDialog = true;
				this.hideAddText = false;
				this.edit = true;
			} else {
				this.editDraggableDialog = true;

				this.selection_value = Object.assign({}, this.selection_value, element);
				this.edit = true;
				this.indexBedoreEdit = this.draggableItems.indexOf(
					this.selection_value
				);
			}
		},

		RoundTotalSum() {
			if (calcs.RoundedSumState)
				calcs.totalSumToPay = Math.round(calcs.totalSumToPay);
		},
		doCalculations(arr) {
			let calcs = this.calculations;
			calcs.amountExVAT = 0;
			calcs.vat6 = 0;
			calcs.vat12 = 0;
			calcs.vat25 = 0;
			calcs.totalSumToPay = 0;
			calcs.RoundedSum = 0;

			arr.map(x => {
				/** Ex Vat Calc */
				calcs.amountExVAT += Number(x.total);

				if (x.moms == "6%") calcs.vat6 += 0.6 * Number(x.total);
				else if (x.moms == "12%") calcs.vat12 += 0.12 * Number(x.total);
				else if (x.moms == "25%") calcs.vat25 += 0.25 * Number(x.total);

				calcs.totalSumToPay =
					calcs.amountExVAT + calcs.vat6 + calcs.vat12 + calcs.vat25;
				calcs.RoundedSum =
					Math.round(calcs.totalSumToPay) - calcs.totalSumToPay;
			});

			if (isNaN(calcs.RoundedSum)) calcs.RoundedSum = 0;
			if (isNaN(calcs.totalSumToPay)) calcs.totalSumToPay = 0;
			if (isNaN(calcs.amountExVAT)) calcs.amountExVAT = 0;
		},

		onEnd: function(evt) {
			console.log(evt);
			this.oldIndex = evt.oldIndex;
			this.newIndex = evt.newIndex;
		}
	},
	head() {
		return {
			script: [
				{
					src:
						"https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js",
					async: true,
					defer: true
				},
				{
					src: "https://unpkg.com/jspdf-autotable@2.3.2",
					async: true,
					defer: true
				}
			]
		};
	}
};
</script>
<style scoped>
.gray {
	background-color: #f5f7f9;
	padding-top: 30px;
}
.sortable {
	display: block;
	width: 100%;
	border: 1px solid #e1e5e8;
	cursor: pointer;
	color: rgb(54, 64, 107);
}
.items {
	width: 100%;
}
.item {
	font-size: 0.8rem;
}

.flip-list-move {
	transition: transform 0.5s;
}
.no-move {
	transition: transform 0s;
}
.ghost {
	opacity: 0.5;
	background: #c8ebfb;
}
.list-group {
	min-height: 20px;
}
.list-group-item {
	cursor: move;
}
.list-group-item i {
	cursor: pointer;
}
</style>
