import axios from "axios";

async function getPlanApi(crewId) {
  return await axios.get(`/api/plan/${crewId}`);
}

async function registDetailApi(data) {
  return await axios.post("/api/plan/detail", data);
}

async function deleteByDetailIdApi(detailId) {
  return await axios.delete(`/api/plan/detail/${detailId}`);
}

export { getPlanApi, registDetailApi, deleteByDetailIdApi };
