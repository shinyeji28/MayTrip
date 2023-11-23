<script setup>
import { useMenuStore } from "@/stores/menu";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const menuStore = useMenuStore();
const { clearUser } = useAuthStore();

// 반응형을 유지하면서 스토어에서 속성을 추출하려면, storeToRefs()를 사용
// https://pinia.vuejs.kr/core-concepts/
const { menuList, isActive } = storeToRefs(menuStore);
const top = ref(0);

const logout = () => {
  console.log("로그아웃!!!!");
  clearUser();
};

window.addEventListener("scroll", function () {
  top.value =
    window.scrollY ||
    window.pageXOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
});
</script>

<template>
  <div class="nav-container" :class="{ active: top < 50 && isActive }">
    <nav>
      <router-link :to="{ name: 'main' }">
        <img src="@/assets/logo.png" alt="..." id="logo" />
      </router-link>
      <div class="nav">
        <ul class="nav-left">
          <li class="nav-item">
            <router-link :to="{ name: 'board-list' }">공지사항</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board-list' }"
              >여행 크루 참여</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'board-list' }"
              >여행 계획 공유</router-link
            >
          </li>
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
  </div>
</template>

<style scoped>
.active {
  background-color: transparent !important;
}
.nav-block {
  height: 7vh;
}
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f2e3db;
  border-bottom: 1px solid #f0e4de;
  height: 7vh;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
}
nav > a {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#logo {
  width: 140px;
  height: 80px;
  margin: 1px 20px;
}
.nav {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  font-family: "NanumBarunGothicLight";
  text-decoration-line: none;
  color: #41644a;
  font-weight: 700;
}
.nav-item > a:hover {
  color: #e86a33;
}
</style>
