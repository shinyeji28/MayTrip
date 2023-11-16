import { localAxios } from "@/util/http-commons";

const local = localAxios();
const listSido = async () => {
  return await local.get(`/sido`);
};
const listGugun = async (sidoCode) => {
  return await local.get(`/gugun/${sidoCode}`);
};
export { listSido, listGugun };
