<script setup>
import { ref } from 'vue';

const documents = ref([
  { id: 1, title: 'Appointment Letter', thumbnail: '/path/to/sample.png' },
  { id: 2, title: 'Appointment Letter', thumbnail: '/path/to/sample.png' },
  { id: 3, title: 'Appointment Letter', thumbnail: '/path/to/sample.png' },
  { id: 4, title: 'Appointment Letter', thumbnail: '/path/to/sample.png' },
]);

const addNewDocument = () => {
  // Logic to open upload modal or trigger file input
  alert('Add new document logic goes here.');
};
</script>

<template>
  <section class="w-full mt-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="font-semibold text-gray-800 text-lg">Documents</h2>
      <button
        @click="addNewDocument"
        class="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 text-sm rounded"
      >
        Add New
        <span class="text-lg">+</span>
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="border border-dashed rounded shadow-sm bg-white"
      >
        <div class="flex items-center gap-2 px-3 py-2 border-b text-sm font-medium text-gray-700">
          <Folder class="w-4 h-4 text-gray-500" />
          {{ doc.title }}
        </div>
        <div class="relative">
          <img
            :src="doc.thumbnail"
            alt="Document Thumbnail"
            class="w-full h-32 object-cover opacity-80"
          />
          <button
            class="absolute inset-0 flex items-center justify-center text-purple-600 hover:text-purple-800"
            @click.prevent="alert(`Download ${doc.title}`)"
          >
            <Download class="w-6 h-6 bg-white p-1 rounded-full shadow" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
