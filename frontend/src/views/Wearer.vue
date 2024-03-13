<template>
  <AuthenticatedWrapper>
    <div class="mt-28">
      <section v-if="wearerData" class="container p-10 mx-auto">
        <h2 class="subtitle">{{ translatedValues.subtitle }}</h2>
        <div
          class="mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg"
        >
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
        <div class="mb-8">
          <h2 class="subtitle">{{ translatedValues.products }}</h2>
          <div v-if="productsData.length > 0">
            <ul ref="products">
              <li v-for="product in productsData" :key="product">
                {{ product }}
              </li>
            </ul>
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
          <div v-else class="font-bold text-red-500">
            {{ translatedValues.noProducts }}
          </div>
        </div>
      </section>
    </div>
  </AuthenticatedWrapper>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../store/auth";
import { useAutoAnimate } from "@formkit/auto-animate/vue";
import axios from "axios";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper.vue";
import PaginatedTable from "../components/PaginatedTable.vue";
import BaseModal from "../components/BaseModal.vue";

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();
const id = route.params.id;
const wearerData = ref();
const productsData = ref();

const [products] = useAutoAnimate();

const modalActive = ref(null);
const deletedId = ref(null);

const translatedValues = computed(() => {
  return {
    name: t("my-wearers.FullName"),
    age: t("my-wearers.Age"),
    subtitle: t("wearer.Subtitle"),
    products: t("wearer.Products"),
    noProducts: t("profile.NoProducts"),
    serialNumber: t("my-products.SerialNumber"),
    deleteItem: t("my-products.DeleteItem"),
  };
});

const toggleModal = (id) => {
  deletedId.value = id;
  modalActive.value = !modalActive.value;
};

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
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
      if (err.response.status === 401) {
      } else if (err.response.status === 404) {
      }
    });
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

watch(productsData, () => {
  getData();
});
</script>

<style scoped>
.subtitle {
  @apply my-5 text-2xl ms-1 font-semibold;
}
</style>
