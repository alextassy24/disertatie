<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />

		<section
			class="px-10 py-16 bg-gradient-to-r from-green-500 to-green-300"
		>
			<div class="container mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-2">
					<div class="order-1 md:order-2">
						<img
							:src="projectPhoto"
							alt=""
							class="w-4/4 md:w-[300px] md:h-[300px] mx-auto rounded-xl mb-5 md:mb-0"
						/>
					</div>
					<div class="order-2 text-white md:order-1">
						<h1 class="mb-5 text-4xl font-bold">
							{{ translatedValues.aboutProject }}
						</h1>
						<p class="text-xl text-justify">
							{{ translatedValues.description }}
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="px-10 py-16">
			<div class="container mx-auto">
				<h1
					class="flex items-center justify-between mb-5 text-4xl font-bold"
				>
					{{ translatedValues.projectCost }}
				</h1>
				<h1
					class="flex items-center justify-between mb-10 text-xl font-bold"
				>
					<span>
						{{ translatedValues.currentCost }}
					</span>
					<span>{{ totalCost }} RON</span>
				</h1>
				<div
					class="mb-10 overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
				>
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr class="text-white bg-black">
								<th>{{ translatedValues.itemName }}</th>
								<th>{{ translatedValues.itemCost }}(RON)</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(component, index) in hardwareComponents"
								:key="index"
								class="text-center"
							>
								<td>
									{{ component.name }}
								</td>
								<td>{{ component.price }}</td>
								<td class="py-3">
									<a
										v-if="component.link"
										:href="component.link"
										class="btn-primary"
										target="_blank"
									>
										<i class="fa-solid fa-link"></i>
										<span></span>
									</a>
									<span
										v-else
										class="cursor-not-allowed opacity-60 btn-primary"
									>
										<i class="fa-solid fa-link"></i>
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
		<section class="px-10 py-16 bg-gray-100">
			<div class="container mx-auto">
				<div class="grid grid-cols-1 md:grid-cols-2">
					<div class="order-1">
						<img
							:src="gpsPhoto"
							alt=""
							class="w-3/4 md:w-[200px] md:h-[200px] mx-auto mb-5 md:mb-0 rounded-xl"
						/>
					</div>
					<div class="order-2">
						<h1 class="mb-5 text-4xl font-bold">
							{{ translatedValues.developmentTeam }}
						</h1>
						<div class="mb-5">
							<h2 class="mb-3 text-2xl font-bold">
								{{ translatedValues.coordinator }}
							</h2>
							<p>Prof. Dr. Ing. Nicolae Ionescu</p>
						</div>
						<div>
							<h2 class="mb-3 text-2xl font-bold">
								{{ translatedValues.students }}
							</h2>
							<p>Gabriela Bucur</p>
							<p>Andrei-Nicolae Drîmbă</p>
							<p>Ing. Tănase Alexandru</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
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
			projectCost: t("about.ProjectCost"),
			itemName: t("about.ItemName"),
			itemCost: t("about.ItemCost"),
			description: t("about.Description"),
			batterySupport: t("about.BatterySupport"),
			projectCost: t("about.ProjectCost"),
			currentCost: t("about.CurrentCost"),
			totalCost: t("about.TotalCost"),
		};
	});

	const totalCost = ref(0);
	const hardwareComponents = computed(() => [
		{
			name: "Arduino UNO R3",
			price: 52.96,
			link: "https://cleste.ro/arduino-uno-r3-atmega328p.html",
		},
		{
			name: t("home.GSMTitle"),
			price: 57.46,
			link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-cu-antena.html",
		},
		{
			name: t("home.GPSTitle"),
			price: 62.06,
			link: "https://cleste.ro/modul-gps-ublox-neo-6m-cu-antena.html",
		},
		{
			name: t("home.BatteryTitle"),
			price: 38.99,
			link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
		},
		{
			name: "Vodafone SIM 8€",
			price: 53,
			link: "",
		},
		{
			name: t("about.BatterySupport"),
			price: 4.17,
			link: "https://cleste.ro/suport-baterii-18650-1-slot.html",
		},
		{
			name: "Breadboard 400",
			price: 7.1,
			link: "https://www.emag.ro/placa-test-breadboard-400-bb400/pd/D5WBP7MBM/",
		},
	]);

	onMounted(() => {
		hardwareComponents.value.forEach((component) => {
			totalCost.value += component.price;
		});

		totalCost.value = totalCost.value.toFixed(2);
	});

	const getImageURL = (name, extension) => {
		return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
	};

	const gpsPhoto = getImageURL("team", "png");
	const projectPhoto = getImageURL("gps", "jpeg");
</script>

<style scoped>
	.btn-primary {
		@apply text-white transition duration-500 ease-in-out transform bg-green-500 rounded shadow focus:ring-green-400 focus-visible:ring-green-400 focus:ring-2 hover:ring-4 hover:ring-green-400;
	}
</style>
