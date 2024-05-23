<template>
	<AuthenticatedWrapper>
		<div class="mt-28">
			<section class="grid grid-cols-12 gap-3 px-10 py-16 mx-auto bg-white">
				<div class="col-span-2 p-3 bg-gray-100 rounded">
					<ul>
						<li
							v-for="section in adminSections"
							class="section-link"
						>
							<i :class="section.icon"></i>
							<p>{{ section.name }}</p>
						</li>
					</ul>
				</div>
				<div class="col-span-9 p-3"></div>
			</section>
		</div>
	</AuthenticatedWrapper>
</template>

<script setup>
	import { useAuthStore } from "../store/auth";
	import { ref } from "vue";
	import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";

	const authStore = useAuthStore();

	const adminSections = ref([
		{
			name: "Utilizatori",
			active: false,
			icon: "fa-solid fa-users",
		},
		{
			name: "Persoane",
			active: false,
			icon: "fa-solid fa-person-walking-with-cane",
		},
		{
			name: "Produse",
			active: false,
			icon: "fa-solid fa-location-crosshairs",
		},
	]);
</script>

<style scoped>
	.section-link {
		@apply transition-colors font-bold flex items-center gap-3 p-2 rounded hover:cursor-pointer hover:bg-green-400 hover:text-white;
	}
</style>
