<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getReviewList } from "@/api/review.js";
import { listBoard } from "@/api/board.js";
import { useMenuStore } from "../stores/menu";
import { storeToRefs } from "pinia";

const router = useRouter();

const reviews = ref([]);
const items = ref([]);
const imgList = ref([
  {
    url: "/src/assets/main1.png",
  },
  {
    url: "/src/assets/main2.png",
  },
  {
    url: "/src/assets/main3.png",
  },
  {
    url: "/src/assets/main4.png",
  },
]);
const imgShow = ref(false);

const getReview = async () => {
  const { data } = await getReviewList();
  reviews.value = data.reverse().slice(0, 4);
  imgShow.value = true;
};

const getBoard = async () => {
  const { data } = await listBoard();
  items.value = data.reverse().slice(0, 3);
  console.log(items.value);
};

getReview();
getBoard();

const menuStore = useMenuStore();
const { isActive } = storeToRefs(menuStore);
menuStore.setIsActive(true);

onUnmounted(() => {
  menuStore.setIsActive(false);
});

watch(
  () => isActive.value,
  (newValue) => {
    isActive.value = true;
  }
);

const truncateText = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
</script>

<template>
  <div class="container">
    <div class="banner-container">
      <v-carousel
        v-if="imgShow == true"
        cycle
        hide-delimiter-background
        :show-arrows="false"
        hide-delimiters
        style="height: 100%"
      >
        <v-carousel-item v-for="(item, i) in imgList" :key="i">
          <v-sheet height="100vh" width="100vw">
            <img class="banner-img" :src="item.url" />
            <!-- <div class="text-overlay-review">
              <div class="review-box"></div>
              <div class="text-content-review"></div>
            </div> -->
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
        <p class="subject-text">함께 할 크루원을 찾아요!</p>
        <br />
        <div class="card-section1-wrap">
          <div v-for="(item, i) in items" :key="i">
            <v-card
              class="mx-auto board-card-wrap"
              height="300"
              width="300"
              :image="item.thumbnailInfo?.url"
              theme="dark"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              @click="
                router.push({ name: 'board-detail', params: { id: item.id } })
              "
            >
              <v-card-title class="board-title">
                {{ item.title }}<br />
                <div style="display: flex; align-items: center; gap: 20px">
                  <div class="board-profile">
                    <v-img cover :src="item.member?.profileImg?.url"></v-img>
                  </div>
                  {{ item.member.name }}
                </div>
                <!-- <p v-html="truncateText(item.content, 15, '...')"></p> -->
              </v-card-title>
            </v-card>
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

      <div class="main-section2">
        <p class="subject-text">크루원과 여행 다녀왔어요!</p>
        <br />
        <v-row gap="10">
          <!-- 'reviews' 배열의 데이터로 v-card를 생성합니다 -->
          <v-col
            v-for="(review, index) in reviews"
            :key="index"
            :cols="index === 0 ? 7 : 5"
          >
            <v-card
              @click="
                router.push({ name: 'board-detail', params: { id: review.id } })
              "
            >
              <v-img
                :src="
                  review.thumbnailInfo
                    ? review.thumbnailInfo.url
                    : '/src/assets/default_img.png'
                "
                height="300px"
                cover
              ></v-img>
              <!-- 추가적인 내용을 넣을 수 있습니다 -->
              <v-card-actions>
                <v-card-text>
                  {{ review.title }}
                </v-card-text>
                <v-spacer></v-spacer>
                <v-btn
                  size="small"
                  color="surface-variant"
                  variant="text"
                  prepend-icon="mdi-eye"
                  >{{ review.views }}</v-btn
                >
                <!-- <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
                  <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
                  <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
}
.banner-left-btn .review-box {
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
  left: 25%;
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
  color: #263a29;
}
.card-section1-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.board-title {
  color: #fff;
  font-size: 20px;
  font-weight: 900;
  z-index: 2;
}
.board-card-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.5)
  );
}
.arrow {
  font-size: 30px;
}
.board-card-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  /* align-items: flex-end; */
}
.board-profile {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-sheet:hover,
.v-card:hover {
  transform: scale(1.03); /* 호버 시 크기 확대 */
}
.board-text-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 8px;
  border-radius: 4px;
  z-index: 10;
}
</style>
