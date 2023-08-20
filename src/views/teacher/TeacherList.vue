<script setup lang="ts">
import { type TeacherItem } from '@/type'
import { computed, onMounted, ref, type Ref } from 'vue'
import TeacherCard from '@/components/TeacherCard.vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { useTeacherStore } from '@/stores/teacher'

const teacherStore = useTeacherStore()
const router = useRouter()
const teachers = ref<TeacherItem[]>([])
const totalTeacher = ref<number>(0)

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

onMounted(() => {
  teachers.value = teacherStore.getTeachers(props.limit, props.page)
  totalTeacher.value = teacherStore.getTeachersLength()
})

onBeforeRouteUpdate((to, from, next) => {
  const toPage = to.query.page ? Number(to.query.page) : 1 // set default page to 1 if to.query.page is undefined
  teachers.value = teacherStore.getTeachers(props.limit, toPage)
  totalTeacher.value = teacherStore.getTeachersLength()

  next()
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalTeacher.value / props.limit)
  return props.page.valueOf() < totalPages
})

const totalPages = computed(() => {
  return Math.ceil(totalTeacher.value / props.limit)
})
</script>

<template>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4 text-gray-700">Teacher List</h1>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <TeacherCard
        v-for="teacher in teachers"
        :key="teacher.teacherId"
        :teacher="teacher"
      ></TeacherCard>
    </div>
    <div v-if="totalPages != 0" class="pagination flex items-center -space-x-px h-10 mt-4">
      <RouterLink
        :to="{ name: 'teacher-list', query: { page: page - 1, limit: limit } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
      >
        Prev
      </RouterLink>
      <span
        v-if="page === 1"
        class="cursor-not-allowed flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
        >Prev</span
      >
      <span v-for="pageNumber in totalPages" :key="pageNumber">
        <RouterLink
          :to="{ name: 'teacher-list', query: { page: pageNumber, limit: limit } }"
          v-if="pageNumber != page"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        >
          {{ pageNumber }}
        </RouterLink>
        <span
          v-else
          class="z-10 flex items-center justify-center px-4 h-10 leading-tight text-[#27a26f] border border-[#7ed7ac] bg-[#d6f5e2] hover:bg-[#b1e9ca] hover:text-[#188359] cursor-pointer"
          >{{ pageNumber }}</span
        >
      </span>
      <RouterLink
        :to="{ name: 'teacher-list', query: { page: page + 1, limit: limit } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
      >
        Next
      </RouterLink>
      <span
        v-if="!hasNextPage"
        class="cursor-not-allowed flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
        >Next</span
      >
    </div>
  </main>
</template>
