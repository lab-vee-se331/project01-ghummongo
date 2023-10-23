<script setup lang="ts">
import router from '@/router';
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

onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'profile-detail', params: { id: userId } })
  }, 5000);
})

</script>

<template>
  <RouterLink :to="{ name: 'profile-detail', params: { id: userId } }">
    Redirecting Na... .. .
  </RouterLink>
</template>

<style></style>
