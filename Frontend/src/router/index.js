import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/signup",
    },
    {
      path: "/signup",
      name: "signupContent",
      component: () => import("../views/signup.vue"),
    },
    {
      path: "/login",
      name: "loginContent",
      component: () => import("../views/login.vue"),
    },
    {
      path: "/feed",
      name: "feedContent",
      component: () => import("../views/feed.vue"),
    },
    {
      path: "/user/:id",
      name: "userContent",
      component: () => import("../views/user.vue"),
    },
  ],
});

export default router;
