<template>
	<section class="px-10 py-16 mt-28">
		<div v-if="!authStore.isAuthenticated">
			<h1 class="mb-10 text-4xl font-bold text-center">{{ translatedValues.title }}</h1>
			<div
				class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-2/4 xl:w-1/4 rounded-xl">
				<div v-if="errorMessage" class="p-3 mb-3 font-bold text-red-600 bg-red-300 rounded-lg shadow">{{
					errorMessage }}
				</div>
				<Form v-if="!successMessage" :validation-schema="validationSchema" @submit="onSubmit" class="mb-3">
					<div class="flex flex-col mb-5">
						<label class="form-label">Email</label>
						<Field id="email" type="email" name="email" class="form-field" v-model="email" />
						<ErrorMessage name="email" class="error-message" />
					</div>
					<div class="flex flex-col mb-5">
						<label class="form-label">{{ translatedValues.password }}</label>
						<Field id="password" type="password" name="password" class="form-field" v-model="password" />
						<ErrorMessage name="password" class="error-message" />
					</div>
					<div class="flex justify-center mb-3">
						<button type="submit" :class="isLoading ? 'btn-loading' : 'btn'" :disabled="isLoading">
							{{ isLoading ? translatedValues.btnLoading : translatedValues.btn }}
						</button>
					</div>
				</Form>
				<div v-if="!successMessage" class="flex flex-col items-center gap-2">
					<router-link class="login-link" to="/forgot-password">
						{{ translatedValues.forgotPassword }}
					</router-link>
					<router-link class="login-link" to="/resend-email-confirmation">
						{{ translatedValues.resendEmailConfirmation }}
					</router-link>
					<router-link class="login-link" to="/register">
						{{ translatedValues.noAccount }}
					</router-link>
				</div>
			</div>
		</div>
		<div v-else>
			<div v-if="successMessage" class="w-3/4 m-5 mx-auto md:w-2/4">
				<div v-if="successMessage"
					class="p-3 mb-10 font-bold text-center text-green-600 bg-green-200 rounded-lg shadow">{{
						successMessage }}
				</div>
				<div class="flex flex-col items-center justify-center gap-5 md:flex-row">
					<div class="text-green-400 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
						role="status">
						<span class="!overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
					</div>
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
import { useRouter } from 'vue-router';
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
		modelFailed: t("change-password.ModelFailed")
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
			.refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
				message: translatedValues.value.passwordError.special,
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
		email: email.value,
		password: password.value
	};

	axios
		.post("http://127.0.0.1:5088/api/account/login", formData)
		.then((response) => {
			// console.log(response);
			if (response.status == 200) {
				const user = {
					token: response.data.token,
					email: email.value
				};
				authStore.login(user);

				successMessage.value = translatedValues.value.successMessage;

				setTimeout(() => {
					router.push('/');
				}, 2000);
			}
		})
		.catch((error) => {
			isLoading.value = false;
			// console.log(error)
			if (error.response.status === 404 || error.response.status === 400) {
				errorMessage.value = translatedValues.value.modelFailed;
			}
		});
}

</script>