<template>
	<section class="px-10 py-16 mt-28">
		<h1 class="mb-10 text-4xl font-bold text-center">{{ translatedValues.title }}</h1>
		<div
			class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl"
		>
			<form action="" class="mb-3">
				<div class="relative flex flex-col mb-5">
					<label class="form-label">Email</label>
					<input type="email" class="form-field" />
				</div>
				<div class="relative flex flex-col mb-5">
					<label class="form-label"> {{ translatedValues.password }} </label>
					<input type="password" class="form-field" />
				</div>
				<div class="flex justify-center">
					<button type="submit" class="btn">{{ translatedValues.btn }}</button>
				</div>
			</form>
			<router-link class="login-link" to="/forgot-password">
				{{ translatedValues.forgotPassword }}
			</router-link>

			<router-link class="login-link" to="/register">
				{{ translatedValues.noAccount }}
			</router-link>
		</div>
	</section>
</template>

<script setup>
import { ref, computed } from "vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const translatedValues = computed(() => {
	return {
		title: t("login.Title"),
		password: t("login.Password"),
		btn: t("login.Btn"),
		forgotPassword: t("login.ForgotPassword"),
		noAccount: t("login.NoAccount"),
	};
});
</script>

<style scoped>
.form-label {
	@apply mb-2;
}
.form-field {
	@apply p-2 px-5 rounded focus:outline-none bg-gray-100 focus:ring-2 focus:ring-green-400 focus:shadow-lg hover:shadow transition duration-300 ease-in-out  cursor-pointer w-full;
}
.btn {
	@apply bg-black text-white py-2 shadow rounded focus:ring-green-400 hover:ring-green-400 hover:ring-4 hover:text-green-400 transition duration-500 ease-in-out transform px-5;
}
.login-link {
	@apply relative text-black;
}

.login-link:before {
	content: "";
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: transparent;
	transform: scaleX(0);
	transform-origin: 0 50%;
	transition: transform 0.3s ease-in-out;
}

.login-link:hover:before {
	background: #66bb6a;
	transform: scaleX(1);
}
</style>
