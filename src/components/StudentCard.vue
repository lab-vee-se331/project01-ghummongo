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
    <!-- <div class="student-class">
      <div class="student-card">
        <span>{{ student?.studentId }} : </span>
        <span> {{ student?.name }} {{ student?.surname }}</span>
        <ul>
          <li v-for="course in student?.courseList">- {{ course }}</li>
        </ul>
        <img :src="student?.profileImage" alt="" />
      </div>
    </div> -->
    
    <div
      class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <span class="absolute text-sm text-white bg-[#42b883] rounded-br-lg px-6 py-1.5">{{
        student?.studentId
      }}</span>
      <div class="flex flex-col items-center p-10">
        <img
          class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
          :src="student?.profileImage"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {{ student?.name }} {{ student?.surname }}
        </h5>
        <span class="text-sm text-gray-500 dark:text-gray-400"
          ><ul>
            <li v-for="course in student?.courseList">- {{ course }}</li>
          </ul>
        </span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42b883] rounded-lg hover:bg-[#27a26f] focus:ring-4 focus:outline-none focus:ring-blue-300"
            >Details</a
          >
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >Comment</a
          >
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<!-- <style scoped>
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
</style> -->
