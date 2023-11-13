<script setup>
import { useMenuStore } from "@/stores/menu";

const { changeMenuState } = useMenuStore();
const user = ref({});

const login = () => {
  console.log("login successful !!!");
  changeMenuState();
};
</script>

<template>
  <div class="login">
    <div>로그인</div>
    <form @submit.prevent="">
      <label for="username"><input type="text" :value="user.username" /></label>
      <label for="password"
        ><input type="password" :value="user.password"
      /></label>
    </form>
  </div>

  <div><button type="button" @click="login">로그인</button></div>
</template>

<style scoped></style>
