<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem } from '@/type';
import { ref, type PropType } from 'vue';
import StudentService from '@/services/StudentService';
import { useRouter } from 'vue-router';
const router = useRouter()

import { useStudentStore } from '@/stores/student';
import { storeToRefs } from 'pinia';
const store = useStudentStore()
const students = storeToRefs(store).students
const studentId = ref(students?.value?.studentId)



</script>

<template>
    <div>
        <div v-if="students">
            <h1>{{ students.name }}</h1>
            <div id="nav">
                <RouterLink :to="{ name: 'student-detail', params: { studentId } }">Details</RouterLink>
                <RouterLink :to="{ name: 'student-edit', params: { studentId } }">Edit</RouterLink>
            </div>
            <RouterView :student="students"></RouterView>
        </div>
    </div>
</template>


