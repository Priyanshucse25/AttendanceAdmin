<script setup>
import { ref, computed, watch } from "vue";
import { usesalaryStore } from "@/stores/salaryStore";
import { storeToRefs } from "pinia";
import LottieAnimation from "@/components/LottieAnimation.vue";

// store
const salaryStore = usesalaryStore();
const { salaryData, loading, page, limit, totalPages } = storeToRefs(salaryStore);

const searchName = ref("");
const selectedDepartment = ref("");
const selectedStatus = ref("");

// Modal states
const showEditModal = ref(false);
const selectedEmployee = ref(null);
const addOnTitle = ref("");
const addOnAmount = ref("");
const addOnType = ref("Bonus");
const showAddOnForm = ref(false);



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

// Modal functions
const openEditModal = (employee) => {
  selectedEmployee.value = { ...employee };
  showEditModal.value = true;
  showAddOnForm.value = false;
  addOnTitle.value = "";
  addOnAmount.value = "";
  addOnType.value = "Bonus";
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedEmployee.value = null;
  showAddOnForm.value = false;
  addOnTitle.value = "";
  addOnAmount.value = "";
  addOnType.value = "Bonus";
};

const toggleAddOnForm = () => {
  showAddOnForm.value = !showAddOnForm.value;
  if (!showAddOnForm.value) {
    addOnTitle.value = "";
    addOnAmount.value = "";
    addOnType.value = "Bonus";
  }
};

const addSalaryAddOn = async () => {
  if (!addOnTitle.value.trim() || !addOnAmount.value) {
    alert("Please fill in both title and amount");
    return;
  }

  const amount = Number(addOnAmount.value);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  try {
    // Prepare the data to send to API with complete payload
    const updatedSalary = Number(selectedEmployee.value.actualSalary) + amount;
    const updatedPayable = calculatePayable({...selectedEmployee.value, actualSalary: updatedSalary});
    
    const updateData = {
      username: selectedEmployee.value.name,
      userId: selectedEmployee.value.empId,
      department: selectedEmployee.value.department,
      type: selectedEmployee.value.type,
      present: selectedEmployee.value.present,
      paidLeaves: selectedEmployee.value.paidLeaves,
      leaves: selectedEmployee.value.leaves,
      halfDay: selectedEmployee.value.halfDay,
      addOn: addOnTitle.value,
      
      actualSalary: updatedSalary,
      payable: updatedPayable,
      status: selectedEmployee.value.status,
      AddOnAmount: selectedEmployee.value.addOnAmount ? 
        Number(selectedEmployee.value.addOnAmount) + amount : amount
    };

    // Call the API
    const response = await salaryStore.updateEmployeeSalary(updateData);
    
    if (response && response.success) {
      // Update local selected employee data
      selectedEmployee.value.actualSalary = updatedSalary;
      selectedEmployee.value.addOn = addOnTitle.value;

      // Reset form
      addOnTitle.value = "";
      addOnAmount.value = "";
      showAddOnForm.value = false;
      
      alert(`Successfully added ₹${amount} to ${selectedEmployee.value.name}'s salary`);
    } else {
      alert("Failed to update salary. Please try again.");
    }
  } catch (error) {
    console.error("Error updating salary:", error);
    alert("An error occurred while updating the salary. Please try again.");
  }
};

const generateInvoice = (employee) => {
  // Placeholder for invoice generation
  alert(`Generating invoice for ${employee.name}`);
  // You can implement actual invoice generation logic here
};

const fetchSalaries = () => {
  salaryStore.getUserSalary({
    search: searchName.value,
    department: selectedDepartment.value,
    status: selectedStatus.value,
  });
};

watch(
  [searchName, selectedDepartment, selectedStatus],
  () => {
    page.value = 0;
    fetchSalaries();
  }
);

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
    <template v-if="salaryData && salaryData.length > 0">
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
              v-for="emp in salaryData"
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
                <button 
                  @click="openEditModal(emp)"
                  class="text-gray-500 hover:text-blue-600 mr-2"
                  title="Edit Salary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="generateInvoice(emp)"
                  class="text-gray-500 hover:text-green-600"
                  title="Generate Invoice"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
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

        <p>Page {{ page }} of {{totalPages}}</p>

        <button
          @click="nextPage"
          :disabled="salaryData.length < limit"
          :class="{
            'p-2 rounded-full bg-gray-400 hover:bg-gray-600 disabled:opacity-50 pi pi-angle-right': true,
            'cursor-pointer': salaryData.length >= limit,
            'cursor-not-allowed': salaryData.length < limit
          }"
        ></button>
      </div>
    </template>

    <div v-if="loading" class="w-[350px] mx-auto mt-[100px]">
      <LottieAnimation animationPath="/animation/loading.json" />
    </div>

    <div
      v-if="!loading && !salaryData.length"
      class="w-[350px] mt-[200px] mx-auto"
    >
      <LottieAnimation animationPath="/animation/no-data.json" />
      <p class="text-center font-bold">No Data Found</p>
    </div>

    <!-- Edit Salary Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="closeEditModal"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        @click.stop
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Edit Salary</h3>
          <button
            @click="closeEditModal"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedEmployee">
          <!-- Employee Info -->
          <div class="mb-4 p-3 bg-gray-50 rounded">
            <p class="font-medium">{{ selectedEmployee.name }}</p>
            <p class="text-sm text-gray-600">{{ selectedEmployee.empId }}</p>
          </div>
          

          <!-- Total Salary Display -->
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-gray-600">Total Salary</p>
              <p class="text-lg font-semibold">₹{{ selectedEmployee.actualSalary }}</p>
            </div>
            <button
              @click="toggleAddOnForm"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              :disabled="updateLoading"
            >
              {{ showAddOnForm ? 'Cancel' : 'Add' }}
            </button>
          </div>

          <!-- Add On Form -->
          <div v-if="showAddOnForm" class="space-y-4">
            <div class="flex gap-2">
              <input
                v-model="addOnTitle"
                type="text"
                placeholder="Title (e.g., Performance Bonus)"
                class="flex-1 px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                :disabled="updateLoading"
              />
              <input
                v-model="addOnAmount"
                type="number"
                placeholder="Amount"
                class="w-24 px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                :disabled="updateLoading"
              />
            </div>
            <!-- <select
              v-model="addOnType"
              class="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500"
              :disabled="updateLoading"
            >
              <option value="Bonus">Bonus</option>
              <option value="Overtime">Overtime</option>
              <option value="Commission">Commission</option>
              <option value="Allowance">Allowance</option>
              <option value="Incentive">Incentive</option>
              <option value="Other">Other</option>
            </select> -->
            <button
              @click="addSalaryAddOn"
              :disabled="updateLoading"
              class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="updateLoading" class="mr-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ updateLoading ? 'Updating...' : 'Add This Content' }}
            </button>
          </div>

          <!-- Current Add-ons -->
          <div v-if="selectedEmployee.addOn && selectedEmployee.addOn !== '------'" class="mt-4">
            <p class="text-sm text-gray-600 mb-2">Current Add-on:</p>
            <span class="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
              {{ selectedEmployee.addOn }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>