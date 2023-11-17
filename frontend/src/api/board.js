import { localAxios, localAxiosFormData } from "@/util/http-commons";

const local = localAxios();
const localFormData = localAxiosFormData();
const listBoard = async () => {
  return await local.get(`boards`);
};

const listBoardByGugun = async (sido, gugun) => {
  return await local.get(`boards/`, {
    params: {
      sido,
      gugun,
    },
  });
};

const setBoardContent = async (formData) => {
  return await localFormData.post(`boards`, formData);
};

export { listBoard, listBoardByGugun, setBoardContent };
