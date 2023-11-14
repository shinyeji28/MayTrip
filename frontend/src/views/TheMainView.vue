<script setup></script>

<template>
  <div class="container">
    <div class="banner-container">
      <img class="banner-img" src="@/assets/images/trip4.jpg" />
    </div>
    <div class="main-wrapper">
      <div>
        <p class="subject-text">이런 여행은 어때?</p>
      </div>
      <div>
        <p class="subject-text">함께 할 크루원을 찾아요</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  /* todo 삭제 */
  /* background-color: aqua; */
}
.banner-container {
  position: absolute;
  left: 0;
  top: 70px;
  width: 100%;
  height: 700px; /* 사진 높이 설정 */
}
.banner-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.main-wrapper {
  margin-top: calc(70px + 700px); /* header + banner */
}
.subject-text {
  font-size: 25px;
  font-weight: 900;
}
</style>
