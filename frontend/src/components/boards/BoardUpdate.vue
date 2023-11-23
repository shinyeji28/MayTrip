<script setup>
import { ref, onMounted, watch } from "vue";
import VQuillEditor from "@/components/boards/item/VQuillEditor.vue";
import { registBoard } from "@/api/board.js";
import { listSido, listGugun } from "@/api/sidoGugun.js";
import { useRoute, useRouter } from "vue-router";
import { getDetail, updateBoard } from "@/api/board.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const memberId = user.value.memberId;

const route = useRoute();
const router = useRouter();
const routeParams = route.params;
const id = routeParams.id;

const form = ref(null);

const fileInput = ref(null);
const rules = ref([(value) => !!value || "입력해주세요."]);

const today = new Date();
today.setHours(0, 0, 0, 0);
const startDate = ref(today);
const endDate = ref(today);

const sido = ref([]);
const gugun = ref([]);
const selectedSido = ref(null);
const selectedGugun = ref(null);

const content = ref(null);
const selectedFile = ref([]);

const boardInfo = ref(null);
const title = ref(null);
const headCount = ref(null);
const thumbnail = ref({});

const getBoardDetail = async () => {
  const { data } = await getDetail(id);
  try {
    boardInfo.value = data;
    title.value = data.title;
    thumbnail.value = data.thumbnailInfo;
    headCount.value = data.headcount;
    selectedSido.value = { sidoCode: data.sidoCode, sidoName: data.sidoName };
    selectedGugun.value = data.gugunCode;
    startDate.value = new Date(data.startDate);
    startDate.value.setHours(0, 0, 0, 0);
    endDate.value = new Date(data.endDate);
    endDate.value.setHours(0, 0, 0, 0);
    content.value = data.content;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const getSidoList = async () => {
  const { data } = await listSido();
  try {
    sido.value = data;
  } catch (error) {
    console.error(error);
  }
};

const getGugunList = async (sidoCode) => {
  const { data } = await listGugun(sidoCode);
  try {
    gugun.value = data;
  } catch (error) {
    console.error(error);
  }
};
const init = async () => {
  await getBoardDetail();
  await getSidoList();
  await getGugunList(selectedSido.value.sidoCode);
};
init();

watch(selectedSido, (newValue) => {
  if (newValue !== null) {
    getGugunList(newValue.sidoCode);
  }
});

const updateBoardContent = async (formData) => {
  try {
    const { data } = await updateBoard(formData);
    alert("수정이 완료되었습니다.");
    router.push({ name: "board-detail", params: { id: id } });
  } catch (error) {
    alert("폼을 채워주세요.");
    console.error(error);
  }
};

const changeEditor = (newContent) => {
  content.value = newContent;
};

const handleFileUpload = () => {};

const onSubmit = async () => {
  const formData = new FormData(form.value);
  const start_d = new Date(startDate.value);
  const end_d = new Date(endDate.value);
  const start_date =
    start_d.getFullYear() +
    "-" +
    (start_d.getMonth() + 1) +
    "-" +
    start_d.getDate();
  const end_date =
    end_d.getFullYear() + "-" + (end_d.getMonth() + 1) + "-" + end_d.getDate();
  formData.append("id", id);
  formData.append("memberId", memberId);
  formData.append("startDate", startDate.value.toISOString().substring(0, 10));
  formData.append("endDate", endDate.value.toISOString().substring(0, 10));
  formData.append("content", content.value);
  // if (selectedFile.value.length == 0) {
  // formData.append("image", null);
  // }
  // for (let key of formData.keys()) {
  //   console.log(key, ":", formData.get(key));
  // }
  await updateBoardContent(formData);
};

const setStartDate = () => {
  if (startDate.value > endDate.value) {
    endDate.value = startDate.value;
  }
};
const setEndDate = () => {};

const updateTitle = () => {
  title.value = event.target.value;
};
const updateHeadCount = () => {
  headCount.value = event.target.value;
};
</script>

<template>
  <!-- <div class="title">여행 크루 모집을 위한 글을 수정하세요 😎</div> -->

  <div>
    <form @submit.prevent="onSubmit" ref="form">
      <v-text-field
        label="모집 글 제목"
        name="title"
        :rules="rules"
        v-model="title"
        @input="updateTitle"
      ></v-text-field>
      <v-file-input
        label="썸네일 변경하기"
        v-model="selectedFile"
        @change="handleFileUpload"
        name="image"
        :rules="rules"
        hide-details="auto"
      ></v-file-input>
      <img
        class="thumbnail-img"
        :src="thumbnail?.url"
        :alt="thumbnail?.originFileName"
      />
      <v-text-field
        label="모집 인원수"
        name="headcount"
        :rules="rules"
        hide-details="auto"
        v-model="headCount"
        @input="updateHeadCount"
      ></v-text-field>
      <v-select
        v-model="selectedSido"
        :items="sido"
        item-title="sidoName"
        item-value="sidoCode"
        label="시도 선택"
        return-object
        hint="구군까지 선택해주세요"
        name="sidoCode"
      ></v-select>
      <v-select
        v-model="selectedGugun"
        :items="gugun"
        item-title="gugunName"
        item-value="gugunCode"
        label="구군 선택"
        return-object
        name="gugunCode"
      ></v-select>

      <v-date-picker
        v-model="startDate"
        :min="today"
        label="여행 출발 날짜"
        @click="setStartDate"
      ></v-date-picker>
      <v-date-picker
        v-model="endDate"
        :min="startDate"
        label="여행 종료 날짜"
        @click="setEndDate"
      ></v-date-picker>

      <VQuillEditor
        v-if="content"
        :content="content"
        @update:modelValue="changeEditor"
      />
      <v-btn type="submit">제출</v-btn>
    </form>
  </div>
</template>

<style scoped>
.thumbnail-img {
  height: 100px;
  width: auto;
}
</style>
