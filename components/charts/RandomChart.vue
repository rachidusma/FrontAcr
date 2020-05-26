<template>
	<div class="small">
		<line-chart :options="options" :chart-data="datacollection"></line-chart>
	</div>
</template>

<script>
import LineChart from "./LineChart.js";

export default {
	components: {
		LineChart
	},
	data() {
		return {
            datacollection: null,
            labels: [],
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
		};
	},
	mounted() {

		var theMonths = new Array(
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			),
			today = new Date(),
            aMonth = today.getMonth(),
            aYear = today.getFullYear(),
			currentMonth = theMonths[aMonth];

		for (let i = 0; i < 13; i++) {
			currentMonth = theMonths[aMonth];
			console.log(`${currentMonth} ${aYear.toString().slice(2,4)}`);  

            this.labels.push(`${currentMonth} ${aYear.toString().slice(2,4)}`)
			aMonth--;
			if (aMonth > 11) {
				aMonth = 0;
			} else if(aMonth < 0) {
                aMonth = 11;
                aYear--
            }
        }
        this.labels.reverse();
		this.fillData();
        
	},
	methods: {
		fillData() {
			this.datacollection = {
				labels: this.labels,
				datasets: [
					{
						label: "Incomes",
						backgroundColor: "#2196F3",
						data: [this.getRandomInt(), this.getRandomInt(),this.getRandomInt(),this.getRandomInt(),]
					},
				]
			};
        },
        
		getRandomInt() {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
		}
	}
};
</script>

<style>

</style>
