import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useLeaveStore = defineStore("leave", () => {
    const endpoint = "userleave"
    const leaveData = ref([])

    const getUserLeaves = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/admin")
            leaveData.value = response?.allLeaveData
            console.log(leaveData.value)
        } catch (error) {
            console.error("Error in leave" ,error)
        }
    }


    getUserLeaves()

    return{
        leaveData,
        getUserLeaves
    }
})