<script setup lang="ts">
import { ref, type Ref, type InputHTMLAttributes } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  type?: InputHTMLAttributes['type'];
}

const props = defineProps<Props>();
const inputRef: Ref<HTMLInputElement | null> = ref(null);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

defineExpose({
  focus: () => inputRef.value?.focus(),
});
</script>

<template>
  <input
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :type="props.type || 'text'"
    @input="handleInput"
    ref="inputRef"
    class="placeholder:text-grey-200 text-grey rounded-lg bg-white p-3.5 font-medium shadow-[0_2px_10px_0_rgba(0,0,0,0.04)] outline-none"
    :class="{ search: props.type === 'search' }"
  />
</template>

<style scoped>
.search {
  background: url('@/assets/icons/search.svg') no-repeat right;
  background-position-x: 1rem;
  background-size: 1.125rem;
  padding-left: 2.75rem;
  background-color: white;
}
</style>
