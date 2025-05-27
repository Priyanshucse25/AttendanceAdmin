import { defineStore } from "pinia";
import { makeRequest } from "@/request/request";
import { manageResponse } from "@/request/manageResponse";
import { ref } from "vue";

export const useLeaveStore = defineStore("leave", () => {
  const endpoint = "userleave";
  const leaveData = ref([]);
  const loading = ref(false)
  const page = ref(1)
  const limit = ref(10)

  const getUserLeaves = async () => {
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
        "/admin"
      );
      leaveData.value = response?.leaves;
      manageResponse(response, {method : "GET"})
    } catch (error) {
      console.error("Error in leave", error);
    } finally{
      loading.value = false;
    }
  };

  const acceptRejectLeave = async (id, statusType) => {
    try {
     const response = await makeRequest(
        endpoint,
        "PUT",
        { status: statusType },
        {},
        {},
        0,
        id,
        "/admin"
      );
      const index = leaveData.value.findIndex((leave) => leave._id === id);
    if (index !== -1) {
      // ✅ Replace object to ensure reactivity
      leaveData.value[index] = {
        ...leaveData.value[index],
        status: statusType,
      };
    }

    manageResponse(response, {method : "PUT"})

    return response;
    } catch (error) {
      console.error("Error in updating leave", error);
    }
  };

  getUserLeaves();

  return {
    leaveData,
    getUserLeaves,
    acceptRejectLeave,
    loading,
    page,
    limit
  };
});
