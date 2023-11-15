import { ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const user = ref({
      userId: "",
      username: "",
      name: "",
    });
    const token = ref("");

    const updateUser = (decoded) => {
      user.value.userId = decoded.userId;
      user.value.username = decoded.username;
      user.value.name = decoded.name;
    };

    const updateToken = (data) => {
      token.value = data;
      const decoded = jwtDecode(token.value);
      updateUser(decoded);
      console.log("store : ", user.value);
    };

    const clearUser = () => {
      token.value = "";
      user.value.userId = "";
      user.value.username = "";
      user.value.name = "";
    };
    return {
      user,
      token,
      updateToken,
      clearUser,
    };
  },
  {
    persist: true,
  }
);
