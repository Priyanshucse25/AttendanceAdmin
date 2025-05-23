<script setup>
import { ref, onMounted } from "vue";
import { useHomeStore } from "@/stores/homeStore";
import { storeToRefs } from "pinia";

// store setup
const homeStore = useHomeStore();
const { HomeData } = storeToRefs(homeStore);

// fetch data on mount
onMounted(() => {
  homeStore.getUserHome();
});

// update status locally
function updateStatus(employee, newStatus) {
  employee.status = newStatus;
}
</script>

<template>
  <main class="bg-white w-full rounded-md p-4">
    <div class="flex items-center justify-between">
      <h2>This Month’s Attendance</h2>
      <button>Download</button>
    </div>

    <hr class="my-4" />

    <div class="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by name, department"
        class="bg-black bg-opacity-10 px-4 py-1 rounded outline-none"
      />

      <div class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4">
        <p>Employee Id</p>
        <i class="pi pi-angle-down"></i>
      </div>

      <div class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4">
        <p>Department</p>
        <i class="pi pi-angle-down"></i>
      </div>

      <div class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4">
        <p>Status</p>
        <i class="pi pi-angle-down"></i>
      </div>
    </div>

    <div class="mt-8 w-full overflow-x-auto">
      <table class="w-full table-auto text-left border-collapse">
        <thead class="bg-custom-gray text-black">
          <tr>
            <th class="py-3 px-4">Full Name & ID</th>
            <th class="py-3 px-4">Department</th>
            <th class="py-3 px-4">Location</th>
            <th class="py-3 px-4">Photo</th>
            <th class="py-3 px-4">Punch In & Out Time</th>
            <th class="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody class="text-black">
          <tr
            v-for="employee in HomeData"
            :key="employee.id"
            class="border-b border-gray-200"
          >
            <td class="py-3 px-4">
              <p class="font-semibold">{{ employee.userName }}</p>
              <p class="text-sm text-gray-400">{{ employee.userID }}</p>
            </td>
            <td class="py-3 px-4">{{ employee.department }}</td>
            <td class="py-3 px-4">{{ employee.locationName }} </td>
            <td class="py-3 px-4 text-blue-400 underline cursor-pointer">View</td>
            <td class="py-3 px-4">{{ employee.timeStamp }}</td>
            <td class="py-3 px-4 space-x-2">
              <button
                :class="[
                  'px-3 py-1 rounded font-semibold text-sm',
                  employee.status === 'Present'
                    ? 'bg-green-600 bg-opacity-25 text-green-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-green-100',
                ]"
                @click="updateStatus(employee, 'Present')"
              >
                Present
              </button>
              <button
                :class="[
                  'px-3 py-1 rounded font-semibold text-sm',
                  employee.status === 'Absent'
                    ? 'bg-red-600 bg-opacity-25 text-red-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-red-100',
                ]"
                @click="updateStatus(employee, 'Absent')"
              >
                Absent
              </button>
              <button  
                :class="[
                  'px-3 py-1 rounded font-semibold text-sm',
                  employee.status === 'Half Day'
                    ? 'bg-yellow-500 bg-opacity-25 text-yellow-500'
                    : 'bg-gray-200 text-gray-600 hover:bg-yellow-100',
                ]"
                @click="updateStatus(employee, 'Half Day')"
              >
                Half Day
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
