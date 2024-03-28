<template>
	<a
		:href="component.link"
		target="_blank"
	>
		<div class="flex flex-col items-center gap-2 md:flex-row">
			<img
				v-if="component.icon"
				:src="component.icon"
				:alt="component.name"
				class="object-contain w-24 h-24 mb-4"
			/>
			<div>
				<h3 class="mb-2 text-xl font-semibold">{{ component.name }}</h3>
				<p class="mb-4">{{ component.text }}</p>
				<p>
					<strong>{{ translatedValues.usage }}:</strong>
					{{ component.usage }}
				</p>
			</div>
		</div>
	</a>
</template>

<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";
	const { t } = useI18n();

	const translatedValues = computed(() => {
		return {
			usage: t("home.Usage"),
		};
	});

	defineProps({
		component: {
			type: Object,
			required: true,
		},
	});
</script>
