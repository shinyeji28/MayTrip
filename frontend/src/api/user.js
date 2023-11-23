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

async function sendCertificateNumApi(form) {
  return await axios.post("/api/user/auth", form);
}

async function matchCertificateNumApi(form) {
  return await axios.post("/api/user/match", form);
}

async function clickChangePasswordApi(form) {
  return await axios.post("/api/user/pass", form);
}

export {
  loginApi,
  signupApi,
  modifyUserApi,
  getUserApi,
  deleteUserApi,
  sendCertificateNumApi,
  matchCertificateNumApi,
  clickChangePasswordApi,
};
