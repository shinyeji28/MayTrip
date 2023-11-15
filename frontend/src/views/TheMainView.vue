<script setup>
import { ref } from "vue";
const items = ref([
  { text: "1번 그림", src: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { text: "2번 그림", src: "https://cdn.vuetifyjs.com/images/cards/hotel.jpg" },
  {
    text: "3번 그림",
    src: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
  },
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

        <div>
          <v-carousel
            cycle
            hide-delimiter-background
            :show-arrows="false"
            :show-delimiters="false"
            hide-controls
          >
            <v-carousel-item v-for="(item, i) in items" :key="i">
              <v-sheet
                class="fill-height ma-0 pa-0"
                style="
                  display: flex;
                  border-radius: 10px;
                  position: relative;
                  overflow: hidden;
                "
                rounded
              >
                <!-- 검은색 투명도 레이어 -->
                <div
                  style="
                    position: absolute;
                    bottom: 1%;
                    left: 0;
                    width: 100%;
                    height: 97%;
                    background-color: rgba(0, 0, 0, 0.6);
                    border-radius: 10px;
                  "
                ></div>

                <!-- 오른쪽 이미지 -->
                <v-img
                  :src="items[(i + 1) % items.length].src"
                  aspect-ratio="16/9"
                  style="
                    width: 60%;
                    position: absolute;
                    right: 0;
                    bottom: 1%;
                    z-index: 1;
                    opacity: 0.5;
                    transition: opacity 0.3s ease-in-out;
                    object-fit: cover;
                    border-radius: 10px;
                  "
                ></v-img>

                <!-- 왼쪽 이미지 -->
                <v-img
                  :src="items[(i + items.length - 1) % items.length].src"
                  aspect-ratio="16/9"
                  style="
                    width: 60%;
                    position: absolute;
                    left: 0;
                    bottom: 1%;
                    z-index: 2;
                    opacity: 0.5;
                    transition: opacity 0.3s ease-in-out;
                    object-fit: cover;
                    border-radius: 10px;
                    height: ;
                  "
                ></v-img>

                <!-- 중앙 이미지 -->
                <v-img
                  :src="item.src"
                  aspect-ratio="16/9"
                  style="
                    width: 60%;
                    position: absolute;
                    bottom: 1%;
                    left: 20%;
                    z-index: 3;
                    transition: opacity 0.3s ease-in-out;
                    object-fit: cover;
                    border-radius: 10px;
                    box-shadow: 1px 1px 15px 5px #000;
                  "
                ></v-img>

                <!-- 텍스트 -->
                <div
                  style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 4;
                    color: white; /* 텍스트 색상을 흰색으로 지정 */
                  "
                >
                  <span>여기는 텍스트 입니다.</span>
                  <span>{{ item.text }}</span>
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
