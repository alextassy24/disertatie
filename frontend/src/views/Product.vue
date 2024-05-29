<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
				<BackButton />
				<LoadingWrapper :loading="loading">
					<div v-if="product">
						<div
							class="flex flex-col items-start justify-center gap-3 lg:items-start lg:flex-row"
						>
							<div>
								<h2 class="subtitle">
									{{ translatedValues.subtitle }}
								</h2>

								<div
									class="mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg"
								>
									<table class="min-w-full divide-y divide-gray-200">
										<tbody>
											<tr>
												<td>
													{{ translatedValues.serialNumber }}
												</td>
												<td>
													{{ product.serialNumber }}
												</td>
											</tr>
											<tr>
												<td>GUID</td>
												<td>{{ product.deviceID }}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							<div>
								<h2 class="subtitle">
									{{ translatedValues.liveLocation }}
								</h2>
								<GoogleMap
									v-if="!mapLoading"
									api-key="AIzaSyC7zv3FXxWveL_O3F2BA4E90m1buO0nH5U"
									:class="{
										'map-md': isMediumScreenOrAbove,
										'map-sm': isSmallScreen,
									}"
									:center="showLiveLocation"
									:zoom="18"
									:key="mapKey"
								>
									<Marker
										:options="{
											position: showLiveLocation,
										}"
									/>
								</GoogleMap>
								<div
									v-else
									class="flex items-center justify-center gap-3 bg-gray-100 rounded shadow"
									:class="{
										'map-md': isMediumScreenOrAbove,
										'map-sm': isSmallScreen,
									}"
								>
									<svg
										class="w-12 h-12 text-gray-300 animate-spin"
										viewBox="0 0 64 64"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										loading="lazy"
									>
										<path
											d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
											stroke="currentColor"
											stroke-width="5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
											stroke="currentColor"
											stroke-width="5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="text-gray-900"
										></path>
									</svg>
									<span>{{ translatedValues.locaitonLoading }}</span>
								</div>
							</div>
						</div>
						<h2 class="subtitle">
							{{ translatedValues.locations }}
						</h2>
						<div
							class="flex items-center gap-3 mx-2 mt-1 mb-4 text-lg"
							:class="link ? 'justify-between' : 'justify-end'"
						>
							<div>
								<label>{{ translatedValues.show }}</label>
								<select
									class="p-1 mx-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
									v-model="itemsPerPage"
								>
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
								</select>
								<label>{{ translatedValues.perPage }}</label>
							</div>
						</div>
						<div
							v-if="locations.length > 0"
							class="overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
						>
							<table class="min-w-full divide-y divide-gray-200">
								<!-- Table headers -->
								<thead>
									<tr class="text-white bg-black">
										<th>{{ translatedValues.latitude }}</th>
										<th>
											{{ translatedValues.longitude }}
										</th>
										<th>{{ translatedValues.date }}</th>
										<th>{{ translatedValues.time }}</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(location, index) in paginatedItems"
										:key="index"
									>
										<td>{{ location.latitude }}</td>
										<td>{{ location.longitude }}</td>
										<td>{{ location.date }}</td>
										<td>{{ location.time }}</td>
										<td>
											<button
												class="btn-primary"
												@click="toggleModal(location)"
											>
												<i class="fa-solid fa-eye"></i>
											</button>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="flex items-center justify-between m-3 mt-5">
								<div class="flex gap-3">
									<button
										class="flex items-center gap-1"
										@click="goToPage(1)"
										:class="
											currentPage == 1 ? 'btn-disabled' : 'pagination-btn'
										"
									>
										<i class="fa-solid fa-backward-fast"></i>
										<span class="hidden lg:block">{{
											translatedValues.firstBtn
										}}</span>
									</button>
									<button
										class="flex items-center gap-1"
										@click="goToPage(currentPage - 1)"
										:disabled="currentPage == 1"
										:class="
											currentPage == 1 ? 'btn-disabled' : 'pagination-btn'
										"
									>
										<i class="fa-solid fa-backward-step"></i>
										<span class="hidden lg:block">{{
											translatedValues.previousBtn
										}}</span>
									</button>
								</div>
								<div class="hidden lg:inline-block">
									<span>{{ translatedValues.tablePage }}</span>
									{{ currentPage }}
									{{ translatedValues.tableOf }}
									{{ totalPages }}
								</div>
								<div class="flex gap-3">
									<button
										class="flex items-center gap-1"
										@click="goToPage(currentPage + 1)"
										:class="
											currentPage == totalPages
												? 'btn-disabled'
												: 'pagination-btn'
										"
										:disabled="currentPage == totalPages"
									>
										<span class="hidden lg:block">{{
											translatedValues.nextBtn
										}}</span>
										<i class="fa-solid fa-forward-step"></i>
									</button>
									<button
										class="flex items-center gap-1"
										@click="goToPage(totalPages)"
										:disabled="currentPage == totalPages"
										:class="
											currentPage == totalPages
												? 'btn-disabled'
												: 'pagination-btn'
										"
									>
										<span class="hidden lg:block">{{
											translatedValues.lastBtn
										}}</span>
										<i class="fa-solid fa-forward-fast"></i>
									</button>
								</div>
							</div>

							<div class="block text-center lg:hidden">
								<span>{{ translatedValues.tablePage }}</span>
								{{ currentPage }}
								{{ translatedValues.tableOf }} {{ totalPages }}
							</div>
							<BaseModal
								:modalActive="modalActive"
								:show-buttons="false"
								@close-modal="toggleModal(null)"
							>
								<GoogleMap
									api-key="AIzaSyC7zv3FXxWveL_O3F2BA4E90m1buO0nH5U"
									:class="{
										'map-md': isMediumScreenOrAbove,
										'map-sm': isSmallScreen,
									}"
									:center="showLocation"
									:zoom="18"
								>
									<Marker :options="{ position: showLocation }" />
								</GoogleMap>
							</BaseModal>
						</div>
						<div
							v-else
							class="mt-10 text-xl font-bold text-center text-red-500"
						>
							{{ translatedValues.noLocations }}
						</div>
					</div>
					<div
						v-else
						class="p-3 mx-auto mt-10 text-xl font-bold text-center text-red-500 bg-red-200 rounded shadow lg:w-2/4"
					>
						{{ translatedValues.noProduct }}
					</div>
				</LoadingWrapper>
			</section>
		</div>
	</AuthenticatedWrapper>
</template>

<script setup>
	import { ref, computed, onMounted, reactive } from "vue";
	import { useRoute } from "vue-router";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";
	import { useScreenSize } from "../utils/useScreenSize";
	import { GoogleMap, Marker } from "vue3-google-map";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import PaginatedTable from "../components/PaginatedTable.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import BaseModal from "../components/BaseModal.vue";
	import BackButton from "../components/BackButton.vue";
	import * as signalR from "@microsoft/signalr";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const route = useRoute();
	const id = route.params.id;
	const locations = ref([]);
	const product = ref();
	const loading = ref(true);
	const modalActive = ref(null);
	const showLocation = ref({ lat: 0, lng: 0 });

	const { isMediumScreenOrAbove, isSmallScreen } = useScreenSize();
	const translatedValues = computed(() => {
		return {
			title: t("my-products.Title"),
			noProducts: t("profile.NoLocations"),
			serialNumber: t("my-products.SerialNumber"),
			subtitle: t("product.Subtitle"),
			noProduct: t("product.NoProduct"),
			locations: t("product.Locations"),
			noLocations: t("product.NoLocations"),
			latitude: t("product.Latitude"),
			longitude: t("product.Longitude"),
			date: t("product.Date"),
			time: t("product.Time"),
			locaitonLoading: t("product.LocationLoading"),
			liveLocation: t("product.LiveLocation"),
			perPage: t("product.PerPage"),
			tablePage: t("view-data.TablePage"),
			tableOf: t("view-data.TableOf"),
			firstBtn: t("view-data.FirstBtn"),
			previousBtn: t("view-data.PreviousBtn"),
			nextBtn: t("view-data.NextBtn"),
			lastBtn: t("view-data.LastBtn"),
			show: t("view-data.Show"),
		};
	});

	const toggleModal = (location) => {
		modalActive.value = !modalActive.value;
		if (location !== null && locations.value[location.id]) {
			showLocation.value.lat = parseFloat(location.latitude);
			showLocation.value.lng = parseFloat(location.longitude);
		} else {
			showLocation.value.lat = 0;
			showLocation.value.lng = 0;
		}
	};

	const getProductData = async () => {
		if (authStore.isAuthenticated) {
			const config = {
				headers: { Authorization: `Bearer ${authStore.token}` },
			};

			await axios
				.get(`${authStore.apiAddress}/api/products/${id}`, config)
				.then((response) => {
					loading.value = false;
					if (response.status === 200) {
						product.value = response.data.product;
						locations.value = response.data.locations;
						// console.log(locations.value);
					}
				});
		}
	};

	const currentPage = ref(1);
	const itemsPerPage = ref(5);

	const paginatedItems = computed(() => {
		const startIndex = (currentPage.value - 1) * itemsPerPage.value;
		const endIndex = startIndex + itemsPerPage.value;
		return locations.value.slice(startIndex, endIndex);
	});

	const totalPages = computed(() =>
		Math.ceil(locations.value.length / itemsPerPage.value)
	);

	const goToPage = (page) => {
		if (page >= 1 && page <= totalPages.value) {
			currentPage.value = page;
		}
	};

	const showLiveLocation = ref({ lat: 0, lng: 0 });
	const mapLoading = ref(true);
	const mapKey = ref(0);
	// if(product.deviceID)
	if (authStore.isAuthenticated && product.value) {
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${authStore.apiAddress}/ws/gps-hub`)
			.build();

		connection.on("ReceiveLocationUpdate", (location) => {
			// console.log("New location data received:", location);
			// console.log(location.productID);
			if (location.productID === product.value.deviceID) {
				mapLoading.value = false;
				showLiveLocation.value.lat = parseFloat(location.latitude);
				showLiveLocation.value.lng = parseFloat(location.longitude);
				mapKey.value++;
				locations.value.push({
					latitude: location.latitude,
					longitude: location.longitude,
					date: location.date,
					time: location.time,
				});
				// console.log(showLiveLocation.value.lat);
				// console.log(showLiveLocation.value.lng);
			}
		});

		connection
			.start()
			.then(() => console.log("Connected to SignalR Hub"))
			.catch((err) => console.error("Error connecting to SignalR Hub:", err));
	}
	onMounted(() => {
		getProductData();
	});
</script>

<style scoped>
	.map-md {
		width: 400px;
		height: 400px;
	}

	.map-sm {
		width: 300px;
		height: 300px;
	}
</style>
