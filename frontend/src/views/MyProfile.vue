<template>
  <AuthenticatedWrapper>
    <div class="mt-28">
      <Hero :title="translatedValues.title" />
      <section class="container w-full px-10 py-16 mx-auto md:w-3/4">
        <BackButton />
        <LoadingWrapper :loading="loading">
          <div v-if="userData">
            <div class="mb-8">
              <h2 class="subtitle">{{ user.user }}</h2>
              <div
                class="mx-auto overflow-hidden bg-white rounded-lg shadow-lg"
              >
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody>
                    <tr>
                      <td>{{ translatedValues.firstName }}</td>
                      <td>{{ userData.firstName }}</td>
                    </tr>
                    <tr>
                      <td>{{ translatedValues.lastName }}</td>
                      <td>{{ userData.lastName }}</td>
                    </tr>
                    <tr>
                      <td>{{ translatedValues.phoneNumber }}</td>
                      <td>{{ userData.phoneNumber }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="mb-8">
              <h2 class="subtitle">{{ translatedValues.wearers }}</h2>
              <div v-if="userData.wearers.length > 0">
                {{ translatedValues.you }}
                <router-link to="/my-wearers" class="text-green-500">{{
                  userData.wearers.length
                }}</router-link>
                {{ translatedValues.availableWearers }}
              </div>
              <div v-else class="font-bold text-red-500">
                {{ translatedValues.noWearers }}
              </div>
            </div>
            <div class="mb-8">
              <h2 class="subtitle">{{ translatedValues.products }}</h2>
              <div v-if="userData.products.length > 0">
                {{ translatedValues.you }}
                <router-link to="/my-products" class="text-green-500">{{
                  userData.products.length
                }}</router-link>
                {{ translatedValues.availableProducts }}
              </div>
              <div v-else class="font-bold text-red-500">
                {{ translatedValues.noProducts }}
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </section>
    </div>
  </AuthenticatedWrapper>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from "vue";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";
import Hero from "../components/Hero.vue";
import axios from "axios";
import BackButton from "../components/BackButton.vue";

const authStore = useAuthStore();
const { t } = useI18n();
const user = useAuthStore();
const userData = ref();
const loading = ref(true);

const translatedValues = computed(() => {
  return {
    title: t("profile.Title"),
    firstName: t("profile.FirstName"),
    lastName: t("profile.LastName"),
    phoneNumber: t("profile.PhoneNumber"),
    wearers: t("profile.Wearers"),
    noWearers: t("profile.NoWearers"),
    products: t("profile.Products"),
    noProducts: t("profile.NoProducts"),
    you: t("profile.You"),
    availableProducts: t("profile.AvailableProducts"),
    availableWearers: t("profile.AvailableWearers"),
  };
});

const getInfo = async () => {
  if (user.isAuthenticated) {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    await axios
      .get(`${authStore.apiAddress}/api/account/info`, config)
      .then((response) => {
        loading.value = false;
        if (response.status === 200) {
          userData.value = response.data.user;
        }
      });
  }
};

onMounted(getInfo);
</script>

<style scoped>
.subtitle {
  @apply my-5 text-2xl ms-1 font-semibold;
}
</style>
