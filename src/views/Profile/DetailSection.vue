<script setup></script>

<template>
  <section>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <label class="text-sm font-medium block mb-1">GST Number</label>
        <input
          type="text"
          placeholder="E.g 27ABCU9603R1ZV"
          class="w-full input"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1">Company's address</label>
        <input
          type="text"
          placeholder="E.g 3rd Floor, TechHub Tower, Telibandha"
          class="w-full input"
        />
      </div>

      <div>
        <label class="text-sm font-medium block mb-1">PAN Number</label>
        <input type="text" placeholder="E.g 19:20" class="w-full input" />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1">Email address</label>
        <input
          type="email"
          placeholder="E.g info@xtentioncrew.com"
          class="w-full input"
        />
      </div>

      <div>
        <label class="text-sm font-medium block mb-1">Contact number</label>
        <input type="text" placeholder="E.g 19:20" class="w-full input" />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1">LinkedIn</label>
        <input
          type="text"
          placeholder="E.g linkedin.com/company/xtentioncrew"
          class="w-full input"
        />
      </div>

      <div>
        <label class="text-sm font-medium block mb-1">Website URL</label>
        <input
          type="text"
          placeholder="E.g www.xtentioncrew.com"
          class="w-full input"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1">Founded On</label>
        <input
          type="text"
          placeholder="E.g January 12, 2020"
          class="w-full input"
        />
      </div>

      <div>
        <label class="text-sm font-medium block mb-1">Team Size</label>
        <input
          type="text"
          placeholder="E.g 45+ Employees"
          class="w-full input"
        />
      </div>
      <div>
        <label class="text-sm font-medium block mb-1">Industry / Domain</label>
        <input
          type="text"
          placeholder="E.g SaaS – HR & Attendance Solutions"
          class="w-full input"
        />
      </div>
    </div>
  </section>
</template>


<style scoped>
.input {
  @apply px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm outline-none transition;
}
</style>