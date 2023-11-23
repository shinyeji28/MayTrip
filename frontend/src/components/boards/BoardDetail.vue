<script setup>
import { getDetail, deleteBoard } from "@/api/board.js";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { joinCrew } from "@/api/crew.js";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const memberId = user.value.memberId;

const route = useRoute();
const router = useRouter();
const routeParams = route.params;
const id = routeParams.id;
const boardInfo = ref(null);

onMounted(async () => {});

const getBoardDetail = async () => {
  const { data } = await getDetail(id);
  try {
    boardInfo.value = data;
    console.log(boardInfo.value);
  } catch (error) {
    console.error(error);
  }
};
getBoardDetail();

const remove = async () => {
  const { data } = await deleteBoard(id);
  try {
    alert("삭제 완료");
    router.push({ name: "board-list" });
  } catch (error) {
    console.error(error);
  }
};

const mvUpdate = () => {
  router.push({ name: "board-update", params: { id: id } });
};

const formatDate = (date) => {
  if (date) {
    return date.substring(0, 10);
  }
};

const join = async () => {
  const { data } = await joinCrew(boardInfo.value.crewId);
  try {
    alert("크루 신청이 완료되었습니다.");
    // console.log(data);
    router.push({
      name: "crew-detail",
      params: { crewId: boardInfo.value.crewId },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="board-details">
    <p class="detail-title">{{ boardInfo?.title }}</p>
    <hr /><br>
    <section class="board-section">
      <div class="middle">
        <div class="info-wrap">
          <div>
            <div class="info">
              장소 : {{ boardInfo?.sidoName }} {{ boardInfo?.gugunName }}
            </div>
            <div class="info">인원수 : 최대 {{ boardInfo?.headcount }}</div>
            <div class="info">
              일정 : {{ boardInfo?.startDate }} - {{ boardInfo?.endDate }}
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <div class="info" style="padding-right:0">
              조회수: {{ boardInfo?.views }}
            </div>
            <div class="info" style="float: right">
              게시 날짜 : {{ formatDate(boardInfo?.registDate) }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <div clss="content-wrap">
      <div class="content" v-html="boardInfo?.content"></div>
    </div>

    <div class="button-wrap" v-if="boardInfo?.member.memberId != memberId">
      <v-btn class="btn delete-btn" @click="join">신청하기</v-btn>
    </div>
    <div class="button-wrap" v-if="boardInfo?.member.memberId == memberId">
      <v-btn class="btn delete-btn" @click="remove">게시글 삭제</v-btn>
      <v-btn class="btn edit-btn" @click="mvUpdate">게시글 수정</v-btn>
    </div>
  </div>
</template>

<style scoped>
/* Board Details Style */
.board-details {
  display: flex;
  flex-direction: column;
  padding: 40px;

}

/* Board Section Style */
.board-section {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.detail-title {
  align-self: flex-start;
  font-size: 28px;
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 900;
}

.info-wrap {
  display: flex;
  justify-content: space-between;
}
.info {
  font-size: 16px;
  margin-bottom: 10px;
  color: #777;
}

/* Content Style */
.content {
  line-height: 1.6;
  font-size: 18px;
  margin-top: 20px;
  
}

/* Button Style */
.button-wrap{
  margin: auto;
}
.btn {
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
}

.delete-btn {
  background-color: #ff6347;
  color: #fff;
  margin-right: 10px;
}

.edit-btn {
  background-color: #6b8e23;
  color: #fff;
}

/* Hover Effect */
.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

</style>
