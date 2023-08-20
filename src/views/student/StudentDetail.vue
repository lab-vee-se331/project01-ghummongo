<script setup lang="ts">
import type { Ref } from 'vue'
import type { TeacherItem } from '@/type';
import type { StudentItem } from '@/type';
import { ref, type PropType, reactive } from 'vue';
import { useStudentStore } from '@/stores/student'

// defineProps({
//   oneStudent: {
//     type: Object as PropType<StudentItem>,
//     require: true
//   },
//   oneTeacher: {
//     type: Object as PropType<TeacherItem>,
//     required: false
//   }
// })

const { oneStudent, oneTeacher } = defineProps<{
  oneStudent: StudentItem;
  oneTeacher?: TeacherItem;
}>();

const student = reactive({
  comment: ''
})

const validateForm = () => {
  if (student.comment) {
    return true;
  } else {
    return false;
  }
}


const onSubmit = () => {
  if (validateForm()) {
    useStudentStore().updateComment(oneStudent.studentId, student.comment)
    student.comment = ""
  }
}



</script>

<template>
  <div>
    <div v-if="oneStudent">
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 relative my-6">
        <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5">Student</span>
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
              <div class="lg:col-span-2 sm:col-span-6">
                <img :src="oneStudent?.profileImage" alt="" class="rounded-full w-80 h-80 object-cover" />
              </div>
              <div class="lg:col-span-4 sm:col-span-6 text-xl text-gray-600">
                <div class="mb-4">
                  <span class="font-bold">Name:</span> {{ oneStudent?.name }}
                  {{ oneStudent?.surname }}
                </div>
                <div class="mb-4">
                  <span class="font-bold">Student Id:</span> {{ oneStudent?.studentId }}
                </div>
                <!-- <ul>
                  Course Lists:
                  {{
                    oneStudent?.courseList
                  }}
                </ul> -->
                <ul class="flex flex-row mb-4 items-center">
                  <span class="font-bold">Course Lists:</span>&nbsp;
                  <li v-for="(course, index) in oneStudent?.courseList" :key="index">
                    <div class="bg-transparent border border-black rounded-lg text-sm p-2 mr-2 cursor-pointer">
                      {{ course }}
                    </div>
                  </li>
                </ul>
                <div class=""><span class="font-bold">Teacher Id: </span>{{ oneStudent?.teacherId }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center my-12">
        <span class="text-xl text-gray-600 mb-8 underline underline-offset-2 decoration-[#42b883]">Comments</span>
        <div class="text-gray-600">
          <div v-if="oneStudent?.comment" class="grid grid-cols-6">
            <div class="col-span-1 mr-4">
              <img :src="oneStudent?.profileImage" alt="" class="rounded-full w-12 h-12 object-cover float-right" />
            </div>
            <div class="col-span-4">
              <div class="text-gray-600"><span class="font-bold">Admin</span> · 1h ago</div>
              <div class="text">
                {{ oneStudent?.comment }}
              </div>
              <hr class="my-6" />
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="4" v-model="student.comment"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..." required>
            </textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#27a26f] rounded-lg focus:ring-4 focus:ring-[#b1e9ca]">
              Post comment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
