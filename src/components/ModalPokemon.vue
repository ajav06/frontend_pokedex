<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import useMainStore from '@/stores';
import type { Pokemon } from '@/models/Pokemon';
import { BASE_URL } from '@/helpers/const';
import Button from './Button.vue';
import Modal from './Modal.vue';

interface Props {
  isOpen: boolean;
  pokemon: Pokemon | null;
}
interface PokemonField {
  name: string;
  value: string | number | string[] | undefined;
}

const props = defineProps<Props>();

const mainStore = useMainStore();

const fields: ComputedRef<PokemonField[]> = computed(() => {
  if (!props.pokemon) return [];

  return [
    { name: 'Name', value: props.pokemon.name },
    { name: 'Height', value: props.pokemon.height },
    { name: 'Weight', value: props.pokemon.weight },
    { name: 'Types', value: props.pokemon.types.map((t) => t.type.name).join(', ') },
  ];
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

/**
 * Function to copy the Pokemon details to the clipboard.
 * This function checks if the Pokemon prop is not null.
 * If not null, it constructs a string with the Pokemon details and copies it to the clipboard.
 * If successful, it logs a success message to the console.
 * If an error occurs, it logs the error message to the console.
 */
const copyClipboard = () => {
  if (props.pokemon) {
    let textToCopy = `Check out this Pokémon:`;
    fields.value.forEach((field) => {
      textToCopy += `\n${field.name}: ${field.value}, `;
    });
    textToCopy = textToCopy.replace(/,\s*$/, '');
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert('Pokemon details copied to clipboard!');
      },
      (err) => {
        console.error('Error copying text: ', err);
      },
    );
  }
};
</script>

<template>
  <Modal :isOpen="props.isOpen" @close="emit('close')">
    <template #content>
      <section>
        <img src="@/assets/imgs/background.svg" alt="background" class="w-full rounded-t-md" />
        <img
          :src="props.pokemon?.sprites.other['official-artwork'].frontDefault || ''"
          alt="Pokemon Image"
          class="absolute inset-0 max-w-1/2 translate-x-1/2 translate-y-1/5"
          loading="lazy"
        />
      </section>

      <section class="px-8 py-5">
        <div
          class="flex items-center border-b-1 border-neutral-200 p-2.5 text-lg"
          v-for="field in fields"
          :key="field.name"
        >
          <h3 class="font-bold">{{ field.name }}:</h3>
          <p class="ml-1 font-medium capitalize">{{ field.value }}</p>
        </div>

        <div class="mt-5 flex items-center justify-between">
          <Button button-type="button" @click="copyClipboard()"> Share to my friends </Button>
          <Button
            button-type="button"
            @click="mainStore.updatePokemonFavorites(props.pokemon!)"
            icon-name="star"
            only-icon
            :color-icon="
              mainStore.isPokemonFavorite(props.pokemon?.id || -1)
                ? 'text-tertiary'
                : 'text-default'
            "
          />
        </div>
      </section>
    </template>
  </Modal>
</template>
