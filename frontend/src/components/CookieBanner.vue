<template>
	<transition
		name="banner-animation"
		appear
	>
		<div
			v-if="shouldShowBanner"
			class="fixed bottom-0 left-0 w-full p-5 text-white bg-green-500 border-t-4 border-black shadow"
		>
			<div class="container mx-auto">
				<div
					class="flex flex-row items-center justify-between gap-3 px-5 mx-auto mb-5"
				>
					<h1 class="text-2xl font-bold">
						{{ translatedValues.title }}
					</h1>
					<span
						@click="showBanner = false"
						class="text-2xl transition duration-300 ease-in-out hover:cursor-pointer hover:text-black"
					>
						<i class="fa-solid fa-circle-xmark"></i>
					</span>
				</div>
				<div class="flex flex-col gap-3 px-5 mx-auto">
					<p class="text-lg text-justify">
						{{ translatedValues.text }}
					</p>
					<div>
						<button
							class="btn"
							@click="authStore.setCookiePolicy()"
						>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
	import { computed, ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useAuthStore } from "../store/auth";

	const { t } = useI18n();
	const authStore = useAuthStore();
	const showBanner = ref(true);

	const translatedValues = computed(() => ({
		title: t("cookie.Title"),
		text: t("cookie.Text"),
	}));

	const shouldShowBanner = computed(
		() => !authStore.cookiePolicy && showBanner.value
	);
</script>

<style scoped>
	.banner-animation-enter-active,
	.banner-animation-leave-active {
		transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}

	.banner-animation-enter-from,
	.banner-animation-leave-to {
		opacity: 0;
	}

	.banner-animation-enter-active {
		transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
	}

	.banner-animation-leave-active {
		transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
	}
</style>
