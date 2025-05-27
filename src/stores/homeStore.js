import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore("home", () => {
  const endpoint = "admin";
  const HomeData = ref([]);
  const page = ref(1)
  const limit = ref(10)
  const loading = ref(false)

  const getUserHome = async () => {
    try {
      loading.value = true;
      const response = await makeRequest(
        endpoint,
        "GET",
        {},
        {},
        {page : page.value, limit: limit.value},
        0,
        null,
        "/userdata"
      );
      HomeData.value = response?.user;
    } catch (error) {
      console.error("Error in Home", error);
    }finally{
      loading.value = false;
    }
  };

  // PUT method to update attendance
 const updateAttendenceStatus = async(id, status) =>{
        try {
           const response = await makeRequest(endpoint, "PUT", {status: status}, {}, {}, 0, id, "/userdata")
            return response
        } catch (error) {
            console.error("Error in Home" ,error)
        }
    }

  getUserHome();

  return {
    HomeData,
    getUserHome,
    updateAttendenceStatus, 
    page,
    limit,
    loading
  };
});
