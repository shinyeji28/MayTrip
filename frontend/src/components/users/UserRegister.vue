<script setup>
import { ref } from "vue";
import { signup } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userForm = ref({
  username: "",
  password: "",
  name: "",
});

// 입력 폼 규칙
const rules = ref({
  username: [
    (value) => {
      if (value) return true;
      return "Username is requred.";
    },
    (value) => {
      if (true) return true; // duplicate 검사 필요
      return "Username already taken. Please try another one.";
    },
  ],
  password: [
    (value) => {
      if (value) return true;

      return "Password is requred.";
    },
  ],
  name: [
    (value) => {
      if (value) return true;

      return "Name is required.";
    },
    (value) => {
      if (value?.length <= 10) return true;

      return "Name must be less than 10 characters.";
    },
  ],
});

const clickSignup = async () => {
  // 회원가입 버튼 클릭 시
  if (
    !userForm.value.username ||
    !userForm.value.password ||
    !userForm.value.name
  ) {
    return; // 입력폼 비었는지 확인
  }

  try {
    const response = await signup(userForm.value);
    console.log("signup 성공 !!");
    router.push({ name: "user-login" });
  } catch (error) {
    console.log(error);
    alert("회원가입을 다시 시도해주세요.");
  }
};
</script>

<template>
  <div class="container">
    <div class="title">Maytrip</div>
    <v-sheet width="300" class="mx-auto">
      <v-form @submit.prevent="clickSignup">
        <v-text-field
          v-model="userForm.username"
          :rules="rules.username"
          label="Username"
        ></v-text-field>
        <v-text-field
          v-model="userForm.password"
          :rules="rules.password"
          label="Password"
        ></v-text-field>
        <v-text-field
          v-model="userForm.name"
          :rules="rules.name"
          label="Name"
        ></v-text-field>
        <v-btn type="submit" block class="mt-2">Signup</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped>
.container {
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
