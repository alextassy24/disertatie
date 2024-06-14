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

	const props = defineProps({
		items: {
			type: Array,
			required: true,
		},
	});

	const navigateToItem = (sectionRef) => {
		if (sectionRef && sectionRef.value) {
			const element = sectionRef.value;
			const top = element.getBoundingClientRect().top + window.scrollY - 100;
			window.scrollTo({
				top: top,
				behavior: "smooth",
			});
		}
	};
</script>
