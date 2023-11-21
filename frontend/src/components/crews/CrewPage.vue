<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCrewApi } from "@/api/crew";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";

const planStore = usePlanStore();
const { getInfos, toggleIsShared } = planStore;
const { crew } = storeToRefs(planStore);

const route = useRoute();
console.log("crew : ", crew.value);
const getCrewInfo = async () => {
  try {
    await getInfos(route.params.crewId);
  } catch (error) {
    console.log(error);
  }
};
getCrewInfo();

const clickShared = async () => {
  await toggleIsShared(crew.value.board.id);
};
</script>

<template>
  <div class="container">
    <div class="col left margin-60 profile">
      <div class="text-2">{{ crew.crewName }}</div>
      <div class="text-3 margin-10">
        {{ crew.board.sidoName }} {{ crew.board.gugunName }}
      </div>
      <div class="text-3 mt-60">
        <span class="mdi mdi-account-group"></span>
        {{ crew.members.length }} / {{ crew.board.headcount }}
      </div>
      <div class="text-3">
        {{ crew.board.startDate }} ~ {{ crew.board.endDate }}
      </div>
    </div>
    <h1>Our Crew</h1>
    <div class="row">
      <div
        class="col center margin-10"
        v-for="member in crew.members"
        :key="member.memberId"
      >
        <v-avatar
          image="https://cdn.pixabay.com/photo/2020/06/28/00/04/chicago-5347435_960_720.jpg"
          size="80"
        ></v-avatar>
        <div class="text-4">{{ member.name }}</div>
      </div>
    </div>
    <div class="margin-60">
      <h1>Our Trips</h1>
      <v-card class="margin-30" width="300">
        <v-card-title class="d-flex align-center">
          <v-icon
            color="#6EC1E4"
            icon="mdi-airplane-marker"
            start
            size="25"
          ></v-icon>
          <h4>{{ crew.board.title }}</h4>
        </v-card-title>
        <v-card-text>
          {{ crew.board.content }}
        </v-card-text>
        <div class="d-flex justify-space-between px-4 align-center">
          <div class="mb-6">
            <router-link
              :to="{
                name: 'crew-plan',
                params: { crewId: crew.id },
              }"
              ><v-btn
                border
                flat
                size="small"
                class="text-none"
                text="일정으로 이동"
              >
              </v-btn
            ></router-link>
          </div>
        </div>
        <div class="d-flex justify-space-between px-4 align-center">
          <div class="px-3">
            <v-switch
              color="success"
              :model-value="crew.board.shared"
              label="Share"
              density="compact"
              inset
              @click="() => clickShared()"
            >
            </v-switch>
          </div>
        </div>

        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0;

  display: flex;
  flex-direction: column;
  margin: auto;

  max-width: 1080px;
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
