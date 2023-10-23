<script setup lang="ts">
import type { AnnouncementItem } from '@/type'
import { ref, type PropType } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const imgs = ref<String[]>()
const visible = ref(false)
const index = ref(0)

const { announcements } = defineProps<{
  announcements: AnnouncementItem[]
}>()

const showMultiple = (i: number, images: string[]) => {
  imgs.value = images
  index.value = i
  show()
}

const show = () => {
  visible.value = true
  document.documentElement.style.overflow = 'auto'
}

const handleHide = () => {
  visible.value = false
}

const truncate = (text: string) => {
  if (text.length > 150) {
    return text.substring(0, 150) + '...'
  }
  return text
}
</script>

<template>
  <!-- <main > -->
  <!-- <RouterLink :to="{ name: 'student-detail', params: { id: student?.studentId } }"> -->
  <div
    v-for="announcement in announcements"
    :key="announcement.id"
    class="w-[80%] md:w-[60%] bg-white border border-gray-200 rounded-lg shadow hover:shadow-md mb-4"
  >
    <div class="flex flex-col p-8">
      <div class="flex flex-row text-sm text-gray-500">
        <img
          :src="announcement.image"
          alt=""
          class="w-12 h-12 rounded-full mb-4 mr-4 object-cover"
        />
        <div class="">
          <div class="text-gray-900 font-medium">
            {{ announcement.firstname }} {{ announcement.lastname }}
          </div>
          <div class="">— {{ announcement.date }}</div>
        </div>
      </div>
      <div>
        <h5 class="mb-1 text-xl font-medium text-gray-900">{{ announcement.title }}</h5>
        <p class="text-gray-600">
          {{ truncate(announcement.title) }}
        </p>
      </div>

      <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="announcement.images"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>

      <div class="flex flex-row flex-wrap items-start gap-2 mt-2">
        <img
          v-for="(image, index) in announcement.images"
          :key="index"
          :src="image"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg cursor-pointer"
          @click="showMultiple(index, announcement.images)"
        />
      </div>

      <div class="flex mt-4 space-x-3">
        <a
          href="#"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#42b883] rounded-lg hover:bg-[#27a26f] focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg"
          >Read more</a
        >
      </div>
    </div>
  </div>
  <!-- </main> -->
  <!-- </RouterLink> -->
</template>
