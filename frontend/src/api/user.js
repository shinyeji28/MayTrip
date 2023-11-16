import axios from "axios";

async function loginApi(data) {
  return await axios.post(`/api/login`, data);
}

async function signupApi(data) {
  return await axios.post(`/api/signup`, data);
}

async function modifyUserApi(data) {
  // return await local.put(`/user`, data);
  return await axios.put("/api/user", data);
}

export { loginApi, signupApi, modifyUserApi };
