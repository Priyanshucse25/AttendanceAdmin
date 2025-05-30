<script setup>
import { ref, watch } from "vue";
import { useProfileStore } from "@/stores/profileStore";
import { storeToRefs } from "pinia";

const profileStore = useProfileStore();
const { punchInDetails } = storeToRefs(profileStore);

const isEditing = ref(false);
const showBreak = ref(false);
const selectedShift = ref(null);

// Form fields
const shiftFrom = ref("");
const shiftTo = ref("");
const bufferFrom = ref("");
const bufferTo = ref("");
const lunchFrom = ref("");
const lunchTo = ref("");
const breaks = ref([{ from: "", to: "" }]);

// Watch for punchInDetails and set the first one as default
watch(
  punchInDetails,
  (details) => {
    if (Array.isArray(details) && details.length) {
      selectedShift.value = details[0]; // default to first shift
      populateForm(selectedShift.value);
    }
  },
  { immediate: true }
);

function formatTimeFromISO(isoStr) {
  if (!isoStr) return "";
  const date = new Date(isoStr);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function addBreak() {
  breaks.value.push({ from: "", to: "" });
}

function removeBreak(index) {
  breaks.value.splice(index, 1);
}

function populateForm(item) {
  shiftFrom.value = formatTimeFromISO(item.shiftTime?.from);
  shiftTo.value = formatTimeFromISO(item.shiftTime?.to);
  bufferFrom.value = formatTimeFromISO(item.bufferTime?.from);
  bufferTo.value = formatTimeFromISO(item.bufferTime?.to);
  lunchFrom.value = formatTimeFromISO(item.lunchTime?.from);
  lunchTo.value = formatTimeFromISO(item.lunchTime?.to);

  if (item.breaks?.length > 0) {
    breaks.value = item.breaks.map((b) => ({
      from: formatTimeFromISO(b.from),
      to: formatTimeFromISO(b.to),
    }));
    showBreak.value = true;
  } else {
    breaks.value = [{ from: "", to: "" }];
    showBreak.value = false;
  }
}

function timeStringToDate(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now;
}

const submitChanges = async () => {
  const hasId = !!selectedShift.value?._id;

  const data = {
    shiftTime: {
      from: timeStringToDate(shiftFrom.value),
      to: timeStringToDate(shiftTo.value),
    },
    bufferTime: {
      from: timeStringToDate(bufferFrom.value),
      to: timeStringToDate(bufferTo.value),
    },
    lunchTime: {
      from: timeStringToDate(lunchFrom.value),
      to: timeStringToDate(lunchTo.value),
    },
    breaks: breaks.value
      .filter((b) => b.from && b.to)
      .map((b) => ({
        from: timeStringToDate(b.from),
        to: timeStringToDate(b.to),
      })),
  };

  if (hasId) data._id = selectedShift.value._id;

  if (hasId) {
    await profileStore.editPunchInDetails(selectedShift.value._id, data);
  } else {
    await profileStore.addPunchInDetails(data);
  }

  isEditing.value = false;
};
</script>

<template>
  <div class="space-y-6 mt-6 max-w-4xl">
    <!-- Edit Button -->
    <div class="flex justify-end">
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        @click="isEditing = !isEditing"
      >
        {{ isEditing ? "Cancel Edit" : "Edit" }}
      </button>
    </div>

    <!-- Shift Time -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Shift actual time</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          :disabled="!isEditing"
          type="time"
          v-model="shiftFrom"
          class="input-field"
        />
        <input
          :disabled="!isEditing"
          type="time"
          v-model="shiftTo"
          class="input-field"
        />
      </div>
    </div>

    <!-- Buffer Time -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Buffer minutes</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          :disabled="!isEditing"
          type="time"
          v-model="bufferFrom"
          class="input-field"
        />
        <input
          :disabled="!isEditing"
          type="time"
          v-model="bufferTo"
          class="input-field"
        />
      </div>
    </div>

    <!-- Lunch Time -->
    <div>
      <h3 class="font-semibold text-gray-700 mb-2">Lunch time</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          :disabled="!isEditing"
          type="time"
          v-model="lunchFrom"
          class="input-field"
        />
        <input
          :disabled="!isEditing"
          type="time"
          v-model="lunchTo"
          class="input-field"
        />
      </div>
    </div>

    <!-- Break Toggle -->
    <div
      class="border border-purple-300 bg-purple-50 rounded-md p-4 flex items-center justify-between"
    >
      <p class="text-sm font-medium text-gray-700">Want to add break?</p>
      <button
        class="px-4 py-1 text-sm bg-white border border-purple-400 rounded text-purple-600 hover:bg-purple-100"
        @click="showBreak = !showBreak"
      >
        {{ showBreak ? "Hide Break" : "Add Break" }}
      </button>
    </div>

    <!-- Break Inputs -->
    <div v-if="showBreak" class="space-y-4">
      <div
        v-for="(b, index) in breaks"
        :key="index"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
      >
        <input
          type="time"
          v-model="b.from"
          class="input-field"
          placeholder="Break Start"
        />
        <div class="flex gap-2 items-center">
          <input
            type="time"
            v-model="b.to"
            class="input-field"
            placeholder="Break End"
          />
          <button
            v-if="breaks.length > 1"
            @click="removeBreak(index)"
            class="text-sm text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <button
        class="mt-2 text-sm text-purple-600 hover:underline"
        @click="addBreak"
      >
        + Add another break
      </button>
    </div>

    <!-- Submit Button -->
    <div v-if="isEditing" class="flex justify-end gap-4 pt-6">
      <button
        class="px-6 py-2 bg-gray-100 text-gray-700 rounded"
        @click="isEditing = false"
      >
        Cancel
      </button>
      <button
        class="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        @click="submitChanges"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-200 rounded bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400;
}
</style>
