<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import type { StudentItem } from '@/type'
import { onMounted, ref } from 'vue'

const studentStore = useStudentStore()
const student = ref<StudentItem | null>(null)

const userId = localStorage.getItem('user_id') as string

const fetchStudentData = () => {
  studentStore
    .getStudentById(userId)
    .then((result) => {
      if (result) {
        student.value = result
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(fetchStudentData)
</script>

<template>
  <RouterLink :to="{ name: 'profile-detail', params: { id: userId } }">
    GO TO PROFILE PAGE NAJA
  </RouterLink>
</template>
