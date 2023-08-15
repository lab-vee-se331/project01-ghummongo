<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type'
import { ref, type PropType } from 'vue'
// import StudentService from '@/services/EventService';

defineProps({
  oneTeacher: {
    type: Object as PropType<TeacherItem>,
    require: true
  }
})
</script>

<template>
  <div>
    <div v-if="oneTeacher">
      <!-- <span> {{ oneTeacher?.name }} {{ oneTeacher?.surname }}</span> -->
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 relative my-6">
        <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5"
          >Teacher</span
        >
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
              <div class="lg:col-span-2 sm:col-span-6">
                <img
                  :src="oneTeacher?.profileImage"
                  alt=""
                  class="rounded-full w-80 h-80 object-cover"
                />
              </div>
              <div class="lg:col-span-4 sm:col-span-6 text-xl text-gray-600">
                <div class="mb-4">
                  <span class="font-bold">Name:</span> {{ oneTeacher?.name }}
                  {{ oneTeacher?.surname }}
                </div>
                <div class="mb-4">
                  <span class="font-bold">Teacher Id:</span> {{ oneTeacher?.teacherId }}
                </div>
                <ul class="flex flex-row mb-4 items-center">
                  <span class="font-bold">Student Lists:</span
                  >&nbsp;
                  <!-- <li v-for="(course, index) in oneStudent?.courseList" :key="index">
                    <div
                      class="bg-transparent border border-black rounded-lg text-sm p-2 mr-2 cursor-pointer"
                    >
                      {{ course }}
                    </div>
                  </li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
