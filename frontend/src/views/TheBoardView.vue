<script setup></script>

<template>
  <div class="container">
    <div class="banner">
      <img src="@/assets/banner.png" />
      <div class="title">당신의 여행 친구를 찾아보세요</div>
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
  top: 70px;
  width: 100%;
  height: 500px;
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
  font-size: 30px;
  font-weight: 900;
  color: white;
  /* text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6); */
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
