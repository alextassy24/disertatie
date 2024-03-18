<template>
  <AuthenticatedWrapper>
    <div class="mt-28">
      <Hero :title="translatedValues.title" />
      <section class="container w-full px-10 py-16 mx-auto md:w-3/4">
        <LoadingWrapper :loading="loading">
          <div
            v-if="successMessage"
            class="success-message animate__animated"
            :class="{ animate__fadeIn: fadeIn, animate__fadeOut: fadeOut }"
          >
            <i class="fa-solid fa-circle-check"></i>
            <span>{{ translatedValues.successMessage }}</span>
          </div>
          <div v-if="wearers.length > 0">
            <PaginatedTable
              :headers="headers"
              :items="wearers"
              :page="page"
              :action="toggleModal"
              :link="link"
              :item-page="itemPage"
            />
            <BaseModal
              :modalActive="modalActive"
              @close-modal="toggleModal(null)"
              @submit-modal="submitRequest"
            >
              <input type="hidden" v-model="deletedId" />
              <h1 class="text-lg text-black">
                {{ translatedValues.deleteItem }} {{ deletedId }}?
              </h1>
            </BaseModal>
          </div>
          <div v-else>
            <div
              class="flex flex-row items-center justify-center w-2/3 gap-3 p-3 mx-auto text-lg font-bold text-red-500 bg-red-200 rounded md:w-1/3"
            >
              <i class="fa-solid fa-circle-xmark"></i>
              <span>{{ translatedValues.noWearers }}</span>
            </div>
            <div
              class="flex items-center justify-between w-full gap-3 mx-auto mt-8 md:w-1/2"
            >
              <span>{{ translatedValues.addWearers }}</span>
              <router-link
                to="/register-wearer"
                class="flex items-center gap-2 btn"
              >
                <i class="fa-solid fa-plus"></i>
                <span class="hidden lg:block">
                  {{ translatedValues.add }}
                </span>
              </router-link>
            </div>
          </div>
        </LoadingWrapper>
      </section>
    </div>
  </AuthenticatedWrapper>
</template>

<script setup>
import axios from "axios";
import { ref, watch, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../store/auth";
import Hero from "../components/Hero.vue";
import BaseModal from "../components/BaseModal.vue";
import PaginatedTable from "../components/PaginatedTable.vue";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
import LoadingWrapper from "../components/LoadingWrapper.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const successMessage = ref("");
const modalActive = ref(null);
const deletedId = ref(null);

const wearers = ref([]);
const page = ref("my-wearers");
const link = ref("register-wearer");
const itemPage = ref("wearers");
const loading = ref(true);

const fadeIn = ref(true);
const fadeOut = ref(false);

const translatedValues = computed(() => {
  return {
    title: t("my-wearers.Title"),
    noWearers: t("profile.NoWearers"),
    addWearers: t("my-wearers.AddWearers"),
    add: t("utils.Add"),
    age: t("my-wearers.Age"),
    fullName: t("my-wearers.FullName"),
    deleteItem: t("my-wearers.DeleteItem"),
    successMessage: t("my-wearers.SuccessMessage"),
    tablePage: t("view-data.TablePage"),
    tableOf: t("view-data.TableOf"),
    firstBtn: t("view-data.FirstBtn"),
    previousBtn: t("view-data.PreviousBtn"),
    nextBtn: t("view-data.NextBtn"),
    lastBtn: t("view-data.LastBtn"),
    show: t("view-data.Show"),
    perPage: t("my-wearers.PerPage"),
  };
});

const headers = ref([
  "Nr. Crt.",
  translatedValues.value.fullName,
  translatedValues.value.age,
  "",
]);

const toggleModal = (id) => {
  deletedId.value = id;
  modalActive.value = !modalActive.value;
};

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
};

const getData = async () => {
  if (authStore.isAuthenticated) {
    await axios
      .get(`${authStore.apiAddress}/api/wearers/`, config)
      .then((response) => {
        loading.value = false;
        if (response.status === 200 && response.data.wearers) {
          wearers.value = response.data.wearers;
        }
      });
  }
};

const submitRequest = async () => {
  await axios
    .delete(`${authStore.apiAddress}/api/wearers/${deletedId.value}`, config)
    .then((response) => {
      if (response.status === 200) {
        successMessage.value = translatedValues.value.successMessage;
        setTimeout(() => {
          fadeIn.value = false; // Remove fadeIn class
          setTimeout(() => {
            fadeOut.value = true; // Add fadeOut class
            setTimeout(() => {
              successMessage.value = false; // Remove the success message from the DOM
            }, 1000); // Delay the removal of the element after the fade out animation completes
          }, 1000); // Delay adding the fadeOut class after the fadeIn animation completes
        }, 3000);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  fadeIn.value = true;
  fadeOut.value = false;
  toggleModal(null);
};

onMounted(getData);

watch(wearers, () => {
  getData();
});
</script>

<style scoped>
.success-message {
  @apply flex items-center gap-3 p-3 mb-3 text-lg font-bold text-green-500 bg-green-200 rounded-lg;
}
</style>
