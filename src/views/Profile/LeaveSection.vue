<script setup>
import { ref } from 'vue';

const leaveTypes = ['Casual Leave', 'Sick Leave', 'Annual Leave'];

const leaveData = ref(
  leaveTypes.map(type => ({
    name: type,
    cycle: 'monthly',
    count: '',
    rule: '',
    limit: '',
  }))
);
</script>

<template>
  <div class="max-w-4xl space-y-10 mt-6">
    <div
      v-for="(leave, index) in leaveData"
      :key="index"
      class="border-b pb-6 space-y-4"
    >
      <h3 class="font-semibold text-gray-800">{{ leave.name }}</h3>

      <!-- Leave Policy Cycle -->
      <div class="flex items-center gap-6">
        <label class="text-sm font-medium text-gray-700">Leave Policy Cycle</label>
        <div class="flex items-center gap-4">
          <label class="flex items-center gap-1 text-sm">
            <input
              type="radio"
              :name="`cycle-${index}`"
              value="yearly"
              v-model="leave.cycle"
              class="accent-purple-600"
            />
            Yearly
          </label>
          <label class="flex items-center gap-1 text-sm">
            <input
              type="radio"
              :name="`cycle-${index}`"
              value="monthly"
              v-model="leave.cycle"
              class="accent-purple-600"
            />
            Monthly
          </label>
        </div>
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="E.g 03"
          v-model="leave.count"
          class="input-field"
        />
        <input
          type="time"
          placeholder="E.g 09:20"
          v-model="leave.limit"
          class="input-field"
        />
        <select
          v-model="leave.rule"
          class="input-field"
        >
          <option value="" disabled selected>E.g Carry forward</option>
          <option value="carry">Carry forward</option>
          <option value="encash">Encashment</option>
        </select>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4">
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
