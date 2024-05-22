<template>
	<div
		class="fixed left-0 z-20 p-1 my-5 bg-green-400 rounded shadow-xl md:p-1 lg:p-2"
	>
		<ul class="flex flex-col items-start gap-3">
			<li
				v-for="item in items"
				:key="item.name"
				class="cursor-pointer"
				@click="navigateToItem(item.section)"
			>
				<Tooltip :text="item.name">
					<i :class="item.icon"></i>
				</Tooltip>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import Tooltip from "./Tooltip.vue";
	import { ref, onMounted, watch } from "vue";

	const props = defineProps({
		items: {
			type: Array,
			required: true,
		},
	});

	const navigateToItem = (sectionRef) => {
		if (sectionRef && sectionRef.value) {
			const element = sectionRef.value;
			const top =
				element.getBoundingClientRect().top + window.scrollY - 100;
			window.scrollTo({
				top: top,
				behavior: "smooth",
			});
		}
	};

	// const activeSection = ref(null);

	// const setActiveSection = (entries) => {
	// 	entries.forEach((entry) => {
	// 		if (entry.isIntersecting) {
	// 			const activeItem = props.items.find(
	// 				(item) => item.section.value === entry.target
	// 			);
	// 			if (activeItem) {
	// 				activeSection.value = activeItem.name;
	// 			}
	// 		}
	// 	});
	// };

	// onMounted(() => {
	// 	const observer = new IntersectionObserver(setActiveSection, {
	// 		root: null,
	// 		rootMargin: "-50% 0px -50% 0px",
	// 		threshold: 0,
	// 	});

	// 	props.items.forEach((item) => {
	// 		if (item.section && item.section.value) {
	// 			observer.observe(item.section.value);
	// 		}
	// 	});
	// });

	// watch(activeSection, (newVal) => {
	// 	props.items.forEach((item) => {
	// 		item.active = item.name === newVal;
	// 	});
	// });
</script>
