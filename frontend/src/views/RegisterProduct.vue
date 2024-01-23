<template>
	<div v-if="authStore.isAuthenticated" class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="px-10 py-16">
			<div
				class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl"
			>
				<form action="" class="mb-3">
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{ translatedValues.deviceSerialNumber }}</label>
						<input type="text" class="form-field" />
					</div>
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{ translatedValues.deviceGUID }}</label>
						<input type="text" class="form-field" />
					</div>
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{ translatedValues.fullName }}</label>
						<input type="text" class="form-field" />
					</div>
					<div class="relative flex flex-col mb-5">
						<label class="form-label">{{ translatedValues.age }}</label>
						<input type="text" class="form-field" />
					</div>
					<div class="flex justify-center">
						<button type="submit" class="btn">{{ translatedValues.btn }}</button>
					</div>
				</form>
			</div>
		</section>
	</div>
	<NotAuthenticated class="mt-36" v-else />

</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../store/auth";
import Hero from "../components/Hero.vue";
import NotAuthenticated from "../components/NotAuthenticated.vue";

const { t } = useI18n();
const authStore = useAuthStore();

const translatedValues = computed(() => {
	return {
		title: t("register-product.Title"),
		deviceSerialNumber: t("register-product.DeviceSerialNumber"),
		deviceGUID: t("register-product.DeviceGUID"),
		fullName: t("register-product.FullName"),
		age: t("register-product.Age"),
		btn: t("register-product.Btn"),
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
</style>
