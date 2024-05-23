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

	const getImageURL = (name) => {
		return new URL(`../assets/${name}.png`, import.meta.url).href;
	};

	const frontendComponents = computed(() => [
		{
			icon: getImageURL("vite"),
			name: "Vite",
			text: t("home.ViteText"),
			usage: t("home.ViteUsage"),
			link: "https://vitejs.dev/",
		},
		{
			icon: getImageURL("vue"),
			name: "Vue",
			text: t("home.VueText"),
			usage: t("home.VueUsage"),
			link: "https://vuejs.org/",
		},
		{
			icon: getImageURL("vue-router"),
			name: "Vue-Router",
			text: t("home.RouterText"),
			usage: t("home.RouterUsage"),
			link: "https://router.vuejs.org/",
		},
		{
			icon: getImageURL("pinia"),
			name: "Pinia",
			text: t("home.PiniaText"),
			usage: t("home.PiniaUsage"),
			link: "https://pinia.vuejs.org/",
		},
		{
			icon: getImageURL("axios"),
			name: "Axios",
			text: t("home.AxiosText"),
			usage: t("home.AxiosUsage"),
			link: "https://axios-http.com/",
		},
		{
			icon: getImageURL("tailwind"),
			name: "Tailwind CSS",
			text: t("home.TailwindText"),
			usage: t("home.TailwindUsage"),
			link: "https://tailwindcss.com/",
		},
	]);

	const backendComponents = computed(() => [
		{
			icon: getImageURL("aspnet"),
			name: "ASP.NET Core API",
			text: t("home.NetCoreText"),
			usage: t("home.NetCoreUsage"),
			link: "https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-8.0",
		},
		{
			icon: getImageURL("entity-framework"),
			name: "Entity Framework",
			text: t("home.EFText"),
			usage: t("home.EFUsage"),
			link: "https://docs.microsoft.com/en-us/ef/",
		},
		{
			icon: getImageURL("signalr"),
			name: "SignalR",
			text: t("home.SignalRText"),
			usage: t("home.SignalRUsage"),
			link: "https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-8.0",
		},
		{
			icon: getImageURL("postgres"),
			name: "PostgreSQL",
			text: t("home.PostgresText"),
			usage: t("home.PostgresUsage"),
			link: "https://www.postgresql.org/",
		},
		{
			icon: getImageURL("azure"),
			name: "Microsoft Azure",
			text: t("home.Azure"),
			usage: t("home.AzureUsage"),
			link: "https://learn.microsoft.com/en-us/azure/?product=popular",
		},
		{
			icon: getImageURL("aws"),
			name: "Amazon Web Services",
			text: t("home.AWS"),
			usage: t("home.AWSUsage"),
			link: "https://docs.aws.amazon.com/",
		},
	]);

	const keyComponents = computed(() => [
		{
			name: t("home.MicrocontrolerTitle"),
			text: t("home.MicrocontrollerText"),
			usage: t("home.MicrocontrollerUsage"),
			link: "https://www.sigmanortec.ro/placa-dezvoltare-a9g-gsm-gprs-gps?gad_source=1&gclid=Cj0KCQjw0ruyBhDuARIsANSZ3wpzs1cdpPQCAGoJcTMuBkvK6m3y9paIZZDId9dAF1JMnQYq5jInq1waAveCEALw_wcB",
		},
		{
			name: "Server(API + DB)",
			text: t("home.ServerText"),
			usage: t("home.ServerUsage"),
		},
		{
			name: t("home.CaseTitle"),
			text: t("home.CaseText"),
			usage: t("home.CaseUsage"),
		},
		// {
		// 	name: t("home.GSMTitle"),
		// 	text: t("home.GSMText"),
		// 	usage: t("home.GSMUsage"),
		// 	link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-20-cu-antena.html",
		// },
		// {
		// 	name: t("home.GPSTitle"),
		// 	text: t("home.GPSText"),
		// 	usage: t("home.GPSUsage"),
		// 	link: "https://cleste.ro/modul-gps-ublox-neo-6m-cu-antena.html",
		// },
		{
			name: t("home.BatteryTitle"),
			text: t("home.BatteryText"),
			usage: t("home.BatteryUsage"),
			link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
		},
	]);
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
