import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

async function getCrewListApi() {
  return await axios.get(`/api/crews/all/${user.value.memberId}`);
}

async function getCrewApi(crewId) {
  return await axios.get(`/api/crews/${crewId}`);
}

export { getCrewListApi, getCrewApi };
