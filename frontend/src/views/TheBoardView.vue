<script setup>
import { onUnmounted } from "vue";
import { useMenuStore } from "../stores/menu";

const menuStore = useMenuStore();
menuStore.setIsActive(true);

onUnmounted(() => {
  menuStore.setIsActive(false);
});
</script>

<template>
  <div class="container">
    <div class="banner">
      <img src="@/assets/banner.png" />
      <div class="title">여행을 기다리는 크루들</div>
      <div class="desc">
        당신을 기다리는 크루에 참여하여 여행을 시작하거나, 당신만의 여행을
        만들어보세요.
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
