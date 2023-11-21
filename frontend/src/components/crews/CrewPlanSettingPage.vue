<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";

const planStore = usePlanStore();
const { modifyBoardDetail } = planStore;
const { crew } = storeToRefs(planStore);

const boardForm = ref({});
const updateForm = () => {
  boardForm.value = {
    id: crew.value.board.id,
    title: crew.value.board.title,
    content: crew.value.board.content,
    startDate: crew.value.board.startDate,
    endDate: crew.value.board.endDate,
    headcount: crew.value.board.headcount,
    gugunCode: crew.value.board.gugunCode,
    sidoCode: crew.value.board.sidoCode,
  };
};
updateForm();

const modify = async () => {
  const data = {
    id: boardForm.value.id,
    title: boardForm.value.title,
    startDate: boardForm.value.startDate,
    endDate: boardForm.value.endDate,
  };
  await modifyBoardDetail(data);
  updateForm();
};

const cancle = () => {
  updateForm();
};

let date = new Date();
const today = date.toISOString().split("T")[0];
</script>

<template>
  <div class="col container">
    <div class="row margin-60">
      <v-row>
        <v-col cols="6">
          <v-list-subheader>여행시작일</v-list-subheader>
          <input
            type="date"
            name="startDate"
            id="startDate"
            v-model="boardForm.startDate"
            :min="today"
          />
        </v-col>

        <v-col cols="6">
          <v-list-subheader>여행종료일</v-list-subheader>
          <input
            type="date"
            name="endDate"
            id="endDate"
            v-model="boardForm.endDate"
            :min="boardForm.startDate"
          />
        </v-col>
      </v-row>
    </div>
    <div class="row margin-60">
      <v-text-field
        label="Title"
        variant="solo"
        v-model="boardForm.title"
      ></v-text-field>
    </div>
    <div class="row margin-60 right">
      <v-btn class="margin-10" color="warning" @click="modify"> Modify </v-btn>
      <v-btn color="accent" @click="cancle"> Cancle </v-btn>
    </div>
  </div>
</template>

<style scoped>
.container {
  justify-content: center;
  width: 800px;
  margin: 0 auto;
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
  font-size: large;
  font-weight: 800;
  color: black;
}
</style>
