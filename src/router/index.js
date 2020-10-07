import { createRouter, createWebHistory } from "vue-router";
import FeedContents from "../views/FeedContents.vue";

const routes = [
  {
    path: "/",
    name: "FeedConetents",
    component: FeedContents,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
