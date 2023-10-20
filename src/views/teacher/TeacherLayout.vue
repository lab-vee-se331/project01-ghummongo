<script setup lang="ts">
import type { TeacherItem } from '@/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTeacherStore } from '@/stores/teacher'

const store = useTeacherStore()
const router = useRouter()
const teacher = ref<TeacherItem | null>(null)

const props = defineProps({
  id: String
})
// eslint-disable-next-line vue/no-setup-props-destructure
store
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
</script>

<template>
  <div>
    <div v-if="teacher">
      <div>
        <button @click="router.go(-1)" class="group py-2 px-3 hover:bg-gray-900 rounded-lg"><font-awesome-icon icon="arrow-left" class="mr-2 group-hover:text-white" /><span class="group-hover:text-white">Back</span></button>
      </div>
      <RouterView :oneTeacher="teacher"></RouterView>
    </div>
  </div>
</template>
