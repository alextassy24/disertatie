<template>
	<div class="mt-28">
		<Hero
			:title="translatedValues.title"
			:subtitle="subtitle"
		/>
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
								class="p-2 mb-3 font-bold transition-colors rounded-lg select-none hover:cursor-pointer hover:bg-green-300 hover:text-white"
								:class="{
									'bg-green-500 text-white font-bold shadow-lg scale-105':
										selectedSection.title == section.title,
								}"
								@click="selectSection(section)"
							>
								<h1>{{ index + 1 }}. {{ section.title }}</h1>
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
						class="p-3 bg-white rounded-lg shadow-lg lg:w-1/5 md:w-2/5 animate__animated animate__fadeIn"
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
								<h1>{{ index + 1 }}.{{ section.title }}</h1>
							</li>
						</ul>
					</div>
					<div
						v-if="selectedSection"
						class="w-full p-3 bg-white rounded-lg md:w-3/5 lg:w-4/5 animate__animated animate__fadeInRight"
					>
						<InstructionSection
							:selected-section="selectedSection"
						/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { computed, ref, onMounted, onUnmounted } from "vue";
	import { useI18n } from "vue-i18n";
	import Hero from "../components/Hero.vue";
	import InstructionSection from "../components/InstructionSection.vue";

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
			text: [
				// { subtitle: t("docs.Register."), context: t("docs.Register.") },
				{
					context: t("docs.Register.Context.RequiredData"),
				},
				{
					context: t("docs.Register.Context.Process"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t("docs.Register.Context.Step1Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t("docs.Register.Context.Step2Info"),
					warning: t("docs.Register.Context.Step2Warning"),
				},
				{
					subtitle: t("docs.Register.Context.Step3"),
					context: t("docs.Register.Context.Step3Info"),
				},
			],
		},
		{
			title: t("docs.EmailConfirmation.Title"),
			text: [
				{
					context: t("docs.EmailConfirmation.Context.Process"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t("docs.EmailConfirmation.Context.Step1Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t("docs.EmailConfirmation.Context.Step2Info"),
					warning: t("docs.Register.Context.Step2Warning"),
				},
			],
		},
		{
			title: t("docs.ResendEmailConfirmation.Title"),
			text: [
				{
					context: t("docs.ResendEmailConfirmation.Context.Process"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t(
						"docs.ResendEmailConfirmation.Context.Step1Info"
					),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t(
						"docs.ResendEmailConfirmation.Context.Step2Info"
					),
				},
				{
					subtitle: t("docs.Register.Context.Step3"),
					context: t("docs.EmailConfirmation.Context.Step2Info"),
				},
			],
		},
		{
			title: t("docs.ForgotPassword.Title"),
			text: [
				{
					context: t("docs.ForgotPassword.Context.Process"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t("docs.ForgotPassword.Context.Step1Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t("docs.ForgotPassword.Context.Step2Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step3"),
					context: t("docs.ForgotPassword.Context.Step3Info"),
				},
			],
		},
		{
			title: t("docs.WearerRegister.Title"),
			text: [
				{
					context: t("docs.WearerRegister.Context.Process"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t("docs.WearerRegister.Context.Step1Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t("docs.WearerRegister.Context.Step2Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step3"),
					context: t("docs.WearerRegister.Context.Step3Info"),
				},
			],
		},
		{
			title: t("docs.ProductRegister.Title"),
			text: [
				{
					context: t("docs.ProductRegister.Context.Process"),
				},
				{
					warning: t("docs.ProductRegister.Context.Warning"),
				},
				{
					subtitle: t("docs.Register.Context.Step1"),
					context: t("docs.ProductRegister.Context.Step1Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step2"),
					context: t("docs.ProductRegister.Context.Step2Info"),
				},
				{
					subtitle: t("docs.Register.Context.Step3"),
					context: t("docs.ProductRegister.Context.Step3Info"),
				},
			],
		},
	]);

	const selectedSection = ref(docsSections.value[0]);
	const subtitle = computed(() => {
		return selectedSection.value.title;
	});

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
		transition: opacity 1s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
