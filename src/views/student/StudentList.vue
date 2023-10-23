<script setup lang="ts">
import { type StudentItem } from '@/type'
import { computed, onMounted, ref } from 'vue'
import StudentCard from '@/components/StudentCard.vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import BaseInput from '@/components/BaseInput.vue'
import StudentService from '@/services/StudentService'
import type { AxiosResponse } from 'axios'

const studentStore = useStudentStore()
const students = ref<StudentItem[]>([])
const totalStudent = ref<number>(0)
const keyword = ref('')

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  }
})

const fetchStudents = async () => {
  students.value = await studentStore.getStudents(props.limit, props.page)
}

onMounted(async () => {
  fetchStudents()
  totalStudent.value = studentStore.getStudentsLength()
})

onBeforeRouteUpdate(async (to, from, next) => {
  const toPage = to.query.page ? Number(to.query.page) : 1 // set default page to 1 if to.query.page is undefined
  students.value = await studentStore.getStudents(props.limit, toPage)
  totalStudent.value = studentStore.getStudentsLength()
  next()
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalStudent.value / props.limit)
  return props.page.valueOf() < totalPages
})

const totalPages = computed(() => {
  return Math.ceil(totalStudent.value / props.limit)
})

function updateKeyword(value: string) {
  console.log(keyword.value)
  let queryFunction
  if (keyword.value == '') {
    fetchStudents()
    queryFunction = studentStore.getStudents(30, 1)
  } else {
    queryFunction = StudentService.getStudentsByKeyword(keyword.value, 30, 1)
  }
  queryFunction
    .then((response: AxiosResponse<StudentItem[]>) => {
      students.value = response.data
      console.log('students', students.value)
      totalStudent.value = studentStore.getStudentsLength()
      console.log('totalStudent', totalStudent.value)
      if (!students.value) {
        fetchStudents()
      }
    })
    .catch((err) => {
    })
}
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4 text-gray-700">Student List</h1>
    <!-- Search -->
    <div class="w-[50%] mb-4">
      <BaseInput v-model="keyword" type="text" label="Search" placeholder="Search for student" @input="updateKeyword">
      </BaseInput>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
    </div>
    <div v-if="totalPages > 0" class="pagination flex items-center -space-x-px h-10 mt-4">
      <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev" v-if="page != 1"
        id="page-prev"
        class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
        Prev
      </RouterLink>
      <span v-if="page === 1"
        class="cursor-not-allowed flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Prev</span>
      <span v-for="pageNumber in totalPages" :key="pageNumber">
        <RouterLink :to="{ name: 'student-list', query: { page: pageNumber, limit: limit } }" v-if="pageNumber != page"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          {{ pageNumber }}
        </RouterLink>
        <span v-else
          class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-[#27a26f] border border-[#7ed7ac] bg-[#d6f5e2] hover:bg-[#b1e9ca] hover:text-[#188359] cursor-pointer">{{
            pageNumber }}</span>
      </span>
      <RouterLink :to="{ name: 'student-list', query: { page: page + 1, limit: limit } }" rel="next" v-if="hasNextPage"
        id="page-next"
        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
        Next
      </RouterLink>
      <span v-if="!hasNextPage"
        class="cursor-not-allowed flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</span>
    </div>
  </main>
</template>
