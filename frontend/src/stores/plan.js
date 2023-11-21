import { ref } from "vue";
import { defineStore } from "pinia";
import { getPlanApi, registDetailApi, deleteByDetailIdApi } from "@/api/plan";
import { getCrewApi } from "@/api/crew";
import { modifyBoardDetailApi } from "@/api/board";

export const usePlanStore = defineStore(
  "planStore",
  () => {
    const crew = ref({});
    const plan = ref({});

    const getInfos = async (crewId) => {
      getCrewInfos(crewId);
      getPlanInfos(crewId);
    };

    const getCrewInfos = async (crewId) => {
      const { data } = await getCrewApi(crewId);
      crew.value = data;
    };

    const getPlanInfos = async (crewId) => {
      const { data } = await getPlanApi(crewId);
      plan.value = data;
    };

    const insertDetail = async (detail) => {
      const { data } = await registDetailApi(detail);
      plan.value.days.forEach((day) => {
        if (day.dayId == detail.dayId) {
          day.details.push(data);
        }
      });
    };

    const deleteDetail = async (detailId) => {
      try {
        await deleteByDetailIdApi(detailId);
        await getPlanInfos(crew.value.id);
      } catch (error) {
        console.log("삭제 실패 : ", error);
      }
    };

    const modifyBoardDetail = async (data) => {
      try {
        await modifyBoardDetailApi(data);
        await getCrewInfos(crew.value.id);
      } catch (error) {
        console.log("수정 실패 : ", error);
      }
    };

    return {
      crew,
      plan,
      getInfos,
      insertDetail,
      deleteDetail,
      modifyBoardDetail,
    };
  },
  {
    persist: true,
  }
);
