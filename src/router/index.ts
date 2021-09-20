import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from '@/views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { showHeaderAndFooter: true }
  },
  {
    path: "/detail/:id",
    name: "detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Detail.vue"),
    meta: { showHeaderAndFooter: true }
  },
  {
    path: "/editor",
    name: "editor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Editor.vue"),
    meta: { showHeaderAndFooter: false }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { showHeaderAndFooter: false }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
