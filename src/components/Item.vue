<script setup lang="ts">
import type { Pokemon, PokemonItem } from '@/models/Pokemon';
import Button from './Button.vue';
import usePokemon from '@/composable/usePokemon';
import useMainStore from '@/stores';
import { computed, type ComputedRef } from 'vue';

const props = defineProps<{
  pokemon: PokemonItem | Pokemon;
}>();

const mainStore = useMainStore();
const { getPokemon } = usePokemon();

const pokemonId: ComputedRef<number> = computed(() =>
  'abilities' in props.pokemon
    ? props.pokemon.id
    : Number(props.pokemon.url.split('pokemon/')[1].split('/')[0]),
);

const isPokemonFavorite: ComputedRef<boolean> = computed(() =>
  mainStore.isPokemonFavorite(pokemonId.value),
);

/*
 * Function to add a Pokemon to the favorites list.
 * It checks if the Pokemon is already in the favorites list.
 * If not, it fetches the Pokemon details from the API and adds it to the favorites list.
 */
const addFavorites = async () => {
  let pokemon: Pokemon | null = null;

  if ('abilities' in props.pokemon) {
    pokemon = props.pokemon;
  } else {
    const result = await getPokemon(props.pokemon.url);
    if (result && !(result instanceof Error)) {
      pokemon = result;
    } else {
      console.error('Error fetching Pokemon details:', result);
      pokemon = null;
      return;
    }
  }

  mainStore.updatePokemonFavorites(pokemon!);
};
</script>

<template>
  <div class="flex w-full items-center justify-between rounded-lg bg-white py-2 pr-2.5 pl-5">
    <p class="text-grey text-2xl font-medium capitalize">
      {{ props.pokemon.name }}
    </p>
    <Button
      button-type="button"
      icon-name="star"
      only-icon
      :color-icon="isPokemonFavorite ? 'text-tertiary' : 'text-default'"
      @click.stop="addFavorites"
    />
  </div>
</template>
