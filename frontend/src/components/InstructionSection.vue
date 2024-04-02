<template>
	<div class="m-3">
		<h1 class="mb-5 text-3xl font-bold">
			{{ selectedSection.title }}
		</h1>
		<div
			v-for="(paragraph, index) in selectedSection.text"
			:key="index"
			class="mb-7"
		>
			<h2 class="mb-3 font-semibold">
				{{ paragraph.subtitle }}
			</h2>
			<div class="mb-5">
				{{ paragraph.context }}
			</div>
			<div
				v-if="paragraph.warning"
				class="flex items-center gap-3 p-5 font-bold bg-yellow-200 rounded-lg shadow-lg"
			>
				<i class="fa-solid fa-triangle-exclamation"></i>
				<span>
					{{ paragraph.warning }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { defineProps } from "vue";

	defineProps({
		selectedSection: {
			type: Object,
			required: true,
		},
	});
</script>

<style scoped></style>
