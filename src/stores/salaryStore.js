import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usesalaryStore = defineStore("salary", () => {
  const endpoint = "salarydetails";
  const salaryData = ref([]);
  const loading = ref(false);
  const page = ref(1);
  const limit = ref(10);
  const totalPages = ref("");

  const getUserSalary = async (filters = {}) => {
    try {
      loading.value = true;

      const queryParams = {
        page: page.value,
        limit: limit.value,
        ...filters, // Spread searchName, department, status
      };

      const response = await makeRequest(
        "admin",
        "GET",
        {},
        {},
        queryParams,
        0,
        null,
        "/salarydetails"
      );
      salaryData.value = response?.userData;
      totalPages.value = response?.totalPages;
    } catch (error) {
      console.error("Error in salary", error);
    } finally {
      loading.value = false;
    }
  };

  const updateEmployeeSalary = async (employeeData) => {
    try {
      loading.value = true;
      const response = await makeRequest(
        endpoint,
        "POST",
        employeeData,
        {},
        {},
        0,
        null,
        "/salarydetails"
      );

      // Update the local data if the request is successful
      if (response && response.success) {
        const empIndex = salaryData.value.findIndex(
          (emp) => emp.id === employeeData.userId
        );
        if (empIndex !== -1) {
          salaryData.value[empIndex] = {
            ...salaryData.value[empIndex],
            actualSalary: employeeData.actualSalary,
            addOn: employeeData.addOn,
          };
        }
      }

      return response;
    } catch (error) {
      console.error("Error updating salary:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  };

  getUserSalary();

  return {
    salaryData,
    getUserSalary,
    updateEmployeeSalary,
    loading,
    page,
    limit,
    totalPages,
  };
});