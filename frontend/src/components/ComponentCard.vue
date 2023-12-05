<template>
	<a :href="component.link" target="_blank">
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
				<p><strong>Usage:</strong> {{ component.usage }}</p>
			</div>
		</div>
	</a>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	component: {
		type: Object,
		required: true,
	},
});

const component = ref(props.component);
</script>

<style scoped></style>
