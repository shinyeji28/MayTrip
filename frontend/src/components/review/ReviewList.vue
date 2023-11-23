<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getReviewList } from "@/api/review.js";
import { useRouter } from "vue-router";
const router = useRouter();

const items = ref([]);

const getReview = async () => {
  const { data } = await getReviewList();
  try {
    items.value = data;
    console.log(items.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getReview();
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
            router.push({ name: 'review-detail', params: { id: item.id } })
          "
        >
          <v-img
            :src="item.thumbnailInfo?.url"
            alt="item.thumbnailInfo?.originFileName"
          ></v-img>

          <template v-slot:title>{{ item.title }}</template>

          <template v-slot:subtitle
            >다녀온 곳 : {{ item.sidoName }} {{ item.gugunName }}</template
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
}
.card:hover {
  transform: translateY(15px);
  opacity: 0.3;
}
</style>
