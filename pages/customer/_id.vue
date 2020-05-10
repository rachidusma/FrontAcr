<template>
	<v-layout>
		<h3>{{ this.customer}}</h3>
	</v-layout>
</template>
<script>
export default {
	middleware: "auth",
	layout: "admin",

	created() {
		this.$axios
			.$get(`/customers/${this.$route.params.id}`)
			.then(res => (this.customer = res));
	},
	data() {
		return {
			customer: null
		};
	}
};
</script>