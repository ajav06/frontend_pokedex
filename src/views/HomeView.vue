<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>

<template>
  <div class="flex h-dvh flex-col items-center justify-center p-7">
    <div class="bg-primary size-52 rounded-full border-3">
      <img
        src="@/assets/imgs/pikachu.svg"
        alt="Logo"
        class="absolute -translate-x-13 -translate-y-18"
      />
    </div>

    <h1 class="text-grey mt-14 text-2xl font-bold">Welcome to Pokédex</h1>

    <p class="mt-7 text-center text-lg font-medium md:max-w-xl">
      The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the
      Pokémon world.
    </p>

    <Button class="mt-10" button-type="button" @click="$router.push({ name: 'Pokemon' })">
      Get started
    </Button>
  </div>
</template>
