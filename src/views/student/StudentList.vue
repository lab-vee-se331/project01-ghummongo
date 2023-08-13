<script setup lang="ts">
import { type StudentItem } from '@/type'
import { computed, onMounted, ref, type Ref } from 'vue'
import StudentCard from '@/components/StudentCard.vue'
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { useStudentStore } from '@/stores/student'

const studentStore = useStudentStore()
const router = useRouter()
const students = ref<StudentItem[]>([])
const totalStudent = ref<number>(0)

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
    students.value = studentStore.getStudents(props.limit, props.page)
    totalStudent.value = studentStore.getStudentsLength()
})

onBeforeRouteUpdate((to, from, next) => {
    const toPage = to.query.page ? Number(to.query.page) : 1; // set default page to 1 if to.query.page is undefined
    students.value = studentStore.getStudents(props.limit, toPage);
    totalStudent.value = studentStore.getStudentsLength();


    next()
})

const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalStudent.value / props.limit)
    return props.page.valueOf() < totalPages
})


</script>

<template>
    <main class="flex flex-col items-center justify-center">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <StudentCard v-for="student in students" :key="student.studentId" :student="student"></StudentCard>
        </div>
        <div class="pagination">
            <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev" v-if="page != 1"
                id="page-prev">
                Prev Page
            </RouterLink>
            <RouterLink :to="{ name: 'student-list', query: { page: page + 1, limit: limit } }" rel="next"
                v-if="hasNextPage" id="page-next">
                Next Page
            </RouterLink>
        </div>
    </main>
</template>

<style></style>
