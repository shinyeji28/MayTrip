<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { getReviewList } from "@/api/review.js";
import { useRouter } from "vue-router";
const router = useRouter();

const items = ref([]);

const getReview = async () => {
  const { data } = await getReviewList();
  try {
    items.value = data.reverse();
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

const truncateText = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};
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
      <v-card class="card" @click="router.push({name:'review-detail', params:{id:item.id}})">
        <v-img
          :src="item.thumbnailInfo.url"
          class="align-end card-img"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
          cover
        >
          <v-card-title class="text-white" v-text="item.title"></v-card-title>
        </v-img>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>

          <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>

          <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
        </v-card-actions>
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

.card{
  transition: transform 0.5s ease;
}
.v-img {
  overflow: hidden;
  position: relative;
}

.card:hover .v-card-title {
  opacity: 1;
  transition: opacity 0.5s ease;
}
.card:hover {
  transform: scale(1.1); /* 호버 시 크기 확대 */
}
</style>
