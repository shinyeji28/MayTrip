<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getCrewApi } from "@/api/crew";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";

import { registReview } from "@/api/review.js";

const planStore = usePlanStore();
const { getInfos, toggleIsShared } = planStore;
const { crew } = storeToRefs(planStore);

const route = useRoute();
const isAfter = ref(false);
const dialog = ref(false);

const form = ref(null);
const title = ref("");
const content = ref("");
const images = ref([]);
const thumb = ref(null);

const getCrewInfo = async () => {
  try {
    console.log("크루 아이디", route.params.crewId);
    await getInfos(route.params.crewId);
    console.log(crew.value);
  } catch (error) {
    console.log(error);
  }
};
getCrewInfo();

watch(crew, (newValue) => {
  if (
    new Date(newValue.board.endDate).setHours(0, 0, 0, 0) <
    new Date().setHours(0, 0, 0, 0)
  ) {
    isAfter.value = true;
  }
});

const truncateText = (text, length, suffix) => {
  if (text.length > length) {
    return text.substring(0, length) + suffix;
  } else {
    return text;
  }
};

const submitReview = async () => {
  const formData = new FormData(form.value);
  formData.append("crewId", route.params.crewId);

  // for (let key of formData.keys()) {
  //   console.log(key, ":", formData.get(key));
  // }

  try {
    await registReview(formData);
    alert("등록이 완료되었습니다.");
    dialog.value = false;
  } catch (error) {
    alert("폼을 채워주세요.");
  }
  dialog.value = false;
};
const clickShared = async () => {
  await toggleIsShared(crew.value.board.id);
};
const rules = ref([(value) => !!value || "입력해주세요."]);
</script>

<template>
  <div class="container" v-if="crew != null">
    <div
      class="col left margin-60 profile"
      :style="{
        backgroundImage:
          'url(' +
          (crew.board.thumbnailInfo
            ? crew.board.thumbnailInfo.url
            : 'http://localhost:5173/src/assets/banner2.png') +
          ')',
      }"
    >
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
          :image="
            member.profileImg
              ? member.profileImg.url
              : '/src/assets/profile_none.png'
          "
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
          <div v-html="truncateText(crew.board.content, 15, '...')"></div>
        </v-card-text>

        <div class="d-flex justify-space-between px-4 align-center">
          <div class="mb-6">
            <v-card-actions v-if="isAfter == true">
              <v-btn
                border
                flat
                size="small"
                class="text-none"
                @click="dialog = dialog ? false : true"
                >리뷰쓰기</v-btn
              >
            </v-card-actions>
            <router-link
              :to="{
                name: 'crew-plan',
                params: { crewId: crew.id },
              }"
              v-if="isAfter == false"
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

      <v-dialog v-model="dialog" width="500px">
        <v-card class="dialog-container">
          <form @submit.prevent="submitReview" ref="form">
            <h3>메이트립에서 함께한 크루원과의 여행을 공유하세요.</h3>
            <v-text-field
              v-model="title"
              name="title"
              label="Title"
              :rules="rules"
            ></v-text-field>
            <v-textarea
              v-model="content"
              name="content"
              label="Content"
              :rules="rules"
            ></v-textarea>
            <v-file-input
              v-model="thumb"
              name="thumb"
              label="대표 사진을 올려보세요"
            ></v-file-input>
            <v-file-input
              v-model="images"
              name="images"
              label="크루원과 함께한 사진들을 올려보세요.(복수 가능)"
              multiple
            ></v-file-input>
            <v-btn type="submit" color="primary">Submit</v-btn>
          </form>
          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="dialog = false"
              class="close-button"
              >닫기</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0;

  display: flex;
  flex-direction: column;
  margin: auto;

  padding-top: 80px;

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
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
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

/* 다이얼로그 스타일 */
/* 다이얼로그 컨테이너 */
.dialog-container {
  padding: 20px; /* 내부 여백 */
  max-width: 500px; /* 최대 너비 */
  border-radius: 10px; /* 테두리 모서리 반경 */
}

/* 닫기 버튼 */
.close-button {
  border-radius: 0 0 10px 10px; /* 버튼 모서리 반경 */
}

/* Submit 버튼 */
.submit-button + .submit-button {
  margin-top: 10px; /* 버튼 간격 조정 */
}
</style>
