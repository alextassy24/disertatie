<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<SideBar :items="sideBarItems" />

		<section
			ref="firstSection"
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
		<section
			ref="secondSection"
			class="px-10 py-16 bg-gray-100"
		>
			<div class="container mx-auto">
				<h1 class="mb-10 text-4xl font-bold">
					{{ translatedValues.developmentPhasesTitle }}
				</h1>
				<div>
					<ul class="list-disc">
						<li
							class="mb-5"
							v-for="phase in developmentPhases"
						>
							<h2 class="mb-3 text-xl font-semibold">
								{{ phase.title }}
							</h2>
							<div class="text-lg text-justify">
								<p class="mb-5">{{ phase.description }}</p>
								<ul
									class="list-decimal"
									v-if="phase.paragraphs"
								>
									<li
										class="mx-3 mb-3"
										v-for="paragraph in phase.paragraphs"
									>
										{{ paragraph }}
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
		<section
			ref="thirdSection"
			class="px-10 py-16"
		>
			<div class="container mx-auto">
				<h1
					class="flex flex-col items-center mb-5 text-3xl font-bold sm:text-4xl sm:flex-row sm:justify-between"
				>
					<span class="mb-3 sm:mb-0 test-justify">
						{{ translatedValues.projectCost }}
					</span>
					<span>{{ totalCost }} RON</span>
				</h1>
				<hr />
				<div class="sticky-container">
					<div
						class="flex flex-col items-center justify-between mt-5 mb-10 md:flex-row"
					>
						<h1
							class="flex flex-col items-center mb-3 text-xl font-bold md:justify-between md:flex-row md:mb-0"
						>
							<span class="mb-3 md:mb-0 me-0 md:me-3">
								{{ translatedValues.currentCost }}
							</span>
							<span>{{ approximateCost }} RON</span>
						</h1>
						<button
							class="flex items-center gap-2 font-bold btn-primary w-full md:w-[8rem] justify-center mb-5"
							@click="showApproximateTable = !showApproximateTable"
						>
							<i
								class="fa-solid"
								:class="{
									'fa-chevron-up': showApproximateTable,
									'fa-chevron-down': !showApproximateTable,
								}"
							></i>
							<span>{{
								showApproximateTable
									? translatedValues.collapse
									: translatedValues.show
							}}</span>
						</button>
					</div>
				</div>
				<Transition name="fade">
					<div
						v-if="showApproximateTable"
						class="px-2 py-10 bg-green-400 shadow-lg md:px-0 rounded-2xl"
					>
						<div class="flex justify-center w-5/6 gap-3 mx-auto md:justify-end">
							<div
								class="flex flex-col items-center gap-3 p-3 my-3 bg-gray-200 rounded shadow md md:flex-row"
							>
								<div class="flex items-center gap-3">
									<span class="font-bold">{{ translatedValues.sort }}</span>
									<select
										name="sorting"
										@change="updateApproximateSortDirection($event)"
									>
										<option value="ascending">
											{{ translatedValues.ascending }}
										</option>
										<option value="descending">
											{{ translatedValues.descending }}
										</option>
									</select>
								</div>
								<div class="flex items-center gap-3">
									<span class="font-bold">{{ translatedValues.by }}</span>
									<select
										name="sortDevelopmentTable"
										@change="updateApprxoimateSortBy($event)"
									>
										<option value="name">
											{{ translatedValues.name }}
										</option>
										<option value="price">
											{{ translatedValues.price }}
										</option>
									</select>
								</div>
							</div>
						</div>
						<div
							v-if="isMediumScreenOrAbove"
							class="w-5/6 mx-auto mb-10 overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl scrollable-content-table"
						>
							<table class="min-w-full divide-y divide-gray-200">
								<thead>
									<tr class="text-white bg-black sticky-header">
										<th>Nr.Crt.</th>
										<th>{{ translatedValues.itemImg }}</th>
										<th>{{ translatedValues.itemName }}</th>
										<th>{{ translatedValues.itemCost }}(RON)</th>
										<th>Link</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(component, index) in sortedApproximateTable"
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
							class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 scrollable-content"
						>
							<div
								v-for="(component, index) in sortedApproximateTable"
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
										{{ translatedValues.itemCost }}: {{ component.price }} RON
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
				</Transition>

				<div class="sticky-container">
					<div
						class="flex flex-col items-center justify-between mt-5 mb-10 md:flex-row"
					>
						<h1
							class="flex flex-col items-center mb-3 text-xl font-bold md:justify-between md:flex-row md:mb-0"
						>
							<span class="mb-3 md:mb-0 me-0 md:me-3">
								{{ translatedValues.developmentCost }}
							</span>
							<span>{{ developmentCost }} RON</span>
						</h1>
						<button
							class="flex items-center gap-2 font-bold btn-primary w-full md:w-[8rem] justify-center mb-5"
							@click="showDevelopmentTable = !showDevelopmentTable"
						>
							<i
								class="fa-solid"
								:class="{
									'fa-chevron-up': showDevelopmentTable,
									'fa-chevron-down': !showDevelopmentTable,
								}"
							></i>
							<span>{{
								showDevelopmentTable
									? translatedValues.collapse
									: translatedValues.show
							}}</span>
						</button>
					</div>
				</div>
				<Transition name="fade">
					<div
						v-if="showDevelopmentTable"
						class="px-2 py-10 bg-green-400 shadow-lg md:px-0 rounded-2xl"
					>
						<div class="flex justify-center w-5/6 gap-3 mx-auto md:justify-end">
							<div
								class="flex flex-col items-center gap-3 p-3 my-3 bg-gray-200 rounded shadow md md:flex-row"
							>
								<div class="flex items-center gap-3">
									<span class="font-bold">{{ translatedValues.sort }}</span>
									<select
										name="sorting"
										@change="updateDevelopmentSortDirection($event)"
									>
										<option value="ascending">
											{{ translatedValues.ascending }}
										</option>
										<option value="descending">
											{{ translatedValues.descending }}
										</option>
									</select>
								</div>
								<div class="flex items-center gap-3">
									<span class="font-bold">{{ translatedValues.by }}</span>
									<select
										name="sortDevelopmentTable"
										@change="updateDevelopmentSortBy($event)"
									>
										<option value="name">
											{{ translatedValues.name }}
										</option>
										<option value="price">
											{{ translatedValues.price }}
										</option>
									</select>
								</div>
							</div>
						</div>

						<div
							v-if="isMediumScreenOrAbove"
							class="w-5/6 mx-auto mb-10 overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl scrollable-content-table"
						>
							<table class="min-w-full divide-y divide-gray-200">
								<thead>
									<tr class="text-white bg-black sticky-header">
										<th>Nr.Crt.</th>
										<th>{{ translatedValues.itemImg }}</th>
										<th>{{ translatedValues.itemName }}</th>
										<th>{{ translatedValues.itemCost }}(RON)</th>
										<th>Link</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(component, index) in sortedDevelopmentTable"
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
							class="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 scrollable-content"
						>
							<div
								v-for="(component, index) in sortedDevelopmentTable"
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
										{{ translatedValues.itemCost }}: {{ component.price }} RON
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
				</Transition>
			</div>
		</section>
		<section
			ref="fourthSection"
			class="px-10 py-16 bg-gradient-to-r from-green-300 to-black"
		>
			<div class="container mx-auto">
				<h1 class="mb-5 text-4xl font-bold text-white">
					{{ translatedValues.photoGalleryTitle }}
				</h1>
				<div
					v-for="(section, index) in photos"
					:key="index"
					class="p-5 bg-white shadow mb-7 rounded-2xl"
				>
					<PhotoSection
						:index="index + 1"
						:title="section.title"
						:images="section.images"
						:toggler="section.toggler"
						:toggle-modal="toggleModal"
						:choose-photo="choosePhoto"
					/>
				</div>
			</div>
			<PhotoModal
				:isMediumScreenOrAbove="isMediumScreenOrAbove"
				:isSmallScreen="isSmallScreen"
				:modalImages="modalImages"
				:modalImage="modalImage"
				:modalImageId="modalImageId"
				:modalActive="modalActive"
				@close-modal="toggleModal(null)"
			>
			</PhotoModal>
		</section>
		<!-- <section class="px-10 py-16 bg-gray-100">
			<div class="container">
				<div class="grid grid-cols-1 md:grid-cols-2">
					<div class="order-1">
						<img
							:src="gpsPhoto"
							alt=""
							class="w-1/4 mx-auto mb-5 md:mb-0 rounded-xl"
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
							<p>Ing. Alexandru Tănase</p>
						</div>
					</div>
				</div>
			</div>
		</section> -->
	</div>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
		onUnmounted,
		inject,
		watch,
		watchEffect,
	} from "vue";
	import { useI18n } from "vue-i18n";
	import { defineAsyncComponent } from "vue";
	import { useSortedArray } from "../utils/sorting.js";
	import { useScreenSize } from "../utils/useScreenSize";
	import Hero from "../components/Hero.vue";
	import PhotoSection from "../components/PhotoSection.vue";
	import SideBar from "../components/SideBar.vue";

	const { isMediumScreenOrAbove, isSmallScreen } = useScreenSize();
	const PhotoModal = defineAsyncComponent(() =>
		import("../components/PhotoModal.vue")
	);

	const firstSection = ref(null);
	const secondSection = ref(null);
	const thirdSection = ref(null);
	const fourthSection = ref(null);

	const emitter = inject("emitter");

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
			aaBatterySupport: t("about.AABatterySupport"),
			aaBatteries: t("about.AABatteries"),
			developmentCost: t("about.DevelopmentCost"),
			photoGalleryTitle: t("about.PhotoGalleryTitle"),
			show: t("utils.Show"),
			collapse: t("utils.Collapse"),
			developmentPhasesTitle: t("about.DevelopmentPhases.Title"),
			sort: t("utils.Sort"),
			by: t("utils.By"),
			ascending: t("utils.Ascending"),
			descending: t("utils.Descending"),
			name: t("utils.Name"),
			price: t("utils.Price"),
		};
	});

	const sideBarItems = computed(() => [
		{
			name: translatedValues.value.aboutProject,
			icon: "fa-solid fa-house-flag",
			section: firstSection,
			active: false,
		},
		{
			name: translatedValues.value.developmentPhasesTitle,
			icon: "fa-solid fa-book",
			section: secondSection,
			active: false,
		},
		{
			name: translatedValues.value.projectCost,
			icon: "fa-solid fa-coins",
			section: thirdSection,
			active: false,
		},
		{
			name: translatedValues.value.photoGalleryTitle,
			icon: "fa-solid fa-images",
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

	const approximateCost = ref(0);
	const developmentCost = ref(0);
	const totalCost = ref(0);
	const showApproximateTable = ref(false);
	const showDevelopmentTable = ref(false);

	const hardwareComponents = computed(() => [
		{
			image: getImageURL("a9g", "png"),
			name: t("about.A9G"),
			price: 114.59,
			link: "https://www.sigmanortec.ro/placa-dezvoltare-a9g-gsm-gprs-gps?fast_search=fs",
		},
		{
			image: getImageURL("vodafone", "png"),
			name: "Vodafone SIM 7€",
			price: 44,
			link: "",
		},
		{
			image: getImageURL("rtc", "png"),
			name: "Real Time Clock",
			price: 10,
			link: "https://www.emag.ro/modul-rtc-cu-ds1307-oky3392/pd/D171J7MBM/?ref=hdr-favorite_products",
		},
		{
			image: getImageURL("oled", "png"),
			name: "OLED 0.96” ",
			price: 27,
			link: "https://www.emag.ro/ecran-oled-0-96-ai409-s322-323-324/pd/D69S02MBM/?ref=sponsored_products_search_r_1_1&recid=recads_1_741a2aa7708455069a4485a9989c5ba25e8a8379575fdb8c9dc456ccb44bea78_1716810644&aid=0a7d5dd6-d99b-11eb-8d67-06e2772fd63e&oid=63298237&aidr=ed861bdb-d486-11ee-a490-0229d980bfff&scenario_ID=1",
		},
	]);

	const developmentComponents = computed(() => [
		{
			image: getImageURL("usbTTL", "png"),
			name: "USB TTL Converter",
			price: 15,
			link: "https://www.emag.ro/convertor-de-semnal-digital-usb-la-ttl-ch340g-oky3406-7/pd/D67Q80MBM/",
		},
		{
			image: getImageURL("attiny85", "png"),
			name: "Arduino ATTiny85",
			price: 28.13,
			link: "https://www.sigmanortec.ro/Placa-dezvoltare-ATTINY85-p126029357?fast_search=fs",
		},
		{
			image: getImageURL("arduino", "png"),
			name: "Arduino UNO R3",
			price: 52.96,
			link: "https://cleste.ro/arduino-uno-r3-atmega328p.html",
		},
		{
			image: getImageURL("sim800l2.0", "png"),
			name: t("home.GSMTitle"),
			price: 60.98,
			link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-20-cu-antena.html",
		},
		{
			image: getImageURL("neo6m", "png"),
			name: t("home.GPSTitle"),
			price: 62.06,
			link: "https://cleste.ro/modul-gps-ublox-neo-6m-cu-antena.html",
		},
		{
			image: getImageURL("arduinoNano", "png"),
			name: "Arduino Nano V3",
			price: 25.12,
			link: "https://www.emag.ro/placa-nano-cu-usb-c-compatibila-cu-arduino-nano-v3-0-albastru-arduino-nano-328-usbc-n/pd/DSVTTMYBM/?ref=fav_pd-title",
		},
		{
			image: getImageURL("sim800l", "png"),
			name: t("home.GSMTitle"),
			price: 57.46,
			link: "https://cleste.ro/modul-gprs-gsm-quad-band-sim800l-cu-antena.html",
		},
		{
			image: getImageURL("vodafone", "png"),
			name: "Vodafone SIM 8€",
			price: 53,
			link: "",
		},
		{
			image: getImageURL("bateriiAA", "png"),
			name: t("about.AABatteries"),
			price: 19.99,
			link: "",
		},
		{
			image: getImageURL("baterii", "png"),
			name: t("home.BatteryTitle"),
			price: 38.99,
			link: "https://www.emag.ro/set-4-acumulatori-rakieta-18650-3-7v-12000mah-li-ion-auriu-st-rk18650g/pd/DV5XB8MBM/?utm_medium=ios&utm_source=mobile%20app&utm_campaign=share%20product",
		},
		{
			image: getImageURL("suportBaterie", "png"),
			name: t("about.BatterySupport"),
			price: 4.17,
			link: "https://cleste.ro/suport-baterii-18650-1-slot.html",
		},
		{
			image: getImageURL("suportBaterii", "png"),
			name: t("about.BatteriesSupport"),
			price: 12,
			link: "https://www.emag.ro/suport-acumulator-3-7v-18650-x-2-sloturi-s18650-2/pd/DRC49WBBM/?ref=fav_pd-title",
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
		{
			image: getImageURL("breadboard830", "png"),
			name: "Breadboard 830",
			price: 15.0,
			link: "https://www.emag.ro/placa-prototipare-tip-breadboard-830-puncte-oky0008/pd/DW8217MBM/?ref=history-shopping_357018673_2895_1",
		},
		{
			image: getImageURL("breadboardCon", "png"),
			name: t("about.BreadboardCon"),
			price: 15.0,
			link: "https://www.emag.ro/set-conectori-pentru-breadboard-140buc-oky0053/pd/DMG9BKMBM/?ref=history-shopping_357018673_2895_2",
		},
	]);

	const galleryConfig = computed(() => [
		{
			title: t("about.PhotoGallery.gpsSolder"),
			count: 16,
			prefix: "gpsSolder",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.gpsTest"),
			count: 14,
			prefix: "gpsTest",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.gsmSolder"),
			count: 2,
			prefix: "gsmSolder",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.gsmTest"),
			count: 10,
			prefix: "gsmTest",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.arduinoSolder"),
			count: 5,
			prefix: "arduinoSolder",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.batteryTesting"),
			count: 3,
			prefix: "bateriiTest",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.prototype"),
			count: 11,
			prefix: "Prototip",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.testPrototype"),
			count: 12,
			prefix: "TestPrototip",
			toggler: false,
		},
		{
			title: t("about.PhotoGallery.testA9G"),
			count: 8,
			prefix: "TestA9G",
			toggler: false,
		},
	]);

	const photos = computed(() => {
		return galleryConfig.value.map((config) => ({
			title: config.title,
			images: Array.from({ length: config.count }, (_, i) => ({
				image: getProductImageURL(`${config.prefix}-${i + 1}`, "JPEG"),
			})),
			toggler: config.toggler,
		}));
	});

	const modalImage = ref("");
	const modalImages = ref([]);
	const modalImageId = ref(null);
	const modalActive = ref(false);

	const toggleModal = () => {
		modalActive.value = !modalActive.value;
		emitter.emit("modal-active", modalActive.value);
		if (modalActive.value == false) {
			modalImageId.value = null;
			modalImage.value = null;
		}
	};

	const nextImage = () => {
		if (modalImageId.value + 1 < modalImages.value.length - 1) {
			modalImageId.value += 1;
		} else {
			modalImageId.value = modalImages.value.length - 1;
		}
		modalImage.value = modalImages.value[modalImageId.value].image;
	};

	const prevImage = () => {
		if (modalImageId.value - 1 > 0) {
			modalImageId.value -= 1;
		} else {
			modalImageId.value = 0;
		}
		modalImage.value = modalImages.value[modalImageId.value].image;
	};

	watch(modalActive, (newValue) => {
		if (newValue) {
			window.addEventListener("keydown", handleKeydown);
		} else {
			window.removeEventListener("keydown", handleKeydown);
		}
	});

	const handleKeydown = (event) => {
		if (event.key === "Escape") {
			toggleModal();
		} else if (event.key === "ArrowRight") {
			nextImage();
		} else if (event.key === "ArrowLeft") {
			prevImage();
		}
	};

	const developmentPhases = computed(() => [
		{
			title: t("about.DevelopmentPhases.Phase1.Title"),
			description: t("about.DevelopmentPhases.Phase1.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase1.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase1.Paragraphs.P2"),
				t("about.DevelopmentPhases.Phase1.Paragraphs.P3"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase2.Title"),
			description: t("about.DevelopmentPhases.Phase2.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase2.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase2.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase3.Title"),
			description: t("about.DevelopmentPhases.Phase3.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase3.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase3.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase4.Title"),
			description: t("about.DevelopmentPhases.Phase4.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase4.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase4.Paragraphs.P2"),
			],
		},
		{
			title: t("about.DevelopmentPhases.Phase5.Title"),
			description: t("about.DevelopmentPhases.Phase5.Description"),
			paragraphs: [
				t("about.DevelopmentPhases.Phase5.Paragraphs.P1"),
				t("about.DevelopmentPhases.Phase5.Paragraphs.P2"),
				t("about.DevelopmentPhases.Phase5.Paragraphs.P3"),
			],
		},
	]);

	const getImageURL = (name, extension) => {
		return new URL(`../assets/${name}.${extension}`, import.meta.url).href;
	};

	const getProductImageURL = (name, extension) => {
		return new URL(`../assets/product/${name}.${extension}`, import.meta.url)
			.href;
	};

	const choosePhoto = (photo, index, images) => {
		modalImage.value = photo;
		modalImageId.value = index;
		modalImages.value = images;
	};

	const gpsPhoto = getImageURL("team", "png");
	const projectPhoto = getImageURL("gps", "jpeg");

	const developmentSortBy = ref("name"); // 'name' or 'price'
	const developmentSortDirection = ref("ascending"); // 'ascending' or 'descending'
	const approximateSortBy = ref("name"); // 'name' or 'price'
	const approximateSortDirection = ref("ascending"); // 'ascending' or 'descending'

	const sortedDevelopmentTable = useSortedArray(
		developmentComponents.value,
		developmentSortBy,
		developmentSortDirection
	);

	const sortedApproximateTable = useSortedArray(
		hardwareComponents.value,
		approximateSortBy,
		approximateSortDirection
	);

	const updateDevelopmentSortDirection = (event) => {
		developmentSortDirection.value = event.target.value;
	};

	const updateDevelopmentSortBy = (event) => {
		developmentSortBy.value = event.target.value;
	};

	const updateApproximateSortDirection = (event) => {
		approximateSortDirection.value = event.target.value;
	};

	const updateApprxoimateSortBy = (event) => {
		approximateSortBy.value = event.target.value;
	};

	const calculateCosts = () => {
		approximateCost.value = hardwareComponents.value
			.reduce((sum, component) => sum + component.price, 0)
			.toFixed(2);
		developmentCost.value = developmentComponents.value
			.reduce((sum, component) => sum + component.price, 0)
			.toFixed(2);
		totalCost.value = (
			parseFloat(approximateCost.value) + parseFloat(developmentCost.value)
		).toFixed(2);
	};

	onMounted(() => {
		calculateCosts();
	});

	onUnmounted(() => {
		window.removeEventListener("keydown", handleKeydown);
	});
</script>

<style scoped>
	.btn-primary {
		@apply text-white transition duration-500 ease-in-out transform bg-green-500 rounded shadow focus:ring-green-400 focus-visible:ring-green-400 focus:ring-2 hover:ring-4 hover:ring-green-400;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	.scrollable-content {
		overflow-y: auto;
		max-height: 77vh;
	}
	.scrollable-content-table {
		overflow-y: auto;
		max-height: 74vh;
	}
	.sticky-header th {
		position: sticky;
		top: 0; /* Stick to the top */
		z-index: 10; /* Ensure it stays above the table content */
		background-color: black; /* Ensure background color remains consistent */
		padding: 0.5rem 0;
	}
	select {
		@apply bg-transparent border-none w-full text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white hover:cursor-pointer;
	}
</style>
