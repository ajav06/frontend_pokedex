import { findPokemon, findPokemons } from '@/api/pokemonAPI';
import type { Pokemon, PokemonResponse } from '@/models/Pokemon';
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query';
import { ref, type Ref } from 'vue';

/**
 * Custom hook to fetch a paginated list of Pokémon using infinite scroll.
 *
 * This hook uses Vue Query's `useInfiniteQuery` to fetch Pokémon data page by page,
 * based on the provided `limit`. It automatically calculates the `offset` and
 * fetches the next page only if more results are available.
 *
 * @param {number} [limit=20] - The number of Pokémon to fetch per page.
 * @returns {UseInfiniteQueryReturnType<PokemonResponse, Error>} - The result of the infinite query.
 */
export const useInfinitePokemonsQuery = (limit: number = 20) =>
  useInfiniteQuery<PokemonResponse, Error>({
    queryKey: ['pokemons-infinite'],
    queryFn: async ({ pageParam = 0 }) => await findPokemons(Number(pageParam), limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextOffset = pages.length * limit;
      return nextOffset >= lastPage.count ? undefined : nextOffset;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

/**
 * Custom hook to fetch a specific Pokémon by name.
 *
 * This hook uses Vue Query's `useQuery` to fetch an individual Pokémon.
 * If the Pokémon doesn't exist or there's an error, it returns `null` instead of throwing.
 *
 * @param {Ref<string>} name - The name of the Pokémon to fetch (reactive).
 * @param {Ref<boolean>} [enabled=ref(true)] - A reactive flag to enable or disable the query.
 * @returns {UseQueryReturnType<Pokemon | null, Error>} - The result of the query, including status and data.
 */
export const usePokemonQuery = (name: Ref<string>, enabled: Ref<boolean> = ref(true)) =>
  useQuery<Pokemon | null, Error>({
    queryKey: ['pokemon', name.value],
    queryFn: async () => {
      try {
        return await findPokemon(name.value);
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enabled,
  });
