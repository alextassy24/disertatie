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
						<h2 class="subtitle">
							{{ translatedValues.locations }}
						</h2>
						<div v-if="locations.length > 0">
							<PaginatedTable
								:headers="headers"
								:items="locations"
								:page="page"
								:action="toggleModal"
								:link="link"
								:item-page="itemPage"
							/>
							<BaseModal
								:modalActive="modalActive"
								@close-modal="toggleModal(null)"
								@submit-modal="submitRequest"
							>
								<input
									type="hidden"
									v-model="deletedId"
								/>
								<h1 class="text-lg text-black">
									{{ translatedValues.deleteItem }}
									{{ deletedId }}?
								</h1>
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
	import { ref, computed, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import PaginatedTable from "../components/PaginatedTable.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import BaseModal from "../components/BaseModal.vue";
	import BackButton from "../components/BackButton.vue";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const route = useRoute();
	const id = route.params.id;
	const locations = ref([]);
	const product = ref();
	const loading = ref(true);
	const page = ref("product");
	const modalActive = ref(null);
	const deletedId = ref(null);

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
		};
	});

	const headers = ref([
		"Nr. Crt.",
		translatedValues.value.date,
		translatedValues.value.time,
		translatedValues.value.latitude,
		translatedValues.value.longitude,
		"",
		"",
	]);

	const toggleModal = (id) => {
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
						locations.value = response.data.locations;
					}
				});
		}
	};
	onMounted(getProductData);
</script>
