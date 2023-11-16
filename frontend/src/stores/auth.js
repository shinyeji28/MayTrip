import { ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { loginApi, modifyUserApi } from "@/api/user";
import { useMenuStore } from "./menu";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const user = ref({
      memberId: "",
      username: "",
      name: "",
    });
    const token = ref("");

    const login = async (loginForm) => {
      const { data } = await loginApi(loginForm);
      updateToken(data.token);
    };

    const modifyUser = async (userForm) => {
      const { data } = await modifyUserApi(userForm);
      user.value.memberId = data.memberId;
      user.value.username = data.username;
      user.value.name = data.name;
    };

    const updateToken = (data) => {
      token.value = data;
      const decoded = jwtDecode(token.value);
      user.value = decoded;
    };

    const clearUser = () => {
      token.value = "";
      user.value.memberId = "";
      user.value.username = "";
      user.value.name = "";
    };
    return {
      user,
      token,
      login,
      modifyUser,
      clearUser,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
