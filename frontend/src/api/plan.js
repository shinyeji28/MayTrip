import axios from "axios";

async function getPlanApi(crewId) {
  return await axios.get(`/api/plan/${crewId}`);
}

export { getPlanApi };
