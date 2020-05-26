<template>
	<div class="small">
		<pie-chart :options="options" :chart-data="datacollection"></pie-chart>
	</div>
</template>

<script>
import PieChart from "./PieChart.js";

export default {
	components: {
		PieChart
    },
    props: ['chartData', 'chartColors', 'labels'],
	data() {
		return {
			datacollection: {},

			options: {
				responsive: true,
                // maintainAspectRatio: false
			}
		};
	},
	mounted() {
		this.fillData();
	},
	methods: {
		fillData() {
			this.datacollection = {
				labels: this.labels,

				datasets: [
					{
						data: this.chartData,
						backgroundColor: this.chartColors
					}
				]
			};
		}
	}
};
</script>

<style>
</style>
