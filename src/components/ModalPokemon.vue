<script setup lang="ts">
import type { Pokemon } from '@/models/Pokemon';
import useMainStore from '@/stores';
import Button from './Button.vue';
import Modal from './Modal.vue';
import { computed, type ComputedRef } from 'vue';
import { BASE_URL } from '@/helpers/const';

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

/*
 * Function to share the Pokemon details using the Web Share API.
 * This function checks if the Web Share API is supported in the browser.
 * If supported, it shares the Pokemon name and URL.
 * If not supported, it logs a message to the console.
 */
const sharePokemon = () => {
  if (navigator.share) {
    navigator
      .share({
        title: `Check out this Pokémon: ${props.pokemon?.name}`,
        text: `I found this Pokémon: ${props.pokemon?.name}`,
        url: `${BASE_URL}pokemon/${props.pokemon?.id}/`,
      })
      .catch((error) => console.error('Error sharing:', error));
  } else {
    console.log('Share not supported');
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
          <p class="ml-1 font-medium">{{ field.value }}</p>
        </div>

        <div class="mt-5 flex items-center justify-between">
          <Button button-type="button" @click="sharePokemon()"> Share to my friends </Button>
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
