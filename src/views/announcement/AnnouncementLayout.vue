<script setup lang="ts">
import { type AnnouncementItem } from '@/type'
import { ref } from 'vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useRouter } from 'vue-router'

const store = useAnnouncementStore()
const announcement = ref<AnnouncementItem | null>(null)

const router = useRouter()

const props = defineProps({
  id: String
})

store
  .getAnnouncementById(props.id!)
  .then((result) => {
    if (result) {
      announcement.value = result
    }
  })
  .catch((error) => {
    console.error(error)
  })
</script>

<template>
  <div>
    <div v-if="announcement">
      <div>
        <button @click="router.go(-1)" class="group py-2 px-3 hover:bg-gray-900 rounded-lg"><font-awesome-icon icon="arrow-left" class="mr-2 group-hover:text-white" /><span class="group-hover:text-white">Back</span></button>
      </div>
      <RouterView :oneAnnouncement="announcement"></RouterView>
    </div>
  </div>
</template>