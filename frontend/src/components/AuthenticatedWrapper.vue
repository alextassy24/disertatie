<template>
    <div v-if="isAuthenticated">
        <slot />
    </div>
    <NotAuthenticated v-else />
</template>

<script setup>
import { useAuthStore } from "../store/auth";

import NotAuthenticated from "../components/NotAuthenticated.vue";

const { isAuthenticated } = useAuthStore();

</script>
