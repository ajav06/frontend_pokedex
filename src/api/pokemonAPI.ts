import type { Pokemon, PokemonResponse } from '@/models/Pokemon';
import httpClient from './httpClient';

/**
 * Fetches Pokemon data from the PokeAPI.
 * @param {string} name - The name of the Pokemon to fetch.
 * @returns {Promise<Pokemon>} - A promise that resolves to the Pokemon data.
 */
export const findPokemon = async (name: string): Promise<Pokemon> => {
  const response = await httpClient.get<Pokemon>(`pokemon/${name}`);
  return response.data;
};

/**
 * Fetches a list of Pokemon or a Pokemon from the PokeAPI.
 * @param {number} offset - The offset for pagination.
 * @param {number} limit - The limit for pagination.
 * @returns {Promise<PokemonResponse>} - A promise that resolves to the Pokemon data.
 */
export const findPokemons = async (offset: number, limit: number): Promise<PokemonResponse> => {
  const response = await httpClient.get<PokemonResponse>('pokemon', {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};
