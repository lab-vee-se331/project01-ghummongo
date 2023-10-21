<script setup lang="ts">
import type { StudentItem } from '@/type'
import { ref } from 'vue'
import { useStudentStore } from '@/stores/student'

const store = useStudentStore()
const student = ref<StudentItem | null>(null)

const props = defineProps({
  id: String
})
// eslint-disable-next-line vue/no-setup-props-destructure
store
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
</script>

<template>
  <div>
    <div v-if="student">
      <RouterView :oneStudent="student"></RouterView>
    </div>
  </div>
</template>
