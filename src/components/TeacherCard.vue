<script setup lang="ts">
import type { TeacherItem } from '@/type'
import type { PropType } from 'vue'
const props = defineProps({
  teacher: {
    type: Object as PropType<TeacherItem>,
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
  <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.teacherId } }">
    <div class="teacher-class">
      <div class="teacher-card">
        <span>{{ teacher?.teacherId }} : </span>
        <span> {{ teacher?.name }} {{ teacher?.surname }}</span>


        <ul>
          <li v-for="course in teacher?.courseList">- {{ course }}</li>
        </ul>

        <img :src="teacher?.profileImage" alt="" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.teacher-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.teacher-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgb(0, 0, 0, 0.2);
}

.teacher-link {
  color: #2c3e50;
  text-decoration: none;
}

.teacher-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
