<script setup lang="ts">
import { type StudentItem } from '@/type';
import { computed, onMounted, ref, type Ref } from 'vue'
import StudentService from '../services/StudentService'
import StudentCard from '@/components/StudentCard.vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router'
import type { AxiosResponse } from 'axios';
import { useStudentStore } from '@/stores/student';

const studentStore = useStudentStore();
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


// console.log(props.page, props.limit)
onMounted(() => {
    console.log("Hee")
    students.value = studentStore.getStudents(props.limit, props.page);
    totalStudent.value = studentStore.getStudentsLength();
})

// const studentData = ref(studentStore.students)

// watch(studentData, async (newStudents, oldStudents) => {
//     if (newStudents !== oldStudents) {
//         students.value = await studentStore.getStudents(3, props.page);
//         totalStudent.value = students.value.length;
//     }
// }, { immediate: true });

onBeforeRouteUpdate((to, from, next) => {
    const toPage = Number(to.query.page)
    students.value = studentStore.getStudents(props.limit, toPage);
    totalStudent.value = studentStore.getStudentsLength();

    next();
})

const hasNextPage = computed(() => {
    const totalPages = Math.ceil(totalStudent.value / props.limit)
    console.log(totalStudent.value, totalPages)
    return props.page.valueOf() < totalPages
})

console.log(hasNextPage.value)
</script>

<template>
    <StudentCard v-for="student in students" :key="student.studentId" :student="student"></StudentCard>
    <div class="pagination">
        <RouterLink :to="{ name: 'student-list', query: { page: page - 1, limit: limit } }" rel="prev" v-if="page != 1"
            id="page-prev"> Prev
            Page
        </RouterLink>
        <RouterLink :to="{ name: 'student-list', query: { page: page + 1, limit: limit } }" rel="next" v-if="hasNextPage"
            id="page-next">
            Next Page
        </RouterLink>
    </div>
</template>
  
<style></style>
  
