import { findPokemon } from '@/api/pokemonAPI';
import type { Pokemon } from '@/models/Pokemon';
import useMainStore from '@/stores';
import type { AxiosError } from 'axios';

const usePokemon = () => {
  const mainStore = useMainStore();

  /**
   * Fetches Pokemon data from the PokeAPI.
   * @param {string} url - The URL of the Pokemon to fetch.
   * @returns {Promise<Pokemon | AxiosError>} - A promise that resolves to the Pokemon data.
   */
  const getPokemon = async (url: string): Promise<Pokemon | AxiosError> => {
    try {
      mainStore.setLoading(true);
      const name = url.split('pokemon/')[1];
      return await findPokemon(name);
    } catch (error) {
      throw error;
    } finally {
      mainStore.setLoading(false);
    }
  };

  return { getPokemon };
};
export default usePokemon;
