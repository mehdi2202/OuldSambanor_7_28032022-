import { createRouter, createWebHistory } from "vue-router";
import signup from "../views/signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/signup",
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/signup.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/feed",
      name: "feed",
      component: () => import("../views/feed.vue"),
    },
    {
      path: "/user/:id",
      name: "user",
      component: () => import("../views/user.vue"),
    },
  ],
});

export default router;
