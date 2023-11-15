import { localAxios } from "@/util/http-commons";
import { useAuthStore } from "@/stores/auth";

const local = localAxios();
const { user } = useAuthStore();

async function getCrewListByUserId() {
  return await local.get(`/crews/all/${user.userId}`);
}

async function signup(data) {
  return await local.post(`/signup`, JSON.stringify(data));
}

export { getCrewListByUserId, signup };
