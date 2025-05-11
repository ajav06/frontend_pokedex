import httpClient from '@/api/httpClient';
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
      const response = await httpClient.get<Pokemon>(`pokemon/${name}`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      mainStore.setLoading(false);
    }
  };

  return { getPokemon };
};
export default usePokemon;
