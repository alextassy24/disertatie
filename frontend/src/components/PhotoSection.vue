<template>
	<div
		class="flex flex-col items-center justify-between md:flex-row"
		:class="{ 'mb-5': toggler, 'mb-2': !toggler }"
	>
		<h2 class="mb-5 text-2xl font-bold text-green-500 md:mb-0">
			{{ index }}. {{ title }}
		</h2>
		<button
			class="flex items-center gap-2 font-bold btn-primary w-full md:w-[8rem] justify-center"
			@click="toggler = !toggler"
		>
			<i
				class="fa-solid"
				:class="{
					'fa-chevron-up': toggler,
					'fa-chevron-down': !toggler,
				}"
			></i>
			<span>
				{{
					toggler ? translatedValues.collapse : translatedValues.show
				}}
			</span>
		</button>
	</div>

	<Transition name="fade">
		<div
			v-if="toggler"
			class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
		>
			<img
				v-for="(photo, photoIndex) in images"
				:key="photoIndex"
				loading="lazy"
				:src="photo.image"
				class="transition mx-auto duration-300 rounded-lg shadow hover:shadow-2xl hover:cursor-pointer hover:scale-105 h-[400px]"
				@click="
					toggleModal();
					choosePhoto(photo.image, photoIndex, images);
				"
			/>
		</div>
	</Transition>
</template>

<script setup>
	import { computed } from "vue";
	import { useI18n } from "vue-i18n";

	defineProps({
		index: Number,
		toggler: Boolean,
		toggleModal: {
			type: Function,
		},
		choosePhoto: {
			type: Function,
		},
		images: Array,
		title: String,
	});

	const { t } = useI18n();
	const translatedValues = computed(() => {
		return {
			show: t("utils.Show"),
			collapse: t("utils.Collapse"),
		};
	});
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
