import { createApp } from "vue/dist/vue.esm-bundler";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n";
import { useAuthStore } from "./store/auth";

import "./style.css";
import "animate.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);

const authStore = useAuthStore();
authStore.initializeAuthState();

app.mount("#app");
