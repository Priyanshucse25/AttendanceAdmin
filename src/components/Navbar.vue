<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()

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

const toggleMenu = () => {
  isMenuopen.value = !isMenuopen.value
}

const handleLogout = async () => {
  await authStore.logout()
  toast.success("Logged out successfully")
};
</script>

<template>
  <nav
    class="flex items-center px-4 mx-4 rounded-md justify-between h-[60px] bg-white"
  >
    <router-link to="/" class="flex items-center gap-2">
      <img src="/svg/logo.svg" alt="Logo" class="w-[90%]" />
    </router-link>
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
      <img src="/svg/bell.svg" alt="admin" class="h-8 w-8 mr-2" />
      

      <div class="flex items-center gap-4">
        <div @click="toggleMenu" class="cursor-pointer">
          <img src="/svg/admin.svg" alt="bell" class="h-8 w-8 mr-2"/>
        </div>

        <transition name="menu-fade">
          <div
            v-if="isMenuopen"
            class="w-[200px] bg-white shadow-md absolute top-[50px] right-5 rounded-md z-30 flex flex-col"
          >
            <router-link
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
</style>