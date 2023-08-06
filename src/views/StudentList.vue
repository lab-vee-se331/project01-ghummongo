<script setup lang="ts">
import { type StudentItem } from '@/type';
import { ref, type Ref } from 'vue'
import StudentService from '../services/StudentService'
import StudentCard from '@/components/StudentCard.vue';

const students: Ref<Array<StudentItem>> = ref([])

StudentService.getStudents(6, 1).then((response) => {
    students.value = response.data
    console.log(students.value)

})
</script>

<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>

    <StudentCard v-for="student in students" :key="student.studentId" :student="student"></StudentCard>
</template>
  
<style></style>
  
