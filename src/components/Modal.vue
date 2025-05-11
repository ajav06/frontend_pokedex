<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div v-if="props.isOpen">
    <div
      tabindex="-1"
      class="fixed inset-0 top-0 right-0 left-0 z-40 max-h-full w-full items-center justify-center overflow-x-hidden overflow-y-auto bg-black opacity-60"
    ></div>
    <div
      class="fixed right-1/2 bottom-1/2 z-50 max-h-full w-full max-w-[35.75rem] translate-x-1/2 translate-y-1/2"
    >
      <div class="relative mx-8 rounded-md bg-white shadow md:mx-0">
        <button class="absolute top-4 right-4 rounded-full" @click="emit('close')">
          <img src="@/assets/icons/close.svg" alt="Close" class="size-7" />
        </button>

        <slot name="content"> </slot>
      </div>
    </div>
  </div>
</template>
