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
    };

    const getPlanInfos = async (crewId) => {
      const { data } = await getPlanApi(crewId);
      plan.value = data;
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
