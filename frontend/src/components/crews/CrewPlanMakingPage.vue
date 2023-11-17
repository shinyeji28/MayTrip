<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";

const route = useRoute();
const planStore = usePlanStore();
const { crew, plan } = storeToRefs(planStore);

const selectForm = ref({
  sidoCode: 0,
  gugunCode: 0,
  contentType: 0,
});
const sido = ref([]);
const gugun = ref([]);
</script>

<template>
  <div class="row">
    <div class="container col">
      <div class="row">
        <v-row>
          <v-col cols="4">
            <v-select
              label="시도"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="underlined"
              v-model="selectForm.sidoCode"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              label="구군"
              :items="[
                'California',
                'Colorado',
                'Florida',
                'Georgia',
                'Texas',
                'Wyoming',
              ]"
              variant="underlined"
              v-model="selectForm.gugunCode"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              label="유형"
              :items="[
                { title: '관광지', code: 12 },
                { title: '문화시설', code: 14 },
                { title: '축제공연행사', code: 15 },
                { title: '여행코스', code: 25 },
                { title: '레포츠', code: 28 },
                { title: '숙박', code: 32 },
                { title: '쇼핑', code: 38 },
                { title: '음식점', code: 39 },
              ]"
              item-title="title"
              item-value="code"
              variant="underlined"
              v-model="selectForm.contentType"
            ></v-select>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="row margin-30"></div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  border-right: 1px solid lightgray;
  padding: 30px 20px;
}
.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
}
.right {
  justify-content: flex-end;
  align-items: center;
}
.center {
  justify-content: center;
  align-items: center;
}
.left {
  justify-content: center;
  align-items: flex-start;
}

.margin-60 {
  margin: 60px 60px;
}

.margin-30 {
  margin: 30px 0px;
}

.mt-30 {
  margin-top: 30px;
}
.mt-60 {
  margin-top: 60px;
}

.margin-10 {
  margin: 10px;
}

.text-2 {
  font-size: xx-large;
  font-weight: 800;
  color: white;
}

.text-3 {
  font-size: large;
  font-weight: 500;
  color: white;
}

.text-4 {
  font-size: small;
  font-weight: 800;
  color: black;
}
</style>
