<script setup lang="ts">
import type { TeacherItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>,
    require: true
  }
})

const truncate = (text: string) => {
  if (text.length > 8) {
    return text.substring(0, 8) + '...'
  }
  return text
}
</script>

<template>
  <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.teacherId } }">
    <div
      class="w-[270px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md">
      <span class="absolute text-sm text-white bg-[#42b883] rounded-br-lg rounded-tl-lg px-6 py-1.5">{{ teacher?.teacherId
      }}</span>
      <div class="flex flex-col items-center p-10">
        <img class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg" :src="teacher?.profileImage" alt="Bonnie image" />
        <div v-if="teacher">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {{ truncate(teacher?.name) }} {{ truncate(teacher?.surname) }}
          </h5>
        </div>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <a href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42b883] rounded-lg hover:bg-[#27a26f] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg">Details</a>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
