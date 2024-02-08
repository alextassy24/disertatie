<template>
    <div v-if="isAuthenticated">
        <slot />
    </div>
    <NotAuthenticated v-else />
</template>

<script setup>
import { useAuthStore } from "../store/auth";

import NotAuthenticated from "./NotAuthenticated.vue";

const { isAuthenticated } = useAuthStore();

</script>
