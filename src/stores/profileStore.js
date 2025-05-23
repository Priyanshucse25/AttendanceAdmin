import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useProfileStore = defineStore("profile", () => {
    const endpoint = "companydetails"
    const companyData = ref([])
    const companyDetails = ref([])

    const getCompanyDetails = async() => {
        try {
           const response = await makeRequest(endpoint, "GET")
            companyDetails.value = response.data
            companyData.value = response.data?.cmpDetail
        } catch (error) {
            console.error(error)
        }
    }


    const addCompanyDetails = async(form) => {
        try {
          const response = await makeRequest(endpoint, "POST", form, {}, {}, 0)
        return response
        } catch (error) {
            console.error(error)
        }
    }


    const editCompanyDetails = async(form) => {
        try {
          const response = await makeRequest(endpoint, "PUT", form, {}, {}, 0)
        return response
        } catch (error) {
            console.error(error)
        }
    }

    getCompanyDetails()

    return{
        companyData,
        companyDetails,
        getCompanyDetails,
        addCompanyDetails,
        editCompanyDetails
    }
})