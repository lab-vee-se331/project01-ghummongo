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

<template>
  <RouterLink :to="{ name: 'teacher-detail', params: { id: teacher?.teacherId } }">
    <!-- <div class="teacher-class">
      <div class="teacher-card">
        <span>{{ teacher?.teacherId }} : </span>
        <span> {{ teacher?.name }} {{ teacher?.surname }}</span>

        <ul>
          <li v-for="course in teacher?.courseList">- {{ course }}</li>
        </ul>

        <img :src="teacher?.profileImage" alt="" />
      </div>
    </div> -->
    <div
      class="w-[270px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <span class="absolute text-sm text-white bg-[#42b883] rounded-br-lg rounded-tl-lg px-6 py-1.5">{{
        teacher?.teacherId
      }}</span>
      <div class="flex flex-col items-center p-10">
        <img
          class="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
          :src="teacher?.profileImage"
          alt="Bonnie image"
        />
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {{ teacher?.name }} {{ teacher?.surname }}
        </h5>
        <div class="flex mt-4 space-x-3 md:mt-6">
          <a
            href="#"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42b883] rounded-lg hover:bg-[#27a26f] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg"
            >Details</a
          >
        </div>
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
