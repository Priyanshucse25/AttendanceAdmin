<script setup>
import { useLeaveStore } from "@/stores/leaveStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const leaveStore = useLeaveStore();

const { leaveData } = storeToRefs(leaveStore);

const approvedEmployees = computed(() => {
  return leaveData.value?.filter((leave) => leave.status === "approved");
});

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getLeaveDuration(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  // Round to whole days (ignore time zone offsets)
  const diffTime = end.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays > 0 ? diffDays : 0;
}
</script>

<template>
  <section class="font-inter min-w-[350px] space-y-2">
    <div class="bg-white rounded-md p-4 h-[320px]">
      <div class="flex items-center justify-between">
        <h2 class="font-bold">Employee on leaves</h2>
        <router-link to="/leave">See all</router-link>
      </div>

      <hr class="my-3" />

      <div class="h-[220px] overflow-y-auto pr-1 space-y-2">
        <div
          v-for="item in approvedEmployees"
          class="flex items-center justify-between"
        >
          <div class="flex flex-col mt-2">
            <p class="capitalize font-semibold">{{ item.name }}</p>
            <div class="flex gap-1 text-[12px]">
              <p>{{ formatDate(item.from) }}</p>
              -
              <p>{{ formatDate(item.to) }}</p>
            </div>
          </div>

          <div
            class="bg-blue-100 text-blue-500 font-semibold px-3 py-1 rounded-md text-[14px] mt-2"
          >
            {{ getLeaveDuration(item.from, item.to) }} Days
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-md p-4 h-[330px]">
      <div class="flex items-center justify-between">
        <h2 class="font-bold">Celebration</h2>
      </div>
    </div>
  </section>
</template>
