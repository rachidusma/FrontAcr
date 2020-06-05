<template>
	<v-row class="flex-wrap">
		<v-col cols="12">
			<p class="py-0 my-0 black--text headline">Settings</p>
		</v-col>

		<v-col cols="12">
			<v-card class="mx-auto py-4" tile outlined>
				<v-card-title>{{ $t('settings.cardOne.title') }}</v-card-title>

				<v-list-item :to="$t('settings.cardOne.link')" two-line>
					<v-list-item-content>
						<v-list-item-title>{{ $t('settings.cardOne.title') }}</v-list-item-title>
						<p class="secondary-text grey--text">{{ $t('settings.cardOne.text') }}</p>
					</v-list-item-content>

					<v-list-item-icon>
						<v-icon>mdi mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-card>
		</v-col>

		<v-col cols="12">
			<v-card class="mx-auto py-4" tile outlined>
				<v-card-title>{{ $t('settings.cardTwo.title') }}</v-card-title>

				<v-list-item :key="index" v-for="(links, index) in accountLinks" :to="links.link">
					<v-list-item-content>{{links.text}}</v-list-item-content>

					<v-list-item-icon>
						<v-icon>mdi mdi-chevron-right</v-icon>
					</v-list-item-icon>
				</v-list-item>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "settingsPage",
	layout: "admin",
	middleware: "auth",

	data() {
		return {
			accountLinks: this.$t("settings.cardTwo.items")
		};
	}
};
</script>

<style>
</style>
