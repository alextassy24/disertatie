<template>
    <Teleport to="body">
      <Transition name="modal-outer">
        <div
          v-show="modalActive"
          class="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-60"
        >
          <Transition name="modal-inner">
            <div v-if="modalActive" class="max-w-screen-md p-4 bg-white rounded-lg">
              <div class="flex justify-end mb-3 hover:cursor-pointer hover:opacity-80" @click="$emit('close-modal')">
                <span><i class="fa-solid fa-xmark"></i></span>
              </div>
              <slot />
              <div class="flex items-center justify-center gap-3 mt-5">
                <button class="font-bold btn-primary" @click="$emit('submit-modal')">
                  {{ translatedValues.yes }}
                </button>
                <button class="font-bold btn-danger" @click="$emit('close-modal')">
                  {{ translatedValues.no }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  

<script setup>
import { computed} from "vue";
defineEmits(['close-modal','submit-modal']);
defineProps({
    modalActive: {
        type: Boolean,
        default: false,
    },
});

import { useI18n } from "vue-i18n";
const { t } = useI18n();
const translatedValues = computed(() => {
    return {
        yes: t("utils.Yes"),
        no: t("utils.No"),
    };
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;

}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>