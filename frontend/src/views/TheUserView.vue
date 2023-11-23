<script setup></script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style>
.container {
  padding: 0;
  padding-top: 80px;

  display: flex;
  flex-direction: column;
  margin: auto;

  max-width: 1080px;
}
</style>
