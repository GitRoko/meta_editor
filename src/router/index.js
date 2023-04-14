import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import IndexView from "@/views/IndexView.vue";
import FileView from "@/views/FileView.vue";
import PageNotFound from "@/views/PageNotFound.vue";


const routes = [
  { path: "/", 
    name: "Home", 
    component: HomeView,
  },
  {
    path: "/index",
    name: "Index",
    component: IndexView,
  },
  {
    path: "/files/:fileName",
    name: "File",
    component: FileView,
  },
  {
    path: "/files/:pathMatch(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
