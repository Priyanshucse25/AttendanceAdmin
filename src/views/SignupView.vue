<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-[50%] p-2">
      <img src="/images/auth-image.png" alt="" />
    </div>

    <div class="w-[50%] h-screen">
      <div class="flex flex-col mx-auto items-start justify-center h-full w-[70%] space-y-4">
        <div class="space-y-0">
          <h2 class="text-[30px] font-bold text-left">Create an account</h2>
        </div>

        <!-- Name -->
        <input v-model="name" type="text" placeholder="Name" class="mb-3 w-full p-2 border rounded-md outline-none" />

        <!-- Email -->
        <input v-model="email" type="email" placeholder="Email" class="mb-3 w-full p-2 border rounded-md outline-none" />

        <!-- Organisation -->
        <input v-model="organisation" type="text" placeholder="Organisation name" class="mb-3 w-full p-2 border rounded-md outline-none" />

        <!-- Industry -->
        <input v-model="industry" type="text" placeholder="Industry Type" class="mb-3 w-full p-2 border rounded-md outline-none" />

        <!-- Team Size Dropdown -->
        <select v-model="teamSize" class="mb-3 w-full p-2 border rounded-md outline-none">
          <option disabled value="">Select Team Size</option>
          <option>1-10</option>
          <option>11-50</option>
          <option>51-200</option>
          <option>201-500</option>
          <option>500+</option>
        </select>

        <!-- Password -->
        <div class="w-full border rounded-md px-4 bg-transparent flex items-center justify-between">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Enter Password" class="bg-transparent w-full py-2 outline-none" />
          <button type="button" @click="togglePasswordVisibility" class="pi" :class="showPassword ? 'pi-eye-slash' : 'pi-eye'"></button>
        </div>

        <!-- Confirm Password -->
        <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" placeholder="Confirm Password" class="mb-3 w-full p-2 border rounded-md outline-none" />

        <!-- Terms Checkbox -->
        <div class="flex items-center gap-2">
          <input type="checkbox" v-model="checkTnC" id="tnc" class="cursor-pointer" />
          <label for="tnc" class="cursor-pointer text-[14px]">
            I agree the
            <a href="/terms-and-conditions" target="_blank" class="hover:underline text-custom-blue">XYZ T&C</a> and
            <a href="/terms-and-conditions" target="_blank" class="hover:underline text-custom-blue">Privacy Policy</a>
          </label>
        </div>

        <!-- Messages -->
        <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
        <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

        <!-- Signup Button -->
        <button
          @click="signup"
          class="w-full py-2 rounded-md"
          :class="checkTnC ? 'bg-[#387ED1] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
        >
          Signup
        </button>

        <p class="text-sm mt-3 text-center">
          Already have an account?
          <router-link to="/login" class="text-blue-600">Login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const organisation = ref("");
const industry = ref("");
const teamSize = ref("");
const error = ref("");
const message = ref("");
const showPassword = ref(false);
const checkTnC = ref(false);

const router = useRouter();
const auth = useAuthStore();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const signup = async () => {
  error.value = "";
  message.value = "";

  // Validation
  if (!name.value || !email.value || !password.value || !confirmPassword.value || !organisation.value || !industry.value || !teamSize.value) {
    error.value = "Please fill in all fields.";
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  if (!checkTnC.value) {
    error.value = "Please accept the terms and conditions.";
    return;
  }

  try {
    const msg = await auth.signupAdmin({
      name: name.value,
      email: email.value,
      password: password.value,
      organisation: organisation.value,
      industry: industry.value,
      teamSize: teamSize.value
    });
    message.value = msg || "Signup successful!";
    setTimeout(() => router.push("/login"), 1500);
  } catch (err) {
    error.value = err.response?.data?.message || "Signup failed.";
  }
};
</script>

