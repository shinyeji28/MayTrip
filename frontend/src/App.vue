<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheHeadingNavbar from "./components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <TheHeadingNavbar />
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  padding: 0;

  display: flex;
  flex-direction: column;
  margin: auto;

  max-width: 1080px;
}
</style>
