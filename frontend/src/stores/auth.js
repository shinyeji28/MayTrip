import { ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { loginApi, modifyUserApi } from "@/api/user";
import { useMenuStore } from "./menu";
import { getUserApi, deleteUserApi } from "../api/user";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const menuStore = useMenuStore();

    const user = ref({
      memberId: "",
      username: "",
      name: "",
      profileImg: {},
    });
    const token = ref("");

    const login = async (loginForm) => {
      const { data } = await loginApi(loginForm);
      updateToken(data.token);
      menuStore.changeMenuState();
    };

    const modifyUser = async (userForm) => {
      const { data } = await modifyUserApi(userForm);
      updateUser(data);
    };

    const getUser = async (memberId) => {
      const { data } = await getUserApi(memberId);
      updateUser(data);
    };

    const updateToken = async (tk) => {
      token.value = tk;
      const decoded = jwtDecode(token.value);
      await getUser(decoded.memberId);
    };

    const updateUser = (data) => {
      user.value.memberId = data.memberId;
      user.value.username = data.username;
      user.value.name = data.name;
      user.value.profileImg = data.profileImg;
    };

    const deleteUser = async (memberId) => {
      await deleteUserApi(memberId);
      clearUser();
    };

    const clearUser = () => {
      token.value = "";
      user.value.memberId = "";
      user.value.username = "";
      user.value.name = "";
      user.value.profileImg = {};
      menuStore.changeMenuState();
    };
    return {
      user,
      token,
      login,
      modifyUser,
      clearUser,
      deleteUser,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
