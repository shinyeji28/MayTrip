<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import userMyPageMyCrew from "@/components/users/UserMyPageMyCrew.vue";
import userMyPageMyInfo from "./UserMyPageMyInfo.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { user } = useAuthStore();
const toggle = (idx) => {
  if (idx == 1) router.push({ name: "user-mypage-crew" });
  else if (idx == 2) router.push({ name: "user-mypage-info" });
};
</script>

<template>
  <div class="row center margin-60">
    <div>
      <img
        :src="
          !user.profileImg
            ? '/src/assets/profile_none.png'
            : user.profileImg.url
        "
        alt="profile"
        class="profile"
      />
    </div>
    <div class="text-2">{{ user.username }} 님</div>
  </div>
  <v-tabs fixed-tabs>
    <v-tab @click="toggle(1)"> My Crew </v-tab>
    <v-tab @click="toggle(2)"> My Info </v-tab>
  </v-tabs>
  <div class="col margin-60 center">
    <router-view></router-view>
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

.profile {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 1px solid lightgray;
  margin-right: 80px;
}

.center {
  justify-content: center;
  align-items: center;
}

.margin-60 {
  margin: 60px 0px;
}

.text-2 {
  font-size: xx-large;
  font-weight: 800;
}
</style>
