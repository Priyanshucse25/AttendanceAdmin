<script setup>
import { ref } from 'vue';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const selectedDays = ref(['Monday']);

const saturdayRules = [
  'Every Saturday off',
  'Only 1st Saturday off',
  'Only 2nd Saturday off',
  'Only 3rd Saturday off',
  'Only 4th Saturday off',
  '1st and 3rd Saturday off',
  '2nd and 4th Saturday off',
];
const selectedSaturdayRule = ref('');
</script>

<template>
  <section class="space-y-4">
    <h2 class="font-semibold text-gray-800">Select weekly off days</h2>

    <div class="flex flex-wrap gap-4">
      <label
        v-for="day in weekdays"
        :key="day"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :value="day"
          v-model="selectedDays"
          class="accent-purple-500 w-4 h-4"
        />
        <span class="text-sm text-gray-700">{{ day }}</span>
      </label>
    </div>

    <div class="mt-4">
      <label for="saturdayRule" class="block text-sm font-medium text-gray-700 mb-1">
        Saturday rule
      </label>
      <select
        id="saturdayRule"
        v-model="selectedSaturdayRule"
        class="w-full max-w-xs border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="" disabled selected>E.g. Only 3rd Saturday off</option>
        <option v-for="rule in saturdayRules" :key="rule" :value="rule">{{ rule }}</option>
      </select>
    </div>
  </section>
</template>
