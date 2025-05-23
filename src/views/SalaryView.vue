<script setup>
import { ref, onMounted } from "vue";
import { usesalaryStore } from "@/stores/salaryStore";
import { storeToRefs } from "pinia";

// store
const salaryStore = usesalaryStore();
const { salaryData } = storeToRefs(salaryStore);


onMounted(() => {
  salaryStore.getUserSalary();
});
</script>

<template>
  <main class="bg-white w-full rounded-md p-4">
    <div class="flex items-center justify-between">
      <h2>Salary</h2>
      <button>Download</button>
    </div>

    <hr class="my-4" />

    <div class="flex items-center gap-2 flex-wrap mb-4">
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

    <!-- TABLE -->
    <div class="overflow-x-auto">
      <table class="min-w-[1200px] w-full whitespace-nowrap text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="text-left px-4 py-2 w-[20%] min-w-[280px]">Full Name & ID</th>
            <th class="text-left px-4 py-2">Department</th>
            <th class="text-left px-4 py-2">Type</th>
            <th class="text-center px-4 py-2">Present</th>
            <th class="text-center px-4 py-2">Paid Leaves</th>
            <th class="text-center px-4 py-2">Leaves</th>
            <th class="text-center px-4 py-2">Half Day</th>
            <th class="text-center px-4 py-2">Sick Leaves</th>
            <th class="text-left px-4 py-2">Add On</th>
            <th class="text-left px-4 py-2">Actual Salary</th>
            <th class="text-left px-4 py-2">Payable</th>
            <th class="text-left px-4 py-2">Status</th>
            <th class="text-right px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="emp in salaryData"
            :key="emp.id"
            class="border-b"
          >
            <td class="px-4 py-3">
              <div class="flex items-center gap-3">
                <img
                  :src="emp.photo || 'https://i.pravatar.cc/40?img=1'"
                  alt="avatar"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium">{{ emp.name }}</p>
                  <p class="text-xs text-gray-400">{{ emp.empId }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3">{{ emp.department }}</td>
            <td class="px-4 py-3">
              <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                {{ emp.type }}
              </span>
            </td>
            <td class="text-center px-4 py-3">{{ emp.present }}</td>
            <td class="text-center px-4 py-3">0{{ emp.paidLeaves }}</td>
            <td class="text-center px-4 py-3">0{{ emp.leaves }}</td>
            <td class="text-center px-4 py-3">0{{ emp.halfDay }}</td>
            <td class="text-center px-4 py-3">0{{ emp.sickLeaves }}</td>
            <td class="px-4 py-3">
              <span
                v-if="emp.addOn && emp.addOn !== '------'"
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  emp.addOn.includes('Birthday')
                    ? 'bg-pink-100 text-pink-600'
                    : 'bg-purple-100 text-purple-600',
                ]"
              >
                {{ emp.addOn }}
              </span>
              <span v-else class="text-gray-400 text-xs">------</span>
            </td>
            <td class="px-4 py-3">{{ emp.actualSalary }}</td>
            <td class="px-4 py-3">{{ emp.payable }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  emp.status === 'Paid'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600',
                ]"
              >
                {{ emp.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-right">
              <button class="text-gray-500 hover:text-blue-600">✏️</button>
              <button class="text-gray-500 hover:text-red-600 ml-2">🗑️</button>
            </td>
          </tr>

          <tr v-if="salaryData.length === 0">
            <td colspan="13" class="text-center py-6 text-gray-400">
              No salary data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
