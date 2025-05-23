import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useLeaveStore = defineStore("employee", () => {
    const endpoint = "userleave"
    const EmployeeData = ref([])

    const getEmployees = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/admin")
            leaveData.value = response?.allLeaveData
            console.log(leaveData.value)
        } catch (error) {
            console.error("Error in employee" ,error)
        }
    }


    getEmployees()

    return{
        EmployeeData,
        getEmployees
    }
})