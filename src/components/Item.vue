<script setup lang="ts">
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import type { Pokemon, PokemonItem } from '@/models/Pokemon';
import useMainStore from '@/stores';
import { usePokemonQuery } from '@/queries/pokemon';
import Button from './Button.vue';

const props = defineProps<{
  pokemon: PokemonItem | Pokemon;
}>();

const mainStore = useMainStore();
const isEnabled: Ref<boolean> = ref(false);
const pokemonId: ComputedRef<string> = computed(() =>
  'abilities' in props.pokemon
    ? String(props.pokemon.id)
    : props.pokemon.url.split('pokemon/')[1].split('/')[0],
);

const { data, isFetching, refetch } = usePokemonQuery(pokemonId, isEnabled);

const isPokemonFavorite: ComputedRef<boolean> = computed(() =>
  mainStore.isPokemonFavorite(Number(pokemonId.value)),
);

/**
 * Function to add or remove a Pokemon from favorites.
 * If the Pokemon is already a favorite, it will be removed.
 * If the Pokemon is not a favorite, it will be added.
 */
const addFavorites = async () => {
  let pokemon: Pokemon | null = null;

  if ('abilities' in props.pokemon) {
    pokemon = props.pokemon;
  } else {
    isEnabled.value = true;
    if (!data.value) await refetch();
    pokemon = data.value!;
  }

  mainStore.updatePokemonFavorites(pokemon!);
};

watch(isFetching, (newValue) => {
  mainStore.setLoading(newValue);
});
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
