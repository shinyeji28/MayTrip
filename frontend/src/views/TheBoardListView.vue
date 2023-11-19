<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { listBoard, listBoardByGugun } from "@/api/board.js";
import { listSido, listGugun } from "@/api/sidoGugun.js";
import { useRouter } from 'vue-router';

const $router = useRouter();

const items = ref([]);
const sido = ref([]);
const gugun = ref([]);
const selectedSido = ref(null);
const selectedGugun = ref(null);

const getBoardList = async () => {
  const { data } = await listBoard();
  try {
    items.value = data;
  } catch (error) {
    console.error(error);
  }
};

const getSidoList = async () => {
  const { data } = await listSido();
  try {
    sido.value = data;
  } catch (error) {
    console.error(error);
  }
};

const getGugunList = async (sidoCode) => {
  const { data } = await listGugun(sidoCode);
  try {
    gugun.value = data;
  } catch (error) {
    console.error(error);
  }
};

const boardListByGugun = async (gugunCode) => {
  if (selectedSido !== null) {
    const { data } = await listBoardByGugun(
      selectedSido.value.sidoCode,
      gugunCode
    );
    try {
      items.value = data;
    } catch (error) {
      console.error(error);
    }
  }
};

onMounted(async () => {
  await getBoardList();
  await getSidoList();
});

watch(selectedSido, (newValue) => {
  if (newValue !== null) {
    getGugunList(newValue.sidoCode);
  }
});

watch(selectedGugun, (newValue) => {
  if (newValue !== null) {
    boardListByGugun(newValue.gugunCode);
  }
});

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
  <div class="container">
    <div class="banner">
      <img src="@/assets/images/trip4.jpg" />
      <div class="title">여행 친구를 구하고 있어요 😍</div>
    </div>
    <main class="container">
      <div class="main-wrap">
        <div class="select-box">
          <v-select
            v-model="selectedSido"
            :items="sido"
            item-title="sidoName"
            item-value="sidoCode"
            label="시도 선택"
            return-object
            hint="구군까지 선택해주세요"
          ></v-select>
          <v-select
            v-model="selectedGugun"
            :items="gugun"
            item-title="gugunName"
            item-value="gugunCode"
            label="구군 선택"
            return-object
          ></v-select>
          <RouterLink :to="{name:'write'}"><v-btn height="50px" >메이트 모집하기</v-btn></RouterLink>
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
              <v-card
                class="card"
                width="310"
                height="300"
                title="모집 글 제목"
                @click="$router.push({name:'detail', params: { id: item.id }})"
                >
                <v-img :src="item.src"></v-img>

                <template v-slot:title>{{ item.title }}</template>

                <template v-slot:subtitle
                  >타겟 도시 : {{ item.sidoName }}
                  {{ item.gugunName }}</template
                >

                <template v-slot:text> 간략 설명 </template>
              </v-card>
            </v-col>
          </v-row>

          <!-- 페이지네이션 -->
          <v-pagination
            v-model="page"
            :length="totalPages"
            rounded="circle"
          ></v-pagination>
        </v-container>
      </div>
    </main>
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
