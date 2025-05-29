<script setup>
import { ref, reactive } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import DetailSection from "./DetailSection.vue";
import PunchSection from "./PunchSection.vue";
import LeaveSection from "./LeaveSection.vue";
import DocumentSection from "./DocumentSection.vue";
import WeekendSection from "./WeekendSection.vue";
import HolidaySection from "./HolidaySection.vue";
import { storeToRefs } from "pinia";

const profileStore = useProfileStore();
const { companyDetails } = storeToRefs(profileStore);

const activeTab = ref("about");
const editMode = ref(false);
const selectedImage = ref(null);

// Tab config
const tabs = [
  { label: "About company", value: "about" },
  { label: "Documents", value: "documents" },
  { label: "Holidays", value: "holidays" },
  { label: "Weekends", value: "weekends" },
  { label: "Punch In/Out", value: "punch" },
  { label: "Leaves", value: "leaves" },
];

// Editable form state
const form = reactive({
  name: companyDetails.value.name,
  organisation: companyDetails.value.organisation,
  industry: companyDetails.value.industry,
  teamSize: companyDetails.value.teamSize,
  years: companyDetails.value.years,
});

const toggleEdit = () => {
  editMode.value = !editMode.value;

  // Reset form values if cancelling edit
  if (editMode.value === false) {
    Object.assign(form, companyDetails.value);
  }
};

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImage.value = URL.createObjectURL(file); // for preview
    selectedImage.value = file; // for sending in binary
  }
};


const submitCompanyDetails = async () => {
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("organisation", form.organisation);
  formData.append("industry", form.industry);
  formData.append("teamSize", form.teamSize);
  formData.append("years", form.years);

  if (selectedImage.value) {
    formData.append("image", selectedImage.value); // match backend field name
  }

  try {
    await profileStore.editCompanyDetails(formData); // must accept FormData
    companyDetails.value = { ...form }; // update local state
    editMode.value = false;
  } catch (err) {
    console.error("Error submitting company details", err);
  }
};
</script>

<template>
  <main class="bg-white w-full rounded-md p-4">
    <!-- Header -->
    <div>
      <form
        @submit.prevent="submitCompanyDetails"
        class="flex items-center gap-4"
      >
        <!-- Profile Image and Edit Icon -->
        <div
          class="relative w-[80px] h-[80px] rounded-full overflow-hidden group"
        >
          <img
            :src="selectedImage || '/images/dummy_profile_img.jpg'"
            alt="Profile"
            class="w-full h-full object-cover"
          />
          <label
            class="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1 cursor-pointer shadow-sm group-hover:opacity-100 opacity-0 transition h-fit"
            title="Change Image"
          >
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onImageChange"
            />
            <i class="pi pi-pencil text-xs text-gray-600"></i>
          </label>
        </div>

        <!-- Company Info -->
        <div class="flex-1 relative space-y-1">
          <!-- Toggle Edit Button -->
          <button
            type="button"
            class="absolute top-0 right-0 p-1 text-sm text-gray-500 hover:text-gray-800"
            @click="toggleEdit"
            title="Edit Details"
          >
            <i class="pi pi-pencil text-sm"></i>
          </button>

          <!-- Name -->
          <h2 class="font-semibold capitalize text-[20px]">
            <template v-if="editMode">
              <input
                v-model="form.name"
                placeholder="Company Name"
                class="border rounded px-2 py-0.5 w-[30%] text-[16px]"
              />
            </template>
            <template v-else>{{ companyDetails.name }}</template>
          </h2>

          <!-- Organisation & Industry -->
          <div class="flex gap-4 text-[14px] w-[50%]">
            <template v-if="editMode">
              <input
                placeholder="Organisation"
                v-model="form.organisation"
                class="border rounded px-2 py-0.5 w-full text-[13px]"
              />
              <input
                placeholder="Industry"
                v-model="form.industry"
                class="border rounded px-2 py-0.5 w-full text-[13px]"
              />
            </template>
            <template v-else>
              <p>{{ companyDetails.organisation }}</p>
              <p>{{ companyDetails.industry }}</p>
            </template>
          </div>

          <!-- Team Size & Years -->
          <div class="flex gap-4 text-[14px]">
            <template v-if="editMode">
              <input
                type="number"
                placeholder="Team Size"
                v-model="form.teamSize"
                class="border rounded px-2 py-0.5 w-[120px] text-[13px]"
              />
              <input
                type="text"
                placeholder="Years"
                v-model="form.years"
                class="border rounded px-2 py-0.5 w-[120px] text-[13px]"
              />
            </template>
            <template v-else>
              <p>{{ companyDetails.teamSize }} Employees Involved</p>
              <p>It’s been {{ companyDetails.years }}</p>
            </template>
          </div>

          <!-- Submit Button -->
          <div v-if="editMode" class="mt-2">
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-1 text-sm rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>

      <hr class="my-4" />
    </div>

    <!-- Tabs Loop -->
    <div
      class="flex gap-4 bg-custom-gray font-medium rounded-xl p-1 text-[14px]"
    >
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'px-8 py-2 rounded-xl',
          activeTab === tab.value
            ? 'bg-purple-500 text-white'
            : 'bg-transparent',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Conditional Section -->
    <div class="mt-6 grow overflow-y-auto max-h-[65%]">
      <DetailSection v-if="activeTab === 'about'" />
      <PunchSection v-if="activeTab === 'punch'" />
      <LeaveSection v-if="activeTab === 'leaves'" />
      <DocumentSection v-if="activeTab === 'documents'" />
      <WeekendSection v-if="activeTab === 'weekends'" />
      <HolidaySection v-if="activeTab === 'holidays'"/>
      <!-- Other tab sections can go here -->
    </div>
  </main>
</template>
