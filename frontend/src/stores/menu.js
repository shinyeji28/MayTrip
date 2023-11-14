import { ref, computed } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./auth";

export const useMenuStore = defineStore("menuStore", () => {
  const authStore = useAuthStore();
  const isLogin = computed(() => !!authStore.token);
  const menuList = ref([
    { name: "회원가입", show: !isLogin.value, routeName: "user-join" },
    { name: "로그인", show: !isLogin.value, routeName: "user-login" },
    { name: "내정보", show: isLogin.value, routeName: "user-mypage" },
    { name: "로그아웃", show: isLogin.value, routeName: "user-logout" },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({
      ...item,
      show: !item.show,
    }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
