<template>
	<v-layout>
		<v-row>
			<v-col cols="12">
				<v-breadcrumbs class="pa-0 ma-0" :items="$t('newInvoice.breadCampItems')"></v-breadcrumbs>
			</v-col>

			<!-- Start dropdown if draft -->
			<v-col cols="12" class="d-flex">
				<h1 class="d-inline-block">{{ $t('newInvoice.title') }}</h1>
				<v-spacer />
				<v-menu offset-y v-if="this.draft && !this.draft.published">
					<template v-slot:activator="{ on }">
						<v-btn outlined class="ml-2" v-on="on">
							{{ $t('more') }}
							<v-icon class="font1">mdi mdi-chevron-down</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-if="this.draft" @click="deleteDraft">{{ $t('delete') }}</v-list-item>
					</v-list>
				</v-menu>
			</v-col>
			<!-- End dropdown if draft -->

			<!-- Start Customer -->
			<v-col cols="12">
				<v-card outlined class="pa-3">
					<h3 class="text--primary pb-3">{{ $t('newInvoice.customer.title') }}</h3>
					<customerSection
						:customernameFromVuex="customer.customername"
						:customername="customerNameForCustomerSection"
					/>
				</v-card>
			</v-col>
			<!-- End Customer -->

			<!-- Start Product -->
			<v-col cols="12">
				<v-card outlined class="pa-5">
					<h3 class="mb-3">{{ $t('newInvoice.product.title') }}</h3>
					<!-- Start Add row MODAL -->

					<v-dialog v-model="dialog" persistent scrollable max-width="600px">
						<!-- Start Open Dialog button -->
						<template v-slot:activator="{ on }">
							<div style="border: 1px dashed #aaa;" class="pa-3 mt-3">
								<v-btn dark v-on="on">{{ $t('newInvoice.product.modal.newRow') }}</v-btn>

								<!-- Start Add Text -->
								<v-dialog v-model="addTextDialog" v-if="!hideAddText" width="500">
									<template v-slot:activator="{ on }">
										<v-btn color="red lighten-2" dark v-on="on">{{ $t('newInvoice.product.modal.addText') }}</v-btn>
									</template>

									<v-card>
										<v-card-title>
											<h4>{{ $t('newInvoice.product.modal.newRow') }}</h4>
											<v-spacer />
											<v-icon class="black--text" @click="addTextDialog = false">mdi mdi-close</v-icon>
										</v-card-title>

										<v-divider />
										<v-card-text>
											<v-row>
												<v-col cols="12">
													<v-textarea outlined name="add-text" label="Description" v-model="addTextVal"></v-textarea>
												</v-col>
											</v-row>
										</v-card-text>

										<v-divider />

										<v-card-actions class="grey lighten-3 pa-5">
											<v-btn color="error" v-if="edit" @click="deleteText">{{ $t('delete') }}</v-btn>
											<v-btn text @click="addTextDialog = false">Close</v-btn>
											<v-spacer />
											<v-btn
												color="primary"
												:disabled="!addTextVal"
												@click="addText()"
											>{{ $t('newInvoice.product.modal.addToInvoice') }}</v-btn>
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
								<h4>{{ $t('newInvoice.product.modal.newRow') }}</h4>
								<v-spacer />
								<v-icon class="font1" @click="resetModal">mdi mdi-close</v-icon>
							</v-card-title>
							<!-- End Modal Title -->
							<v-divider />

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
														:label="$t('newInvoice.product.modal.desc')"
														:placeholder="$t('newInvoice.product.modal.placeholder')"
														clearable
														outlined
														color="blue-grey lighten-2"
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
															<v-btn class="m-2 justify-start" large text block @click="createNewModalfn">
																<span>{{ $t('createNew') }}</span>
															</v-btn>
															<v-divider />
														</template>
														<!-- End The Create New Button in the autocomplete -->

														<!-- Start if No data -->
														<template v-slot:no-data>
															<p class="grey--text mx-2">{{ $t('noData') }}</p>
														</template>
														<!-- End if No data -->

														<!-- Start the options -->
														<template v-slot:item="data">
															<template v-if="typeof data.item !== 'object'">
																<span>{{ data.item }}</span>
															</template>

															<template v-else>
																<!-- satrt An option -->
																<div class="d-flex justify-space-between align-center pa-3" style="width: 100%">
																	<p class="black--text">{{ data.item.artikelnamn }}</p>
																	<small class="grey--text">
																		<i>{{ $t('articles.articleModal.form.price') }}:</i>
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
													<v-btn @click="createNewModal = true">{{ $t('newInvoice.product.modal.moreEdits') }}</v-btn>
												</v-col>
												<!-- End Edit more -->
											</v-row>
										</v-col>

										<!-- Start Standard Edit -->
										<v-row v-if="selection_value != null">
											<!-- Strat number -->
											<v-col cols="12" sm="6">
												<v-text-field
													outlined
													v-model="selection_value.number"
													:value="selection_value.number"
													:suffix="selection_value.enhet"
													:label="$t('newInvoice.product.modal.quantity')"
													type="number"
													dense
												/>
											</v-col>
											<!-- End number -->

											<!-- Strat Price / unit ex VAT -->
											<v-col cols="12" sm="6">
												<v-text-field
													outlined
													v-model="selection_value.pris_enhet"
													:value="selection_value.pris_enhet"
													:label="$t('articles.articleModal.form.price')"
													type="number"
													dense
												/>
											</v-col>
											<!-- End Price / unit ex VAT -->

											<!-- Strat Amount ex VAT -->
											<v-col cols="12">
												<p class="font-weight-black">{{ $t('newInvoice.product.modal.amountVAT') }}</p>
												<p
													class="font-weight-medium"
												>{{ (Number(selection_value.number) * Number(selection_value.pris_enhet) ) || "0,00" }} Kr</p>
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
										>{{ $t('createNew') }}</v-btn>
									</v-row>

									<!-- Start Existing Modal -->
									<v-form ref="form" v-else v-model="valid">
										<!-- Start Create new item modal -->
										<v-row>
											<!-- Strat Description -->
											<v-col cols="12">
												<v-text-field
													outlined
													dense
													required
													:label="$t('articles.articleModal.form.name')"
													:rules="[rules.required, rules.min]"
													v-model="selection_value.artikelnamn"
												/>
											</v-col>
											<!-- End Description -->

											<!-- Strat number -->
											<v-col cols="12" sm="6">
												<v-text-field
													outlined
													required
													:rules="[rules.required]"
													type="number"
													dense
													v-model="selection_value.number"
													:label="$t('newInvoice.product.modal.quantity')"
												/>
											</v-col>
											<!-- End number -->

											<!-- Strat Unit -->
											<v-col class="d-flex" cols="12" sm="6">
												<v-select
													v-model="selection_value.enhet"
													:items="Unit"
													item-text="slection"
													item-value="slection"
													:label="$t('articles.articleModal.form.unit')"
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
													required
													:rules="[rules.required]"
													type="number"
													:label="$t('articles.articleModal.form.price')"
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
													:label="$t('articles.articleModal.form.vat')"
													outlined
												></v-select>
											</v-col>
											<!-- End VAT -->

											<!-- Strat Kind -->
											<v-col class="d-flex" cols="12" sm="6">
												<v-select
													v-model="selection_value.typ"
													:items="Kind"
													required
													:rules="[rules.required]"
													@change="changeCheckBoxLabel"
													:label="$t('articles.articleModal.form.type')"
													outlined
													dense
												></v-select>
											</v-col>
											<!-- End Kind -->

											<!-- Strat Amount ex VAT -->
											<v-col cols="12">
												<p class="font-weight-black">{{ $t('articles.articleModal.form.amountVAT') }}</p>
												<p
													class="font-weight-medium"
												>{{ selection_value.pris_enhet * selection_value.number || "0,00" }} Kr</p>
											</v-col>
											<!-- End Amount ex VAT -->
										</v-row>
										<!-- End Create new item modal -->
									</v-form>

									<!-- Strat Checkbox -->
									<v-row>
										<v-col v-if="selection_value!=null" cols="12">
											<v-tooltip bottom max-width="200px">
												<template v-slot:activator="{ on }">
													<v-checkbox v-model="checkbox" v-on="on" :label="checkBoxLabel"></v-checkbox>
												</template>
												{{ $t('newInvoice.product.modal.checkBox.hint') }}
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
														v-if="(selection_value.typ == $t('articles.articleModal.kind[0]'))"
														v-model="selection_value.materialType"
														:items=" materialType"
														:label="$t('newInvoice.product.modal.material.typMaterialLable')"
													></v-select>

													<v-select
														dense
														v-else-if="(selection_value.typ == $t('articles.articleModal.kind[1]'))"
														v-model="selection_value.materialType"
														:items=" serviceType"
														:label="$t('newInvoice.product.modal.material.typMaterialService')"
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
							<v-divider />

							<!-- Start Modal Footer -->
							<v-card-actions class="grey lighten-3 pa-5">
								<v-row>
									<!-- Start For Add New Customar  -->
									<v-col cols="12" md="6">
										<v-btn text @click="resetModal">{{ $t('cancle') }}</v-btn>
										<v-btn
											class="mt-2 d-block d-sm-inline"
											@click="saveAsItem"
											:disabled="saveAsItemBtnState"
										>{{ $t('saveAsItem') }}</v-btn>
									</v-col>
									<v-spacer />

									<v-col class="d-flex justify-md-end" cols="12" md="6">
										<v-btn
											:disabled="!addToInvoiceBtnState"
											@click="addToInvoice"
											color="success"
										>{{ $t('newInvoice.product.modal.addToInvoice') }}</v-btn>
									</v-col>
									<!-- End For Add New Customar  -->
								</v-row>
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
									<span class="item" style="padding-left: 15px">{{ $t('newInvoice.draggable.name') }}</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">{{ $t('newInvoice.draggable.vat') }}</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">{{ $t('newInvoice.draggable.amount') }}</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">{{ $t('newInvoice.draggable.unit') }}</span>
								</v-col>
								<v-col cols="2" md="2">
									<span class="item">{{ $t('newInvoice.draggable.total') }}</span>
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
											<span class="item">{{ element.moms }}%</span>
										</v-col>
										<v-col cols="2" md="2">
											<span class="item">{{ element.number }} {{ element.enhet }}</span>
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

						<v-dialog v-model="editDraggableDialog" scrollable max-width="600px">
							<v-card>
								<v-card-title class="headline">
									<h4>{{ $t('newInvoice.draggable.editModal.title') }}</h4>
									<v-spacer />
									<v-icon class="black--text" @click="editDraggableDialog = false">mdi mdi-close</v-icon>
								</v-card-title>
								<v-divider />
								<!-- Start Modal Body -->
								<v-card-text>
									<v-container>
										<!-- Start Create new item modal -->
										<v-row v-if="selection_value">
											<!-- Strat Description -->
											<v-col cols="12">
												<v-text-field dense v-model="selection_value.artikelnamn"
                          :label="$t('articles.articleModal.form.name')"></v-text-field>
											</v-col>
											<!-- End Description -->

											<!-- Strat number -->
											<v-col cols="12" sm="6">
												<v-text-field type="number" dense v-model="selection_value.number"
                          :label="$t('newInvoice.product.modal.quantity')"></v-text-field>
											</v-col>
											<!-- End number -->

											<!-- Strat Unit -->
											<v-col cols="12" sm="6">
												<v-select
													v-model="selection_value.enhet"
													:items="Unit"
													item-text="slection"
													item-value="slection"
													:label="$t('articles.articleModal.form.unit')"
													outlined
													dense
												/>
											</v-col>
											<!-- Strat Unit -->

											<!-- Strat Price / unit ex VAT -->
											<v-col cols="12">
												<v-text-field
													v-model="selection_value.pris_enhet"
													dense
													value="1"
													type="number"
													:label="$t('articles.articleModal.form.price')"
												/>
											</v-col>
											<!-- End Price / unit ex VAT -->

											<!-- Strat VAT -->
											<v-col class="d-flex" cols="12" sm="6">
												<v-select
													v-model="selection_value.moms"
													:items="Vat"
													dense
													:item-text="` ${Vat} %`"
													:label="$t('articles.articleModal.form.vat')"
													outlined
												/>
											</v-col>
											<!-- End VAT -->

											<!-- Strat Kind -->
											<v-col class="d-flex" cols="12" sm="6">
												<v-select
													v-model="selection_value.typ"
													:items="Kind"
													@change="changeCheckBoxLabel"
													:label="$t('articles.articleModal.form.type')"
													outlined
													dense
												/>
											</v-col>
											<!-- End Kind -->

											<!-- Strat Amount ex VAT -->
											<v-col cols="12">
												<p class="font-weight-black">{{ $t('newInvoice.product.modal.amountVAT') }}</p>
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
														<v-checkbox v-model="checkbox" v-on="on" :label="checkBoxLabel"/>
													</template>
													{{ $t('newInvoice.product.modal.checkBox.hint') }}
												</v-tooltip>

												<v-row v-if="selection_value!=null && checkbox">
													<v-col>
														<p class="header">{{ $t('newInvoice.draggable.editModal.selectType') }}</p>
														<v-radio-group v-model="selection_value.rotRutType" row>
															<v-radio v-for="n in ['Rot', 'Rut']" :key="n" :label="n" :value="n" />
														</v-radio-group>
													</v-col>

													<!-- Strat material Type -->
													<v-col class="d-flex" cols="12">
														<v-select
															dense
															v-if="(selection_value.typ == 'Goods')"
															v-model="selection_value.materialType"
															:items=" materialType"
															:label="$t('newInvoice.product.modal.material.typMaterialLable')"
														/>

														<v-select
															dense
															v-else-if="(selection_value.typ == 'services')"
															v-model="selection_value.materialType"
															:items=" serviceType"
															:label="$t('newInvoice.product.modal.material.typMaterialService')"
														/>
													</v-col>
													<!-- End material Type -->
												</v-row>
											</v-col>
										</v-row>
										<!-- End Checkbox -->
									</v-container>
								</v-card-text>
								<v-divider />

								<!-- End Modal Body -->
								<v-card-actions class="grey lighten-3 pa-5">
									<!-- Start For Edit Customar  -->
									<div>
										<v-btn class="mt-2" color="error" @click="Delete">{{ $t('delete') }}</v-btn>
										<v-btn class="mt-2" text @click="resetDraggableModal">{{ $t('cancle') }}</v-btn>
										<v-btn
											class="mt-2 d-block d-sm-inline"
											@click="saveAsItem"
											:disabled="saveAsItemBtnState"
										>{{ $t('saveAsItem') }}</v-btn>
									</div>
									<v-spacer />

									<div>
										<v-btn class="mt-2" @click="update" color="success">{{ $t('update') }}</v-btn>
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
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.totalSum') }}</p>
										<b>{{ calculations.RoundedSumState ? Math.round(calculations.totalSumToPay.toFixed(2)) : calculations.totalSumToPay.toFixed(2) }} kr</b>
									</div>
									<v-divider class="mx-4" vertical></v-divider>
								</v-col>

								<v-col class="align-center d-flex">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.amountVAT') }}</p>
										<b>{{ calculations.amountExVAT.toFixed(2) }} kr</b>
									</div>
								</v-col>

								<!-- Add VAT Calculation here -->
								<v-col class="align-center d-flex" v-if="calculations.vat6 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.vat') }} 6%</p>
										<b>{{ calculations.vat6.toFixed(2) }} Kr</b>
									</div>
								</v-col>

								<v-col class="align-center d-flex" v-if="calculations.vat12 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.vat') }} 12%</p>
										<b>{{ calculations.vat12.toFixed(2) }} Kr</b>
									</div>
								</v-col>

								<v-col class="align-center d-flex" v-if="calculations.vat25 != 0">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.vat') }} 25%</p>
										<b>{{ calculations.vat25.toFixed(2) }} Kr</b>
									</div>
								</v-col>
								<!-- Add VAT Calculation here -->

								<v-col class="align-center d-flex">
									<div class>
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.enableRounded') }}</p>
										<v-switch class="ma-0 pa-0" v-model="calculations.RoundedSumState" inset></v-switch>
									</div>
								</v-col>

								<v-col v-if="calculations.RoundedSumState" class="align-center d-flex">
									<div class="d-inline-block">
										<p class="my-0 py-0 caption">{{ $t('newInvoice.draggable.footer.rounded') }}</p>
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

			<termSection :todatefromDraft="todatefromDraft" :datefromDraft="datesForTermSection" />

			<dividerySection
				:calculations="calculations"
				:draggableItems="draggableItems"
				:invoiceId="invoiceId"
				:userId="userId"
				:invoiceOcr="invoiceOcr"
				:extraInfo="addTextVal"
			/>
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
import { v1 as uuidv1 } from "uuid";

export default {
	middleware: "auth",

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
		Vat: [0, 6, 12, 25],
		Unit: vm.$t("articles.articleModal.units"),
		Kind: vm.$t("articles.articleModal.kind"),
		materialType: vm.$t("newInvoice.product.modal.material.materialType"),
		serviceType: vm.$t("newInvoice.product.modal.material.serviceType"),
		draggableItems: [],
		editDraggableDialog: false,
		rules: {
			required: value => !!value || "Required.",
			min: v => (v && v.length >= 1) || "Min 1 characters",
			passwordMatch: v => v == this.newPassword
		},
		valid: false,
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
		newIndex: "",

		/** FOR DRAFT */
		customerNameForCustomerSection: null,
		datesForTermSection: null,
		todatefromDraft: null,
		invoiceId: null,
		userId: null,
		invoiceOcr: null
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

		addToInvoiceBtnState() {
			return this.selection_value && this.valid;
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
	watch: {
		invoiceId(val) {
			this.addDraft();
		},
		userId(val) {
			this.addDraft();
		},
		draft(val) {
			this.addDraft();
		},
		datesForTermSection(val) {
			this.addDraft();
		}
	},
	beforeMount() {
		this.getArticles();
	},
	mounted() {
		if (!!this.draft) {
			this.addDraft();
		}
	},

	methods: {
		validate() {
			this.$refs.form.validate();
		},
		async addDraft() {
			this.customerNameForCustomerSection = this.draft.customername;
			this.invoiceId = this.draft._id;
			this.invoiceOcr = this.draft.ocrid;
			this.userId = this.draft.userid;
			this.datesForTermSection = new Date(this.draft.createdate)
				.toISOString()
				.substr(0, 10);
			this.todatefromDraft = new Date(this.draft.duedate)
				.toISOString()
				.substr(0, 10);

			await this.$axios
				.$get(`articles/invoice/${this.draft.ocrid}`)
				.then(res => {
					console.log("articles res => ", res);
					this.draggableItems = res;
					this.draggableItems.map(x => {
						x.total = x.number * x.pris_enhet;
					});
					this.doCalculations(this.draggableItems);
				});

			// this.selection_value = this.draft;
		},
		async deleteDraft() {
			await this.$axios
				.$delete(`/invoices/${this.$route.params.id}`)
				.then(res => this.$router.push("/invoices"))
				.catch(err => console.log(err));
		},
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
				enhet: null,
				pris_enhet: null,
				moms: null,
				typ: null,
				produktkod: null,
				number: 1,
				rotRutType: null,
				materialType: null
			};
		},
		changeCheckBoxLabel() {
			this.checkBoxLabel = "Eligible as a Rot/Rut " + this.selection_value.typ;
			this.selection_value.materialType = null;
		},
		setQuantity() {
			if (this.selection_value) {
				this.selection_value.number = 1;
				this.valid = true;
			}
		},
		addToInvoice() {
			let rows = this.draggableItems;
			var clonedObj = Object.assign({}, this.selection_value);
			this.selection_value = null;

			console.log(clonedObj);
			delete clonedObj.materialType;
			delete clonedObj.rotRutType;

			if (this.editedIndex > -1) {
				clonedObj.id = 0;
				let arr = new Array();
				clonedObj.produktkod = uuidv1(null, arr, -12).join("");

				Object.assign(rows[this.editedIndex], clonedObj);
				this.doCalculations(rows);
			} else {
				clonedObj.id = rows.length;
				let arr = new Array();
				clonedObj.produktkod = uuidv1(null, arr, -12).join("");

				clonedObj.total = clonedObj.number * clonedObj.pris_enhet;

				rows.push(clonedObj);

				// pass a function to map
				this.doCalculations(rows);
			}
			this.resetModal();
		},
		async saveAsItem() {
			await this.$axios.setToken(this.$auth.getToken("local"));

			let arr = new Array();
			await this.$axios
				.$post("/articlepatterns", {
					artikelnamn: this.selection_value.artikelnamn,
					enhet: this.selection_value.enhet,
					produktkod: uuidv1(null, arr, -12).join(""),
					pris_enhet: Number(this.selection_value.pris_enhet),
					moms: this.selection_value.moms,
					number: this.selection_value.number,
					typ: this.selection_value.typ
				})
				.then(res => {
					this.getArticles();
					this.resetModal();
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

			clonedObj.total = clonedObj.number * clonedObj.pris_enhet;

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
			this.addTextVal = null;
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
		/** do the Calculattions under the draggable
		 * @param { Array } arr
		 */
		doCalculations(arr) {
			let calcs = this.calculations;
			calcs.amountExVAT = 0;
			calcs.vat6 = 0;
			calcs.vat12 = 0;
			calcs.vat25 = 0;
			calcs.totalSumToPay = 0;
			calcs.RoundedSum = 0;

			arr.map(x => {
				if (x.text) {
					return;
				}
				console.log("x", x);

				/** Ex Vat Calc */
				calcs.amountExVAT += Number(x.total);

				if (x.moms == "6") calcs.vat6 += 0.6 * Number(x.total);
				else if (x.moms == "12") calcs.vat12 += 0.12 * Number(x.total);
				else if (x.moms == "25") calcs.vat25 += 0.25 * Number(x.total);

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
