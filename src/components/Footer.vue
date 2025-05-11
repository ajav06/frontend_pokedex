<script setup lang="ts">
import type { PokemonView } from '@/models/Pokemon';
import Button from './Button.vue';

const props = defineProps<{
  selected: PokemonView;
}>();

const emit = defineEmits<{
  (e: 'changeView', view: PokemonView): void;
}>();
</script>

<template>
  <footer
    class="fixed bottom-0 flex w-full max-w-6xl justify-center gap-4 bg-white px-7 py-5 shadow-[0_-8px_10px_-6px_rgba(0,0,0,0.15)]"
  >
    <Button
      class="w-full max-w-[17.25rem]"
      button-type="button"
      @click="emit('changeView', 'all')"
      icon-name="list"
      :class="{ '!bg-grey-200': props.selected === 'favorites' }"
    >
      All
    </Button>
    <Button
      class="w-full max-w-[17.25rem]"
      button-type="button"
      @click="emit('changeView', 'favorites')"
      icon-name="star"
      :class="{ '!bg-grey-200': props.selected === 'all' }"
    >
      Favorites
    </Button>
  </footer>
</template>
