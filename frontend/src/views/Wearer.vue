<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
				<BackButton />
				<LoadingWrapper :loading="loading">
					<div v-if="wearerData">
						<h2 class="subtitle">
							{{ translatedValues.subtitle }}
						</h2>
						<div
							class="mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg"
						>
							<table class="min-w-full divide-y divide-gray-200">
								<tbody>
									<tr>
										<td>{{ translatedValues.name }}</td>
										<td>{{ wearerData.name }}</td>
									</tr>
									<tr>
										<td>{{ translatedValues.age }}</td>
										<td>{{ wearerData.age }}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="mb-8">
							<h2 class="subtitle">
								{{ translatedValues.products }}
							</h2>
							<div v-if="productsData.length > 0">
								<ul ref="products">
									<li
										v-for="(product, index) in productsData"
										:key="index"
									>
										{{ product.serialNumber }}
									</li>
								</ul>
							</div>
							<div
								v-else
								class="font-bold text-red-500"
							>
								{{ translatedValues.noProducts }}
							</div>
						</div>
					</div>
					<div
						v-else
						class="p-3 mx-auto mt-10 text-xl font-bold text-center text-red-500 bg-red-200 rounded shadow lg:w-2/4"
					>
						{{ translatedValues.noWearer }}
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
	import { useAutoAnimate } from "@formkit/auto-animate/vue";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
	import BaseModal from "../components/BaseModal.vue";
	import LoadingWrapper from "../components/LoadingWrapper.vue";
	import BackButton from "../components/BackButton.vue";

	const { t } = useI18n();
	const route = useRoute();
	const authStore = useAuthStore();
	const id = route.params.id;
	// console.log(id);
	const wearerData = ref();
	const productsData = ref();
	const loading = ref(true);

	const [products] = useAutoAnimate();

	const modalActive = ref(null);
	const deletedId = ref(null);
	const errorMessage = ref(null);

	const translatedValues = computed(() => {
		return {
			noWearer: t("wearer.NoWearer"),
			name: t("my-wearers.FullName"),
			age: t("my-wearers.Age"),
			subtitle: t("wearer.Subtitle"),
			products: t("wearer.Products"),
			noProducts: t("profile.NoProducts"),
			serialNumber: t("my-products.SerialNumber"),
			deleteItem: t("my-products.DeleteItem"),
			wearerHttpErrors: {
				unauthorized: t("utils.Unauthorized"),
				notFound: t("utils.NotFound"),
				serverError: t("utils.ServerError"),
			},
		};
	});

	const toggleModal = (id) => {
		deletedId.value = id;
		modalActive.value = !modalActive.value;
	};

	const config = {
		headers: { Authorization: `Bearer ${authStore.token}` },
	};

	const getData = async () => {
		await axios
			.get(`${authStore.apiAddress}/api/wearers/${id}`, config)
			.then((res) => {
				loading.value = false;
				if (res.status === 200) {
					wearerData.value = res.data.wearer;
					productsData.value = res.data.products;
				}
			})
			.catch((err) => {
				// console.log(err);
				switch (err.response.status) {
					case 401:
						errorMessage.value =
							translatedValues.value.wearerHttpErrors.unauthorized;
						break;
					case 404:
						errorMessage.value =
							translatedValues.value.wearerHttpErrors.notFound;
						break;
					case 500:
						errorMessage.value =
							translatedValues.value.wearerHttpErrors.serverError;
				}
			});
	};

	const submitRequest = async () => {
		const config = {
			headers: { Authorization: `Bearer ${authStore.token}` },
		};
		await axios
			.delete(
				`${authStore.apiAddress}/api/products/${deletedId.value}`,
				config
			)
			.then((response) => {
				if (response.status === 200) {
					getData();
					successMessage.value =
						translatedValues.value.successMessage;
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
