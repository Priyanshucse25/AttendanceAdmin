import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

import HomeView from "../views/HomeView.vue";
import SalaryView from "@/views/SalaryView.vue";

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
          path: "/salary",
          name: "salary",
          component: SalaryView,
        },
      ],
    },
  ],
});

export default router;
