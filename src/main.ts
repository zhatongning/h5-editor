import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import stripe from 'h5-editor-stripe'
import ElementPlus from 'element-plus'
import "./assets/styles/reset.scss"
import "./assets/font/index.scss"

createApp(App).use(store).use(router).use(ElementPlus).use(stripe).mount("#app");
