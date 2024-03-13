import { createApp } from "vue/dist/vue.esm-bundler";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/auth";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";

import "./style.css";
import "animate.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(autoAnimatePlugin);

const authStore = useAuthStore();
authStore.initializeAuthState();

app.mount("#app");
