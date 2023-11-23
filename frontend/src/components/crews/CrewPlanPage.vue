<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import crewPlanSetting from "@/components/crews/CrewPlanSettingPage.vue";
import crewPlanMaking from "@/components/crews/crewPlanMakingPage.vue";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";

const route = useRoute();
const planStore = usePlanStore();
const { getInfos } = planStore;
const { crew } = storeToRefs(planStore);

const getInfoData = async () => {
  try {
    await getInfos(route.params.crewId);
  } catch (error) {
    console.log(error);
  }
};
getInfoData();
</script>

<template>
  <div class="row container">
    <div class="col side">
      <router-link class="side-item" :to="{ name: 'crew-plan-info' }">
        1. 날짜 & 여행지 선택
      </router-link>
      <router-link class="side-item" :to="{ name: 'crew-plan-schedule' }">
        2. 일정 만들기
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.container {
  height: 93vh;
  max-width: none;
}
.side {
  min-width: 100px;
  max-width: 100px;
  border-right: 1px solid #f2e3db;
}
.side-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  padding: 20px 10px;
  color: #41644a;
  font-weight: 800;
  font-size: small;
  border-radius: 5px;
  border-bottom: 1px solid #f2e3db;
  text-decoration: none;
}
.side-item:hover {
  color: #e86a33;
}
.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
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
  margin: 60px 0px;
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
  font-size: large;
  font-weight: 800;
  color: black;
}
</style>
