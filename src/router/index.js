import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue"
import NoSidebarLayout from "@/layouts/NoSidebarLayout.vue"

import HomeView from "../views/HomeView.vue";
import EmployeeView from "@/views/Employee/EmployeeView.vue";
import SalaryView from "@/views/SalaryView.vue";
import LeaveView from "@/views/LeaveView.vue";
import ProfileView from "@/views/Profile/ProfileView.vue"
import LoginView from "@/views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"

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
        {
          path: "/salary",
          name: "salary",
          component: SalaryView,
        },
        {
          path: "/leave",
          name: "leave",
          component: LeaveView,
        },
      ],
    },
    {
      path: "/",
      name: "",
      component: NoSidebarLayout,
      children: [
        {
          path: "/profile",
          name: "profile",
          component: ProfileView,
        },
      ]
    },
    {
      path: "/",
      name: "",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: LoginView,
        },
        {
          path: "/signup",
          name: "signup",
          component: SignUpView,
        },
      ]
    },
  ],
});

export default router;
