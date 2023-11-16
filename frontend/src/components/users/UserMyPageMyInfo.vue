<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { modifyUser } = authStore;

const userForm = ref({
  memberId: user.value.memberId,
  username: user.value.username,
  name: user.value.name,
});
const isShowInfo = ref(true);

const modify = async () => {
  try {
    await modifyUser(userForm.value);
    resetUserForm();
    toggle();
  } catch (error) {
    alert("다시 시도해주세요.");
    resetUserForm();
  }
};

const resetUserForm = () => {
  (userForm.value.memberId = user.value.memberId),
    (userForm.value.username = user.value.username),
    (userForm.value.name = user.value.name);
};

const toggle = () => {
  isShowInfo.value = !isShowInfo.value;
};

const cancel = () => {
  resetUserForm();
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
