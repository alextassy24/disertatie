<template>
	<section class="px-10 py-10 text-white bg-black">
		<div class="container mx-auto text-justify">
			<h1
				class="text-4xl font-semibold text-center align-middle"
				:class="{ 'mb-8': subtitle }"
			>
				{{ title }}
			</h1>
			<p class="mb-3 text-2xl text-center">
				<i>{{ subtitle }}</i>
			</p>
		</div>
	</section>
</template>

<script setup>
	import { defineProps } from "vue";

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		subtitle: {
			type: String,
			required: false,
		},
	});
</script>
