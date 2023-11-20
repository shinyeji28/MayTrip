<script setup>
import { getDetail, deleteBoard } from "@/api/board.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const routeParams = route.params;
const id = routeParams.id;
const boardInfo = ref(null);
onMounted(async () => {
  await getBoardDetail();
});

const getBoardDetail = async () => {
  const { data } = await getDetail(id);
  try {
    boardInfo.value = data;
    console.log(boardInfo.value);
  } catch (error) {
    console.error(error);
  }
};
const remove = async () => {
  const { data } = await deleteBoard(id);
  try {
    alert("삭제 완료");
    router.push({ name: "board-list" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <v-btn @click="remove">게시글 삭제</v-btn>
    <v-btn>게시글 수정</v-btn>
  </div>
</template>

<style scoped></style>
