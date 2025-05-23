<template>
  <div class="min-h-screen flex items-start justify-center bg-white">
    <div class="w-[50%] p-2">
      <img src="/images/auth-image.png" alt="" />
    </div>

    <div class="w-[50%] h-screen">
      <div
        class="flex flex-col mx-auto items-start justify-center h-full w-[70%] space-y-4"
      >
        <div class="space-y-0">
          <h2 class="text-[30px] font-bold text-left">
          Welcome Back
        </h2>
        <p class="opacity-60">Please enter your email and password</p>
        </div>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-3 w-full p-2 border rounded-md outline-none"
        />

        <div
          class="w-full border rounded-md outline-none px-4 bg-transparent flex items-center justify-between"
        >
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Enter Password"
            class="bg-transparent w-full py-2 outline-none"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="pi"
            :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"
          ></button>
        </div>

        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            v-model="checkTnC"
            id="tnc"
            class="cursor-pointer"
          />
          <label for="tnc" class="cursor-pointer text-[14px]">
            I agree the
            <a
              href="/terms-and-conditions"
              target="_blank"
              class="hover:underline text-custom-blue"
              >XYZ T&C</a
            >
            and
            <a
              href="/terms-and-conditions"
              target="_blank"
              class="hover:underline text-custom-blue"
              >Privacy Policy</a
            >
          </label>
        </div>
        <button
          @click="login"
          class="w-full bg-[#387ED1] text-white p-2 rounded mt-3"
          :class="[
            'w-full py-2 rounded-md',
            checkTnC
              ? 'bg-[#387ED1] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          Login
        </button>
        <p class="text-sm mt-3 text-center">
          Don't have an account?
          <router-link to="/signup" class="text-blue-600">Signup</router-link>
        </p>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { toast } from "vue3-toastify";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = useAuthStore();
const showPassword = ref(false);
const checkTnC = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  try {
    error.value = "";
    await auth.loginAdmin({ email: email.value, password: password.value });
    router.push("/");
    toast.success("Logged out successfully");
  } catch (err) {
    error.value = err.response?.data?.message || "Login failed.";
  }
};
</script>
