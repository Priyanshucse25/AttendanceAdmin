<script setup>
import { ref, computed, watch } from "vue";
import { usesalaryStore } from "@/stores/salaryStore";
import { storeToRefs } from "pinia";
import LottieAnimation from "@/components/LottieAnimation.vue";

// store
const salaryStore = usesalaryStore();
const { salaryData, loading, page, limit } = storeToRefs(salaryStore);

const searchName = ref("");
const selectedDepartment = ref("");
const selectedStatus = ref("");

const filteredSalaries = computed(() => {
  return salaryData.value.filter((emp) => {
    const matchesName = emp.name
      ?.toLowerCase()
      .includes(searchName.value.toLowerCase());
    const matchesDepartment = selectedDepartment.value
      ? emp.department?.toLowerCase() ===
        selectedDepartment.value.toLowerCase()
      : true;
    const matchesStatus = selectedStatus.value
      ? emp.status?.toLowerCase() === selectedStatus.value.toLowerCase()
      : true;

    return matchesName && matchesDepartment && matchesStatus;
  });
});


// Leave and salary logic
const calculateTotalLeaves = (emp) => {
  const halfDayLeaves = (Number(emp.halfDay) || 0) / 2;
  return (
    (Number(emp.leaves) || 0) + (Number(emp.sickLeaves) || 0) + halfDayLeaves
  );
};

const calculateDeduction = (emp) => {
  const ALLOWED_LEAVES_PER_YEAR = 14;
  const totalLeaves = calculateTotalLeaves(emp);
  const excessLeaves = Math.max(0, totalLeaves - ALLOWED_LEAVES_PER_YEAR);
  const perDaySalary = (Number(emp.actualSalary) || 0) / 30;
  return Math.round(perDaySalary * excessLeaves);
};

const calculatePayable = (emp) => {
  const deduction = calculateDeduction(emp);
  return Math.max(0, Number(emp.actualSalary) - deduction);
};

watch(page, () => {
  salaryStore.getUserSalary(true);
});

const nextPage = () => {
  page.value++;
};

const prevPage = () => {
  if (page.value > 0) page.value--;
};
</script>

<template>
  <main class="bg-white w-full rounded-md p-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Salary</h2>
      <button class="bg-blue-600 text-white px-4 py-1 rounded">Download</button>
    </div>

    <hr class="my-4" />

    <div class="flex items-center gap-2">
      <input
        v-model="searchName"
        type="text"
        placeholder="Search by employee"
        class="bg-black bg-opacity-10 px-4 py-1 rounded outline-none"
      />

      <select
        v-model="selectedDepartment"
        class="bg-black bg-opacity-10 px-2 py-1 rounded outline-none"
      >
        <option value="">All Departments</option>
        <option value="HR">HR</option>
        <option value="Engineering">Engineering</option>
        <option value="Sales">Sales</option>
      </select>

      <select
        v-model="selectedStatus"
        class="bg-black bg-opacity-10 px-2 py-1 rounded outline-none"
      >
        <option value="">All Status</option>
        <option value="paid">Paid</option>
        <option value="unpaid">Unpaid</option>
      </select>
    </div>

    <!-- TABLE -->
    <template v-if="filteredSalaries && filteredSalaries.length > 0">
      <div class="overflow-x-auto no-scrollbar mt-4">
        <table class="min-w-[1200px] w-full whitespace-nowrap text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="text-left px-4 py-2 w-[20%] min-w-[280px]">
                Full Name & ID
              </th>
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
              v-for="emp in filteredSalaries"
              :key="emp.id"
              :class="[
                'border-b',
                calculateTotalLeaves(emp) > 14 ? 'bg-red-50' : '',
              ]"
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
                <span
                  class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                >
                  {{ emp.type }}
                </span>
              </td>
              <td class="text-center px-4 py-3">{{ emp.present }}</td>
              <td class="text-center px-4 py-3">{{ emp.paidLeaves }}</td>
              <td class="text-center px-4 py-3">{{ emp.leaves }}</td>
              <td class="text-center px-4 py-3">
                {{ emp.halfDay }}
                <span class="text-xs text-gray-400"
                  >({{ (emp.halfDay / 2).toFixed(1) }}d)</span
                >
              </td>
              <td class="text-center px-4 py-3">{{ emp.sickLeaves }}</td>
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
              <td class="px-4 py-3">₹{{ emp.actualSalary }}</td>
              <td class="px-4 py-3">
                ₹{{ calculatePayable(emp) }}
                <p class="text-xs text-red-500">
                  -₹{{ calculateDeduction(emp) }} deduction
                </p>
                <p class="text-xs text-gray-500">
                  {{ calculateTotalLeaves(emp) }} total leaves
                </p>
              </td>
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
                <button class="text-gray-500 hover:text-red-600 ml-2">
                  🗑️
                </button>
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

      <!-- Pagination Controls -->
      <div
        class="flex justify-center items-center my-4 gap-4 text-text sm-text"
      >
        <button
          @click="prevPage"
          :disabled="page === 1"
          :class="{
            'p-2 rounded-full bg-gray-400 hover:bg-gray-600 disabled:opacity-50 pi pi-angle-left': true,
            'cursor-pointer': page > 1,
            'cursor-not-allowed': page === 1
          }"
        ></button>

        <p>Page {{ page }}</p>

        <button
          @click="nextPage"
          :disabled="filteredSalaries.length < limit"
          :class="{
            'p-2 rounded-full bg-gray-400 hover:bg-gray-600 disabled:opacity-50 pi pi-angle-right': true,
            'cursor-pointer': filteredSalaries.length >= limit,
            'cursor-not-allowed': filteredSalaries.length < limit
          }"
        ></button>
      </div>
    </template>

    <div v-if="loading" class="w-[350px] mx-auto mt-[100px]">
      <LottieAnimation animationPath="/animation/loading.json" />
    </div>

    <!-- <div
      v-if="!loading && filteredSalaries.length === 0"
      class="w-[350px] mt-[200px] mx-auto"
    >
      <LottieAnimation animationPath="/animation/no-data.json" />
      <p class="text-center font-bold">No matching results found</p>
    </div> -->

    <div
      v-if="!loading && !filteredSalaries.length"
      class="w-[350px] mt-[200px] mx-auto"
    >
      <LottieAnimation animationPath="/animation/no-data.json" />
      <p class="text-center font-bold">No Data Found</p>
    </div>
  </main>
</template>
