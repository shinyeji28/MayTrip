import { localAxios } from "@/util/http-commons";

const local = localAxios();
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

export { listBoard, listBoardByGugun };
