<script setup>
import { useMenuStore } from "@/stores/menu";
import { ref } from "vue";

const { changeMenuState } = useMenuStore();
const user = ref({});

const login = () => {
  console.log(user.value);
  console.log("login successful !!!");
  changeMenuState();
};

const changeUsername = () => {
  user.value.username = event.target.value;
}
const changePassword = () => {
  user.value.password = event.target.value;
}
</script>

<template>
  <div class="login">
    <div class="title">Maytrip</div>
    <form @submit.prevent="login">
      <div>
        <label for="username">아이디</label>
        <input type="text" :value="user.username" @input="changeUsername" />
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" :value="user.password" @input="changePassword"
      />
      </div>
      <div><button type="button" @click="login" class="btn-login">Login</button></div>

    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% 25%;
  padding: 0;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}
.title {
  font-size: 50px;
  font-weight: 700;
  margin: 50px 0px;
}
form {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
label {
  font-size: 20px;
  font-weight: 700;
  color: gray;
}
input {
  border: 1px solid lightgray;
  width: 200px;
  height: 25px;
  margin: 10px 0;
}
input:hover {
  border: 1px solid gray;
}
.btn-login {
  width: 100px;
  height: 40px;
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 5px;
  margin: 10px 0;
  font-size: 15px;
  font-weight: 700;
  color: gray;
}
.btn-login:hover {
  background-color: lightgray;
  color: white;
}
</style>
