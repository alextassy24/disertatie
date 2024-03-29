<template>
	<div class="mt-28">
		<Hero :title="translatedValues.title" />
		<section class="px-10 py-16">
			<div class="container mx-auto">
				<div>
					<ul class="w-1/5 p-3 bg-gray-100 rounded-lg shadow-lg">
						<li
							v-for="(section, index) in docsSections"
							:key="index"
							class="p-2 mb-3 hover:cursor-pointer hover:font-bold hover:bg-green-400 hover:text-white hover:rounded-lg"
						>
							<h1>{{ section.title }}</h1>
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";
	import Hero from "../components/Hero.vue";

	const { t } = useI18n();
	const translatedValues = computed(() => {
		return {
			title: t("docs.Title"),
		};
	});

	const docsSections = computed(() => [
		{
			title: t("docs.Register"), // register
		},
		{
			title: t("docs.EmailConfirmation"), // confirm-email
		},
		{
			title: t("docs.ResendEmailConfirmation"), // resend-confirm-email
		},
		{
			title: t("docs.ForgotPassword"), // forgot-password
		},
		{
			title: t("docs.RecoverPassword"), // recover-password
		},
		{
			title: t("docs.ChangePassword"), // change-password
		},
		{
			title: t("docs.WearerRegister"), // wearer register
		},
		{
			title: t("docs.ProductRegister"), // product register
		},
	]);
</script>

<style scoped></style>
