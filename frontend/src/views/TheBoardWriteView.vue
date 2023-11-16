<script setup>
import { ref } from 'vue';
import QuillEditor from '@/components/common/VQuillEditor.vue';

const content = ref('안녕하세요');

const submitContent = (content) => {
  console.log('Submitted Content:', content); // ref 변수의 실제 내용을 가져오려면 .value를 사용합니다.
  // 서버로 데이터를 보내거나 필요한 작업을 수행할 수 있습니다.
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
    <QuillEditor v-model="content"
    @saveContent="submitContent" />
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