import "./assets/default.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; //새로고침시 데이터 유지를 위한 설정

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

// Vue Virtual Scroller
import VueVirtualScroller from "vue-virtual-scroller";
// import { quillEditor } from 'vue3-quill'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); //새로고침시 데이터 유지를 위한 설정

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    iconfont: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

app.use(pinia);
app.use(vuetify);
app.use(router);
app.use(VueVirtualScroller);
app.component('QuillEditor', QuillEditor)


app.mount("#app");
