<script setup>
import { ref, computed } from "vue";
import { useEmployeeStore } from "@/stores/employeeStore";
import EmployeeModal from "./AddNewEmployeeModal.vue";
import DeleteEmployeeModal from "./DeleteEmployeeModal.vue";
import { storeToRefs } from "pinia";

const employeeStore = useEmployeeStore();
const { allEmployeeData } = storeToRefs(employeeStore);

const searchQuery = ref("");
const filterId = ref("");
const filterDept = ref("");
const filterDate = ref("");
const showModal = ref(false);
const showDeleteModal = ref(false);
const selectedEmployee = ref(null);
const currentPage = ref(1);
const itemsPerPage = 7;

const filteredEmployees = computed(() => {
  return allEmployeeData.value.filter((emp) => {
    return (
      emp.email.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (!filterId.value || emp.userId === filterId.value)
    );
  });
});

function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
}

function openEditModal(employee) {
  selectedEmployee.value = { ...employee }; // Clone to avoid direct mutation
  showModal.value = true;
}

function openDeleteModal(employee) {
  selectedEmployee.value = { ...employee }; // Clone to avoid direct mutation
  showDeleteModal.value = true;
}

const totalPages = computed(() =>
  Math.ceil(filteredEmployees.value.length / itemsPerPage)
);
const start = computed(() => (currentPage.value - 1) * itemsPerPage);
const end = computed(() =>
  Math.min(start.value + itemsPerPage, filteredEmployees.value.length)
);

const paginatedEmployees = computed(() =>
  filteredEmployees.value.slice(start.value, end.value)
);
</script>

<template>
  <div class="p-4 bg-white w-full rounded-md">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Employee list</h1>
      <div class="space-x-2">
        <button class="bg-white border px-6 py-2 rounded shadow text-sm">
          Download
        </button>
        <button
          @click="showModal = true"
          class="bg-[#6E62FF] text-white px-6 py-2 rounded shadow text-sm"
        >
          Add New
        </button>
      </div>
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

    <!-- Table -->
    <div class="bg-white shadow rounded overflow-hidden mt-4">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3">Employee Name & ID</th>
            <th class="p-3">Email</th>
            <th class="p-3">Phone Number</th>
            <th class="p-3">Type</th>
            <th class="p-3">Department</th>
            <th class="p-3">Role</th>
            <th class="p-3">Joining date</th>
            <th class="p-3">Salary</th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(employee, index) in paginatedEmployees"
            :key="index"
            class="border-t"
          >
            <td class="p-3 flex items-center gap-2">
              <img :src="employee.image" alt="" class="w-8 h-8 rounded-full" />
              <div>
                <div class="font-medium">{{ employee.userName }}</div>
                <div class="text-xs text-gray-500">{{ employee.userId }}</div>
              </div>
            </td>
            <td class="p-3">{{ employee.email }}</td>
            <td class="p-3">{{ employee.phoneNumber }}</td>
            <td class="p-3">
              <span
                class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs capitalize"
                >{{ employee.emptype }}</span
              >
            </td>
            <td class="p-3">{{ employee.department }}</td>
            <td class="p-3">{{ employee.role }}</td>
            <td class="p-3">{{ formatDate(employee.joiningDate) }}</td>
            <td class="p-3">{{ employee.salary }}</td>
            <td class="p-3 flex gap-3">
              <button
                @click="openEditModal(employee)"
                class="text-blue-500 text-[20px]"
              >
                <i class="pi pi-pen-to-square"></i>
              </button>
              <button
                @click="openDeleteModal(employee)"
                class="text-red-500 text-[20px]"
              >
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <!-- Custom Pagination -->
    <!-- Simplified Pagination -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <p>
        Showing {{ start + 1 }} to
        {{ Math.min(start + itemsPerPage, filteredEmployees.length) }} of
        {{ filteredEmployees.length }} employees
      </p>

      <div class="flex items-center gap-4">
        <!-- Previous Button -->
        <button
          @click="currentPage = Math.max(currentPage - 1, 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          <i class="pi pi-angle-left"></i>
        </button>

        <!-- Current Page Indicator -->
        <span class="text-sm">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <!-- Next Button -->
        <button
          @click="currentPage = Math.min(currentPage + 1, totalPages)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>
  </div>

  <EmployeeModal
    v-if="showModal"
    @close="showModal = false"
    :employee="selectedEmployee"
  />

  <DeleteEmployeeModal
    v-if="showDeleteModal"
    @close="showDeleteModal = false"
    :employee="selectedEmployee"
  />
</template>
