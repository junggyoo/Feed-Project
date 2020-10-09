import { createRouter, createWebHistory } from "vue-router";
import FeedContents from "../views/FeedContents.vue";
import FeedDetail from "../views/FeedDetail.vue";

const routes = [
  {
    path: "/",
    name: "FeedConetents",
    component: FeedContents,
  },
  {
    path: "/:id",
    name: "Feed",
    component: FeedDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
