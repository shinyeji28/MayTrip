<script setup>
import { ref, computed } from "vue";
import { listBoard } from "@/api/board.js";

const items = ref([]);
const getBoard = async () => {
  const { data } = await listBoard();
  try {
    items.value = data;
  } catch (error) {
    console.error(error);
  }
};
getBoard();

const sido = ref([
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
]);

const gugun = ref([
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
]);

//pageNavigation
const page = ref(1);
const perPage = ref(9);

const paginatedItems = computed(() => {
  const startIndex = (page.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;
  return items.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(items.value.length / perPage.value);
});
</script>

<template>
  <div class="banner">
    <img src="@/assets/images/trip4.jpg" />
    <div class="title">여행 친구를 구하고 있어요 😍</div>
  </div>
  <main class="container">
    <div class="main-wrap">
      <div class="select-box">
        <v-select label="시도 선택" :items="sido"></v-select>
        <v-select label="구군 선택" :items="gugun"></v-select>
        <v-btn height="50px">메이트 모집하기</v-btn>
      </div>

      <v-container>
        <v-row>
          <v-col
            v-for="(item, index) in paginatedItems"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="4"
          >
            <v-card class="card" width="310" height="300" title="모집 글 제목">
              <v-img :src="item.src"></v-img>

              <template v-slot:title>{{ item.title }}</template>

              <template v-slot:subtitle
                >{{ item.sidoName }} {{ item.gugunName }}</template
              >

              <template v-slot:text> 간략 설명 </template>
            </v-card>
          </v-col>
        </v-row>

        <!-- 페이지네이션 -->
        <v-pagination
          v-model="page"
          :length="totalPages"
          @input="updatePage"
          rounded="circle"
        ></v-pagination>
      </v-container>
    </div>
  </main>
</template>

<style scoped>
.banner {
  position: absolute;
  left: 0;
  top: 70px;
  width: 100%;
  height: 400px;
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
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6);
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

.select-box {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
}
.card {
  /* width: calc(33.3% - 10px); */
  margin-bottom: 30px;
  margin-right: 35px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(15px);
  opacity: 0.3;
}
</style>
