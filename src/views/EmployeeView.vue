<template>
  <div class="p-6 bg-[#F1F3F8] min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-bold">Employee list</h1>
      <div class="space-x-2">
        <button class="bg-white border px-6 py-2 rounded shadow text-sm">Download</button>
        <button class="bg-[#6E62FF] text-white px-6 py-2 rounded shadow text-sm">Add New</button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-4 mb-4">
      <input type="text" placeholder="Search Employee" v-model="searchQuery"
        class="p-2 border rounded w-64 bg-white shadow text-sm" />
      <select v-model="filterId" class="p-2 border rounded text-sm">
        <option value="">Employee ID</option>
        <option value="GSYS57SAJOSAJS">GSYS57SAJOSAJS</option>
      </select>
      <select v-model="filterDept" class="p-2 border rounded text-sm">
        <option value="">Department</option>
        <option value="UI/UX Designer">UI/UX Designer</option>
      </select>
      <input type="date" v-model="filterDate" class="p-2 border rounded text-sm" />
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-3"><input type="checkbox" /></th>
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
          <tr v-for="(employee, index) in paginatedEmployees" :key="index" class="border-t">
            <td class="p-3"><input type="checkbox" /></td>
            <td class="p-3 flex items-center gap-2">
              <img :src="employee.image" alt="" class="w-8 h-8 rounded-full" />
              <div>
                <div class="font-medium">{{ employee.name }}</div>
                <div class="text-xs text-gray-500">{{ employee.id }}</div>
              </div>
            </td>
            <td class="p-3">{{ employee.email }}</td>
            <td class="p-3">{{ employee.phone }}</td>
            <td class="p-3"><span class="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">Full time</span></td>
            <td class="p-3">{{ employee.department }}</td>
            <td class="p-3">{{ employee.role }}</td>
            <td class="p-3">{{ employee.joinDate }}</td>
            <td class="p-3">{{ employee.salary }}</td>
            <td class="p-3 flex gap-2">
              <button class="text-blue-500"><i class="fas fa-pen"></i></button>
              <button class="text-red-500"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4 text-sm">
      <p>Showing {{ start + 1 }} to {{ end }} of {{ filteredEmployees.length }} employees</p>
      <div class="flex gap-1">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 border rounded',
            page === currentPage ? 'bg-[#6E62FF] text-white' : 'bg-white'
          ]">
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterId = ref('')
const filterDept = ref('')
const filterDate = ref('')
const currentPage = ref(1)
const itemsPerPage = 5

const employees = ref([
  {
    name: 'Roshni chandra',
    id: 'GSYS57SAJOSAJS',
    email: 'roshni123@gmail.com',
    phone: '98765 67876',
    department: 'UI/UX Designer',
    role: 'UIUX Designer',
    joinDate: '25-12-2024',
    salary: '10,000',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  // Repeat or generate more items...
])

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    return (
      emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (!filterId.value || emp.id === filterId.value) &&
      (!filterDept.value || emp.department === filterDept.value) &&
      (!filterDate.value || emp.joinDate === filterDate.value)
    )
  })
})

const totalPages = computed(() => Math.ceil(filteredEmployees.value.length / itemsPerPage))
const start = computed(() => (currentPage.value - 1) * itemsPerPage)
const end = computed(() => Math.min(start.value + itemsPerPage, filteredEmployees.value.length))

const paginatedEmployees = computed(() =>
  filteredEmployees.value.slice(start.value, end.value)
)
</script>

<style>
/* Add Font Awesome CDN in your index.html or use icons from a package */
</style>
