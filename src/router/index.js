import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", 
    name: "Home", 
    component: () => import("@/views/HomeView.vue") },
  // {
  //   path: "/currentFile",
  //   name: "CurrentFile",
  //   component: () => import("@/views/CurrentFile.vue"),
  // },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/files/:fileName",
    name: "File",
    component: () => import("@/views/FileView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: () => import("@/views/PageNotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
