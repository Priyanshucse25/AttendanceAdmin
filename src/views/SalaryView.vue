<script setup>
import { ref } from "vue";

const employees = ref([
  {
    id: "EMP202401",
    name: "Aarav Mehta",
    department: "Design",
    type: "Full time",
    present: 20,
    paidLeaves: 2,
    leaves: 0,
    halfDay: 1,
    sickLeaves: 1,
    addOn: "Birthday 500",
    actualSalary: "40,000",
    payable: "38,000",
    status: "Paid",
    photo: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: "EMP202402",
    name: "Divya Kapoor",
    department: "Marketing",
    type: "Intern",
    present: 18,
    paidLeaves: 1,
    leaves: 2,
    halfDay: 0,
    sickLeaves: 2,
    addOn: "------",
    actualSalary: "25,000",
    payable: "22,500",
    status: "Pending",
    photo: "https://i.pravatar.cc/40?img=8",
  },
  {
    id: "EMP202403",
    name: "Karan Singh",
    department: "Development",
    type: "Full time",
    present: 22,
    paidLeaves: 1,
    leaves: 1,
    halfDay: 0,
    sickLeaves: 0,
    addOn: "Bonus 100",
    actualSalary: "55,000",
    payable: "53,000",
    status: "Paid",
    photo: "https://i.pravatar.cc/40?img=12",
  },
]);
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

    <!-- SCROLLABLE WRAPPER -->
    <div class="overflow-x-auto">
      <table class="min-w-[1200px] w-full whitespace-nowrap text-sm">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="text-left px-4 py-2 w-[20%] min-w-[280px]">Full Name & ID</th>
            <th class="text-left px-4 py-2 w-[10%] min-w-[160px]">Department</th>
            <th class="text-left px-4 py-2 w-[10%] min-w-[120px]">Type</th>
            <th class="text-center px-4 py-2 w-[6%] min-w-[100px]">Present</th>
            <th class="text-center px-4 py-2 w-[6%] min-w-[100px]">Paid Leaves</th>
            <th class="text-center px-4 py-2 w-[6%] min-w-[100px]">Leaves</th>
            <th class="text-center px-4 py-2 w-[6%] min-w-[100px]">Half Day</th>
            <th class="text-center px-4 py-2 w-[6%] min-w-[100px]">Sick Leaves</th>
            <th class="text-left px-4 py-2 w-[10%] min-w-[160px]">Add On</th>
            <th class="text-left px-4 py-2 w-[8%] min-w-[140px]">Actual Salary</th>
            <th class="text-left px-4 py-2 w-[8%] min-w-[140px]">Payable</th>
            <th class="text-left px-4 py-2 w-[8%] min-w-[140px]">Status</th>
            <th class="text-right px-4 py-2 w-[10%] min-w-[160px]">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="emp in employees" :key="emp.id" class="border-b">
            <td class="px-4 py-3 w-[20%] min-w-[280px]">
              <div class="flex items-center gap-3">
                <img :src="emp.photo" alt="avatar" class="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p class="font-medium">{{ emp.name }}</p>
                  <p class="text-xs text-gray-400">{{ emp.id }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-3">{{ emp.department }}</td>
            <td class="px-4 py-3">
              <span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                {{ emp.type }}
              </span>
            </td>
            <td class="text-center px-4 py-3"> {{ emp.present }} </td>
            <td class="text-center px-4 py-3">0{{ emp.paidLeaves }}</td>
            <td class="text-center px-4 py-3">0{{ emp.leaves }}</td>
            <td class="text-center px-4 py-3">0{{ emp.halfDay }}</td>
            <td class="text-center px-4 py-3">0{{ emp.sickLeaves }}</td>
            <td class="px-4 py-3">
              <span
                v-if="emp.addOn !== '------'"
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
        </tbody>
      </table>
    </div>
  </main>
</template>

