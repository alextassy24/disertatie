<template>
    <div v-if="!authStore.isAuthenticated">
        <slot />
    </div>
    <div v-else>
        <AlreadyAuthenticated />
    </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";

import AlreadyAuthenticated from "./AlreadyAuthenticated.vue";

const authStore = useAuthStore();

</script>                                                 