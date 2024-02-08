<template>
    <NotAuthenticatedWrapper>
        <div class="mt-28">
            <section class="px-10 py-16">
                <div v-if="isValid"
                    class="w-2/4 p-5 mx-auto text-xl font-bold text-center text-green-500 bg-green-200 rounded shadow">
                    {{ successMessage }}
                </div>
                <div v-else class="w-2/4 p-5 mx-auto text-xl font-bold text-center text-red-500 bg-red-200 rounded shadow">
                    {{ errorMessage }}
                </div>
            </section>
        </div>
    </NotAuthenticatedWrapper>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import NotAuthenticatedWrapper from '../components/NotAuthenticatedWrapper.vue';
import axios from 'axios';

const route = useRoute();
const token = route.query.token;
const isValid = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const { t } = useI18n();

const translatedValues = computed(() => {
    return {
        success: t("confirm-email.Success"),
        tokenNotFound: t("confirm-email.TokenNotFound"),
        tokenInvalid: t("confirm-email.TokenInvalid"),
        tokenExpired: t("confirm-email.TokenExpired"),
        userNotFound: t("confirm-email.UserNotFound"),
        failed: t("confirm-email.Failed"),
    };
});

const confirmEmail = async () => {

    await axios.get(`http://localhost:5088/api/account/confirm-email?token=${token}`)
        .then((response) => {
            if (response.status === 200) {
                isValid.value = true;
                successMessage.value = translatedValues.value.success;
            }
        })
        .catch((error) => {
            switch (error.response.data.message) {
                case 0:
                    errorMessage.value = translatedValues.value.tokenInvalid;
                    break;

                case 1:
                    errorMessage.value = translatedValues.value.tokenNotFound;
                    break;

                case 2:
                    errorMessage.value = translatedValues.value.tokenExpired;
                    break;

                case 3:
                    errorMessage.value = translatedValues.value.userNotFound;
                    break;

                case 4:
                    errorMessage.value = translatedValues.value.failed;
                    break;
            }
        });
};

onMounted(confirmEmail);
</script>
