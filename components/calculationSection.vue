<template>
  <!-- Start calculations section-->
		<v-row>
			<v-col cols="12" sm="12">
				<div class="blueSection pa-5">
					<v-row justify="center" align="center">
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Overpaid (inc VAT)</h6>
							<h6 class="display-1 text-center">{{ overpaid || 0.00 }}kr</h6>
						</v-col>

						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Overdue (inc VAT)</h6>
							<h6 class="display-1 text-center">{{ overdue || 0.00 }} kr</h6>
						</v-col>
						<v-col cols="12" sm="4">
							<h6 class="grey--text text-center subtitle-1 my-4 my-md-0">Outstanding (inc VAT)</h6>
							<h6 class="display-1 text-center">{{ outstanding || 0.00 }}  kr</h6>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
		<!-- End calculations section-->
</template>

<script>
export default {
  props: ["overpaid", "overdue", "outstanding"]   
}
</script>

<style>
.blueSection {
	display: block;
	width: 100%;
	background-color: #dceaf5;
}
</style>