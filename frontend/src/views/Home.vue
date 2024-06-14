<template>
	<div class="overflow-hidden mt-28">
		<!-- Hero Section -->
		<Hero
			:title="translatedValues.title"
			:subtitle="translatedValues.subtitle"
		/>
		<SideBar :items="sideBarItems" />
		<!-- Mission section -->
		<section
			ref="firstSection"
			class="container px-10 py-16 mx-auto bg-white"
		>
			<div class="container z-10 mx-auto text-justify">
				<h2 class="mb-10 text-3xl font-semibold text-center md:text-start">
					{{ translatedValues.missionTitle }}
				</h2>
				<div
					class="flex flex-col items-center gap-10 mb-20 md:mb-10 md:items-start md:justify-between md:flex-row"
				>
					<p class="text-lg md:w-2/3">
						{{ translatedValues.missionText }}
					</p>
					<router-link
						to="/about"
						class="px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 ease-in-out bg-green-500 rounded-lg hover:bg-green-700"
					>
						{{ translatedValues.missionBtn }}
					</router-link>
				</div>
				<h2 class="mb-10 text-3xl font-semibold text-center md:text-start">
					{{ translatedValues.instructionsTitle }}
				</h2>
				<div
					class="flex flex-col items-center gap-10 md:items-start md:justify-between md:flex-row"
				>
					<p class="text-lg md:w-2/3">
						{{ translatedValues.instructionsText }}
					</p>

					<router-link
						to="/docs"
						class="px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 ease-in-out bg-green-500 rounded-lg hover:bg-green-700"
					>
						{{ translatedValues.instructionsBtn }}
					</router-link>
				</div>
			</div>
		</section>

		<!-- Technology Section -->
		<section
			ref="secondSection"
			class="px-10 py-16 bg-gradient-to-r from-green-500 to-green-300"
		>
			<div class="container mx-auto text-center">
				<h2 class="mb-10 text-3xl font-semibold text-white">
					{{ translatedValues.technologyTitle }}
				</h2>
				<div class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
					<div class="p-6 bg-white rounded-lg shadow-md">
						<h3 class="mb-2 text-xl font-semibold">
							{{ translatedValues.technologyFrontend }}
						</h3>
						<ul class="pl-6 list-disc">
							<li>Vite</li>
							<li>Vue.js</li>
							<li>Vue Router</li>
							<li>Pinia</li>
							<li>Axios</li>
							<li>Tailwind CSS</li>
						</ul>
					</div>
					<div class="p-6 bg-white rounded-lg shadow-md">
						<h3 class="mb-2 text-xl font-semibold">
							{{ translatedValues.technologyBackend }}
						</h3>
						<ul class="pl-6 list-disc">
							<li>ASP.NET Core 8.0</li>
							<li>Entity Framework</li>
							<li>SignalR</li>
							<li>PostgreSQL</li>
							<li>Microsoft Azure</li>
							<li>Amazon Web Services</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Web app components section -->
		<section
			ref="thirdSection"
			class="px-10 py-16 mx-auto bg-white"
		>
			<div class="container mx-auto text-center">
				<h2 class="mb-10 text-3xl font-semibold">
					{{ translatedValues.appComponentsTitle }}
				</h2>
				<div class="flex items-center justify-center gap-3 mb-5">
					<button
						class="btn"
						:class="{ active: !switchComponents }"
						@click="switchComponents = false"
					>
						Front-end
					</button>
					<button
						class="btn"
						:class="{ active: switchComponents }"
						@click="switchComponents = true"
					>
						Back-end / Cloud
					</button>
				</div>
				<div class="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
					<div
						v-if="!switchComponents"
						v-for="component in frontendComponents"
						class="p-6 text-justify bg-gray-100 rounded-lg shadow-md card-hover animate__animated animate__fadeIn"
					>
						<ComponentCard :component="component" />
					</div>
					<div
						v-if="switchComponents"
						v-for="component in backendComponents"
						class="p-6 text-justify bg-gray-100 rounded-lg shadow-md card-hover animate__animated animate__fadeIn"
					>
						<ComponentCard :component="component" />
					</div>
				</div>
			</div>
		</section>

		<!-- Key components section -->
		<section
			ref="fourthSection"
			class="px-10 py-16 bg-gradient-to-r from-green-500 to-green-300"
		>
			<div class="container mx-auto text-center">
				<h2 class="mb-10 text-3xl font-bold text-white">
					{{ translatedValues.physicalComponentsTitle }}
				</h2>
				<div class="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
					<div
						v-for="component in keyComponents"
						class="p-6 text-justify bg-white rounded-lg shadow-xl card-hover"
					>
						<ComponentCard :component="component" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref, computed, watchEffect } from "vue";
	import { useI18n } from "vue-i18n";
	import ComponentCard from "../components/ComponentCard.vue";
	import Hero from "../components/Hero.vue";
	import SideBar from "../components/SideBar.vue";
	import { useComponentData } from "../utils/homeData.js";

	const { frontendComponents, backendComponents, keyComponents } =
		useComponentData();
	const { t } = useI18n();

	const firstSection = ref(null);
	const secondSection = ref(null);
	const thirdSection = ref(null);
	const fourthSection = ref(null);

	const translatedValues = computed(() => {
		return {
			title: t("home.Title"),
			subtitle: t("home.Subtitle"),
			missionTitle: t("home.MissionTitle"),
			missionText: t("home.MissionText"),
			missionBtn: t("home.MissionBtn"),
			instructionsTitle: t("home.InstructionsTitle"),
			instructionsText: t("home.InstructionsText"),
			instructionsBtn: t("home.InstructionsBtn"),
			technologyTitle: t("home.TechnologyTitle"),
			technologyFrontend: t("home.TechnologyFrontend"),
			technologyBackend: t("home.TechnologyBackend"),
			appComponentsTitle: t("home.AppComponentsTitle"),
			physicalComponentsTitle: t("home.PhysicalComponentsTitle"),
		};
	});

	const sideBarItems = computed(() => [
		{
			name: translatedValues.value.missionTitle,
			icon: "fa-solid fa-house-flag",
			section: firstSection,
			active: false,
		},
		{
			name: translatedValues.value.technologyTitle,
			icon: "fa-solid fa-cube",
			section: secondSection,
			active: false,
		},
		{
			name: translatedValues.value.appComponentsTitle,
			icon: "fa-solid fa-cubes",
			section: thirdSection,
			active: false,
		},
		{
			name: translatedValues.value.physicalComponentsTitle,
			icon: "fa-solid fa-microchip",
			section: fourthSection,
			active: false,
		},
	]);

	watchEffect(() => {
		sideBarItems.value.forEach((item) => {
			if (item.section.value) {
				item.section = item.section;
			}
		});
	});

	const switchComponents = ref(false);
</script>

<style scoped>
	.card-hover {
		@apply hover:ring-2 hover:ring-black transition duration-300 ease-in-out transform hover:scale-90 cursor-pointer;
	}
	.btn {
		@apply bg-black text-white py-2 shadow rounded focus:ring-green-400 hover:ring-green-400 hover:ring-4 hover:text-green-400 transition duration-500 ease-in-out transform px-5;
	}
	.active {
		@apply bg-white text-black outline outline-2 outline-black;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease-out;
	}
</style>
