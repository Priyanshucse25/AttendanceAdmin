import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import HomeView from "../views/HomeView.vue";
import EmployeeView from "@/views/EmployeeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: DashboardLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/employee",
          name: "employee",
          component: EmployeeView,
        },
      ],
    },
  ],
});

export default router;
