import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmployeeStore = defineStore("employee", () => {
  const endpoint = "admin";
  const allEmployeeData = ref([]);
  const loading = ref(true);
  const employeeData = ref([]);
  const page_id = ref(1)
  const page_size = ref(10)

  const getallEmployees = async () => {
    loading.value = true;
    try {
      const response = await makeRequest("/user", "GET", {}, {}, {page_id : page_id.value, page_size: page_size.value}, 0, null, "/admin/allusers/all");
      allEmployeeData.value = response?.allUsers;
    } catch (error) {
      console.error("Error in fetching all employes data", error);
    } finally{
      loading.value = false;
    }
  };

  const createNewEmployee = async (data) => {
    try {
      await makeRequest("/user", "POST", data, {}, {page_id : page_id.value, page_size: page_size.value}, 0, null, "/admin/signup");
      return response; 
    } catch (error) {
      console.error("Error in creating new employee", error);
    }
  };

  const updateEmployee = async (id, data) => {
    try {
      console.log("From store" ,data)
      await makeRequest("/user", "PUT", data, {}, {}, 0, id);
      return response; 
    } catch (error) {
      console.error("Error in updating employee", error);
    }
  }

  const deleteEmployee = async (id) => {
    try {
      await makeRequest("/user", "DELETE", {}, {}, {}, 0, id)
    } catch (error) {
      console.error("Error in deleting employee", error);
    }
  }

  getallEmployees();

  return {
    allEmployeeData,
    getallEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    loading,
    page_id,
    page_size
  };
});

