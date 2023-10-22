<script setup lang="ts">
import type { StudentItem, TeacherItem } from '@/type'
import { onMounted, ref } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'

const storeStudent = useStudentStore()
const storeTeacher = useTeacherStore()
const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)
const isStudent = () => {
  return localStorage.getItem('user_role') === '["ROLE_STUDENT"]'
}

const props = defineProps({
  id: String
})

const fetchStudentData = () => {
  if (isStudent()) {
    storeStudent
      .getStudentById(props.id!)
      .then((result) => {
        if (result) {
          student.value = result
        } else {
          console.warn(props.id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  } else if (!isStudent()) {
    storeTeacher
      .getTeacherById(props.id!)
      .then((result) => {
        if (result) {
          teacher.value = result
        } else {
          console.warn(props.id)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

onMounted(fetchStudentData)
</script>

<template>
  <div>
    <button
      class="group py-2 px-3 rounded-lg bg-white -right-6 hover:bg-gray-900 text-sm mb-4"
      @click="fetchStudentData()"
    >
      <font-awesome-icon icon="repeat" class="text-gray-900 mr-2 group-hover:text-white" /><span
        class="text-gray-900 font-medium group-hover:text-white"
        >Reload Profile</span
      >
    </button>
    <div v-if="student">
      <RouterView :oneStudent="student"></RouterView>
    </div>
    <div v-if="teacher">
      <RouterView :oneTeacher="teacher"></RouterView>
    </div>
  </div>
</template>
