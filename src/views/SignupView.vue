<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Admin Signup</h2>

      <!-- Name Field -->
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        class="mb-3 w-full p-2 border rounded"
      />

      <!-- Email Field -->
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="mb-3 w-full p-2 border rounded"
      />

      <!-- Password Field -->
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="mb-4 w-full p-2 border rounded"
      />

      <!-- Signup Button -->
      <button
        @click="signup"
        class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Signup
      </button>

      <!-- Navigation & Messages -->
      <p class="text-sm mt-3 text-center">
        Already have an account?
        <router-link to="/login" class="text-blue-600">Login</router-link>
      </p>
      <p v-if="message" class="text-green-600 mt-2">{{ message }}</p>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

// Refs
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const message = ref('')

const router = useRouter()
const auth = useAuthStore()

// Signup handler
const signup = async () => {
  try {
    error.value = ''
    const msg = await auth.signupAdmin({
      name: name.value,
      email: email.value,
      password: password.value,
    })
    message.value = msg || 'Signup successful!'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value = err.response?.data?.message || 'Signup failed.'
  }
}
</script>