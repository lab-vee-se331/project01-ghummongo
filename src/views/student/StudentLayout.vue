<script setup lang="ts">
import { type TeacherItem, type StudentItem } from '@/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'

const store = useStudentStore()
const students = storeToRefs(store).students
const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)

const props = defineProps({
  id: String
})

store
  .getStudentById(props.id!)
  .then((result) => {
    if (result) {
      student.value = result
    }
  })
  .catch((error) => {
    console.error(error)
  })

</script>

<template>
  <div>
    <div v-if="student">
      <!-- <div id="nav">
                <RouterLink :to="{ name: 'student-detail', params: { id } }">Details</RouterLink> | 
                <RouterLink :to="{ name: 'student-edit', params: { id } }">Edit</RouterLink>
            </div> -->
      <!-- Pass teacher data to studentDetail -->
      <RouterView :oneStudent="student" :oneTeacher="teacher"></RouterView>
    </div>
  </div>
</template>
