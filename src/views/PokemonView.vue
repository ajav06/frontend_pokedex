<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import httpClient from '@/api/httpClient';
import useMainStore from '@/stores';
import Input from '@/components/Input.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';
import type { Pokemon, PokemonItem, PokemonResponse, PokemonView } from '@/models/Pokemon';
import Item from '@/components/Item.vue';
import Modal from '@/components/ModalPokemon.vue';
import usePokemon from '@/composable/usePokemon';
import { BASE_URL, FETCH_LIMIT } from '@/helpers/const';

const mainStore = useMainStore();
const { getPokemon } = usePokemon();

const pokemonName: Ref<string> = ref('');
const pokemonList: Ref<PokemonItem[]> = ref([]);
const pokemon: Ref<Pokemon | null> = ref(null);
const inputElement: Ref<InstanceType<typeof Input> | null> = ref(null);
const visibleModal: Ref<boolean> = ref(false);
const viewSelected: Ref<PokemonView> = ref('all');
const offset: Ref<number> = ref(0);
const isFetching: Ref<boolean> = ref(false);
const hasMore: Ref<boolean> = ref(true);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

/*
 * Function to fetch Pokemon data from the API.
 * This function checks if the user is searching for a specific Pokemon or if the view is set to 'favorites'.
 * If the view is 'favorites', it fetches the favorite Pokemon from the store.
 * Otherwise, it fetches the Pokemon list from the API based on the search input.
 */
const fetchPokemons = async () => {
  if (isFetching.value || !hasMore.value || viewSelected.value === 'favorites') return;

  isFetching.value = true;
  try {
    mainStore.setLoading(true);
    const response = await httpClient.get<PokemonResponse | Pokemon>(
      `pokemon/${pokemonName.value.toLowerCase().trim()}`,
      {
        params: {
          limit: FETCH_LIMIT,
          offset: offset.value,
        },
      },
    );
    const data = response.data;

    if (('results' in data && data.results.length < FETCH_LIMIT) || !('results' in data)) {
      hasMore.value = false;
    }

    if ('results' in data) {
      pokemonList.value.push(...(data.results as PokemonItem[]));
      offset.value += FETCH_LIMIT;
    } else {
      pokemonList.value = [
        {
          name: data.name,
          url: `${BASE_URL}pokemon/${data.id}/`,
        },
      ];
    }
  } catch (error) {
    pokemonList.value = [];
    console.error(error);
  } finally {
    isFetching.value = false;
    mainStore.setLoading(false);
    inputElement.value?.focus();
  }
};

/*
 * Function to open the modal with the Pokemon details.
 * @param {PokemonItem | Pokemon} pokemonItem - The Pokemon item or Pokemon object to display in the modal.
 */
const openModal = async (pokemonItem: PokemonItem | Pokemon) => {
  if ('abilities' in pokemonItem) {
    pokemon.value = pokemonItem;
  } else {
    const result = await getPokemon(pokemonItem.url);
    if (result && !(result instanceof Error)) {
      pokemon.value = result;
    } else {
      console.error('Error fetching Pokemon details:', result);
      pokemon.value = null;
    }
  }
  visibleModal.value = !!pokemon.value;
};

/*
 * Function to close the modal and reset the Pokemon data.
 */
const closeModal = () => {
  visibleModal.value = false;
  pokemon.value = null;
};

/*
 * Function to change the view of the Pokemon list.
 * @param {PokemonView} view - The view to switch to ('all' or 'favorites').
 */
const changeView = async (view: PokemonView) => {
  viewSelected.value = view;
  if (view === 'favorites') {
    pokemonList.value = [];
    offset.value = 0;
    hasMore.value = true;

    pokemonList.value = mainStore
      .getPokemonFavorites()
      .map((item) => ({
        name: item.name,
        url: `pokemon/${item.id}/`,
      }))
      .filter((item) => item.name.toLowerCase().includes(pokemonName.value.toLowerCase().trim()));
  } else {
    pokemonList.value = [];
    await fetchPokemons();
  }
};

/*
 * Function to handle the scroll event and fetch more Pokemon when the user scrolls to the bottom of the page.
 * This function checks the scroll position and triggers the fetchPokemons function if the user is near the bottom of the page.
 */
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 300) {
    fetchPokemons();
  }
};

watch(pokemonName, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pokemonList.value = [];
    offset.value = 0;
    hasMore.value = true;
    changeView(viewSelected.value);
  }, 700);
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  fetchPokemons();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (debounceTimeout) clearTimeout(debounceTimeout);
});
</script>

<template>
  <div class="h-screen">
    <Modal :pokemon="pokemon" :isOpen="visibleModal" @close="closeModal()" />
    <div class="mx-auto max-w-xl px-7 md:p-0">
      <section class="bg-neutral sticky top-0 py-9">
        <Input
          v-model="pokemonName"
          type="text"
          class="w-full"
          placeholder="Search"
          @keyup.enter="fetchPokemons"
          ref="inputElement"
        />
      </section>

      <div class="flex flex-col items-center justify-center gap-3 pb-32" v-if="pokemonList.length">
        <Item
          v-for="(item, index) in pokemonList"
          :key="index"
          :pokemon="item"
          @click="openModal(item)"
        />
      </div>

      <section class="flex flex-col items-center" v-else>
        <h1 class="text-grey text-4xl font-bold">Uh-oh!</h1>
        <p class="mt-3 text-xl">You look lost on your journey!</p>
        <Button class="mt-6" button-type="button" @click="$router.push({ name: 'Home' })">
          Go back home
        </Button>
      </section>
    </div>

    <Footer :selected="viewSelected" @change-view="changeView($event)" />
  </div>
</template>
