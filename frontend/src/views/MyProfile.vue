<template>
    <AuthenticatedWrapper>
        <div class="mt-28">
            <Hero :title="user" />
            <section class="px-10 py-16 ">
                <div>
                    <table class="mx-auto bg-gray-100 rounded-lg shadow-lg">
                        <tr>
                            <td>{{ translatedValues.firstName }}</td>
                            <!-- <td>{{ user.firstName }}</td> -->
                        </tr>
                        <tr>
                            <td>{{ translatedValues.lastName }}</td>
                            <!-- <td>{{ user.lastName }}</td> -->
                        </tr>
                        <tr>
                            <td>{{ translatedValues.phoneNumber }}</td>
                            <!-- <td>{{ user.phoneNumber }}</td> -->
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    </AuthenticatedWrapper>
</template>

<script setup>
import { useAuthStore } from '../store/auth';
import { useI18n } from "vue-i18n";
import { computed } from "vue";

import AuthenticatedWrapper from '../components/AuthenticatedWrapper.vue';
import Hero from '../components/Hero.vue';

const user = useAuthStore().user;

const { t } = useI18n();

const translatedValues = computed(() => {
    return {
        firstName: t("profile.FirstName"),
        lastName: t("profile.LastName"),
        phoneNumber: t("profile.PhoneNumber"),
    };
});

</script>