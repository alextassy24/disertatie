<template>
  <section class="px-10 py-16 mt-28">
    <h1 class="mb-10 text-4xl font-bold text-center">
      {{ translatedValues.title }}
    </h1>
    <div
      class="flex flex-col items-center justify-center py-10 mx-auto bg-gray-200 shadow-lg md:w-3/4 lg:w-1/4 rounded-xl">
      <div v-if="successMessage" class="p-3 mb-3 font-bold text-green-600 bg-green-200 rounded-lg shadow">{{
        successMessage }}</div>
      <div v-if="errorMessage" class="p-3 mb-3 font-bold text-red-600 bg-red-300 rounded-lg shadow">{{ errorMessage }}
      </div>
      <Form v-if="!successMessage" :validation-schema="validationSchema" @submit="onSubmit" class="mb-3">
        <div class="flex flex-col mb-5">
          <label class="form-label">{{ translatedValues.firstName }}</label>
          <Field id="firstName" type="text" name="firstName" class="form-field" v-model="firstName" />
          <ErrorMessage name="firstName" class="error-message" />
        </div>
        <div class="flex flex-col mb-5">
          <label class="form-label">{{ translatedValues.lastName }}</label>
          <Field id="lastName" type="text" name="lastName" class="form-field" v-model="lastName" />
          <ErrorMessage name="lastName" class="error-message" />
        </div>
        <div class="flex flex-col mb-5">
          <label class="form-label">Email</label>
          <Field id="email" type="email" name="email" class="form-field" v-model="email" />
          <ErrorMessage name="email" class="error-message" />
        </div>
        <div class="flex flex-col mb-5">
          <label class="form-label">{{ translatedValues.phoneNumber }}</label>
          <Field id="phoneNumber" type="tel" name="phoneNumber" class="form-field" v-model="phoneNumber" />
          <ErrorMessage name="phoneNumber" class="error-message" />
        </div>
        <div class="flex flex-col mb-5">
          <label class="form-label">{{ translatedValues.password }}</label>
          <Field id="password" type="password" name="password" class="form-field" v-model="password" />
          <ErrorMessage name="password" class="error-message" />
        </div>
        <div class="flex flex-col mb-5">
          <label class="form-label">{{
            translatedValues.confirmPassword
          }}</label>
          <Field id="confirmPassword" type="password" name="confirmPassword" class="form-field"
            v-model="confirmPassword" />
          <ErrorMessage name="confirmPassword" class="error-message" />
        </div>
        <div class="flex justify-center mb-3">
          <button v-if="!successMessage" type="submit" class="btn">{{ translatedValues.btn }}</button>
        </div>
      </Form>

      <router-link class="login-link" to="/login">
        {{ translatedValues.logInHere }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { ErrorMessage, Field, Form } from "vee-validate";
import { z } from "zod";
import axios from "axios";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const translatedValues = computed(() => {
  return {
    title: t("register.Title"),
    firstName: t("register.FirstName"),
    lastName: t("register.LastName"),
    phoneNumber: t("register.PhoneNumber"),
    password: t("register.Password"),
    confirmPassword: t("register.ConfirmPassword"),
    btn: t("register.Btn"),
    logInHere: t("register.LogInHere"),
    firstNameError: {
      required: t("register.FirstNameError.Required"),
      lettersOnly: t("register.FirstNameError.LettersOnly"),
    },
    lastNameError: {
      required: t("register.LastNameError.Required"),
      lettersOnly: t("register.LastNameError.LettersOnly"),
    },
    emailError: {
      required: t("register.EmailError.Required"),
      format: t("register.EmailError.Format"),
    },
    phoneNumberError: {
      required: t("register.PhoneNumberError.Required"),
      format: t("register.PhoneNumberError.Format"),
    },
    passwordError: {
      required: t("register.PasswordError.Required"),
      length: t("register.PasswordError.Length"),
      upperCase: t("register.PasswordError.UpperCase"),
      lowerCase: t("register.PasswordError.LowerCase"),
      number: t("register.PasswordError.Number"),
      special: t("register.PasswordError.Special"),
    },
    confirmPasswordError: {
      required: t("register.ConfirmPasswordError.Required"),
      match: t("register.ConfirmPasswordError.Match"),
    },
    successMessage: t("register.SuccessMessage"),
  };
});

// Variables
// const isValid = ref(false);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const successMessage = ref("");
const errorMessage = ref("");


const validationSchema = toTypedSchema(
  z.object({
    firstName: z
      .string()
      .min(1, translatedValues.value.firstNameError.required)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: translatedValues.value.firstNameError.lettersOnly,
      }),
    lastName: z
      .string()
      .min(1, translatedValues.value.lastNameError.required)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: translatedValues.value.lastNameError.lettersOnly,
      }),
    email: z
      .string()
      .min(1, translatedValues.value.emailError.required)
      .email(translatedValues.value.emailError.format),
    phoneNumber: z
      .string()
      .min(1, translatedValues.value.phoneNumberError.required)
      .refine((value) => /^[0-9]+$/.test(value), {
        message: translatedValues.value.phoneNumberError.format,
      }),
    password: z
      .string()
      .min(1, translatedValues.value.passwordError.required)
      .min(6, translatedValues.value.passwordError.length)
      .refine((value) => /[a-z]/.test(value), {
        message: translatedValues.value.passwordError.lowerCase,
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: translatedValues.value.passwordError.upperCase,
      })
      .refine((value) => /[0-9]/.test(value), {
        message: translatedValues.value.passwordError.number,
      })
      .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
        message: translatedValues.value.passwordError.special,
      }),
    confirmPassword: z
      .string()
      .min(1, translatedValues.value.confirmPasswordError.required)
      .refine((value) => value == password.value, {
        message: translatedValues.value.confirmPasswordError.match,
      }),
  })
);

function clearErrors() {
  errorMessage.value = "";
  successMessage.value = "";
}

function clearFields() {
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  phoneNumber.value = "";
  password.value = "";
  confirmPassword.value = "";
}

function onSubmit() {

  clearErrors();

  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    password: password.value,
  };

  axios
    .post("http://127.0.0.1:5088/api/account/register", formData)
    .then((response) => {
      if (response.data && response.data.message === "Registration successful") {
        successMessage.value = translatedValues.value.successMessage;
        clearFields();
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
      else {
        errorMessage.value = `Unexpected response format: ${response.data.message}`;
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response) {
        errorMessage.value = `Status code: ${error.response.status} - ${error.response.data.errors}`;
      } else if (error.request) {
        errorMessage.value = `No response received from the server`;
      } else {
        errorMessage.value = `Error setting up the registration request: ${error.message}`;
      }
    });
}
</script>

<style scoped>
.form-label {
  @apply mb-2;
}

.form-field {
  @apply p-2 px-5 rounded focus:outline-none bg-gray-100 focus:ring-2 focus:ring-green-400 hover:shadow focus:shadow-lg transition duration-300 ease-in-out cursor-pointer w-full;
}

.form-field-error {
  @apply p-2 px-5 rounded focus:outline-none bg-gray-100 ring-2 ring-red-300 focus:ring-2 focus:ring-red-500 hover:shadow focus:shadow-lg transition duration-300 ease-in-out cursor-pointer w-full;
}

.btn {
  @apply bg-black text-white py-2 shadow rounded focus:ring-green-400 hover:ring-green-400 hover:ring-4 hover:text-green-400 transition duration-500 ease-in-out transform px-5;
}

.login-link {
  @apply text-black transition duration-300 ease-in-out transform;
}

.error-message {
  @apply text-red-500 bg-red-200 font-bold mt-2 rounded-lg p-1 whitespace-pre-line;
}

.login-link:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: transparent;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.3s ease-in-out;
}

.login-link:hover:before {
  background: #66bb6a;
  transform: scaleX(1);
}
</style>