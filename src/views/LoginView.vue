<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <input v-model="email" type="email" placeholder="Email" class="mb-3 w-full p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Password" class="mb-4 w-full p-2 border rounded" />
      <button @click="login" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      <p class="text-sm mt-3 text-center">Don't have an account? <router-link to="/signup" class="text-blue-600">Signup</router-link></p>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  try {
    error.value = ''
    await auth.loginAdmin({ email: email.value, password: password.value })
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed.'
  }
}
</script>