import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import stripe from 'stripe'
import ElementPlus from 'element-plus'
import "./assets/styles/reset.scss"

createApp(App).use(store).use(router).use(ElementPlus).use(stripe).mount("#app");
