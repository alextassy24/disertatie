<template>
  <NotAuthenticatedWrapper>
    <section class="container px-10 py-16 mx-auto mt-28">
      <h1 class="mb-10 text-4xl font-bold text-center">
        {{ translatedValues.title }}
      </h1>
      <div
        class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl"
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
          <div class="flex flex-col mb-5">
            <label class="form-label">{{ translatedValues.email }}</label>
            <Field
              id="email"
              type="email"
              name="email"
              class="form-field"
              v-model="email"
            />
            <ErrorMessage name="email" class="error-message" />
          </div>
          <div class="flex justify-center mb-3">
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
    </section>
  </NotAuthenticatedWrapper>
</template>

<script setup>
import { ref, computed } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "../store/auth";
import { ErrorMessage, Field, Form } from "vee-validate";
import { z } from "zod";
import { useI18n } from "vue-i18n";
import axios from "axios";
import NotAuthenticatedWrapper from "../components/NotAuthenticatedWrapper.vue";

const authStore = useAuthStore();
const { t } = useI18n();
const translatedValues = computed(() => {
  return {
    title: t("resend-email-confirmation.Title"),
    email: t("forgot-password.Email"),
    btn: t("utils.Btn"),
    btnLoading: t("utils.BtnLoading"),
    emailError: {
      required: t("register.EmailError.Required"),
      format: t("register.EmailError.Format"),
    },
    success: t("resend-email-confirmation.Succes"),
    notFound: t("resend-email-confirmation.NotFound"),
    alreadySent: t("resend-email-confirmation.AlreadySent"),
  };
});

const email = ref("");
const successMessage = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(1, translatedValues.value.emailError.required)
      .email(translatedValues.value.emailError.format),
  })
);

function clearErrors() {
  errorMessage.value = "";
}

function onSubmit() {
  clearErrors();
  isLoading.value = true;

  const formData = {
    email: email.value,
  };

  axios
    .post(
      `${authStore.apiAddress}/api/account/resend-email-confirmation`,
      formData
    )
    .then((response) => {
      // console.log(response.data.message);
      if (response.status == 200) {
        successMessage.value = translatedValues.value.success;
      }
    })
    .catch((error) => {
      isLoading.value = false;

      if (error.response.status == 404) {
        errorMessage.value = translatedValues.value.notFound;
      } else if (error.response.status == 400) {
        errorMessage.value = translatedValues.value.alreadySent;
      }
    });
}
</script>
