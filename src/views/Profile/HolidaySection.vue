<script setup>
import { ref } from 'vue';

const allHolidays = [
  // Hindu holidays
  { name: 'Diwali', date: '2025-10-20', religion: 'Hindu', enabled: true },
  { name: 'Holi', date: '2025-03-13', religion: 'Hindu', enabled: false },
  { name: 'Navratri', date: '2025-10-01', religion: 'Hindu', enabled: true },
  { name: 'Raksha Bandhan', date: '2025-08-18', religion: 'Hindu', enabled: true },
  { name: 'Janmashtami', date: '2025-08-06', religion: 'Hindu', enabled: false },

  // Christian holidays
  { name: 'Christmas', date: '2025-12-25', religion: 'Christian', enabled: true },
  { name: 'Good Friday', date: '2025-04-18', religion: 'Christian', enabled: true },
  { name: 'Easter', date: '2025-04-20', religion: 'Christian', enabled: false },
  { name: 'Palm Sunday', date: '2025-04-13', religion: 'Christian', enabled: false },
  { name: 'All Saints Day', date: '2025-11-01', religion: 'Christian', enabled: false }
];

const holidays = ref(allHolidays);

function toggleHoliday(index) {
  holidays.value[index].enabled = !holidays.value[index].enabled;
}
</script>

<template>
  <section class="space-y-6 overflow-y-hidden h-[calc(60vh-80px)] max-h-screen">
    <h2 class="text-lg font-semibold text-gray-800">List of Holidays</h2>

    <div
      v-for="(holiday, index) in holidays"
      :key="holiday.name"
      class="flex items-center justify-between p-4 border rounded shadow-sm bg-white"
    >
      <div>
        <h3 class="text-sm font-medium text-gray-700">{{ holiday.name }} ({{ holiday.religion }})</h3>
        <p class="text-xs text-gray-500">{{ holiday.date }}</p>
      </div>
      <label class="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          :checked="holiday.enabled"
          @change="toggleHoliday(index)"
        />
        <div
          class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-purple-600 transition-colors"
        ></div>
      </label>
    </div>
  </section>
</template>

<style scoped>
.peer:checked + div {
  background-color: #8b5cf6;
}
</style>
