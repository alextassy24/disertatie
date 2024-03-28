<template>
	<div
		class="flex flex-col items-center justify-between w-2/4 mx-auto text-red-400 md:flex-row"
	>
		<span>404</span>
		<span>{{ translatedValues.pageNotFound }}</span>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";
	const { t } = useI18n();
	const translatedValues = computed(() => {
		return {
			pageNotFound: t("utils.PageNotFound"),
		};
	});
</script>

<style scoped></style>
