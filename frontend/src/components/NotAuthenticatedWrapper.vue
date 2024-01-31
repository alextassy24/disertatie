<template>
    <div v-if="!isAuthenticated">
        <slot />
    </div>
    <AlreadyAuthenticated v-else />
</template>

<script setup>
import { useAuthStore } from "../store/auth";

import AlreadyAuthenticated from "../components/AlreadyAuthentid.vue";

const { isAuthenticated } = useAuthStore();

</script>                                                 