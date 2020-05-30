<template>
	<Form />
</template>

<script>
import Form from "@/components/loginForm.vue";

export default {
	components: {
		Form,
	},
	beforeMount() {
		if (this.$auth.loggedIn) this.$router.push("/invoices");
	}
};
</script>