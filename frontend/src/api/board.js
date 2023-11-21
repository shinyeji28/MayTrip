import axios from "axios";
// const local = localAxios();
// const localFormData = localAxiosFormData();

const formDataHeader = { "Content-Type": "multipart/form-data" };

const listBoard = async () => {
  return await axios.get(`/api/boards`);
};

const listBoardByGugun = async (sido, gugun) => {
  return await axios.get(`/api/boards/`, {
    params: {
      sido,
      gugun,
    },
  });
};

const registBoard = async (formData) => {
  return await axios.post(`/api/boards`, formData, {
    headers: formDataHeader,
  });
};

const registImage = async (formData) => {
  return await axios.post(`/api/file`, formData, {
    headers: formDataHeader,
  });
};

const getDetail = async (id) => {
  return await axios.get(`/api/boards/${id}`);
};

const deleteBoard = async (id) => {
  return await axios.delete(`/api/boards/${id}`);
};

const updateBoard = async (formData) => {
  return await axios.put(`/api/boards`, formData, {
    headers: formDataHeader,
  });
};

const modifyBoardDetailApi = async (data) => {
  return await axios.put("/api/boards/detail", data);
};

const getSharedBoard = async (data) => {
  return await axios.get("/api/boards/planlist", data);
};

export {
  listBoard,
  listBoardByGugun,
  registBoard,
  registImage,
  getDetail,
  deleteBoard,
  updateBoard,
  modifyBoardDetailApi,
  getSharedBoard,
};
