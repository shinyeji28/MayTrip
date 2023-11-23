<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getReviewList } from "@/api/review.js";
import { listBoard } from "@/api/board.js";
import { useMenuStore } from "../stores/menu";

const router = useRouter();

const reviews = ref([]);
const items = ref([]);

const getReview = async () => {
  const { data } = await getReviewList();
  reviews.value = data.reverse().slice(0, 3);
};

const getBoard = async () => {
  const { data } = await listBoard();
  items.value = data.reverse().slice(0, 10);
  items.value = data.reverse().slice(0, 3);
  console.log(items.value);
  console.log("getBoard 완료:", items.value);
};

getReview();
getBoard();

const menuStore = useMenuStore();
menuStore.setIsActive(true);

onUnmounted(() => {
  menuStore.setIsActive(false);
});
</script>

<template>
  <div class="container">
    <div class="banner-container">
      <v-carousel
        v-if="items.length > 0"
        cycle
        hide-delimiter-background
        :show-arrows="false"
        hide-delimiters
        style="height: 100%"
      >
        <v-carousel-item v-for="(item, i) in items" :key="i">
          <v-sheet height="100%" width="100%">
            <img class="banner-img" :src="item.thumbnailInfo?.url" />
            <div class="text-overlay-review">
              <div class="review-box"></div>
              <div class="text-content-review"></div>
            </div>
          </v-sheet>
        </v-carousel-item>
        <div class="text-overlay">
          <div class="text-content">
            <h2 class="banner-text-left">
              새로운 사람과 낭만 가득한 <br />여행을 떠나 볼까요?
            </h2>
            <br />
            <p>MayTrip에서 여행 동반자를 찾아보세요</p>
            <br />
            <v-btn
              class="banner-left-btn"
              @click="router.push({ name: 'board-list' })"
              >함께 여행하기 &#10149;
            </v-btn>
          </div>
        </div>
      </v-carousel>
    </div>

    <div class="main-wrapper">
      <div class="main-section1">
        <p class="subject-text">여행 다녀왔어요!</p>
        <br />
        <div class="card-section1-wrap">
          <div v-for="(review, i) in reviews" :key="i">
            <v-sheet :elevation="11" :height="300" :width="300" rounded>
              <img
                class="banner-img"
                :src="review.thumbnailInfo?.url"
                :alt="review.thumbnailInfo?.originFileName"
              />
            </v-sheet>
          </div>
          <button>
            <v-btn
              :height="300"
              rounded="xl"
              @click="router.push({ name: 'review-list' })"
            >
              <i class="fas fa-angle-double-right arrow"></i>
            </v-btn>
          </button>
        </div>
      </div>
      <div class="main-section2">
        <p class="subject-text">함께 할 크루원을 찾아요</p>
        <br />
        <div class="card-section1-wrap">
          <div v-for="(item, i) in items" :key="i">
            <v-sheet :elevation="11" :height="300" :width="300" rounded>
              <img
                class="banner-img"
                :src="item.thumbnailInfo?.url"
                :alt="item.thumbnailInfo?.originFileName"
              />
            </v-sheet>
          </div>
          <button>
            <v-btn
              :height="300"
              rounded="xl"
              @click="router.push({ name: 'board-list' })"
            >
              <i class="fas fa-angle-double-right arrow"></i>
            </v-btn>
          </button>
        </div>

        <br />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;

  margin: auto;
  padding: 0;

  flex-direction: column;
  max-width: 1080px;
}
.banner-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1000px; /* 사진 높이 설정 */
}
.banner-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.banner-text-left {
  font-size: 30px;
  text-shadow: 2px 6px 2px gray;
}
.banner-left-btn {
  box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.3);
}
.banner-left-btn:hover {
  transform: translateY(15px);
  /* opacity: 0.3; */
  background-color: #f2e3db;
  color: black;
}
.text-overlay {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  /* text-align: center; */
  color: white;
  z-index: 2;
}
.text-content {
  max-width: 100%;
}

.text-overlay-review {
  position: absolute;
  top: 50%;
  right: 15%;
  transform: translate(-50%, -50%);
  /* text-align: center; */
  color: white;
  z-index: 2;
}
.review-box {
  opacity: 0.6;
  background-color: black;
  width: 300px;
  height: 400px;
  border-radius: 10px;
}
.main-wrapper {
  margin-top: calc(70px + 1000px); /* header + banner */
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

.arrow {
  font-size: 30px;
}
</style>
