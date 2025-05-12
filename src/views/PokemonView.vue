<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue';
import useMainStore from '@/stores';
import Input from '@/components/Input.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';
import type { Pokemon, PokemonItem, PokemonView } from '@/models/Pokemon';
import Item from '@/components/Item.vue';
import Modal from '@/components/ModalPokemon.vue';
import { BASE_URL, FETCH_LIMIT } from '@/helpers/const';
import { useInfinitePokemonsQuery, usePokemonQuery } from '@/queries/pokemon';

const mainStore = useMainStore();

const pokemonName: Ref<string> = ref('');
const modalPokemonName: Ref<string> = ref('');
const pokemonList: Ref<PokemonItem[]> = ref([]);
const pokemon: Ref<Pokemon | null> = ref(null);
const visibleModal: Ref<boolean> = ref(false);
const viewSelected: Ref<PokemonView> = ref('all');
const inputElement: Ref<InstanceType<typeof Input> | null> = ref(null);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const isSearchEnabled = computed(
  () => pokemonName.value.trim() !== '' && viewSelected.value === 'all',
);
const isModalEnabled = computed(() => modalPokemonName.value.trim() !== '');

const {
  data: fetchedPokemonPages,
  fetchNextPage,
  isFetching: isFetchingList,
  refetch: refetchList,
} = useInfinitePokemonsQuery(FETCH_LIMIT);
const {
  data: fetchedPokemon,
  refetch: refetchPokemon,
  isFetching: isFetchingPokemon,
} = usePokemonQuery(pokemonName, isSearchEnabled);
const {
  data: modalFetchedPokemon,
  isFetching: isFetchingModalPokemon,
  refetch: refetchModalPokemon,
} = usePokemonQuery(modalPokemonName, isModalEnabled);

/**
 * Function to open the modal and set the Pokemon data.
 * @param {PokemonItem | Pokemon} pokemonItem - The Pokemon item to display in the modal.
 */
const openModal = (pokemonItem: PokemonItem | Pokemon) => {
  if ('abilities' in pokemonItem) {
    pokemon.value = pokemonItem;
    visibleModal.value = true;
  } else {
    const name = pokemonItem.url.split('pokemon/')[1].replace('/', '');
    modalPokemonName.value = name;
    refetchModalPokemon();
  }
};

/**
 * Function to close the modal and reset the Pokemon data.
 */
const closeModal = () => {
  visibleModal.value = false;
  pokemon.value = null;
  modalPokemonName.value = '';
};

/**
 * Function to change the view of the Pokemon list.
 * @param {PokemonView} view - The view to switch to ('all' or 'favorites').
 */
const changeView = async (view: PokemonView) => {
  viewSelected.value = view;

  if (pokemonName.value) {
    handleInputSearch();
    return;
  }

  if (view === 'favorites') {
    pokemonList.value = [];

    pokemonList.value = mainStore
      .getPokemonFavorites()
      .map((item) => ({
        name: item.name,
        url: `pokemon/${item.id}/`,
      }))
      .filter((item) => item.name.toLowerCase().includes(pokemonName.value.toLowerCase().trim()));
    return;
  }
  pokemonList.value = [];
  refetchList();
  pokemonList.value = fetchedPokemonPages.value?.pages.flatMap((page) => page.results) || [];
};

/**
 * Function to handle the scroll event and fetch more Pokemon when the user scrolls to the bottom of the page.
 * This function checks the scroll position and triggers the fetchPokemons function if the user is near the bottom of the page.
 */
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.body.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 300) {
    fetchNextPage();
  }
};

/**
 * Function to handle the input search and filter the Pokemon list based on the search term.
 * This function is called when the user types in the search input.
 */
const handleInputSearch = () => {
  pokemonList.value = [];

  if (!pokemonName.value) {
    changeView(viewSelected.value);
    return;
  }

  if (viewSelected.value === 'favorites') {
    pokemonList.value = mainStore
      .getPokemonFavorites()
      .map((item) => ({
        name: item.name,
        url: `pokemon/${item.id}/`,
      }))
      .filter((item) => item.name.toLowerCase().includes(pokemonName.value.toLowerCase().trim()));
    return;
  }

  refetchPokemon();
};

watch(pokemonName, () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    pokemonList.value = [];
    handleInputSearch();
  }, 700);
});

watch(isFetchingList, (newValue) => {
  mainStore.setLoading(newValue);
  if (!newValue && viewSelected.value === 'all')
    pokemonList.value = fetchedPokemonPages.value?.pages.flatMap((page) => page.results) || [];
});

watch(isFetchingPokemon, (newValue) => {
  mainStore.setLoading(newValue);

  if (!newValue && isSearchEnabled.value) {
    pokemonList.value = fetchedPokemon.value
      ? [
          {
            name: fetchedPokemon.value.name,
            url: `${BASE_URL}/pokemon/${fetchedPokemon.value.id}/`,
          },
        ]
      : [];
  }
});

watch(isFetchingModalPokemon, (newValue) => {
  mainStore.setLoading(newValue);
  if (!newValue && modalFetchedPokemon.value && isModalEnabled.value) {
    pokemon.value = modalFetchedPokemon.value;
    visibleModal.value = true;
  }
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  changeView(viewSelected.value);
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
          type="search"
          class="w-full"
          placeholder="Search"
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
