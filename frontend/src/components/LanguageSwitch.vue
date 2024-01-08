<template>
	<select @change="switchLanguage" class="lang-select">
		<option
			v-for="sLocale in supportedLocales"
			:key="`locale-${sLocale}`"
			:value="sLocale"
			:selected="locale === sLocale"
		>
			{{ t(`locale.${sLocale}`) }}
		</option>
	</select>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import Trans from "@/i18n/translation";

const { t, locale } = useI18n();
const supportedLocales = Trans.supportedLocales;

const switchLanguage = async (event) => {
	const newLocale = event.target.value;
	await Trans.switchLanguage(newLocale);
};
</script>

<style scoped>
.lang-select {
	@apply p-2 transition duration-500 ease-in-out transform rounded-lg appearance-none hover:cursor-pointer focus:outline-4 focus:outline-blue-400 hover:ring-4 hover:ring-blue-400 hover:shadow-lg;
}
</style>
