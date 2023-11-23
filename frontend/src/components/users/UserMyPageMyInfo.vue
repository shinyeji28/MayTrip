<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { modifyUser, deleteUser } = authStore;

const userForm = ref(null);
const userInfo = ref({
  memberId: user.value.memberId,
  username: user.value.username,
  name: user.value.name,
  email: user.value.email,
});

const isShowInfo = ref(true);
const dialog = ref(false);

const modify = async () => {
  try {
    var formData = new FormData(userForm.value);
    formData.append("memberId", user.value.memberId);
    await modifyUser(formData);
    resetUserInfo();
    toggle();
  } catch (error) {
    alert("다시 시도해주세요.", error);
    resetUserInfo();
  }
};

const resetUserInfo = () => {
  userInfo.value.memberId = user.value.memberId;
  userInfo.value.username = user.value.username;
  userInfo.value.name = user.value.name;
  userInfo.value.email = user.value.email;
};

const toggle = () => {
  isShowInfo.value = !isShowInfo.value;
};

const cancel = () => {
  resetUserInfo();
  toggle();
};

const handleFileUpload = () => {
  console.log(userForm.value.profileImg);
};

const secession = async () => {
  await deleteUser(user.value.memberId);
  dialog.value = false;
  router.push("/");
};
</script>

<template>
  <div class="row flex-end">
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn variant="plain" v-bind="props"> 탈퇴하기 </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            회원에서 탈퇴하시겠습니까?
          </v-card-title>
          <v-card-text
            >회원 탈퇴를 하실 경우, 사용자님과 관련된 모든 기록은
            삭제됩니다.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="secession">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
  <form ref="userForm" class="mt-30">
    <v-text-field
      label="Username"
      name="username"
      v-model="userInfo.username"
      required
      disabled
    ></v-text-field>
    <v-text-field
      label="Name"
      name="name"
      required
      v-model="userInfo.name"
      :disabled="isShowInfo"
    ></v-text-field>
    <v-text-field
      label="E-mail"
      name="email"
      required
      v-model="userInfo.email"
      :disabled="isShowInfo"
    ></v-text-field>
    <v-file-input
      accept="image/*"
      label="Profile"
      name="profileImg"
      @change="handleFileUpload"
      :disabled="isShowInfo"
    ></v-file-input>
  </form>
  <div class="row flex-end">
    <v-btn v-show="isShowInfo" class="me-4" @click="toggle"> modifiy </v-btn>
    <v-btn v-show="!isShowInfo" class="me-4 modify" @click="modify">
      confirm
    </v-btn>
    <v-btn v-show="!isShowInfo" class="cancel" @click="cancel"> cancel </v-btn>
  </div>
</template>

<style scoped>
form {
  width: 500px;
}
.row {
  width: 500px;
  display: flex;
  flex-direction: row;
}

.flex-end {
  justify-content: flex-end;
  align-items: center;
}
.mt-30 {
  margin-top: 30px;
}
.modify:hover {
  background-color: #e86a33;
  color: white;
  font-weight: 500;
}
.cancel:hover {
  background-color: #41644a;
  color: white;
  font-weight: 500;
}
</style>
