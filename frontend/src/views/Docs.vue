<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="px-10 py-16 bg-gray-100">
			<div class="container mx-auto">
				<div class="flex flex-col items-start gap-10 md:flex-row">
					<div
						v-if="isMediumScreenOrAbove"
						class="p-3 bg-white rounded-lg shadow-lg lg:w-1/5 md:w-2/5"
					>
						<ul>
							<li
								v-for="(section, index) in docsSections"
								:key="index"
								class="p-2 mb-3 rounded-lg hover:cursor-pointer hover:font-bold hover:bg-green-300 hover:text-white"
								:class="{
									'bg-green-500 text-white font-bold shadow-lg':
										selectedSection.title == section.title,
								}"
								@click="selectSection(section)"
							>
								<h1>{{ section.title }}</h1>
							</li>
						</ul>
					</div>
					<button
						class="block md:hidden btn-primary"
						@click="menuToggler = !menuToggler"
					>
						<i class="fa-solid fa-bars"></i>
					</button>
					<div
						v-if="isSmallScreen && menuToggler"
						class="p-3 bg-white rounded-lg shadow-lg lg:w-1/5 md:w-2/5"
					>
						<ul>
							<li
								v-for="(section, index) in docsSections"
								:key="index"
								class="p-2 mb-3 rounded-lg hover:cursor-pointer hover:font-bold hover:bg-green-300 hover:text-white"
								:class="{
									'bg-green-500 text-white font-bold shadow-lg':
										selectedSection.title == section.title,
								}"
								@click="selectSection(section)"
							>
								<h1>{{ section.title }}</h1>
							</li>
						</ul>
					</div>
					<Transition name="fade">
						<div
							class="w-full p-3 bg-white rounded-lg md:w-3/5 lg:w-4/5 animate__animated animate__fadeIn"
						>
							<div class="m-3">
								<h1 class="mb-5 text-2xl font-bold">
									{{ selectedSection.title }}
								</h1>
								<div
									v-for="(
										paragraph, index
									) in selectedSection.text"
									:key="index"
									class="mb-7"
								>
									<h2 class="mb-3 font-semibold">
										{{ paragraph.subtitle }}
									</h2>
									<div>{{ paragraph.context }}</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { computed, ref, onMounted, onUnmounted } from "vue";
	import { useI18n } from "vue-i18n";
	import Hero from "../components/Hero.vue";

	const { t } = useI18n();
	const menuToggler = ref(false);

	const translatedValues = computed(() => {
		return {
			title: t("docs.Title"),
		};
	});

	const docsSections = computed(() => [
		{
			title: t("docs.Register.Title"),
			toggler: false,
			text: [
				{ subtitle: "Pas 1", context: "test test test ets " },
				{ subtitle: "Pas 2", context: "test test test ets " },
			],
		},
		{
			title: t("docs.EmailConfirmation.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.ResendEmailConfirmation.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.ForgotPassword.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.RecoverPassword.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.ChangePassword.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.WearerRegister.Title"),
			toggler: false,
			text: {},
		},
		{
			title: t("docs.ProductRegister.Title"),
			toggler: false,
			text: {},
		},
	]);

	const selectedSection = ref(docsSections.value[0]);

	const selectSection = (section) => {
		selectedSection.value = section;
		menuToggler.value = false;
		window.scrollTo(0, 0);
	};

	const screenWidth = ref(window.innerWidth);
	const breakpoints = {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		xxl: 1536,
	};

	const checkScreenSize = () => {
		screenWidth.value = window.innerWidth;
	};

	const isMediumScreenOrAbove = computed(
		() => screenWidth.value >= breakpoints.md
	);
	const isSmallScreen = computed(() => screenWidth.value < breakpoints.md);

	onMounted(() => {
		window.addEventListener("resize", checkScreenSize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", checkScreenSize);
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
