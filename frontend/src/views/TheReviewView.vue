<script setup>
import { onUnmounted, watch } from "vue";
import { useMenuStore } from "../stores/menu";
import { storeToRefs } from "pinia";

const menuStore = useMenuStore();
const {isActive} = storeToRefs(menuStore);
menuStore.setIsActive(true);

onUnmounted(() => {
  menuStore.setIsActive(false);
});

watch(() => isActive.value, (newValue) => {
  console.log("active 변경됨", newValue);
  isActive.value = true;
});
</script>

<template>
  <div class="container">
    <div class="banner">
      <img src="@/assets/banner2.png" />
      <div class="title">새로운 사람과 함께한 여행을 추억해요</div>
      <div class="desc">
        maytrip의 다양한 크루들에서 만들어간 여행을 모아두고, 하나씩 펼쳐보며
        새로운 여행을 계획해요.
      </div>
    </div>
    <main class="container">
      <div class="main-wrap">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<style>
.container {
  display: flex;

  margin: auto;
  padding: 0;
  padding-top: 80px;

  flex-direction: column;
  max-width: 1080px;
}
.banner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 600px;
  z-index: -1;
}
.banner img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.3);
}
.title {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-size: 25px;
  font-weight: 900;
  color: white;
  /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6); */
}

.desc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-size: 15px;
  font-weight: 900;
  color: #f2e3db;
}

.container {
  width: 100%;
  height: 100%;
}
.main-wrap {
  margin-top: 250px;
  margin-bottom: 0;
  min-height: 700px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.25),
    4px 4px 4px 0px rgba(0, 0, 0, 0.25);

  padding: 40px;
  overflow: scroll;
}
.main-wrap::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
