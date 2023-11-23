<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { listBoard, listBoardByGugun } from "@/api/board.js";
import { listSido, listGugun } from "@/api/sidoGugun.js";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([]);
const sido = ref([]);
const gugun = ref([]);
const selectedSido = ref(null);
const selectedGugun = ref(null);

const getBoardList = async () => {
  const { data } = await listBoard();
  try {
    items.value = data.reverse();
    console.log(items);
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

const truncateText = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
</script>

<template>
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
    <RouterLink :to="{ name: 'board-write' }"
      ><v-btn height="50px">메이트 모집하기</v-btn></RouterLink
    >
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
          @click="
            router.push({ name: 'board-detail', params: { id: item.id } })
          "
        >
          <div class="card-img-wrap">
            <img
              :src="item.thumbnailInfo? item.thumbnailInfo.url : '/src/assets/banner.png'"
              alt="thumbnail"
            />
          </div>
          <div class="content-wrap">
            <b style="font-size: 17px">{{ item.title }}</b>
            <div v-if="item.sidoName && item.gugunName" class="sub-text">
              <i>#{{ item.sidoName }} </i>&nbsp;
              <i>#{{ item.gugunName }}</i>
            </div>
            <div class="sub-text">
              {{ item.startDate }} - {{ item.startDate }}
            </div>
            <div
              class="sub-text"
              style="color: gray"
              v-html="truncateText(item.content, 20, '...')"
            ></div>
          </div>
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
</template>

<style scoped>
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
  height: 100%;
}
.card:hover {
  transform: translateY(15px);
  opacity: 0.3;
}
.card-img-wrap {
  height: 190px;
  overflow: hidden;
}
.card-img-wrap > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content-wrap {
  padding: 10px;
}
.sub-text {
  font-size: 13px;
}
.sub-text > i {
  color: #fc920f;
}
</style>
