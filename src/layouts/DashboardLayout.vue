<script setup>
import { RouterView } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <main>
    <Navbar />

    <div class="p-4 flex items-start gap-2 h-[calc(100vh-60px)]">
      <Sidebar />
      <div class="flex flex-1 h-full overflow-x-hidden">
        <RouterView />
      </div>
    </div>
  </main>
</template>
