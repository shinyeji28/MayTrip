import { ref } from "vue";
import { defineStore } from "pinia";
import { getPlanApi } from "@/api/plan";
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

    return {
      crew,
      plan,
      getInfos,
    };
  },
  {
    persist: true,
  }
);
