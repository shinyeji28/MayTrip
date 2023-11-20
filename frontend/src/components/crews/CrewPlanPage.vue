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

const toggle = ref(1);

const changeToggle = (num) => {
  toggle.value = num;
};

const getInfoData = async () => {
  try {
    if(Object.keys(crew.value).length == 0) {
      await getInfos(route.params.crewId);
      return;
    }
    if (!confirm("임시 저장된 내역을 불러올까요?")) {
      await getInfos(route.params.crewId);
    }
  } catch (error) {
    console.log(error);
  }
};
getInfoData();
</script>

<template>
  <div class="row container">
    <div class="col side">
      <div class="side-item" @click="changeToggle(1)">
        1. 날짜 & 여행지 선택
      </div>
      <div class="side-item" @click="changeToggle(2)">2. 일정 만들기</div>
    </div>
    <crewPlanSetting v-show="toggle == 1"></crewPlanSetting>
    <crewPlanMaking v-show="toggle == 2"></crewPlanMaking>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.side {
  width: 100px;
  height: 90vh;
  border-right: 1px solid lightgray;
}
.side-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  padding: 20px 10px;
  color: black;
  font-weight: 800;
  font-size: small;
  border-radius: 5px;
  border-bottom: 1px solid lightgray;
}
.side-item:hover {
  background-color: lightblue;
}
.blue {
  background-color: aqua;
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
