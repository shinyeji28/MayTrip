<script setup>
import { useMenuStore } from "@/stores/menu";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const { clearUser } = useAuthStore();

// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const logout = () => {
  console.log("로그아웃!!!!");
  clearUser();
  changeMenuState();
};
</script>

<template>
  <nav>
    <router-link :to="{ name: 'main' }">
      <img src="@/assets/ssafy_logo.png" alt="..." id="logo" />
    </router-link>
    <div class="nav">
      <ul class="nav-left">
        <li class="nav-item">공지사항</li>
      </ul>
      <ul class="nav-right">
        <template v-for="menu in menuList" :key="menu.routeName">
          <template v-if="menu.show">
            <template v-if="menu.routeName === 'user-logout'">
              <li class="nav-item">
                <router-link to="/" @click.prevent="logout">{{
                  menu.name
                }}</router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link :to="{ name: menu.routeName }">{{
                  menu.name
                }}</router-link>
              </li>
            </template>
          </template>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
}
#logo {
  width: 100px;
  height: 70px;
  margin-right: 0 20px;
}
.nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(236, 234, 234);
}
ul {
  width: 50%;
  display: flex;
  flex-direction: row;
}
.nav-left {
  justify-content: flex-start;
}
.nav-right {
  justify-content: flex-end;
}
.nav-item {
  margin: 0 20px;
}

.nav-item > a {
  text-decoration-line: none;
  color: black;
  font-weight: 800;
}
</style>
