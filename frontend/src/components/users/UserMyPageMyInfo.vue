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
  profileImg: [],
});
const isShowInfo = ref(true);

const modify = async () => {
  try {
    console.log(userForm.value);
    await modifyUser(userForm.value);
    resetUserForm();
    toggle();
  } catch (error) {
    alert("다시 시도해주세요.");
    resetUserForm();
  }
};

const resetUserForm = () => {
  userForm.value.memberId = user.value.memberId;
  userForm.value.username = user.value.username;
  userForm.value.name = user.value.name;
  userForm.value.profileImg = [];
};

const toggle = () => {
  isShowInfo.value = !isShowInfo.value;
};

const cancel = () => {
  resetUserForm();
  toggle();
};

const handleFileUpload = () => {
  console.log(userForm.value.profileImg);
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
    <v-file-input
      accept="image/*"
      label="Profile"
      name="profileImg"
      v-model="userForm.profileImg"
      @change="handleFileUpload"
      :disabled="isShowInfo"
    ></v-file-input>

    <v-btn v-show="isShowInfo" class="me-4" @click="toggle"> modifiy </v-btn>
    <v-btn v-show="!isShowInfo" class="me-4" @click="modify"> confirm </v-btn>
    <v-btn v-show="!isShowInfo" @click="cancel"> cancel </v-btn>
  </form>
  
</template>

<style scoped>
form {
  width: 500px;
}
</style>
