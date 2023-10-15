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


const teacher = ref<TeacherItem | null>(null);
const students = ref<StudentItem[]>([]);

const props = defineProps({
  id: String
})
// eslint-disable-next-line vue/no-setup-props-destructure
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

// eslint-disable-next-line vue/no-setup-props-destructure
useStudentStore().getStudentsByTeacherId(props.id!).then((result) => {
  if (result) {
    students.value = result
  } else {
    console.warn(props.id)
  }
})




</script>

<template>
  <div>
    <div v-if="teacher">

      <RouterView :oneTeacher="teacher" :manyStudent="students"></RouterView>

    </div>
  </div>
</template>
