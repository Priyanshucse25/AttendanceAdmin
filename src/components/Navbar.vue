<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

const menu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Employee",
    path: "/employee",
  },
  {
    name: "Salary",
    path: "/salary",
  },
  {
    name: "Leave",
    path: "/leave",
  },
];
</script>

<template>
  <nav class="flex items-center px-4 justify-between h-[60px] bg-white">
    <div class="flex items-center gap-2">
      <img src="/svg/logo.svg" alt="Logo" class="" />
    </div>
    <div class="flex justify-center items-center gap-8">
      <router-link
        v-for="item in menu"
        :to="item.path"
        class="text-black hover:bg-[#7A5AF8] transition-all rounded-lg px-4 py-1 hover:text-white font-inter"
       :class="{ 'bg-[#7A5AF8] text-white': item.path === route.path }"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div class="flex items-center">
      <img src="/svg/bell.svg" alt="bell" class="h-8 w-8 mr-2" />
      <img src="/svg/admin.svg" alt="admin" class="h-8 w-8 mr-2" />
    </div>
  </nav>
</template>
