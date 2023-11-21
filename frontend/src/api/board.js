import axios from "axios";

const listBoard = async () => {
  return await axios.get(`boards`);
};

const listBoardByGugun = async (sido, gugun) => {
  return await axios.get(`boards/`, {
    params: {
      sido,
      gugun,
    },
  });
};

const modifyBoardDetailApi = async (data) => {
  return await axios.put("/api/boards/detail", data);
};

export { listBoard, listBoardByGugun, modifyBoardDetailApi };
