<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
				<BackButton />
				<LoadingWrapper :loading="loading">
					<div v-if="product">
						<Toast />
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
									<table class="min-w-full mb-5 divide-y divide-gray-200">
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
											<tr>
												<td>{{ translatedValues.batteryStatus }}</td>
												<td>
													{{
														battery ? battery : translatedValues.batteryLoading
													}}
													<span v-if="battery">%</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div class="mt-5">
									<h2 class="subtitle">{{ translatedValues.deviceStatus }}</h2>
									<div
										class="overflow-y-auto h-52"
										v-if="statusMessages.length > 0"
									>
										<div
											v-for="(statusMessage, index) in statusMessages"
											:key="index"
										>
											<p>
												{{ statusMessages.length - index }}.
												{{ statusMessage.time }}
											</p>
											<Message
												:severity="statusMessage.severity"
												:closable="false"
												>{{ statusMessage.text }}</Message
											>
										</div>
									</div>
									<div
										v-else
										class="p-3 font-bold text-red-500 bg-red-200 rounded shadow"
									>
										{{ translatedValues.noMessages }}
									</div>
								</div>
							</div>

							<div>
								<h2 class="subtitle">
									{{ translatedValues.liveLocation }}
								</h2>
								<div v-if="!mapLoading">
									<GoogleMap
										api-key="AIzaSyC7zv3FXxWveL_O3F2BA4E90m1buO0nH5U"
										class="flex items-center md:justify-start md:items-start"
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
								</div>

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
							v-if="locations.length > 0"
							class="overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
						>
							<DataTable
								:value="locations"
								:rows="5"
								:rowsPerPageOptions="[5, 10, 20, 50]"
								paginator
								removableSort
								stripedRows
								scrollable
								scrollHeight="350px"
								selectionMode="single"
								dataKey="id"
								@rowSelect="onRowSelect"
							>
								<Column
									headerClass="text-white bg-black"
									field="latitude"
									:header="translatedValues.latitude"
									sortable
								></Column>
								<Column
									headerClass="text-white bg-black"
									field="longitude"
									:header="translatedValues.longitude"
									sortable
								></Column>
								<Column
									headerClass="text-white bg-black"
									field="date"
									:header="translatedValues.date"
									sortable
								></Column>
								<Column
									headerClass="text-white bg-black"
									field="time"
									:header="translatedValues.time"
									sortable
								></Column>
							</DataTable>
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
	import { ref, computed, onMounted, reactive, watch } from "vue";
	import { useRoute } from "vue-router";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";
	import { useScreenSize } from "../utils/useScreenSize";
	import { useToast } from "primevue/usetoast";
	import { GoogleMap, Marker } from "vue3-google-map";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import BaseModal from "../components/BaseModal.vue";
	import BackButton from "../components/BackButton.vue";
	import * as signalR from "@microsoft/signalr";
	import DataTable from "primevue/datatable";
	import Column from "primevue/column";
	import Toast from "primevue/toast";
	import Message from "primevue/message";

	const getCurrentTime = () => {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
	};

	const { t } = useI18n();
	const authStore = useAuthStore();
	const route = useRoute();
	const id = route.params.id;
	const locations = ref([]);
	const product = ref();
	const loading = ref(true);
	const modalActive = ref(null);
	const showLocation = ref({ lat: 0, lng: 0 });
	const statusMessages = ref([]);
	const battery = ref();

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
			locationReceived: t("product.LocationReceived"),
			deviceStatus: t("product.DeviceStatus"),
			connectedToServer: t("product.MessagesList.ConnectedToServer"),
			aquiringSignal: t("product.MessagesList.AquiringSignal"),
			noDataAvailable: t("product.MessagesList.NoDataAvaliable"),
			dataSent: t("product.MessagesList.DataSent"),
			noMessages: t("product.NoMessages"),
			batteryStatus: t("product.BatteryStatus"),
			batteryLoading: t("product.BatteryLoading"),
		};
	});

	const toast = useToast();

	const showSuccess = (location) => {
		toast.add({
			severity: "success",
			summary: translatedValues.value.locationReceived,
			detail: `Lat: ${location.latitude}, Lng: ${location.longitude}`,
			life: 3000,
		});
	};

	const toggleModal = () => {
		modalActive.value = !modalActive.value;
	};

	const onRowSelect = (event) => {
		const location = event.data;
		if (event.data.latitude != null && event.data.longitude != null) {
			showLocation.value = {
				lat: parseFloat(location.latitude),
				lng: parseFloat(location.longitude),
			};
		} else {
			showLocation.value.lat = 0;
			showLocation.value.lng = 0;
		}

		modalActive.value = !modalActive.value;
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
						// locations.value = response.data.locations;
						locations.value = response.data.locations.sort(
							(a, b) =>
								new Date(b.date + " " + b.time) -
								new Date(a.date + " " + a.time)
						);
					}
				});
		}
	};

	const showLiveLocation = ref({ lat: 0, lng: 0 });
	const mapLoading = ref(true);
	const mapKey = ref(0);
	if (authStore.isAuthenticated && product) {
		// console.log("trying websocket connection");
		const connection = new signalR.HubConnectionBuilder()
			.withUrl(`${authStore.apiAddress}/ws/gps-hub`)
			.build();

		connection
			.start()
			.then(() => console.log("Connected to SignalR Hub"))
			.catch((err) => {
				mapLoading.value = true;
				console.error("Error connecting to SignalR Hub:", err);
			});

		connection.on("ReceiveLocationUpdate", (location) => {
			if (location.productID === product.value.deviceID) {
				mapLoading.value = false;
				showLiveLocation.value.lat = parseFloat(location.latitude);
				showLiveLocation.value.lng = parseFloat(location.longitude);
				mapKey.value++;
				locations.value.unshift({
					latitude: location.latitude,
					longitude: location.longitude,
					date: location.date,
					time: location.time,
				});
				showSuccess(location);
			}
		});

		connection.on("ReceiveStatusUpdate", (status) => {
			// console.log(status);
			const message = {
				time: getCurrentTime(),
				text: "",
				severity: "",
			};

			switch (status) {
				case "1":
					message.text = translatedValues.value.connectedToServer;
					message.severity = "info";
					break;
				case "2":
					message.text = translatedValues.value.aquiringSignal;
					message.severity = "warn";
					break;
				case "3":
					message.text = translatedValues.value.noDataAvailable;
					message.severity = "error";
					break;
				case "4":
					message.text = translatedValues.value.dataSent;
					message.severity = "success";
					break;
			}
			// console.log(message);
			statusMessages.value.unshift(message);
		});

		connection.on("ReceiveBatteryUpdate", (status) => {
			console.log(status);
			battery.value = status;
		});
	}

	onMounted(() => {
		getProductData();
		// setInterval(updateTime, 1000);
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
