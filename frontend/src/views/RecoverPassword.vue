<template>
	<NotAuthenticatedWrapper>
		<section class="container px-10 py-16 mx-auto mt-28">
			<h1
				v-if="isValid && !successMessage"
				class="mb-10 text-4xl font-bold text-center"
			>
				{{ translatedValues.title }}
			</h1>
			<div
				v-if="isValid && !successMessage"
				class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl"
			>
				<div
					v-if="errorMessage"
					class="p-3 mb-3 font-bold text-red-600 bg-red-200 rounded-lg shadow"
				>
					{{ errorMessage }}
				</div>
				<Form
					v-if="!successMessage"
					:validation-schema="validationSchema"
					@submit="onSubmit"
					class="mb-3"
				>
					<div class="flex flex-col mb-5">
						<label class="form-label">{{
							translatedValues.newPassword
						}}</label>
						<Field
							id="newPassword"
							type="password"
							name="newPassword"
							class="form-field"
							v-model="newPassword"
						/>
						<ErrorMessage
							name="newPassword"
							class="error-message"
						/>
					</div>
					<div class="flex flex-col mb-5">
						<label class="form-label">{{
							translatedValues.confirmPassword
						}}</label>
						<Field
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							class="form-field"
							v-model="confirmPassword"
						/>
						<ErrorMessage
							name="confirmPassword"
							class="error-message"
						/>
					</div>
					<div class="flex justify-center mb-3">
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
			</div>
			<div
				v-if="successMessage"
				class="w-3/4 m-5 mx-auto md:w-2/4"
			>
				<div
					class="p-3 mb-10 text-xl font-bold text-center text-green-600 bg-green-200 rounded-lg shadow"
				>
					{{ successMessage }}
				</div>
			</div>
			<div
				v-if="tokenErrorMessage"
				class="w-3/4 m-5 mx-auto md:w-2/4"
			>
				<div
					class="p-3 mb-10 text-xl font-bold text-center text-red-600 bg-red-200 rounded-lg shadow"
				>
					{{ tokenErrorMessage }}
				</div>
			</div>
		</section>
	</NotAuthenticatedWrapper>
</template>

<script setup>
	import { ref, computed, onMounted } from "vue";
	import { toTypedSchema } from "@vee-validate/zod";
	import { ErrorMessage, Field, Form } from "vee-validate";
	import { useRoute } from "vue-router";
	import { z } from "zod";
	import { useAuthStore } from "../store/auth";
	import { useI18n } from "vue-i18n";
	import axios from "axios";
	import NotAuthenticatedWrapper from "../components/NotAuthenticatedWrapper.vue";

	const route = useRoute();
	const token = route.query.token;
	const { t } = useI18n();
	const authStore = useAuthStore();

	const translatedValues = computed(() => {
		return {
			title: t("change-password.Title"),
			newPassword: t("change-password.NewPassword"),
			confirmPassword: t("change-password.ConfirmPassword"),
			btn: t("utils.Btn"),
			btnLoading: t("utils.BtnLoading"),
			newPasswordError: {
				required: t("change-password.NewPasswordError.Required"),
			},
			passwordError: {
				length: t("register.PasswordError.Length"),
				upperCase: t("register.PasswordError.UpperCase"),
				lowerCase: t("register.PasswordError.LowerCase"),
				number: t("register.PasswordError.Number"),
				special: t("register.PasswordError.Special"),
			},
			confirmPasswordError: {
				required: t("register.ConfirmPasswordError.Required"),
				match: t("register.ConfirmPasswordError.Match"),
			},
			tokenNotFound: t("confirm-email.TokenNotFound"),
			tokenInvalid: t("confirm-email.TokenInvalid"),
			tokenExpired: t("confirm-email.TokenExpired"),
			userNotFound: t("confirm-email.UserNotFound"),
			successMessage: t("change-password.SuccessMessage"),
			unauthorized: t("change-password.Unauthorized"),
			samePasswords: t("change-password.SamePasswords"),
			failedToChange: t("change-password.FailedToChange"),
			incorrectPassword: t("change-password.IncorrectPassword"),
			modelFailed: t("change-password.ModelFailed"),
			successMessage: t("change-password.SuccessMessage"),
		};
	});

	const newPassword = ref("");
	const confirmPassword = ref("");
	const successMessage = ref("");
	const errorMessage = ref("");
	const tokenErrorMessage = ref("");
	const isValid = ref(false);
	const isLoading = ref(false);

	const validationSchema = toTypedSchema(
		z.object({
			newPassword: z
				.string()
				.min(1, translatedValues.value.newPasswordError.required)
				.min(6, translatedValues.value.passwordError.length)
				.refine((value) => /[a-z]/.test(value), {
					message: translatedValues.value.passwordError.lowerCase,
				})
				.refine((value) => /[A-Z]/.test(value), {
					message: translatedValues.value.passwordError.upperCase,
				})
				.refine((value) => /[0-9]/.test(value), {
					message: translatedValues.value.passwordError.number,
				})
				.refine(
					(value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value),
					{
						message: translatedValues.value.passwordError.special,
					}
				),
			confirmPassword: z
				.string()
				.min(1, translatedValues.value.confirmPasswordError.required)
				.refine((value) => value == newPassword.value, {
					message: translatedValues.value.confirmPasswordError.match,
				}),
		})
	);

	function clearErrors() {
		errorMessage.value = "";
		successMessage.value = "";
	}

	const checkToken = async () => {
		await axios
			.get(
				`${userStore.apiAddress}/api/account/check-token?token=${token}`
			)
			.then((response) => {
				// console.log(response);
				if (response.status === 200) {
					isValid.value = true;
				}
			})
			.catch((error) => {
				console.log(error);

				switch (error.response.data.message) {
					case 0:
						tokenErrorMessage.value =
							translatedValues.value.tokenInvalid;
						break;

					case 1:
						tokenErrorMessage.value =
							translatedValues.value.tokenNotFound;
						break;

					case 2:
						tokenErrorMessage.value =
							translatedValues.value.tokenExpired;
						break;

					case 3:
						tokenErrorMessage.value =
							translatedValues.value.userNotFound;
						break;
				}
			});
	};

	const onSubmit = async () => {
		clearErrors();
		isLoading.value = true;

		const formData = {
			newPassword: newPassword.value,
			confirmPassword: confirmPassword.value,
			token,
		};

		await axios
			.post(
				`${authStore.apiAddress}/api/account/recover-password`,
				formData
			)
			.then((response) => {
				// console.log(response);
				if (response.status === 200) {
					successMessage.value =
						translatedValues.value.successMessage;
				}
			})
			.catch((error) => {
				// console.error(error);
				isLoading.value = false;

				switch (error.response.data.message) {
					case 0:
						errorMessage.value = translatedValues.value.modelFailed;
						break;

					case 1:
						errorMessage.value =
							translatedValues.value.tokenNotFound;
						break;

					case 2:
						errorMessage.value =
							translatedValues.value.userNotFound;
						break;

					case 3:
						errorMessage.value = translatedValues.value.failed;
						break;
				}
			});
	};

	onMounted(checkToken);
</script>
