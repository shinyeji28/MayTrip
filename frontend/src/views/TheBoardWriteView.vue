<script setup>
import { ref, onMounted } from "vue";
import QuillEditor from "@/components/common/VQuillEditor.vue";
import { registBoard } from "@/api/board.js";

const form = ref(null);

const fileInput = ref(null);
const rules = ref([
  value => !!value || '입력해주세요.'
]);

const today = new Date();
today.setHours(0, 0, 0, 0);
const startDate = ref(today);
const endDate = ref(today);

const sido = ref([]);
const gugun = ref([]);
const selectedSido = ref(null);
const selectedGugun = ref(null);

onMounted(() => {

  console.log(form.value);
});

const content = ref("<h1>아이</h1>");
const selectedFile = ref([]);

const saveBoard = async (formData) => {
  const { data } = await registBoard(formData);
  try {
    alert("등록이 완료되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

const submitContent = (newContent) => {
  content.value = newContent;
  console.log("Submitted Content:", content.value);
  
};

const handleFileUpload = () => {
  console.log(selectedFile.value);
};

const onSubmit = () => {
  const formData = new FormData(form.value);
  formData.append('memberId', 1);     // todo token으로 수정
  formData.append('startDate', startDate.value.toISOString());
  formData.append('endDate', endDate.value.toISOString());
  formData.append('content', content.value);
  for (let key of formData.keys()) {
	console.log(key, ":", formData.get(key));
}
  // saveBoard(formData);
};

const setStartDate = () => {
  if(startDate.value>endDate.value){
    endDate.value = startDate.value;
  }
};
const setEndDate = () => {
};

</script>

<template>
  <div class="container">
    <div class="banner">
      <img src="@/assets/images/trip4.jpg" />
      <div class="title">여행 크루 모집을 위한 글을 작성하세요 😎</div>
    </div>
    <main class="container">
      <div class="main-wrap">
        <div>   
          <form @submit.prevent="onSubmit" ref="form">
            <v-text-field
              label="모집 글 제목"
              name="title"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
            <v-file-input
              label="썸네일 이미지를 넣어주세요"
              v-model="selectedFile"
              @change="handleFileUpload"
              name="image"
              :rules="rules"
              hide-details="auto"
            ></v-file-input>
            <v-text-field
              label="모집 인원수"
              name="headcount"
              :rules="rules"
              hide-details="auto"
            ></v-text-field>
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

            <v-date-picker v-model="startDate" :min="today" label="여행 출발 날짜" @click="setStartDate"></v-date-picker>
            <v-date-picker v-model="endDate" :min="startDate" label="여행 종료 날짜" @click="setEndDate"></v-date-picker>

            <QuillEditor v-model="content" @update:modelValue="submitContent" />
            <button type="submit">제출</button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;

  margin: auto;
  padding: 0;

  flex-direction: column;
  max-width: 1080px;
}
.banner {
  /* position: fixed; */
  position: absolute;
  left: 0;
  top: 70px;
  width: 100%;
  height: 400px;
  z-index: -1;
}
.banner img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  box-shadow: 0px 8px 15px 0px rgba(0, 0, 0, 0.3);
}
.title {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  font-size: 30px;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.6);
}

.container {
  width: 100%;
  height: 100%;
}
.main-wrap {
  margin-top: 250px;
  margin-bottom: 0;
  min-height: 700px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  box-shadow: -4px 0px 4px 0px rgba(0, 0, 0, 0.25),
    4px 4px 4px 0px rgba(0, 0, 0, 0.25);

  padding: 40px;
  overflow: scroll;
}
.main-wrap::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
