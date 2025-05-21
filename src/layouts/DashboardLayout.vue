<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main>
    <Navbar />

    <div class="p-4 flex items-start gap-2 h-[100vh]">
      <Sidebar />
      <div class="flex flex-1 h-full overflow-x-hidden">
        <RouterView />
      </div>
    </div>
  </main>
</template>
