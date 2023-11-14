<script setup>
import { useAuthStore } from "@/stores/auth";

const { user } = useAuthStore();
</script>

<template>
  <div class="row">
    <div>
      <img src="@/assets/ssafy_logo.png" alt="profile" />
    </div>
    <div>username</div>
  </div>
  <v-tabs fixed-tabs>
    <v-tab> My Crew </v-tab>
    <v-tab> My Info </v-tab>
  </v-tabs>
  <div class="col">
    <div></div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
}
</style>
