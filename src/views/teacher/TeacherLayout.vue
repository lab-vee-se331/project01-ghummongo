<script setup lang="ts">
import type { Ref } from 'vue'
import type { StudentItem, TeacherItem } from '@/type'
import { ref, type PropType } from 'vue'

import { useRouter } from 'vue-router'
import { useTeacherStore } from '@/stores/teacher'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'

const router = useRouter()
const store = useTeacherStore()

const students = storeToRefs(store).teachers
const teacher = ref<TeacherItem | null>(null);
const student = ref<StudentItem | null>(null);

const props = defineProps({
  id: String
})
store.getTeacherById(props.id!)
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



useStudentStore().getStudentsByTeacherId(props.id!).then((result) => {
  if (result) {
    student.value = result
  } else {
    console.warn(props.id)
  }
})




</script>

<template>
  <div>
    <div v-if="teacher">

      <RouterView :oneTeacher="teacher" :oneStudent="student"></RouterView>

    </div>
  </div>
</template>
