<script setup>
import { ref, computed } from "vue";
import { useLeaveStore } from "@/stores/leaveStore";
import { storeToRefs } from "pinia";

const leaveStore = useLeaveStore();

const { leaveData } = storeToRefs(leaveStore);

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
}

const updateLeave = async (id, statusType) => {
  try {
    await leaveStore.acceptRejectLeave(id, statusType);
  } catch (error) {
    console.error("Error in view", error);
  }
};

const currentPage = ref(1);
const itemsPerPage = 7;

const paginatedLeaves = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return leaveData.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(leaveData.value.length / itemsPerPage)
);
</script>

<template>
  <main class="bg-white w-full rounded-md p-4 overflow-y-auto">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-[20px]">Leave List</h2>
      <button>Download</button>
    </div>

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

    <div class="mt-4 w-full overflow-auto">
      <table class="min-w-[1200px] w-full table-auto text-left border-collapse">
        <thead class="bg-gray-100 text-gray-500 text-sm whitespace-nowrap">
          <tr>
            <th class="py-3 px-4">Sr. No</th>
            <th class="py-3 px-4">Employee Name & ID</th>
            <th class="py-3 px-4">Leave left</th>
            <th class="py-3 px-4">Department</th>
            <th class="py-3 px-4">Leave type</th>
            <th class="py-3 px-4">Reason</th>
            <th class="py-3 px-4">From</th>
            <th class="py-3 px-4">To</th>
            <th class="py-3 px-4">Total days</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm text-gray-700 whitespace-nowrap">
          <tr
            v-for="(employee, index) in paginatedLeaves"
            :key="employee._id"
            class="border-b border-gray-200"
          >
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4 flex items-center gap-3">
              <img
                :src="employee.photo"
                class="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <div>
                <p class="font-medium">{{ employee.name }}</p>
                <p class="text-xs text-gray-400">{{ employee.userId }}</p>
              </div>
            </td>
            <td class="py-3 px-4">50</td>
            <td class="py-3 px-4">not done</td>
            <td class="py-3 px-4">{{ employee.leaveType }}</td>
            <td class="py-3 px-4">{{ employee.reason }}</td>
            <td class="py-3 px-4">{{ formatDate(employee.from) }}</td>
            <td class="py-3 px-4">{{ formatDate(employee.to) }}</td>
            <td class="py-3 px-4">20</td>
            <td class="py-3 px-4">
              <span
                :class="[
                  'text-xs px-2 py-1 rounded capitalize',
                  employee.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : employee.status === 'rejected'
                    ? 'bg-red-100 text-red-600'
                    : employee.status === 'approved'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600', // fallback for unknown status
                ]"
              >
                {{ employee.status }}
              </span>
            </td>
            <td class="py-3 px-4 flex items-center gap-2">
              <button
                @click="updateLeave(employee._id, 'approved')"
                class="border border-blue-500 text-blue-500 hover:bg-blue-50 px-3 py-1 rounded text-xs"
              >
                Accept
              </button>
              <button
                @click="updateLeave(employee._id, 'rejected')"
                class="pi pi-times text-red-500"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-4 text-sm px-2">
      <p>
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, leaveData.length) }} of
        {{ leaveData.length }} requests
      </p>

      <div class="flex items-center gap-4">
        <!-- Prev -->
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          <i class="pi pi-angle-left"></i>
        </button>

        <!-- Page -->
        <span class="text-sm">Page {{ currentPage }} of {{ totalPages }}</span>

        <!-- Next -->
        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>
