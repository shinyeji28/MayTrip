import { ref } from "vue";
import { defineStore } from "pinia";
import { getPlanApi, registDetailApi, deleteByDetailIdApi } from "@/api/plan";
import { getCrewApi } from "@/api/crew";

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
      console.log("store crew : ", crew.value);
    };

    const getPlanInfos = async (crewId) => {
      const { data } = await getPlanApi(crewId);
      plan.value = data;
      console.log("store plan : ", plan.value);
    };

    const insertDetail = async (detail) => {
      console.log("데이터 삽입 시작");
      const { data } = await registDetailApi(detail);
      plan.value.days.forEach((day) => {
        if (day.dayId == detail.dayId) {
          console.log(data);
          day.details.push(data);
        }
      });
    };

    const deleteDetail = async (detailId) => {
      console.log("데이터 삭제");
      try {
        await deleteByDetailIdApi(detailId);
        console.log("crewId는??", crew.value.id);
        await getPlanInfos(crew.value.id);
      } catch (error) {
        console.log("삭제 실패 : ", error);
      }
    };

    return {
      crew,
      plan,
      getInfos,
      insertDetail,
      deleteDetail,
    };
  },
  {
    persist: true,
  }
);
