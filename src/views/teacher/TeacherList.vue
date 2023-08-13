<script setup lang="ts">
import { type TeacherItem } from '@/type'
import { computed, onMounted, ref, type Ref } from 'vue'
import TeacherService from '../services/TeacherService'
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

// onBeforeRouteUpdate((to, from, next) => {
//     const toPage = to.query.page ? Number(to.query.page) : 1; // set default page to 1 if to.query.page is undefined
//     teachers.value = teacherStore.getTeachers(props.limit, toPage);
//     totalTeacher.value = teacherStore.getTeachersLength();


//     next()
// })

// const hasNextPage = computed(() => {
//     const totalPages = Math.ceil(totalTeacher.value / props.limit)
//     return props.page.valueOf() < totalPages
// })


</script>

<template>
    <main class="flex flex-col items-center justify-center">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            <TeacherCard v-for="teacher in teachers" :key="teacher.teacherId" :teacher="teacher"></TeacherCard>
        </div>
        <div class="pagination">
            <RouterLink :to="{ name: 'teacher-list', query: { page: page - 1, limit: limit } }" rel="prev" v-if="page != 1"
                id="page-prev">
                Prev Page
            </RouterLink>
            <RouterLink :to="{ name: 'teacher-list', query: { page: page + 1, limit: limit } }" rel="next"
                v-if="hasNextPage" id="page-next">
                Next Page
            </RouterLink>
        </div>
    </main>
</template>

<style></style>
