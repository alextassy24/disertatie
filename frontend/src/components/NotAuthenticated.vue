<template>
    <div class="w-2/4 p-5 m-5 mx-auto text-2xl font-bold text-center text-red-500 bg-red-200 rounded">
        {{ translatedValues.title }}
    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t } = useI18n();

const translatedValues = computed(() => {
	return {
		title: t("utils.NotAuthenticated"),
	};
});

</script>

<style scoped>

</style>