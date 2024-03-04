<template>
    <div v-if="user.isAuthenticated">
        <slot />
    </div>
    <div v-else>
        <NotAuthenticated class="mt-40"/>
    </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import NotAuthenticated from "./NotAuthenticated.vue";
const user = useAuthStore();
</script>
