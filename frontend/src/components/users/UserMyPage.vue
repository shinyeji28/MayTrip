<script setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import userMyPageMyCrew from "@/components/users/UserMyPageMyCrew.vue";
import userMyPageMyInfo from "./UserMyPageMyInfo.vue";

const { user } = useAuthStore();
const toggle = ref(1);
</script>

<template>
  <div class="row center margin-60">
    <div>
      <img
        :src="
          user.profileImg == '' ? '@/assets/ssafy_logo.png' : user.profileImg
        "
        alt="profile"
        class="profile"
      />
    </div>
    <div class="text-2">{{ user.username }} 님</div>
  </div>
  <v-tabs fixed-tabs>
    <v-tab @click="toggle = 1"> My Crew </v-tab>
    <v-tab @click="toggle = 2"> My Info </v-tab>
  </v-tabs>
  <div class="col margin-60 center">
    <userMyPageMyCrew v-show="toggle == 1" />
    <userMyPageMyInfo v-show="toggle == 2" />
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
