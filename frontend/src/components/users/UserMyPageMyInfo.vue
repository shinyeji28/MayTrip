<script setup>
import { ref, onMounted } from "vue";
import { modifyUser } from "@/api/user";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userForm = ref(user);
const isShowInfo = ref(true);

const modify = async () => {
  try {
    const response = await modifyUser(userForm);
    console.log(response.data);
    // user.value = response.data;
  } catch (error) {
    alert("다시 시도해주세요.");
  }
};

const toggle = () => {
  isShowInfo.value = !isShowInfo.value;
};

const cancel = () => {
  userForm.value = user;
  toggle();
};
</script>

<template>
  <form>
    <v-text-field
      v-model="userForm.username"
      label="Username"
      required
      disabled
    ></v-text-field>

    <v-text-field
      v-model="userForm.name"
      label="Name"
      required
      :disabled="isShowInfo"
    ></v-text-field>

    <v-btn v-show="isShowInfo" class="me-4" @click="toggle"> modifiy </v-btn>
    <v-btn v-show="!isShowInfo" class="me-4" @click="modify"> confirm </v-btn>
    <v-btn v-show="!isShowInfo" @click="cancel"> cancel </v-btn>
  </form>
</template>

<style scoped></style>
