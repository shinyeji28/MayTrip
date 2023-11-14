<script setup>
import { useMenuStore } from "@/stores/menu";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { login } from "@/api/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router = useRouter();
const { changeMenuState } = useMenuStore();
const authStore = useAuthStore();
const { updateToken } = useAuthStore();
const user = storeToRefs(authStore);
const userForm = ref({});

// 입력 폼 확인 용 규칙
const rules = ref({
  username: [
    (value) => {
      if (value) return true;

      return "Username is requred.";
    },
  ],
  password: [
    (value) => {
      if (value) return true;

      return "Password is requred.";
    },
  ],
});

const clickLogin = async () => {
  // 로그인 버튼 클릭시
  if (!userForm.value.username || !userForm.value.password) {
    return; // 입력폼 값 확인
  }
  try {
    const response = await login(userForm.value);
    console.log("login 성공 !!");
    updateToken(response.data.token); // 토큰 및 유저정보 저장
    changeMenuState(); // 메뉴바 토글
    router.push({ path: "/" });
  } catch (error) {
    console.log(error);
    alert("로그인을 다시 시도해주세요.");
  }
};
</script>

<template>
  <div class="login">
    <div class="title">Maytrip</div>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="clickLogin">
        <v-text-field
          v-model="userForm.username"
          label="Username"
          :rules="rules.username"
        ></v-text-field>
        <v-text-field
          v-model="userForm.password"
          label="Password"
          :rules="rules.password"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Login</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20vh 15vw;
  padding: 0;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.title {
  font-size: 50px;
  font-weight: 700;
  margin: 50px 0px;
}
</style>
