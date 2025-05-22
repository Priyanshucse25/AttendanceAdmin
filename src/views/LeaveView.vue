<script setup>
import { ref } from "vue";
import { useLeaveStore } from "@/stores/leaveStore";
import { storeToRefs } from "pinia";

const leaveStore = useLeaveStore()

const {leaveData} = storeToRefs(leaveStore)

const employees = ref([
  {
    id: "EMP001",
    name: "Roshni Chandra",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    leaveLeft: "1 Left",
    department: "Development",
    leaveType: "Sick leave",
    from: "12-12-2024",
    to: "14-12-2024",
    totalDays: "4 Days",
    type: "Paid",
  },
  {
    id: "EMP002",
    name: "Arjun Mehta",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    leaveLeft: "2 Left",
    department: "Design",
    leaveType: "Casual leave",
    from: "10-12-2024",
    to: "12-12-2024",
    totalDays: "3 Days",
    type: "Paid",
  },
  {
    id: "EMP003",
    name: "Meena Kumari",
    photo: "https://randomuser.me/api/portraits/women/46.jpg",
    leaveLeft: "3 Left",
    department: "QA",
    leaveType: "Sick leave",
    from: "13-12-2024",
    to: "15-12-2024",
    totalDays: "3 Days",
    type: "Paid",
  },
  {
    id: "EMP004",
    name: "Devansh Singh",
    photo: "https://randomuser.me/api/portraits/men/48.jpg",
    leaveLeft: "1 Left",
    department: "Development",
    leaveType: "Emergency",
    from: "11-12-2024",
    to: "13-12-2024",
    totalDays: "3 Days",
    type: "Paid",
  },
  {
    id: "EMP005",
    name: "Sneha Patel",
    photo: "https://randomuser.me/api/portraits/women/50.jpg",
    leaveLeft: "0 Left",
    department: "HR",
    leaveType: "Maternity",
    from: "01-12-2024",
    to: "01-03-2025",
    totalDays: "90 Days",
    type: "Paid",
  },
]);
</script>

<template>
  <main class="bg-white w-full rounded-md p-4">
    <div class="flex items-center justify-between">
      <h2>Leave List</h2>
      <button>Download</button>
    </div>
    {{ leaveData }}

    <hr class="my-4" />

    <div class="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search by employee"
        class="bg-black bg-opacity-10 px-4 py-1 rounded outline-none"
      />

      <div
        class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4"
      >
        <p>Employee Id</p>
        <i class="pi pi-angle-down"></i>
      </div>

      <div
        class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4"
      >
        <p>Department</p>
        <i class="pi pi-angle-down"></i>
      </div>

      <div
        class="bg-black bg-opacity-10 px-2 py-1 rounded flex items-center gap-4"
      >
        <p>Status</p>
        <i class="pi pi-angle-down"></i>
      </div>
    </div>

    <div class="mt-8 w-full overflow-x-auto">
      <table class="w-full table-auto text-left border-collapse">
        <thead class="bg-gray-100 text-gray-500 text-sm">
          <tr>
            <th class="py-3 px-4">Employee Name & ID</th>
            <th class="py-3 px-4">Leave left</th>
            <th class="py-3 px-4">Department</th>
            <th class="py-3 px-4">Leave type</th>
            <th class="py-3 px-4">From</th>
            <th class="py-3 px-4">To</th>
            <th class="py-3 px-4">Total days</th>
            <th class="py-3 px-4">Type</th>
            <th class="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm text-gray-700">
          <tr
            v-for="employee in employees"
            :key="employee.id"
            class="border-b border-gray-200"
          >
            <td class="py-3 px-4 flex items-center gap-3">
              <img
                :src="employee.photo"
                class="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <div>
                <p class="font-medium">{{ employee.name }}</p>
                <p class="text-xs text-gray-400">{{ employee.id }}</p>
              </div>
            </td>
            <td class="py-3 px-4">{{ employee.leaveLeft }}</td>
            <td class="py-3 px-4">{{ employee.department }}</td>
            <td class="py-3 px-4">{{ employee.leaveType }}</td>
            <td class="py-3 px-4">{{ employee.from }}</td>
            <td class="py-3 px-4">{{ employee.to }}</td>
            <td class="py-3 px-4">{{ employee.totalDays }}</td>
            <td class="py-3 px-4">
              <span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                {{ employee.type }}
              </span>
            </td>
            <td class="py-3 px-4 flex items-center gap-2">
              <button
                class="border border-blue-500 text-blue-500 hover:bg-blue-50 px-3 py-1 rounded text-sm"
              >
                Accept
              </button>
              <button class="pi pi-times text-red-500"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
