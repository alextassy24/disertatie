<template>
	<div v-if="!authStore.isAuthenticated">
		<slot />
	</div>
	<div v-else>
		<AlreadyAuthenticated class="mt-40" />
	</div>
</template>

<script setup>
	import { useAuthStore } from "../store/auth";

	import AlreadyAuthenticated from "./AlreadyAuthenticated.vue";

	const authStore = useAuthStore();
</script>
