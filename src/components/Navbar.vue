<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCustomToast } from "@/utils/toast-function";

const authStore = useAuthStore()
const toast = useCustomToast();

const route = useRoute();

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

const isMenuopen = ref(false)
const sidebarOpen = ref(false);

const toggleMenu = () => {
  isMenuopen.value = !isMenuopen.value
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const handleLogout = async () => {
  await authStore.logout()
  toast.success("Logged out successfully")
};
</script>

<template>
  <nav
    class="flex items-center px-4 mx-4 rounded-md justify-between h-[60px] bg-white"
  >
    <div class="flex items-center gap-4">
      <div class="md:hidden"><button @click="toggleSidebar" class="pi pi-bars text-[20px]"></button></div>
      <router-link to="/" class="flex items-center gap-2">
        <img src="/svg/logo.svg" alt="Logo" class="w-[80%] md:w-[90%]" />
      </router-link>
    </div>
    <div class="hidden md:flex justify-center items-center gap-8">
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
      <img src="/svg/bell.svg" alt="admin" class="h-8 w-8 mr-2" />
      

      <div class="flex items-center gap-4">
        <div @click="toggleMenu" class="cursor-pointer w-[40px] h-[40px] rounded-full">
          <img src="/images/dummy_profile_img.jpg" alt="">
        </div>

        <transition name="menu-fade">
          <div
            v-if="isMenuopen"
            class="w-[200px] bg-white shadow-md absolute top-[50px] right-5 rounded-md z-30 flex flex-col"
          >
            <router-link
            @click="toggleMenu"
              to="/profile"
              class="py-2 px-4 hover:bg-slate-300 w-full rounded-md transition-all"
              >Profile</router-link
            >
            <a
              href="/terms-and-conditions"
              target="_blank"
              class="py-2 px-4 hover:bg-slate-300 w-full rounded-md transition-all"
              >Terms and Conditions</a
            >
            <button
              @click="handleLogout"
              class="py-2 px-4 hover:bg-slate-300 w-full text-left rounded-md transition-all"
            >
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>


    <transition name="slide-left">
    <aside
      v-if="sidebarOpen"
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 flex flex-col p-4"
    >
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button @click="toggleSidebar" class="pi pi-times text-lg"></button>
      </div>
      <nav class="flex flex-col gap-3">
        <router-link
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="py-2 px-3 rounded-md hover:bg-indigo-100 transition"
          :class="{ 'bg-indigo-200': item.path === route.path }"
          @click="toggleSidebar"
        >
          {{ item.name }}
        </router-link>
      </nav>
    </aside>
  </transition>

  <!-- Overlay when sidebar is open -->
  <div
    v-if="sidebarOpen"
    class="fixed inset-0 bg-black bg-opacity-30 z-30"
    @click="toggleSidebar"
  ></div>
  </nav>
</template>


<style scoped>
.menu-fade-enter-active {
  transition: all 0.2s ease-out;
}
.menu-fade-leave-active {
  transition: all 0.15s ease-in;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.menu-fade-enter-to,
.menu-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
</style>