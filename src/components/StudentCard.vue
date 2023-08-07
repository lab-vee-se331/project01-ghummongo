<script setup lang="ts">
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})


</script>

<!-- export interface StudentItem {
    name: string;
    surname: string;
    studentId: string;
    profileImage: string;
    courseList: string[];
    teacherId: string;
} -->

<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student?.studentId } }">
    <div class="student-class">
      <div class="student-card">
        <span>{{ student?.studentId }} : </span>
        <span> {{ student?.name }} {{ student?.surname }}</span>


        <ul>
          <li v-for="course in student?.courseList">- {{ course }}</li>
        </ul>

        <img :src="student?.profileImage" alt="" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.student-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgb(0, 0, 0, 0.2);
}

.student-link {
  color: #2c3e50;
  text-decoration: none;
}

.student-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
