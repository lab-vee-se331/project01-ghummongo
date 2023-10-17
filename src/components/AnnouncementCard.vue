<script setup lang="ts">
const truncate = (text: string) => {
  if (text.length > 150) {
    return text.substring(0, 150) + '...'
  }
  return text
}
</script>

<template>
  <!-- <RouterLink :to="{ name: 'student-detail', params: { id: student?.studentId } }"> -->
  <div class="w-[80%] md:w-[60%] bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
    <div class="flex flex-col p-8">
      <div class="flex flex-row text-sm text-gray-500">
        <img src="https://i.imgur.com/tbXDnsJ.jpg" alt="" class="h-12 rounded-full mb-4 mr-4" />
        <div class="">
          <div class="">Web</div>
          <div class="">— 10/15/2023 1:10 AM</div>
        </div>
      </div>
      <div>
        <h5 class="mb-1 text-xl font-medium text-gray-900">Some Title</h5>
        <p class="text-gray-600">
          {{
            truncate(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae eaque voluptate eius perferendis pariatur unde placeat totam incidunt quaerat! eaque voluptate eius'
            )
          }}
        </p>
      </div>

      <div class="flex flex-row flex-wrap items-start gap-2 mt-2">
        <img
          src="https://i.imgur.com/tbXDnsJ.jpg"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg"
        />
        <img
          src="https://i.imgur.com/tbXDnsJ.jpg"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg"
        />
        <img
          src="https://i.imgur.com/tbXDnsJ.jpg"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg"
        />
      </div>

      <div class="flex mt-4 space-x-3">
        <a
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42b883] rounded-lg hover:bg-[#27a26f] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg"
          >Read more</a
        >
      </div>
    </div>
  </div>
  <!-- </RouterLink> -->
</template>
