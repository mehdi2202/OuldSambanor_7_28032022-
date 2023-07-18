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
      name: "SignupView",
      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/login",
      name: "LoginView",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/feed",
      name: "PostList",
      component: () => import("../views/PostListView.vue"),
    },
    {
      path: "/user/:id",
      name: "UserView",
      component: () => import("../views/UserView.vue"),
    },
    {
      path: "/post/:id",
      name: "PostDetailsView",
      component: () => import("../views/PostDetailView.vue"),
    },
  ],
});

export default router;
