<template>
	<section class="px-10 py-16 text-white bg-black">
		<div class="container z-10 mx-auto text-justify">
			<h1 class="mb-10 text-4xl font-semibold text-center">
				{{ title }}
			</h1>
			<p class="mb-8 text-center text-md">
				<i>{{ subtitle }}</i>
			</p>
		</div>
	</section>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	subtitle: {
		type: String,
		required: true,
	},
});

const title = ref(props.title);
const subtitle = ref(props.subtitle);
</script>

<style lang="scss" scoped></style>
