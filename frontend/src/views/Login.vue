<template>
	<section class="container px-10 py-16 mx-auto mt-28">
		<div v-if="!authStore.isAuthenticated">
			<h1 class="mb-10 text-4xl font-bold text-center">
				{{ translatedValues.title }}
			</h1>
			<div
				class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-2/4 xl:w-1/4 rounded-xl"
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
						<label class="form-label">Email</label>
						<Field
							id="email"
							type="email"
							name="email"
							class="form-field"
							v-model="email"
						/>
						<ErrorMessage
							name="email"
							class="error-message"
						/>
					</div>
					<div class="flex flex-col mb-5">
						<label class="form-label">{{
							translatedValues.password
						}}</label>
						<Field
							id="password"
							type="password"
							name="password"
							class="form-field"
							v-model="password"
						/>
						<ErrorMessage
							name="password"
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
				<div
					v-if="!successMessage"
					class="flex flex-col items-center gap-2"
				>
					<router-link
						class="login-link"
						to="/forgot-password"
					>
						{{ translatedValues.forgotPassword }}
					</router-link>
					<router-link
						class="login-link"
						to="/resend-email-confirmation"
					>
						{{ translatedValues.resendEmailConfirmation }}
					</router-link>
					<router-link
						class="login-link"
						to="/register"
					>
						{{ translatedValues.noAccount }}
					</router-link>
				</div>
			</div>
		</div>
		<div v-else>
			<div
				v-if="successMessage"
				class="w-3/4 m-5 mx-auto md:w-2/4"
			>
				<div
					v-if="successMessage"
					class="p-3 mb-10 font-bold text-center text-green-600 bg-green-200 rounded-lg shadow"
				>
					{{ successMessage }}
				</div>
				<div
					class="flex flex-col items-center justify-center gap-5 md:flex-row"
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
					<div class="text-center md:text-start">
						{{ translatedValues.redirect }}...
					</div>
				</div>
			</div>
			<AlreadyAuthenticated v-else />
		</div>
	</section>
</template>

<script setup>
	import { toTypedSchema } from "@vee-validate/zod";
	import { ErrorMessage, Field, Form } from "vee-validate";
	import { z } from "zod";
	import axios from "axios";
	import { ref, computed } from "vue";
	import { useAuthStore } from "../store/auth";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";
	import AlreadyAuthenticated from "../components/AlreadyAuthenticated.vue";

	const router = useRouter();
	const authStore = useAuthStore();
	const { t } = useI18n();

	const translatedValues = computed(() => {
		return {
			title: t("login.Title"),
			password: t("login.Password"),
			btn: t("utils.Btn"),
			btnLoading: t("utils.BtnLoading"),
			forgotPassword: t("login.ForgotPassword"),
			noAccount: t("login.NoAccount"),
			resendEmailConfirmation: t("login.ResendEmailConfirmation"),
			redirect: t("login.Redirect"),
			emailError: {
				required: t("register.EmailError.Required"),
				format: t("register.EmailError.Format"),
			},
			passwordError: {
				required: t("register.PasswordError.Required"),
				length: t("register.PasswordError.Length"),
				upperCase: t("register.PasswordError.UpperCase"),
				lowerCase: t("register.PasswordError.LowerCase"),
				number: t("register.PasswordError.Number"),
				special: t("register.PasswordError.Special"),
			},
			successMessage: t("login.SuccessMessage"),
			modelFailed: t("change-password.ModelFailed"),
		};
	});

	const email = ref("");
	const password = ref("");
	const successMessage = ref("");
	const errorMessage = ref("");
	const isLoading = ref(false);

	const validationSchema = toTypedSchema(
		z.object({
			email: z
				.string()
				.min(1, translatedValues.value.emailError.required)
				.email(translatedValues.value.emailError.format),
			password: z
				.string()
				.min(1, translatedValues.value.passwordError.required)
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
			email: email.value,
			password: password.value,
		};

		axios
			.post(`${authStore.apiAddress}/api/account/login`, formData)
			.then((response) => {
				// console.log(response);
				if (response.status == 200) {
					const user = {
						token: response.data.token,
						email: email.value,
					};
					authStore.login(user);

					successMessage.value =
						translatedValues.value.successMessage;

					setTimeout(() => {
						router.push("/");
					}, 2000);
				}
			})
			.catch((error) => {
				isLoading.value = false;
				// console.log(error)
				if (
					error.response.status === 404 ||
					error.response.status === 400
				) {
					errorMessage.value = translatedValues.value.modelFailed;
				}
			});
	}
</script>
