<script setup>
import { ref } from "vue";
const items = ref([
  { src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
  { src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
  { src: "@/assets/images/trip4.jpg" },
]);
</script>

<template>
  <div class="container">
    <div class="banner-container">
      <img class="banner-img" src="@/assets/images/trip4.jpg" />
    </div>
    <div class="main-wrapper">
      <div class="main-section1">
        <p class="subject-text">여행 다녀왔어요!</p>
        <br />
        <div class="card-section1-wrap">
          <v-sheet :elevation="11" :height="300" :width="300" rounded>
            <img class="banner-img" src="@/assets/images/trip4.jpg" />
          </v-sheet>
          <v-sheet :elevation="11" :height="300" :width="300" rounded></v-sheet>
          <v-sheet :elevation="11" :height="300" :width="300" rounded></v-sheet>
          <button>
            <v-btn :height="300" rounded="xl">
              <i class="fas fa-angle-double-right arrow"></i>
            </v-btn>
          </button>
        </div>
      </div>
      <div class="main-section2">
        <p class="subject-text">함께 할 크루원을 찾아요</p>
        <br />

        <v-carousel
          cycle
          hide-delimiter-background
          :show-arrows="false"
          :show-delimiters="false"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :style="{ width: '33.33%' }"
          >
            <v-sheet class="fill-height ma-0 pa-0" style="display: flex">
              <!-- 내용 및 이미지 -->
              <v-img
                :src="items[(i + (items.length - 1)) % items.length].src"
                aspect-ratio="2.75"
              ></v-img>
              <v-img :src="item.src"></v-img>
              <v-img
                :src="items[(i + 1) % items.length].src"
                aspect-ratio="2.75"
              ></v-img>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .v-carousel-item:nth-child(2) {
  transform: translateX(-50%);
} */

.container {
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
.main-section1 {
  margin-bottom: 100px;
}
.subject-text {
  font-size: 30px;
  font-weight: 900;
}
.card-section1-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card-section1-wrap .item {
}
.card-section1-wrap img {
  border-radius: 5px;
}
.card-section1-wrap button {
}
.main-section2 {
  margin-bottom: 100px;
}

.arrow {
  font-size: 30px;
}
</style>
