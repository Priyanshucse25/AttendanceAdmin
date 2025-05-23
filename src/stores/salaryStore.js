import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const usesalaryStore = defineStore("salary", () => {
    const endpoint = "salarydetails"
    const salaryData = ref([])

    const getUserSalary = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null)
            salaryData.value = response?.userData
            console.log(salaryData.value)
        } catch (error) {
            console.error("Error in salary" ,error)
        }
    }


    getUserSalary()

    return{
        salaryData,
        getUserSalary
    }
})