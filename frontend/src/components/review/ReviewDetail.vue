<script setup>
import { getDetail } from "@/api/review.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import Plan from "@/components/review/item/plan.vue";
import Review from "@/components/review/item/review.vue";

const route = useRoute();
const router = useRouter();
const routeParams = route.params;
const id = routeParams.id; // review id
const reviewInfo = ref(null);
const tab = ref(1);
onMounted(async () => {
  await getDetailReview();
});

const getDetailReview = async () => {
  const { data } = await getDetail(id);
  try {
    reviewInfo.value = data;
    console.log(reviewInfo.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab :value="1">Plan</v-tab>
      <v-tab :value="2">Review</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 2" :key="n" :value="n">
        <v-container v-if="tab === 1" fluid class="container">
          <plan v-if="reviewInfo != null" :plans="reviewInfo?.plan"></plan>
        </v-container>
        <v-container v-else-if="tab === 2" fluid>
          <review v-if="reviewInfo != null" :review="reviewInfo?.review"></review>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped></style>
