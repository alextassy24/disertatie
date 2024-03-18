<template>
  <AuthenticatedWrapper>
    <div class="mt-28">
      <Hero :title="translatedValues.title" />
      <section class="container w-full px-10 py-16 mx-auto md:w-3/4">
        <div
          v-if="successMessage"
          class="success-message animate__animated"
          :class="{ animate__fadeIn: fadeIn, animate__fadeOut: fadeOut }"
        >
          <i class="fa-solid fa-circle-check"></i>
          <span>{{ translatedValues.successMessage }}</span>
        </div>
        <div v-if="products.length > 0">
          <PaginatedTable
            :headers="headers"
            :items="products"
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
            <span>{{ translatedValues.noProducts }}</span>
          </div>
          <div
            class="flex items-center justify-between w-full gap-3 mx-auto mt-8 md:w-1/2"
          >
            <span>{{ translatedValues.addProducts }}</span>
            <router-link
              to="/register-product"
              class="flex items-center gap-2 btn"
            >
              <i class="fa-solid fa-plus"></i>
              <span class="hidden lg:block">
                {{ translatedValues.add }}
              </span>
            </router-link>
          </div>
        </div>
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
import PaginatedTable from "../components/PaginatedTable.vue";
import BaseModal from "../components/BaseModal.vue";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const successMessage = ref("");
const modalActive = ref(null);
const deletedId = ref(null);
const products = ref([]);
const page = ref("my-products");
const link = ref("/register-product");
const itemPage = ref("products");
const fadeIn = ref(true);
const fadeOut = ref(false);

const translatedValues = computed(() => {
  return {
    title: t("my-products.Title"),
    noProducts: t("profile.NoProducts"),
    addProducts: t("my-wearers.AddWearers"),
    add: t("utils.Add"),
    serialNumber: t("my-products.SerialNumber"),
    wearer: t("my-products.Wearer"),
    deleteItem: t("my-products.DeleteItem"),
    successMessage: t("my-products.SuccessMessage"),
  };
});

const headers = ref([
  "Nr. Crt.",
  translatedValues.value.serialNumber,
  "GUID",
  translatedValues.value.wearer,
  "",
  "",
]);

const toggleModal = (id) => {
  deletedId.value = id;
  modalActive.value = !modalActive.value;
};

const getData = async () => {
  if (authStore.isAuthenticated) {
    const config = {
      headers: { Authorization: `Bearer ${authStore.token}` },
    };
    await axios
      .get(`${authStore.apiAddress}/api/products/`, config)
      .then((response) => {
        if (response.status === 200 && response.data.products) {
          products.value = response.data.products;
        }
      });
  }
};

const submitRequest = async () => {
  const config = {
    headers: { Authorization: `Bearer ${authStore.token}` },
  };
  await axios
    .delete(`http://127.0.0.1:5088/api/products/${deletedId.value}`, config)
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

watch(products, () => {
  getData();
});
</script>

<style scoped>
.success-message {
  @apply flex items-center gap-3 p-3 mb-3 text-lg font-bold text-green-500 bg-green-200 rounded-lg;
}
</style>
