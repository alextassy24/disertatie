<template>
    <AuthenticatedWrapper>
        <div class="mt-28">
            <section v-if="wearerData" class="container p-10 mx-auto">
                <h2 class="subtitle">{{ translatedValues.subtitle }}</h2>
                <div  class="mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <tbody>
                            <tr>
                                <td>{{ translatedValues.name }}</td>
                                <td>{{ wearerData.name }}</td>
                            </tr>
                            <tr>
                                <td>{{ translatedValues.age }}</td>
                                <td>{{ wearerData.age }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </AuthenticatedWrapper>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';
import AuthenticatedWrapper from '../components/AuthenticatedWrapper.vue';
import { useAuthStore } from "../store/auth";

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();
const id = route.params.id;
const wearerData = ref();
const productsData = ref();

const translatedValues = computed(() => {
    return {
        name: t("my-wearers.FullName"),
        age: t("my-wearers.Age"),
        subtitle: t("wearer.Subtitle"),
    };
});

const config = {
    headers: { Authorization: `Bearer ${authStore.token}` }
};

const getData = async () => {
    await axios
        .get(`http://localhost:5088/api/wearers/${id}`, config)
        .then((res) => {
            if (res.status === 200) {
                wearerData.value = res.data.wearer;
                productsData.value = res.data.products;
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

onMounted(getData);
</script>

<style scoped>
.subtitle {
    @apply my-5 text-2xl ms-1 font-semibold;
}
</style>