<template>
	<div
		class="relative"
		@mouseover="show = true"
		@mouseleave="show = false"
		@click="hideTooltip"
	>
		<slot></slot>
		<div
			v-if="show"
			class="absolute z-10 px-2 py-1 mt-1 text-sm font-bold text-white bg-black rounded-md shadow-lg animate__animated animate__fadeIn"
			:class="{
				'whitespace-normal': isSmallScreen,
				'whitespace-nowrap': !isSmallScreen,
			}"
			:style="{ maxWidth: isSmallScreen ? '150px' : 'none' }"
		>
			{{ text }}
		</div>
	</div>
</template>

<script setup>
	import { ref, defineProps } from "vue";
	import { useScreenSize } from "../utils/useScreenSize";

	defineProps({
		text: {
			type: String,
			required: true,
		},
	});

	const show = ref(false);
	const { isSmallScreen } = useScreenSize();

	const hideTooltip = () => {
		show.value = false;
	};
</script>
