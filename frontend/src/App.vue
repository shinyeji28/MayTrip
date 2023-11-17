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

<style></style>
