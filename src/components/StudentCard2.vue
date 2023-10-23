<script setup lang="ts">
import apiClient from '@/services/AxiosClient';
import type { StudentItem, TeacherItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  },
  oneTeacher: {
    type: Object as PropType<TeacherItem>,
    default: () => ({})
  }
})

const truncate = (text: string) => {
  if (text.length > 10) {
    return text.substring(0, 10) + '...'
  }
  return text
}

const showDetails = () => {
  console.log('Student:', props.student?.id)
  console.log('Teacher:', props.oneTeacher.id)

  apiClient.put(`http://localhost:8080/api/v1/relation?teacherId=${props.oneTeacher.id}&studentId=${props.student?.id}`)

}
</script>

<template>
  <div v-if="!student?.teacher"> <!-- Only Add This Line-->

    <RouterLink :to="{ name: 'student-detail', params: { id: student?.id } }">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
        <span class="absolute text-sm text-white bg-[#ff4747] rounded-br-lg rounded-tl-lg px-6 py-1.5">{{
          student?.id
        }}</span>
        <div class="flex flex-col items-center p-10">
          <img class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg" :src="student?.image" alt="Bonnie image" />
          <div v-if="student">
            <h5 class="mb-1 text-lg font-medium text-gray-900">
              {{ truncate(student?.firstname) }} {{ truncate(student?.lastname) }}
            </h5>
          </div>
          <span class="text-sm text-gray-500">
            <!-- <ul>
            <li v-for="course in student?.courseList">- {{ course }}</li>
          </ul> -->
          </span>
          <div class="flex mt-4 space-x-3 md:mt-6">
            <a href="#"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#ff4747] rounded-lg hover:bg-[#ff4747] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg"
              @click.prevent="showDetails">Add
              Advisee</a>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
