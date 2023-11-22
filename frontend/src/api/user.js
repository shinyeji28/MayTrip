import axios from "axios";

const formDataHeader = { "Content-Type": "multipart/form-data" };

async function loginApi(data) {
  return await axios.post(`/api/login`, data);
}

async function signupApi(data) {
  return await axios.post(`/api/signup`, data);
}

async function getUserApi(memberId) {
  return await axios.get(`/api/user/${memberId}`);
}

async function modifyUserApi(data) {
  return await axios.put("/api/user", data, {
    headers: formDataHeader,
  });
}

async function deleteUserApi(memberId) {
  return await axios.delete(`/api/user/${memberId}`);
}

export { loginApi, signupApi, modifyUserApi, getUserApi, deleteUserApi };
