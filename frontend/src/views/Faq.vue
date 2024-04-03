<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="container px-10 py-16 mx-auto">
			<div
				v-for="(faq, index) in faqElements"
				:key="index"
				class="w-full p-5 mx-auto my-5 bg-gray-200 rounded shadow-lg md:w-2/4"
			>
				<div
					class="flex flex-row items-start justify-between cursor-pointer"
					@click="toggleAnswer(faqElementsShow[index])"
				>
					<p class="mb-5 text-xl font-bold">{{ faq.question }}</p>
					<i
						v-if="!faqElementsShow[index].show"
						class="fa-solid fa-chevron-down"
					></i>
					<i
						v-else
						class="fa-solid fa-x"
					></i>
				</div>
				<p
					v-if="faqElementsShow[index].show"
					class="text-xl text-justify text-gray-500 animate__animated animate__fadeIn"
				>
					{{ faq.answer }}
				</p>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref, computed } from "vue";
	import Hero from "../components/Hero.vue";
	import { useI18n } from "vue-i18n";

	const { t } = useI18n();

	const translatedValues = computed(() => {
		return {
			title: t("faq.Title"),
		};
	});

	const faqElements = computed(() => [
		{
			question: t("faq.Q1"),
			answer: t("faq.A1"),
		},
		{
			question: t("faq.Q2"),
			answer: t("faq.A2"),
		},
		{
			question: t("faq.Q3"),
			answer: t("faq.A3"),
		},
	]);

	const faqElementsShow = ref([
		{
			show: false,
		},
		{
			show: false,
		},
		{
			show: false,
		},
	]);

	const toggleAnswer = (faq) => {
		faq.show = !faq.show;
	};
</script>
