<script setup lang="ts">
  import type { AnnouncementItem } from '@/type'
  
  const { oneAnnouncement } = defineProps<{
    oneAnnouncement: AnnouncementItem
  }>()
  </script>

<template>
  <div v-if="oneAnnouncement">
    <div class="max-sm:items-center max-sm:justify-center bg-white rounded shadow-lg p-4 md:p-4 mb-6 relative my-6">
      <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5">Announcement</span>
      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2 max-[1360px]:mt-4">
        <div class="lg:col-span-2">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
            <div class="lg:col-span-2 sm:col-span-6">
              <div class="text-xl text-gray-600">
                <div class="w-full flex items-center justify-between">
                  <h2 class="font-semibold text-2xl text-gray-600 mb-4">{{ oneAnnouncement.title }}</h2>
                </div>
              </div>
              <div class="mb-8 max-h-[200px] overflow-y-auto"><span class="font-bold">Description: </span>{{ oneAnnouncement.description }}</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  
