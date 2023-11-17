import axios from "axios";

const listSido = async () => {
  return await axios.get(`/api/sido`);
};
const listGugun = async (sidoCode) => {
  return await axios.get(`/api/gugun/${sidoCode}`);
};
export { listSido, listGugun };
