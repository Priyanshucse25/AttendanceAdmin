<script setup>
import { ref } from "vue";
import DetailSection from "./DetailSection.vue";
import PunchSection from "./PunchSection.vue";
import LeaveSection from "./LeaveSection.vue";
import DocumentSection from "./DocumentSection.vue";
import WeekendSection from "./WeekendSection.vue";

const activeTab = ref("about");

// Tab config
const tabs = [
  { label: "About company", value: "about" },
  { label: "Documents", value: "documents" },
  { label: "Holidays", value: "holidays" },
  { label: "Weekends", value: "weekends" },
  { label: "Punch In/Out", value: "punch" },
  { label: "Leaves", value: "leaves" },
];
</script>

<template>
  <main class="bg-white w-full h-full rounded-md p-4">
    <!-- Header -->
    <div>
      <div class="flex items-center gap-4">
        <div class="w-[100px] h-[100px] bg-slate-400 rounded-full"></div>
        <div class="space-y-1">
          <h2 class="font-semibold text-[20px]">X-tention crew technology</h2>
          <div class="flex gap-4 text-[14px]">
            <p>Software company</p>
            <p>IT specialist</p>
          </div>
          <div class="flex gap-4 text-[14px]">
            <p>200 Employees Involved</p>
            <p>It’s been 7 Years</p>
          </div>
        </div>
      </div>

      <hr class="my-4" />
    </div>

    <!-- Tabs Loop -->
    <div
      class="flex gap-4 bg-custom-gray font-medium rounded-xl p-1 text-[14px]"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'px-8 py-2 rounded-xl',
          activeTab === tab.value
            ? 'bg-purple-500 text-white'
            : 'bg-transparent',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Conditional Section -->
    <div class="mt-6 grow overflow-y-auto max-h-[65%]">
      <DetailSection v-if="activeTab === 'about'" />
      <PunchSection v-if="activeTab === 'punch'" />
      <LeaveSection v-if="activeTab === 'leaves'" />
      <DocumentSection v-if="activeTab === 'documents'" />
      <WeekendSection v-if="activeTab === 'weekends'" />
      <!-- Other tab sections can go here -->
    </div>
  </main>
</template>
