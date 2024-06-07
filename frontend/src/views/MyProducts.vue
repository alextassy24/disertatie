<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<Hero :title="translatedValues.title" />
			<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
				<BackButton />
				<LoadingWrapper :loading="loading">
					<div
						v-if="successMessage"
						class="success-message animate__animated"
						:class="{
							animate__fadeIn: fadeIn,
							animate__fadeOut: fadeOut,
						}"
					>
						<i class="fa-solid fa-circle-check"></i>
						<span>{{ translatedValues.successMessage }}</span>
					</div>

					<div v-if="products.length > 0">
						<div class="flex justify-end">
							<router-link
								to="/register-product"
								class="flex items-center gap-2 mb-3 btn"
							>
								<i class="fa-solid fa-plus"></i>
								<span class="hidden lg:inline">{{ translatedValues.add }}</span>
							</router-link>
						</div>
						<div
							class="overflow-x-scroll shadow lg:overflow-x-hidden rounded-xl"
						>
							<DataTable
								:value="products"
								dataKey="id"
								tableStyle="min-width: 50rem"
								:rows="5"
								:rowsPerPageOptions="[5, 10, 20, 50]"
								paginator
								sortMode="multiple"
								removableSort
								stripedRows
								class="text-center"
							>
								<Column
									field="serialNumber"
									:header="translatedValues.serialNumber"
									headerClass="text-white bg-black"
									sortable
								></Column>
								<Column
									field="deviceID"
									header="GUID"
									headerClass="text-white bg-black"
									sortable
								></Column>
								<Column headerClass="text-white bg-black">
									<template #body="slotProps">
										<div class="flex gap-2">
											<router-link
												:to="`/products/${slotProps.data.id}`"
												class="btn-primary"
												tag="button"
											>
												<i class="fa-solid fa-eye"></i>
											</router-link>
											<button
												class="btn-danger"
												@click="toggleModal(slotProps.data.id)"
											>
												<i class="fa-solid fa-trash-can"></i>
											</button>
										</div>
									</template>
								</Column>
							</DataTable>
						</div>
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
					<div v-else>
						<div
							class="flex flex-row items-center justify-center w-2/3 gap-3 p-3 mx-auto text-lg font-bold text-red-500 bg-red-200 rounded md:w-1/3"
						>
							<i class="fa-solid fa-circle-xmark"></i>
							<span>{{ translatedValues.noProducts }}</span>
						</div>
						<div
							class="flex items-center justify-between w-full gap-3 mx-auto mt-8 md:w-1/2"
						>
							<span>{{ translatedValues.addProducts }}</span>
							<router-link
								to="/register-product"
								class="flex items-center gap-2 btn"
							>
								<i class="fa-solid fa-plus"></i>
								<span class="hidden lg:block">
									{{ translatedValues.add }}
								</span>
							</router-link>
						</div>
					</div>
				</LoadingWrapper>
			</section>
		</div>
	</AuthenticatedWrapper>
</template>

<script setup>
	import axios from "axios";
	import { ref, inject, computed, onMounted } from "vue";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";
	import Hero from "../components/Hero.vue";
	import BaseModal from "../components/BaseModal.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import BackButton from "../components/BackButton.vue";
	import DataTable from "primevue/datatable";
	import Column from "primevue/column";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const successMessage = ref("");
	const modalActive = ref(false);
	const deletedId = ref(null);
	const emitter = inject("emitter");

	const products = ref([]);
	const fadeIn = ref(true);
	const fadeOut = ref(false);
	const loading = ref(true);

	const translatedValues = computed(() => {
		return {
			title: t("my-products.Title"),
			noProducts: t("profile.NoProducts"),
			addProducts: t("my-wearers.AddWearers"),
			add: t("utils.Add"),
			serialNumber: t("my-products.SerialNumber"),
			wearer: t("my-products.Wearer"),
			deleteItem: t("my-products.DeleteItem"),
			successMessage: t("my-products.SuccessMessage"),
		};
	});

	const toggleModal = (id) => {
		deletedId.value = id;
		modalActive.value = !modalActive.value;
		emitter.emit("modal-active", modalActive.value);
	};

	const getData = async () => {
		if (authStore.isAuthenticated) {
			const config = {
				headers: { Authorization: `Bearer ${authStore.token}` },
			};
			await axios
				.get(`${authStore.apiAddress}/api/products/`, config)
				.then((response) => {
					loading.value = false;
					if (response.status === 200 && response.data.products) {
						products.value = response.data.products;
					}
				});
		}
	};

	const submitRequest = async () => {
		const config = {
			headers: { Authorization: `Bearer ${authStore.token}` },
		};
		await axios
			.delete(`${authStore.apiAddress}/api/products/${deletedId.value}`, config)
			.then((response) => {
				if (response.status === 200) {
					getData();

					successMessage.value = translatedValues.value.successMessage;
					setTimeout(() => {
						fadeIn.value = false; // Remove fadeIn class
						setTimeout(() => {
							fadeOut.value = true; // Add fadeOut class
							setTimeout(() => {
								successMessage.value = false; // Remove the success message from the DOM
							}, 1000); // Delay the removal of the element after the fade out animation completes
						}, 1000); // Delay adding the fadeOut class after the fadeIn animation completes
					}, 3000);
				}
			})
			.catch((error) => {
				console.error(error);
			});

		fadeIn.value = true;
		fadeOut.value = false;
		toggleModal(null);
	};

	onMounted(getData);
</script>

<style scoped>
	.success-message {
		@apply flex items-center gap-3 p-3 mb-3 text-lg font-bold text-green-500 bg-green-200 rounded-lg;
	}
</style>
