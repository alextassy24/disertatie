<template>
	<div class="mt-28">
	  <Hero :title="translatedValues.title" />
	  <section class="px-10 py-16">
		<div v-for="(faq, index) in faqElements" :key="index" class="bg-gray-200 rounded shadow-lg my-5 p-5 w-2/4 mx-auto">
		  <div class="flex flex-row justify-between items-start cursor-pointer" @click="toggleAnswer(faqElementsShow[index])">
			<p class="font-bold text-xl mb-5">{{ faq.question }}</p>
			<i v-if="!faqElementsShow[index].show" class="fa-solid fa-chevron-down"></i>
			<i v-else class="fa-solid fa-x"></i>
		  </div>
		  <p v-if="faqElementsShow[index].show" :class="{ 'animate__animated': faqElementsShow[index].show, 'animate__slideInDown': faqElementsShow[index].show, 'animate__slideOutUp': !faqElementsShow[index].show }" class="text-gray-500 text-justify text-xl">
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
	  q1: t("faq.Q1"),
	  a1: t("faq.A1"),
	  q2: t("faq.Q2"),
	  a2: t("faq.A2"),
	  q3: t("faq.Q3"),
	  a3: t("faq.A3"),
	};
  });

  const faqElements = computed(() => [
	{
		question: translatedValues.value.q1,
		answer: translatedValues.value.a1,
	},
	{
		question: translatedValues.value.q2,
		answer: translatedValues.value.a2,
	},
	{
		question: translatedValues.value.q3,
		answer: translatedValues.value.a3,
	},
  ]);
  
const faqElementsShow = ref([
	{
		show:false,
	},
	{
		show:false,
	},
	{
		show:false,
	}
])
  const toggleAnswer = (faq) => {
	faq.show = !faq.show;
  };
  </script>
  
  