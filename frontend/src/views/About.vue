<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="px-10 py-16">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="order-1">
                <img :src="gpsPhoto" alt="" class="w-3/4 md:w-[200px] md:h-[200px] mx-auto mb-5 md:mb-0 rounded-xl">
            </div>
            <div class="order-2">
                <h1 class="font-bold text-4xl mb-5">{{translatedValues.developmentTeam}}</h1>
                <div class="mb-5">
                    <h2 class="font-bold text-2xl mb-3">{{translatedValues.coordinator}}</h2>
                    <p>Prof. Dr. Ing. Nicolae Ionescu</p>
                </div>
                <div>
                    <h2 class="font-bold text-2xl mb-3">{{translatedValues.students}}</h2>
                    <p>Gabriela Bucur</p>
                    <p>Andrei-Nicolae Drîmbă</p>
                    <p>Ing. Tănase Alexandru</p>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="px-10 py-16 bg-gradient-to-r from-green-500 to-green-300">
    <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="order-1 md:order-2">
                <img :src="projectPhoto" alt="" class="w-4/4 md:w-[300px] md:h-[300px] mx-auto rounded-xl mb-5 md:mb-0">
            </div>
            <div class="order-2 md:order-1 text-white">
                <h1 class="font-bold text-4xl mb-5">{{translatedValues.aboutProject}}</h1>
                <p class="text-justify text-xl">{{ translatedValues.description }}</p>
            </div>
        </div>
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
		title: t("about.Title"),
		developmentTeam: t("about.DevelopmentTeam"),
		coordinator: t("about.Coordinator"),
		students: t("about.Students"),
		aboutProject: t("about.AboutProject"),
		description: t("about.Description") 
	};
});

const getImageURL = (name, extension) => {
	return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
};

const gpsPhoto = getImageURL("team","png");
const projectPhoto = getImageURL("gps","jpeg");

</script>
