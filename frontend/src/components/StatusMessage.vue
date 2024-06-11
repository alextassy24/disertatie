<template>
	<div class="flex items-center p-3 mb-3 space-x-2 rounded shadow">
		<i :class="iconClass"></i>
		<span :class="textClass">{{ text }}</span>
	</div>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		text: {
			type: String,
			required: true,
		},
		severity: {
			type: String,
			required: true,
		},
	});

	const iconClass = computed(() => {
		switch (props.severity) {
			case "success":
				return "fa-solid fa-check text-success";
			case "warn":
				return "fa-solid fa-triangle-exclamation text-warn";
			case "info":
				return "fa-solid fa-circle-info text-info";
			case "danger":
				return "fa-solid fa-circle-exclamation text-danger";
			default:
				return "";
		}
	});

	const textClass = computed(() => {
		switch (props.severity) {
			case "success":
				return "text-success";
			case "warn":
				return "text-warn";
			case "info":
				return "text-info";
			case "danger":
				return "text-danger";
			default:
				return "";
		}
	});
</script>

<style scoped>
	.success {
		@apply bg-green-200 text-green-500 font-bold;
	}
	.warn {
		@apply bg-yellow-200 text-yellow-500 font-bold;
	}
	.info {
		@apply bg-blue-200 text-blue-500 font-bold;
	}
	.danger {
		@apply bg-red-200 text-red-500 font-bold;
	}
</style>
