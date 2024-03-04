<template>
    <AuthenticatedWrapper>
        <div>

        </div>
    </AuthenticatedWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import AuthenticatedWrapper from '../components/AuthenticatedWrapper.vue';

const route = useRoute();
const id = route.params.id;

</script>
