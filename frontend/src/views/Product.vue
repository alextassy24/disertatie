<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
				<BackButton />
				<LoadingWrapper :loading="loading">
					<div v-if="product">
						<h2 class="subtitle">
							{{ translatedValues.subtitle }}
						</h2>
						<div
							class="flex flex-col items-center justify-center gap-0 lg:items-start lg:flex-row lg:gap-3 xl:gap-0"
						>
							<div
								class="mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg"
							>
								<table class="min-w-full divide-y divide-gray-200">
									<tbody>
										<tr>
											<td>
												{{ translatedValues.serialNumber }}
											</td>
											<td>{{ product.serialNumber }}</td>
										</tr>
										<tr>
											<td>GUID</td>
											<td>{{ product.deviceID }}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div>
								<GoogleMap
									v-if="!mapLoading"
									api-key="AIzaSyC7zv3FXxWveL_O3F2BA4E90m1buO0nH5U"
									style="width: 400px; height: 400px"
									:center="showLiveLocation"
									:zoom="20"
								>
									<Marker :options="{ position: showLiveLocation }" />
								</GoogleMap>
								<div
									v-else
									class="flex items-center justify-center gap-3 bg-gray-100 rounded shadow"
									style="width: 400px; height: 400px"
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
						<div v-if="locations.length > 0">
							<PaginatedTable
								:headers="headers"
								:items="locations"
								:page="page"
								:action="toggleModal"
								:view-modal="viewModal"
							/>
							<BaseModal
								:modalActive="modalActive"
								:show-buttons="false"
								@close-modal="toggleModal(null)"
							>
								<GoogleMap
									api-key="AIzaSyC7zv3FXxWveL_O3F2BA4E90m1buO0nH5U"
									style="width: 500px; height: 500px"
									:center="showLocation"
									:zoom="10"
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
	import { GoogleMap, Marker } from "vue3-google-map";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import PaginatedTable from "../components/PaginatedTable.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import BaseModal from "../components/BaseModal.vue";
	import BackButton from "../components/BackButton.vue";
	import mqtt from "mqtt";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const route = useRoute();
	const id = route.params.id;
	const locations = ref([]);
	const product = ref();
	const loading = ref(true);
	const page = ref("product");
	const modalActive = ref(null);
	const showLocation = reactive({ lat: 0, lng: 0 });
	const viewModal = ref(true);
	console.log(
		"Before initialization Latitude:",
		showLocation.lat,
		"Longitude:",
		showLocation.lng
	);

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
		};
	});

	const headers = ref([
		"Nr. Crt.",
		translatedValues.value.latitude,
		translatedValues.value.longitude,
		translatedValues.value.date,
		translatedValues.value.time,
		"",
		"",
	]);

	const toggleModal = (id) => {
		modalActive.value = !modalActive.value;
		if (id !== null && locations.value[id]) {
			showLocation.lat = Number(locations.value[id].latitude);
			showLocation.lng = Number(locations.value[id].longitude);
		} else {
			// Reset location or handle null case
			showLocation.lat = 0;
			showLocation.lng = 0;
		}
		console.log("Latitude:", showLocation.lat, "Longitude:", showLocation.lng);
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

	const showLiveLocation = ref({ lat: 0, lng: 0 });
	const mapLoading = ref(true);

	const options = {
		username: process.env.VUE_APP_USERNAME,
		password: process.env.VUE_APP_PASSWORD,
		clientId: process.env.VUE_APP_CLIENT_ID,
		protocol: process.env.VUE_APP_PROTOCOL,
		hostname: process.env.VUE_APP_HOSTNAME,
		port: process.env.VUE_APP_PORT,
	};

	const client = mqtt.connect(options);

	client.on("connect", function () {
		console.log("Connected to MQTT Broker");
		client.subscribe("alextassy24/feeds/gps", function (err) {
			if (!err) {
				console.log("Subscribed to topic: alextassy24/feeds/gps");
			} else {
				console.error("Subscription error: ", err);
			}
		});
	});

	client.on("message", function (topic, message) {
		console.log(`Received message: ${message.toString()}`);
		const data = JSON.parse(message.toString());
		if (data.lat && data.lon) {
			showLiveLocation.value = { lat: data.lat, lng: data.lon };
		}
	});

	client.on("error", function (err) {
		console.error("Connection error: ", err);
	});

	client.on("close", function () {
		console.log("Connection closed");
	});

	onMounted(() => {
		getProductData();
	});
</script>
