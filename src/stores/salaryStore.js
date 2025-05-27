import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const usesalaryStore = defineStore("salary", () => {
    const endpoint = "salarydetails"
    const salaryData = ref([])
    const loading = ref(false)
    const page_id = ref(1)
    const page_size = ref(10)

    const getUserSalary = async() => {
        try {
            loading.value = true;
            const response = await makeRequest(endpoint, "GET", {}, {}, {page_id : page_id.value, page_size: page_size.value}, 0, null)
            salaryData.value = response?.userData
        } catch (error) {
            console.error("Error in salary" ,error)
        } finally{
            loading.value = false;
        }
    }


    getUserSalary()

    return{
        salaryData,
        getUserSalary,
        loading,
        page_id,
        page_size
    }
})