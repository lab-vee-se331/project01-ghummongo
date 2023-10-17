<script setup lang="ts">
import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

// const img = ref('') // Img Url , string or Array of string
const imgs = ref<String[]>()
const visible = ref(false)
const index = ref(0)

// const showSingle = () => {
//   img.value = 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070' // or an object with title and src
//   show()
// }

const showMultiple = (i: number) => {
  imgs.value = [
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070',
    'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1935',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070'
  ] // or an array of objects with title and src
  index.value = i
  show()
}

// const changeIndexAndShowMultiple = (index: number) => {
//   changeIndex(index)
// }

// const changeIndex = (index: number) => {
//   index.value = index
// }

const show = () => {
  visible.value = true
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
  <!-- <RouterLink :to="{ name: 'student-detail', params: { id: student?.studentId } }"> -->
  <div class="w-[80%] md:w-[60%] bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
    <div class="flex flex-col p-8">
      <div class="flex flex-row text-sm text-gray-500">
        <img src="https://i.imgur.com/tbXDnsJ.jpg" alt="" class="h-12 rounded-full mb-4 mr-4" />
        <div class="">
          <div class="text-gray-900 font-medium">Web</div>
          <div class="">— 10/15/2023 1:10 AM</div>
        </div>
      </div>
      <div>
        <h5 class="mb-1 text-xl font-medium text-gray-900">Some Title</h5>
        <p class="text-gray-600">
          {{
            truncate(
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae eaque voluptate eius perferendis pariatur unde placeat totam incidunt quaerat! eaque voluptate eius'
            )
          }}
        </p>
      </div>

      <vue-easy-lightbox
        escDisabled
        moveDisabled
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>

      <div class="flex flex-row flex-wrap items-start gap-2 mt-2">
        <img
          src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg cursor-pointer"
          @click="showMultiple(0)"
        />
        <img
          src="https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1935"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg cursor-pointer"
          @click="showMultiple(1)"
        />
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070"
          alt="events image"
          class="border-solid border-gray-200 border-2 rounded w-20 h-28 object-cover hover:shadow-lg cursor-pointer"
          @click="showMultiple(2)"
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
  <!-- </RouterLink> -->
</template>
