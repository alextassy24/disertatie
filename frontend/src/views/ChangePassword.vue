<template>
	<AuthenticatedWrapper>
		<section class="container px-10 py-16 mx-auto mt-28">
			<div v-if="!successMessage">
				<h1 class="mb-10 text-4xl font-bold text-center">
					{{ translatedValues.title }}
				</h1>
				<div
					class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl"
				>
					<div
						v-if="errorMessage"
						class="p-3 mb-3 font-bold text-red-600 bg-red-300 rounded-lg shadow"
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
								translatedValues.oldPassword
							}}</label>
							<Field
								id="oldPassword"
								type="password"
								name="oldPassword"
								class="form-field"
								v-model="oldPassword"
							/>
							<ErrorMessage
								name="oldPassword"
								class="error-message"
							/>
						</div>
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
			</div>
			<div
				v-else
				class="w-3/4 m-5 mx-auto md:w-2/4"
			>
				<div
					class="p-3 mb-10 font-bold text-center text-green-600 bg-green-200 rounded-lg shadow"
				>
					{{ successMessage }}
				</div>
				<div
					class="flex flex-col items-center justify-center gap-5 md:flex-row"
				>
					<div
						class="text-green-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status"
					>
						<span
							class="!overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
						></span>
					</div>
					<div class="text-center md:text-start">
						{{ translatedValues.redirect }}...
					</div>
				</div>
			</div>
		</section>
	</AuthenticatedWrapper>
</template>

<script setup>
	import { toTypedSchema } from "@vee-validate/zod";
	import { ErrorMessage, Field, Form } from "vee-validate";
	import { z } from "zod";
	import { ref, computed } from "vue";
	import { useAuthStore } from "../store/auth";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";
	import axios from "axios";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";

	const router = useRouter();
	const authStore = useAuthStore();
	const { t } = useI18n();

	const translatedValues = computed(() => {
		return {
			title: t("change-password.Title"),
			oldPassword: t("change-password.OldPassword"),
			newPassword: t("change-password.NewPassword"),
			confirmPassword: t("change-password.ConfirmPassword"),
			btn: t("utils.Btn"),
			btnLoading: t("utils.BtnLoading"),
			oldPasswordError: {
				required: t("change-password.OldPasswordError.Required"),
			},
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
			redirect: t("change-password.Redirect"),
			successMessage: t("change-password.SuccessMessage"),
			unauthorized: t("change-password.Unauthorized"),
			samePasswords: t("change-password.SamePasswords"),
			failedToChange: t("change-password.FailedToChange"),
			incorrectPassword: t("change-password.IncorrectPassword"),
			modelFailed: t("change-password.ModelFailed"),
		};
	});

	const oldPassword = ref("");
	const newPassword = ref("");
	const confirmPassword = ref("");
	const successMessage = ref("");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const validationSchema = toTypedSchema(
		z.object({
			oldPassword: z
				.string()
				.min(1, translatedValues.value.oldPasswordError.required)
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

	function onSubmit() {
		clearErrors();
		isLoading.value = true;

		const formData = {
			currentPassword: oldPassword.value,
			newPassword: newPassword.value,
			confirmPassword: confirmPassword.value,
		};

		const config = {
			headers: { Authorization: `Bearer ${authStore.token}` },
		};

		axios
			.post(`${apiAddress}/api/account/change-password`, formData, config)
			.then((response) => {
				// console.log(response);
				if (response.status === 200) {
					successMessage.value =
						translatedValues.value.successMessage;

					setTimeout(() => {
						router.push("/");
					}, 2000);
				}
			})
			.catch((error) => {
				// console.log(error)
				isLoading.value = false;

				if (error.response.status == 401) {
					errorMessage.value = translatedValues.value.unauthorized;
				} else {
					switch (error.response.data.message) {
						case 1:
							errorMessage.value =
								translatedValues.value.samePasswords;
							break;
						case 2:
							errorMessage.value =
								translatedValues.value.failedToChange;
							break;
						case 3:
							errorMessage.value =
								translatedValues.value.incorrectPassword;
							break;
						case 4:
							errorMessage.value =
								translatedValues.value.modelFailed;
							break;
					}
				}
			});
	}
</script>
