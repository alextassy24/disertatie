<template>
  <div v-if="authStore.isAuthenticated" class="mt-28">
    <Hero :title="translatedValues.title" />
    <section class="container px-10 py-16 mx-auto">
      <div
        v-if="wearers.length > 0"
        class="flex flex-col items-center justify-center w-full py-10 mx-auto md:w-3/4 lg:w-2/4 xl:w-1/4"
        :class="
          !successMessage ? 'bg-gray-200 rounded-xl shadow-lg' : 'bg-white'
        "
      >
        <div
          v-if="errorMessage"
          class="p-3 mb-3 font-bold text-red-600 bg-red-300 rounded-lg shadow"
        >
          {{ errorMessage }}
        </div>
        <Form
          v-if="!successMessage"
          :validation-schema="validationSchema"
          @submit="onSubmit"
          class="mb-3"
        >
          <div class="relative flex flex-col mb-5">
            <label class="form-label">{{
              translatedValues.deviceSerialNumber
            }}</label>
            <Field
              id="deviceSerialNumber"
              type="text"
              name="deviceSerialNumber"
              class="form-field"
              v-model="deviceSerialNumber"
            />
            <ErrorMessage name="deviceSerialNumber" class="error-message" />
          </div>
          <div class="relative flex flex-col mb-5">
            <label class="form-label">{{ translatedValues.deviceGUID }}</label>
            <Field
              id="deviceGUID"
              type="text"
              name="deviceGUID"
              class="form-field"
              v-model="deviceGUID"
            />
            <ErrorMessage name="deviceGUID" class="error-message" />
          </div>
          <div class="relative flex flex-col mb-5">
            <label class="form-label">{{ translatedValues.wearer }}</label>
            <select
              id="wearer"
              name="wearer"
              class="form-field"
              v-model="wearer"
            >
              <option v-for="item in wearers" :value="item.id">
                {{ item.name }}
              </option>
            </select>
            <ErrorMessage name="wearer" class="error-message" />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              :class="isLoading ? 'btn-loading' : 'btn'"
              :disabled="isLoading"
            >
              {{
                isLoading ? translatedValues.btnLoading : translatedValues.btn
              }}
            </button>
          </div>
        </Form>
        <div
          v-else
          class="p-3 mb-10 font-bold text-center text-green-600 bg-green-200 rounded-lg shadow"
        >
          {{ successMessage }}
        </div>
      </div>
      <div v-else>
        <div
          class="flex flex-row items-center justify-center w-full gap-5 p-3 mx-auto text-lg font-bold text-red-500 bg-red-200 rounded md:w-1/3"
        >
          <i class="fa-solid fa-circle-xmark"></i>
          <span>{{ translatedValues.noWearers }}</span>
        </div>
        <div
          class="w-full p-3 mx-auto mt-5 text-lg font-bold text-justify text-red-500 bg-red-200 rounded md:w-1/3"
        >
          {{ translatedValues.needWearers }}
        </div>
      </div>
    </section>
  </div>
  <NotAuthenticated class="mt-36" v-else />
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { z } from "zod";
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import Hero from "../components/Hero.vue";
import NotAuthenticated from "../components/NotAuthenticated.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

const deviceSerialNumber = ref("");
const deviceGUID = ref("");
const wearer = ref("");

const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const wearers = ref([]);

const translatedValues = computed(() => {
  return {
    title: t("register-product.Title"),
    deviceSerialNumber: t("register-product.DeviceSerialNumber"),
    deviceGUID: t("register-product.DeviceGUID"),
    wearer: t("register-product.Wearer"),
    noWearers: t("profile.NoWearers"),
    needWearers: t("register-product.NeedWearers"),
    btn: t("utils.Btn"),
    btnLoading: t("utils.BtnLoading"),
    deviceSerialNumberError: {
      required: t("register-product.DeviceSerialNumberError.Required"),
    },
    deviceGUIDError: {
      required: t("register-product.DeviceGUIDError.Required"),
      format: t("register-product.DeviceGUIDError.Format"),
    },
    wearerError: {
      required: t("register-product.WearerError.Required"),
    },
    successMessage: t("register-product.SuccessMessage"),
    badRequest: t("register-product.BadRequest"),
    unauthorized: t("register-product.Unauthorized"),
    notFound: t("register-product.NotFound"),
  };
});

const validationSchema = toTypedSchema(
  z.object({
    deviceGUID: z
      .string()
      .min(1, translatedValues.value.deviceGUIDError.required)
      .refine(
        (value) => /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(value),
        {
          message: translatedValues.value.deviceGUIDError.format,
        }
      ),
    deviceSerialNumber: z
      .string()
      .min(1, translatedValues.value.deviceSerialNumberError.required),
  })
);

const config = {
  headers: { Authorization: `Bearer ${authStore.token}` },
};

const getWearers = () => {
  axios
    .get(`${authStore.apiAddress}api/wearers/`, config)
    .then((response) => {
      if (response.status === 200 && response.data.wearers) {
        wearers.value = response.data.wearers;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(getWearers);

function clearErrors() {
  errorMessage.value = "";
  successMessage.value = "";
}

function onSubmit() {
  clearErrors();
  isLoading.value = true;

  const formData = {
    deviceSerialNumber: deviceSerialNumber.value,
    deviceGUID: deviceGUID.value,
    wearerId: wearer.value,
  };

  axios
    .post(`${authStore.apiAddress}api/products/`, formData, config)
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        successMessage.value = translatedValues.value.successMessage;
        setTimeout(() => {
          router.push("/my-products");
        }, 2000);
      }
    })
    .catch((error) => {
      isLoading.value = false;
      console.log(error);
      if (error.response.status) {
        switch (error.response.status) {
          case 400:
            errorMessage.value = translatedValues.value.badRequest;
            break;
          case 401:
            errorMessage.value = translatedValues.value.unauthorized;
            break;
          case 404:
            errorMessage.value = translatedValues.value.notFound;
            break;
        }
      }
    });
}
</script>

<style scoped>
.form-label {
  @apply mb-2;
}

.form-field {
  @apply p-2 px-5 rounded focus:outline-none bg-gray-100 focus:ring-2 focus:ring-green-400 focus:shadow-lg hover:shadow transition duration-300 ease-in-out cursor-pointer w-full;
}

.btn {
  @apply bg-black text-white py-2 shadow rounded focus:ring-green-400 hover:ring-green-400 hover:ring-4 hover:text-green-400 transition duration-500 ease-in-out transform px-5;
}
</style>
