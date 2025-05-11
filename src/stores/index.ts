import { ref, computed, type Ref } from 'vue';
import { defineStore } from 'pinia';
import type { Pokemon } from '@/models/Pokemon';

const useMainStore = defineStore('main', () => {
  const loading: Ref<boolean> = ref(false);
  const pokemonFavorites: Ref<Pokemon[]> = ref(
    window.localStorage.getItem('pokemonFavorites')
      ? JSON.parse(window.localStorage.getItem('pokemonFavorites') as string)
      : [],
  );

  const isLoading = computed(() => loading.value);

  /**
   * Sets the loading state.
   * @param {boolean} value - The loading state to set.
   */
  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  /**
   * Adds a Pokemon to the favorites list.
   * @param {Pokemon} pokemon - The Pokemon to add.
   */
  const updatePokemonFavorites = (pokemon: Pokemon) => {
    const index = pokemonFavorites.value.findIndex((p) => p.id === pokemon.id);
    if (index === -1) {
      pokemonFavorites.value.push(pokemon);
    } else {
      pokemonFavorites.value.splice(index, 1);
    }
    window.localStorage.setItem('pokemonFavorites', JSON.stringify(pokemonFavorites.value));
  };

  /**
   * Checks if a Pokemon is in the favorites list.
   * @param {number} pokemonId - The ID of the Pokemon to check.
   * @returns {boolean} - True if the Pokemon is in the favorites list, false otherwise.
   */
  const isPokemonFavorite = (pokemonId: number): boolean =>
    pokemonFavorites.value.some((p) => p.id === pokemonId);

  /**
   * Retrieves the list of favorite Pokemon.
   * @returns {Pokemon[]} - The list of favorite Pokemon.
   */
  const getPokemonFavorites = (): Pokemon[] => {
    return pokemonFavorites.value;
  };

  return {
    loading,
    setLoading,
    isLoading,
    isPokemonFavorite,
    updatePokemonFavorites,
    getPokemonFavorites,
  };
});

export default useMainStore;
