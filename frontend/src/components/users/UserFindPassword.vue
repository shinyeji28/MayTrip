<script setup>
import { ref } from "vue";
import {
  sendCertificateNumApi,
  matchCertificateNumApi,
  clickChangePasswordApi,
} from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  email: "",
  code: "",
  password: "",
});
const order = ref(1);
const btnDisabled = ref(false);

// 입력 폼 규칙
const rules = ref({
  email: [
    (value) => {
      var regex = /^[a-z0-9]+@[a-z.-]+\.[a-z]+$/i;
      if (regex.test(value)) return true;
      return "Must be a valid e-mail.";
    },
  ],
  password: [
    (value) => {
      if (value) return true;
      return "Password is requred.";
    },
  ],
});
const toggle = async () => {
  btnDisabled.value = !btnDisabled.value;
};
const clickCertificateNumSubmit = async () => {
  toggle();
  try {
    await sendCertificateNumApi(form.value);
    order.value = 2;
  } catch (error) {
    console.log(error);
  }
  toggle();
};

const clickCertificateConfirm = async () => {
  toggle();
  try {
    await matchCertificateNumApi(form.value);
    order.value = 3;
  } catch {
    alert("인증에 실패했습니다. 다시 시도해주세요.");
    order.value = 1;
  }
  toggle();
};

const clickChangePassword = async () => {
  toggle();
  try {
    await clickChangePasswordApi(form.value);
    router.push({ name: "user-login" });
    alert("비밀번호가 변경되었습니다.");
  } catch {
    alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    order.value = 1;
  }
  toggle();
};
</script>

<template>
  <div class="container">
    <img
      src="@/assets/biglogo.png"
      class="mb-3"
      width="300"
      alt="..."
      id="logo"
    />
    <div v-show="order == 1">
      <h3 class="title">이메일을 입력하세요.</h3>
      <v-card-text class="mt-4 mb-4 pa-0 gray"
        >가입 시 작성한 이메일로 인증을 시도하세요.</v-card-text
      >
      <v-sheet width="300" class="mx-auto">
        <v-form @submit.prevent="clickCertificateNumSubmit">
          <v-text-field
            v-model="form.email"
            :rules="rules.email"
            label="E-mail"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2 btn" :disabled="btnDisabled"
            >인증번호 전송</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
    <div v-show="order == 2" class="col center">
      <h3 class="title">인증번호를 입력하세요</h3>
      <v-card-text class="mt-4 pa-0 gray"
        >해당 이메일로 인증번호를 보냈습니다.</v-card-text
      >
      <v-card-text class="ma-0 pa-0 gray"
        >수신된 메일에서 코드를 찾아 입력해주세요.</v-card-text
      >
      <v-otp-input v-model="form.code"></v-otp-input>
      <v-btn
        type="submit"
        @click="clickCertificateConfirm"
        block
        class="mt-2 btn"
        :disabled="btnDisabled"
        >확인</v-btn
      >
    </div>
    <div v-show="order == 3" class="col center">
      <h3 class="title">인증되었습니다.</h3>
      <v-card-text class="mt-4 pa-0 gray"
        >변경할 새로운 비밀번호를 입력하세요.</v-card-text
      >
      <v-sheet width="300" class="mx-auto mt-4">
        <v-form @submit.prevent="clickChangePassword">
          <v-text-field
            v-model="form.password"
            :rules="rules.password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn type="submit" block class="mt-2 btn" :disabled="btnDisabled"
            >변경하기</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15vh 15vw;
  padding: 0;
  width: 400px;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.title {
  color: #263a29;
}

.col {
  display: flex;
  flex-direction: column;
}
.center {
  align-items: center;
}

.btn {
  background-color: #41644a;
  color: white;
  font-weight: 500;
}

.gray {
  color: darkgray;
}
</style>
