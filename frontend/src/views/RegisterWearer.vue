<template>
	<div
		v-if="authStore.isAuthenticated"
		class="mt-28"
	>
		<Hero :title="translatedValues.title" />
		<section class="container w-full px-10 py-16 mx-auto md:w-3/4">
			<BackButton />
			<div
				class="flex flex-col items-center justify-center w-full py-10 mx-auto md:w-3/4 lg:w-2/4 xl:w-2/5bun"
				:class="
					!successMessage
						? 'bg-gray-200 rounded-xl shadow-lg'
						: 'bg-white'
				"
			>
				<Form
					v-if="!successMessage"
					:validation-schema="validationSchema"
					@submit="onSubmit"
					class="mb-3"
				>
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{
							translatedValues.fullName
						}}</label>
						<Field
							id="wearerName"
							type="text"
							name="wearerName"
							class="form-field"
							v-model="wearerName"
						/>
						<ErrorMessage
							name="wearerName"
							class="error-message"
						/>
					</div>
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{
							translatedValues.age
						}}</label>
						<Field
							id="wearerAge"
							type="text"
							name="wearerAge"
							class="form-field"
							v-model="wearerAge"
						/>
						<ErrorMessage
							name="wearerAge"
							class="error-message"
						/>
					</div>
					<div class="flex justify-center">
						<button
							type="submit"
							:class="isLoading ? 'btn-loading' : 'btn'"
							:disabled="isLoading"
						>
							{{
								isLoading
									? translatedValues.btnLoading
									: translatedValues.btn
							}}
						</button>
					</div>
				</Form>
				<div
					v-else
					class="p-3 mb-10 font-bold text-center text-green-600 bg-green-200 rounded-lg shadow"
				>
					{{ successMessage }}
				</div>
			</div>
		</section>
	</div>
	<NotAuthenticated
		class="mt-36"
		v-else
	/>
</template>

<script setup>
	import { toTypedSchema } from "@vee-validate/zod";
	import { ErrorMessage, Field, Form } from "vee-validate";
	import { z } from "zod";
	import axios from "axios";
	import { ref, computed } from "vue";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";
	import { useRouter } from "vue-router";
	import Hero from "../components/Hero.vue";
	import NotAuthenticated from "../components/NotAuthenticated.vue";
	import BackButton from "../components/BackButton.vue";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const router = useRouter();

	const wearerName = ref("");
	const wearerAge = ref("");

	const successMessage = ref("");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const translatedValues = computed(() => {
		return {
			title: t("register-wearer.Title"),
			fullName: t("register-wearer.FullName"),
			age: t("register-wearer.Age"),
			btn: t("utils.Btn"),

			btnLoading: t("utils.BtnLoading"),
			fullNameError: {
				required: t("register-wearer.FullNameError.Required"),
				lettersOnly: t("register-wearer.FullNameError.LettersOnly"),
			},
			ageError: {
				required: t("register-wearer.AgeError.Required"),
				numbersOnly: t("register-wearer.AgeError.NumbersOnly"),
			},
			successMessage: t("register-wearer.SuccessMessage"),
		};
	});

	const validationSchema = toTypedSchema(
		z.object({
			wearerName: z
				.string()
				.min(1, translatedValues.value.fullNameError.required)
				.refine((value) => /^[a-zA-Z\s]+$/.test(value), {
					message: translatedValues.value.fullNameError.lettersOnly,
				}),
			wearerAge: z
				.string()
				.min(1, translatedValues.value.ageError.required)
				.refine((value) => /^[0-9]+$/.test(value), {
					message: translatedValues.value.ageError.numbersOnly,
				}),
		})
	);

	function clearErrors() {
		errorMessage.value = "";
		successMessage.value = "";
	}

	function onSubmit() {
		clearErrors();
		isLoading.value = true;

		const formData = {
			wearerName: wearerName.value,
			wearerAge: wearerAge.value,
		};

		const config = {
			headers: { Authorization: `Bearer ${authStore.token}` },
		};

		axios
			.post(`${authStore.apiAddress}/api/wearers/`, formData, config)
			.then((response) => {
				// console.log(response);
				if (response.status === 200) {
					successMessage.value =
						translatedValues.value.successMessage;
					setTimeout(() => {
						router.push("/my-wearers");
					}, 2000);
				}
			})
			.catch((error) => {
				isLoading.value = false;
				// console.log(error)
				// if (error.response.status == 401) {
				// errorMessage.value = translatedValues.value.unauthorized;
				// } else {
				// }
			});
	}
</script>

<style scoped>
	.form-label {
		@apply mb-2;
	}

	.form-field {
		@apply p-2 px-5 rounded focus:outline-none bg-gray-100 focus:ring-2 focus:ring-green-400 focus:shadow-lg hover:shadow transition duration-300 ease-in-out cursor-pointer w-full;
	}

	.btn {
		@apply bg-black text-white py-2 shadow rounded focus:ring-green-400 hover:ring-green-400 hover:ring-4 hover:text-green-400 transition duration-500 ease-in-out transform px-5;
	}
</style>
