<script setup lang="ts">
import Loading from './components/Loading.vue';
import useMainStore from '@/stores';
const store = useMainStore();
</script>

<template>
  <main>
    <Loading v-if="store.isLoading" />
    <RouterView :class="{ 'bg-neutral': store.isLoading }" />
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Manrope:wght@200..800&display=swap');
</style>
