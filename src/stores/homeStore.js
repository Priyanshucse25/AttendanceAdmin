import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useHomeStore = defineStore("home", () => {
    const endpoint = "admin"
    const HomeData = ref([])

    const getUserHome = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/userdata")
            HomeData.value = response?.user
            console.log(HomeData.value)
        } catch (error) {
            console.error("Error in Home" ,error)
        }
    }


    getUserHome()

    return{
        HomeData,
        getUserHome
    }
})