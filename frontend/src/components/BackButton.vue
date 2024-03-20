<template>
  <button @click="goBack" class="flex items-center gap-2 mb-5 btn">
    <i class="fa-solid fa-left-long"></i>
    <span class="hidden md:block">{{ translatedValues.goBack }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();

const translatedValues = computed(() => {
  return {
    goBack: t("utils.GoBack"),
  };
});
const goBack = () => {
  router.go(-1);
};
</script>
