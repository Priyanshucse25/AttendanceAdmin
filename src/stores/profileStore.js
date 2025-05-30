import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useProfileStore = defineStore("profile", () => {
    const endpoint = "admin"
    const companyData = ref([])
    const companyDetails = ref([])
    const punchInDetails = ref([])
    const holidayDetails = ref([])
    const weekendDetails = ref([])
    const companyDocuments = ref([])
    const companyLeaves = ref([])

    const getCompanyDetails = async() => {
        try {
           const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/companyDetails")
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
          const response = await makeRequest(endpoint, "PUT", form, {}, {}, 0, null, "/companyDetails")
        return response
        } catch (error) {
            console.error(error)
        }
    }

    const getPunchInDetails = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/punchdetails")
            punchInDetails.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const addPunchInDetails = async(form) => {
        try {
            const response = await makeRequest(endpoint, "POST", {form}, {}, {}, 0, null, "/punchdetails")
            return response
        } catch (error) {
            console.error(error)
        }
    }


    const editPunchInDetails = async(id ,form) => {
        try {
            const response = await makeRequest(endpoint, "PUT", {form}, {}, {}, 0, id, "/punchdetails")
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const getHolidayDetails = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/holiday")
            holidayDetails.value = response?.data
        } catch (error) {
            console.error(error)
        }
    }

    const postHolidayDetails = async(data) => {
        try {
            const response = await makeRequest(endpoint, "POST", data, {}, {}, 0, null, "/holiday")
            holidayDetails.value = response
        } catch (error) {
            console.error(error)
        }
    }

    const editHolidayDetails = async(data, id) => {
        try {
            const response = await makeRequest(endpoint, "PUT", {isActive: data}, {}, {}, 0, id, "/holiday")
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const getWeekendDetails = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/weekend")
            weekendDetails.value = response?.data
        } catch (error) {
            console.error(error)
        }
    }


    const postWeekendDetails = async(form) => {
        try {
            const response = await makeRequest(endpoint, "POST", {form}, {}, {}, 0, null, "/weekend")
            weekendDetails.value = response
        } catch (error) {
            console.error(error)
        }
    }


    const getCompanyDocument = async() => {
        try {
             const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/companydocument")
            companyDocuments.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const postCompanyDocument = async(data) => {
        try {
            const response = await makeRequest(endpoint, "POST", data, {}, {}, 0, null, "/companydocument")
            getCompanyDocument()
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCompanyDocument = async(id) => {
         try {
            const response = await makeRequest(endpoint, "DELETE", {}, {}, {}, 0, id, "/companydocument")
            return response
        } catch (error) {
            console.error(error)
        }
    }


    const getCompanyLeaves = async() => {
        try {
            const response = await makeRequest(endpoint, "GET", {}, {}, {}, 0, null, "/leave")
            companyLeaves.value = response.data
        } catch (error) {
            console.error(error)
        }
    }

    const postCompanyLeaves = async (data) => {
    try {
        const method = data._id ? "PUT" : "POST";
        const url = data._id ? `/leave/${data._id}` : "/leave"; // if ID exists, PUT to specific resource

        const response = await makeRequest(endpoint, method, data, {}, {}, 0, null, url);
        return response;
    } catch (error) {
        console.error(error);
    }
    };



    getCompanyDetails()
    getPunchInDetails()
    getWeekendDetails()
    getHolidayDetails()
    getCompanyDocument()
    getCompanyLeaves()

    return{
        companyData,
        companyDetails,
        getCompanyDetails,
        addCompanyDetails,
        editCompanyDetails,
        editPunchInDetails,
        postHolidayDetails,
        postWeekendDetails,
        postCompanyLeaves,
        editHolidayDetails,
        companyDocuments,
        postCompanyDocument,
        deleteCompanyDocument,
        addPunchInDetails,
        punchInDetails,
        holidayDetails,
        companyLeaves,
        weekendDetails
    }
})