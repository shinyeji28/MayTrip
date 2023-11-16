<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPlanApi } from "@/api/plan";
import { getCrewApi } from "@/api/crew";

const route = useRoute();

const crew = ref({});
const plan = ref({});

const getCrewInfo = async () => {
  try {
    const { data } = await getCrewApi(route.params.crewId);
    console.log(data);
    crew.value = data;
  } catch (error) {
    console.log(error);
  }
};

const getPlanInfo = async () => {
  try {
    const { data } = await getPlanApi(route.params.crewId);
    console.log(data);
    plan.value = data;
  } catch (error) {
    console.log(error);
  }
};

getCrewInfo();
getPlanInfo();
// beforeRouteLeave (to, from, next) {
//   const element = document.getElementsByTagName('main')[0];
//   element.style.maxWidth = '1080px';
// }
const drawer = ref(true);
</script>

<template>
  <div class="row">
    <div>첫번째</div>
    <div>두번째</div>
    <div>세번째</div>
    <div>지도</div>
  </div>
</template>

<style scoped>
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

.profile {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://cdn.pixabay.com/photo/2020/06/28/00/04/chicago-5347435_960_720.jpg");
  background-size: cover;
  border-radius: 10px;
  padding: 10px 60px;
  height: 400px;
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
