<script setup lang="ts">
import { type TeacherItem, type StudentItem } from '@/type'
import { ref } from 'vue'
import { useStudentStore } from '@/stores/student'
import { useRouter } from 'vue-router'

const store = useStudentStore()
const student = ref<StudentItem | null>(null)
const teacher = ref<TeacherItem | null>(null)
const router = useRouter()

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
      <div>
        <button @click="router.go(-1)" class="group py-2 px-3 hover:bg-gray-900 rounded-lg"><font-awesome-icon icon="arrow-left" class="mr-2 group-hover:text-white" /><span class="group-hover:text-white">Back</span></button>
      </div>
      <RouterView :oneStudent="student" :oneTeacher="teacher"></RouterView>
    </div>
  </div>
</template>
