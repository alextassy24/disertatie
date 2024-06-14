<template>
	<div
		class="relative"
		@mouseover="show = true"
		@mouseleave="show = false"
	>
		<slot></slot>
		<div
			v-if="show"
			@click="setTimeout(clearText, 2000)"
			class="absolute z-10 px-2 py-1 mt-1 text-sm font-bold text-white bg-black rounded-md shadow-lg animate__animated animate__fadeIn whitespace-nowrap"
		>
			{{ text }}
		</div>
	</div>
</template>

<script setup>
	import { ref, defineProps } from "vue";

	defineProps({
		text: {
			type: String,
			required: true,
		},
	});
	const show = ref(false);

	const clearText = () => {
		show.value = false;
	};
</script>
