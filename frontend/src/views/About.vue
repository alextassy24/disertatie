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
					class="flex flex-col mb-5 text-4xl font-bold sm:items-center sm:flex-row sm:justify-between"
				>
					<span class="mb-3 sm:mb-0">
						{{ translatedValues.projectCost }}
					</span>
					<span>{{ totalCost }} RON</span>
				</h1>
				<hr />
				<h1
					class="flex flex-col mt-5 mb-10 text-xl font-bold sm:justify-between sm:items-center sm:flex-row"
				>
					<span class="mb-3 sm:mb-0">
						{{ translatedValues.currentCost }}
					</span>
					<span>{{ approximateCost }} RON</span>
				</h1>
				<div
					v-if="isMediumScreenOrAbove"
					class="w-5/6 mx-auto mb-10 overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
				>
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr class="text-white bg-black">
								<th>Nr.Crt.</th>
								<th>{{ translatedValues.itemImg }}</th>
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
								<td>{{ index + 1 }}</td>
								<td>
									<img
										:src="component.image"
										alt=""
										class="w-1/4 md:w-[100px] md:h-[100px] rounded-xl mx-auto"
									/>
								</td>
								<td>
									{{ component.name }}
								</td>
								<td>{{ component.price }}</td>
								<td>
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
				<div
					v-if="isSmallScreen"
					class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2"
				>
					<div
						v-for="(component, index) in hardwareComponents"
						:key="index"
						class="flex justify-start p-5 text-justify bg-white rounded-lg shadow-xl card-hover"
					>
						<img
							:src="component.image"
							alt=""
							class="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-xl"
						/>
						<div class="ms-5">
							<h1 class="text-xl font-bold">
								{{ component.name }}
							</h1>
							<h2 class="mb-10">
								{{ translatedValues.itemCost }}:
								{{ component.price }} RON
							</h2>
							<a
								v-if="component.link"
								:href="component.link"
								class="flex items-center gap-1 btn-primary w-[150px]"
								target="_blank"
							>
								<i class="fa-solid fa-eye"></i>
								<span class="font-bold">{{
									translatedValues.btnView
								}}</span>
							</a>
							<span
								v-else
								class="cursor-not-allowed opacity-60 flex items-center gap-1 btn-primary w-[150px]"
							>
								<i class="fa-solid fa-eye"></i>
								<span class="font-bold">{{
									translatedValues.btnView
								}}</span>
							</span>
						</div>
					</div>
				</div>
				<h1
					class="flex flex-col my-10 text-xl font-bold sm:flex-row sm:items-center sm:justify-between"
				>
					<span class="mb-3 sm:mb-0">
						{{ translatedValues.developmentCost }}
					</span>
					<span>{{ developmentCost }} RON</span>
				</h1>
				<div
					v-if="isMediumScreenOrAbove"
					class="w-5/6 mx-auto mb-10 overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
				>
					<table class="min-w-full divide-y divide-gray-200">
						<thead>
							<tr class="text-white bg-black">
								<th>Nr.Crt.</th>
								<th>{{ translatedValues.itemImg }}</th>
								<th>{{ translatedValues.itemName }}</th>
								<th>{{ translatedValues.itemCost }}(RON)</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(
									component, index
								) in developmentComponents"
								:key="index"
								class="text-center"
							>
								<td>{{ index + 1 }}</td>
								<td>
									<img
										:src="component.image"
										alt=""
										class="w-1/4 md:w-[100px] md:h-[100px] rounded-xl mx-auto"
									/>
								</td>
								<td>
									{{ component.name }}
								</td>
								<td>{{ component.price }}</td>
								<td>
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
				<div
					v-if="isSmallScreen"
					class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2"
				>
					<div
						v-for="(component, index) in developmentComponents"
						:key="index"
						class="flex justify-start p-5 text-justify bg-white rounded-lg shadow-xl card-hover"
					>
						<img
							:src="component.image"
							alt=""
							class="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-xl"
						/>
						<div class="ms-5">
							<h1 class="text-xl font-bold">
								{{ component.name }}
							</h1>
							<h2 class="mb-10">
								{{ translatedValues.itemCost }}:
								{{ component.price }} RON
							</h2>
							<a
								v-if="component.link"
								:href="component.link"
								class="flex items-center gap-1 btn-primary w-[150px]"
								target="_blank"
							>
								<i class="fa-solid fa-eye"></i>
								<span class="font-bold">{{
									translatedValues.btnView
								}}</span>
							</a>
							<span
								v-else
								class="cursor-not-allowed opacity-60 flex items-center gap-1 btn-primary w-[150px]"
							>
								<i class="fa-solid fa-eye"></i>
								<span class="font-bold">{{
									translatedValues.btnView
								}}</span>
							</span>
						</div>
					</div>
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
							class="w-2/4 md:w-[150px] md:h-[150px] mx-auto mb-5 md:mb-0 rounded-xl"
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
	import { ref, computed, onMounted, onUnmounted, watch } from "vue";
	import { useI18n } from "vue-i18n";
	import Hero from "../components/Hero.vue";

	const { t } = useI18n();
	const translatedValues = computed(() => {
		return {
			title: t("about.Title"),
			developmentTeam: t("about.DevelopmentTeam"),
			coordinator: t("about.Coordinator"),
			students: t("about.Students"),
			aboutProject: t("about.AboutProject"),
			projectCost: t("about.ProjectCost"),
			itemImg: t("about.ItemImg"),
			itemName: t("about.ItemName"),
			itemCost: t("about.ItemCost"),
			description: t("about.Description"),
			batterySupport: t("about.BatterySupport"),
			projectCost: t("about.ProjectCost"),
			currentCost: t("about.CurrentCost"),
			totalCost: t("about.TotalCost"),
			btnView: t("utils.BtnView"),
			ledBtn: t("about.LedBtn"),
			cableMM: t("about.CableM-M"),
			cableMT: t("about.CableM-T"),
			cableTT: t("about.CableT-T"),
			aaBatterySupport: t("about.AaBatterySupport"),
			aaBatteries: t("about.AABatteries"),
			developmentCost: t("about.DevelopmentCost"),
		};
	});

	const approximateCost = ref(0);
	const developmentCost = ref(0);
	const totalCost = ref(0);

	const hardwareComponents = computed(() => [
		{
			image: getImageURL("arduino", "png"),
			name: "Arduino UNO R3",
			price: 52.96,
			link: "https://cleste.ro/arduino-uno-r3-atmega328p.html",
		},
		{
			image: getImageURL("sim800l", "png"),
			name: t("home.GSMTitle"),
			price: 57.46,
			link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-cu-antena.html",
		},
		{
			image: getImageURL("neo6m", "png"),
			name: t("home.GPSTitle"),
			price: 62.06,
			link: "https://cleste.ro/modul-gps-ublox-neo-6m-cu-antena.html",
		},
		{
			image: getImageURL("baterii", "png"),
			name: t("home.BatteryTitle"),
			price: 38.99,
			link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
		},
		{
			image: getImageURL("vodafone", "png"),
			name: "Vodafone SIM 8€",
			price: 53,
			link: "",
		},
		{
			image: getImageURL("suportBaterie", "png"),
			name: t("about.BatterySupport"),
			price: 4.17,
			link: "https://cleste.ro/suport-baterii-18650-1-slot.html",
		},
	]);

	const developmentComponents = computed(() => [
		{
			image: getImageURL("bateriiAA", "png"),
			name: t("about.AABatteries"),
			price: 19.99,
			link: "",
		},
		{
			image: getImageURL("butonLed", "png"),
			name: t("about.LedBtn"),
			price: 1.98,
			link: "https://cleste.ro/?redirect=1#/dfclassic/query=buton%20led&query_name=match_and",
		},
		{
			image: getImageURL("suportBateriiAA", "png"),
			name: t("about.AABatterySupport"),
			price: 6.79,
			link: "https://cleste.ro/suport-baterii-18650-3-sloturi.html",
		},
		{
			image: getImageURL("cabluriT-T", "png"),
			name: t("about.CableT-T"),
			price: 13.09,
			link: "https://www.emag.ro/cabluri-arduino-tata-tata-20-cm-40-buc-elektroweb-multicolor-2-c-026/pd/DC1MTMYBM/?utm_source=mobile%20app&utm_medium=ios&utm_campaign=share%20product",
		},
		{
			image: getImageURL("cabluriM-T", "png"),
			name: t("about.CableM-T"),
			price: 13.09,
			link: "https://www.emag.ro/set-40-cabluri-arduino-tata-mama-40-cm-multicolor-5904162803460/pd/DH8RKLMBM/?utm_medium=ios&utm_campaign=share%20product&utm_source=mobile%20app",
		},
		{
			image: getImageURL("cabluriM-M", "png"),
			name: t("about.CableM-M"),
			price: 13.09,
			link: "https://www.emag.ro/set-40-fire-mama-mama-20-cm-05fz/pd/DHTS9WBBM/?utm_campaign=share%20product&utm_medium=ios&utm_source=mobile%20app",
		},
		{
			image: getImageURL("breadboard", "png"),
			name: "Breadboard 400",
			price: 7.1,
			link: "https://www.emag.ro/placa-test-breadboard-400-bb400/pd/D5WBP7MBM/",
		},
	]);

	onMounted(() => {
		hardwareComponents.value.forEach((component) => {
			approximateCost.value += component.price;
		});

		developmentComponents.value.forEach((component) => {
			developmentCost.value += component.price;
		});

		approximateCost.value = parseFloat(approximateCost.value.toFixed(2));
		developmentCost.value = parseFloat(developmentCost.value.toFixed(2));

		totalCost.value = (
			approximateCost.value + developmentCost.value
		).toFixed(2);
	});

	const getImageURL = (name, extension) => {
		return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
	};

	const gpsPhoto = getImageURL("team", "png");
	const projectPhoto = getImageURL("gps", "jpeg");

	const screenWidth = ref(window.innerWidth);
	const breakpoints = {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		xxl: 1536,
	};

	const checkScreenSize = () => {
		screenWidth.value = window.innerWidth;
	};

	const isMediumScreenOrAbove = computed(
		() => screenWidth.value >= breakpoints.md
	);
	const isSmallScreen = computed(() => screenWidth.value < breakpoints.md);

	onMounted(() => {
		window.addEventListener("resize", checkScreenSize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", checkScreenSize);
	});
</script>

<style scoped>
	.btn-primary {
		@apply text-white transition duration-500 ease-in-out transform bg-green-500 rounded shadow focus:ring-green-400 focus-visible:ring-green-400 focus:ring-2 hover:ring-4 hover:ring-green-400;
	}
</style>
