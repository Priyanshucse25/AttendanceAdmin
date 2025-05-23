<script setup>
import { ref } from 'vue';

const showBreak = ref(false);
</script>

<template>
  <div class="space-y-6 mt-6 max-w-4xl">
    <!-- Section: Shift actual time -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Shift actual time</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="time" placeholder="E.g 09:20" class="input-field" />
        <input type="time" placeholder="E.g 09:20" class="input-field" />
      </div>
    </div>

    <!-- Section: Buffer minutes -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Buffer minutes</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="time" placeholder="E.g 09:20" class="input-field" />
        <input type="time" placeholder="E.g 19:20" class="input-field" />
      </div>
    </div>

    <!-- Section: Lunch time -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Lunch time</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="time" placeholder="E.g 09:20" class="input-field" />
        <input type="time" placeholder="E.g 09:20" class="input-field" />
      </div>
    </div>

    <!-- Break Toggle -->
    <div class="border border-purple-300 bg-purple-50 rounded-md p-4 flex items-center justify-between">
      <p class="text-sm font-medium text-gray-700">Want to add break?</p>
      <button
        class="px-4 py-1 text-sm bg-white border border-purple-400 rounded text-purple-600 hover:bg-purple-100"
        @click="showBreak = !showBreak"
      >
        {{ showBreak ? 'Hide Break' : 'Add Break' }}
      </button>
    </div>

    <!-- Break Inputs -->
    <div v-if="showBreak" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="time" placeholder="Break Log In" class="input-field" />
      <input type="time" placeholder="Break Log Out" class="input-field" />
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 pt-6">
      <button class="px-6 py-2 bg-gray-100 text-gray-700 rounded">Cancel</button>
      <button class="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Done</button>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400;
}
</style>
