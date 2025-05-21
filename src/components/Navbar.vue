<template>
  <nav class="flex items-center p-4 justify-between">
    <img src="@/assets/mainlogo.svg" alt="Logo" class="h-8 w-8 mr-2" />
    <div class="text-[#6E62FF]">PUNCHIN</div>
    <div class="pl-4 items-center flex-1">
      <ul class="flex justify-center space-x-10">
        <li class="inline-block mr-4">
          <a
            href="#"
            class="text-black hover:bg-[#7A5AF8] rounded px-2 py-1 hover:text-white font-inter"
            >Home</a
          >
        </li>
        <li class="inline-block mr-4">
  <a
    href="#"
    @click.prevent="handleEmployeeView"
    class="text-black hover:bg-[#7A5AF8] rounded px-2 py-1 hover:text-white"
  >
    Employee
  </a>
</li>
        <li class="inline-block">
          <a
            href="#"
            class="text-black hover:bg-[#7A5AF8] rounded px-2 py-1 hover:text-white"
            >Salary</a
          >
        </li>
        <li class="inline-block">
          <a
            href="#"
            class="text-black hover:bg-[#7A5AF8] rounded px-2 py-1 hover:text-white"
            >Leave</a
          >
        </li>
      </ul>
    </div>
    <div class="flex items-center">
      <img src="@/assets/bell.svg" alt="bell" class="h-8 w-8 mr-2" />
      <img src="@/assets/admin.svg" alt="admin" class="h-8 w-8 mr-2" />
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();
const handleEmployeeView = () => {
  router.push({ name: "employee" });
};
</script>
