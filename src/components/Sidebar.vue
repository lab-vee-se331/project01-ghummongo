<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const isExpanded = ref(true)
const route = useRoute()

const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value
}

const updateIsExpanded = () => {
  isExpanded.value = window.innerWidth >= 650
}

// Call the function initially
updateIsExpanded()

// Add a resize event listener to update isExpanded value
onMounted(() => {
  window.addEventListener('resize', updateIsExpanded)
})

// Clean up the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('resize', updateIsExpanded)
})

// highlight when student/techer -setting page
const isSettingsPage = computed(() => {
  return route.name && ['student-setting', 'teacher-setting'].includes(route.name as string)
})

const messageStore = useMessageStore()
const { message } = storeToRefs(messageStore)
</script>

<template>
  <aside
    :class="`fixed top-0 left-0 z-40 w-64 h-screen ${!isExpanded && 'w-[4rem]'}`"
    aria-label="Sidebar"
  >
    <div
      :class="`h-full px-4 pb-8 overflow-hidden bg-gray-900 text-gray-500 ${
        !isExpanded && 'hidden'
      }`"
    >
      <div class="flex items-center justify-center mt-5">
        <!-- <div class="h-24"> -->
          <RouterLink to="/" class="flex p-2.5 mr-2">
            <img src="../assets/ghum-logo.png" class="" alt="Flowbite Logo" />
          </RouterLink>
        <!-- </div> -->

        <button class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20" @click="ToggleMenu">
          <font-awesome-icon icon="arrow-left" class="text-white" />
        </button>
      </div>
      <!-- <div class="flex items-center justify-center">
        <div class="h-24">
          <RouterLink to="/" class="flex border border-white">
            <img src="../assets/ghum-logo.png" class="" alt="Flowbite Logo" />
          </RouterLink>
        </div>

        <button class="absolute px-3 py-4 rounded-lg bg-gray-900 -right-6" @click="ToggleMenu">
          <font-awesome-icon icon="arrow-left" class="text-white" />
        </button>
      </div> -->
      <!-- <hr class="border-gray-700" /> -->
      <ul class="space-y-2 font-medium mt-4">
        <li>
          <RouterLink
            :to="{ name: 'home-page' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
          >
            <font-awesome-icon icon="house" class="w-5 h-5" />
            <span class="ml-3 text-sm">Home Page</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'student-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
          >
            <font-awesome-icon icon="user-graduate" class="w-5 h-5" />
            <span class="ml-3 text-sm">Students List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'teacher-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
          >
            <font-awesome-icon icon="user-tie" class="w-5 h-5" />
            <span class="ml-3 text-sm">Teachers List</span>
          </RouterLink>
        </li>
        <li class="">
          <RouterLink
            :to="{ name: 'student-setting' }"
            class="flex justify-between text-gray-500 hover:pl-4 hover:bg-gray-800 group rounded-lg"
            active-class="highlighted"
          >
            <div class="flex items-center p-2 rounded-lg" :class="{ highlighted: isSettingsPage }">
              <font-awesome-icon icon="sliders" class="w-5 h-5" />
              <span class="ml-3 text-sm">Settings</span>
            </div>
          </RouterLink>
          <div class="pt-2 pl-4">
            <ul class="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
              <li>
                <RouterLink
                  :to="{ name: 'student-setting' }"
                  class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white"
                  >Students
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'teacher-setting' }"
                  class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white"
                  >Teachers
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div :class="`h-full ${isExpanded && 'hidden'}`">
      <button class="absolute py-2 px-3 rounded-lg bg-gray-900 left-2 top-2" @click="ToggleMenu">
        <font-awesome-icon icon="bars" class="text-white" />
      </button>
    </div>
    <!-- <div :class="`h-full px-3.5 py-8 overflow-hidden bg-gray-900 text-gray-500 ${isExpanded && 'hidden'}`">
      <div class="flex flex-col items-center justify-center mb-5">
        <RouterLink to="/" class="flex">
        </RouterLink>
        <button class="px-2.5 py-0.5 rounded bg-gray-800" @click="ToggleMenu">
          <font-awesome-icon icon="arrow-right" />
        </button>
      </div>
      <hr class="border-gray-700" />
      <ul class="space-y-2 font-medium mt-4">
        <li>
          <RouterLink :to="{ name: 'home-page' }" class="flex items-center p-2 rounded-lg hover:bg-gray-800 group">
            <font-awesome-icon icon="house" class="w-5 h-5" />
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'student-list' }" class="flex items-center p-2 rounded-lg hover:bg-gray-800 group">
            <font-awesome-icon icon="user-graduate" class="w-5 h-5" />
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'teacher-list' }" class="flex items-center p-2 rounded-lg hover:bg-gray-800 group">
            <font-awesome-icon icon="user-tie" class="w-5 h-5" />
          </RouterLink>
        </li>
        <li class="">
          <div class="flex justify-between text-gray-500 hover:bg-gray-800 group rounded-lg">
            <RouterLink :to="{ name: 'student-setting' }" class="flex items-center p-2 rounded-lg">
              <font-awesome-icon icon="sliders" class="w-5 h-5" />
            </RouterLink>
          </div>

        </li>
      </ul>
    </div> -->
  </aside>

  <div
    :class="`my-4 transition ease-in-out delay-2000 px-2 sm:px-2 md:px-8 ${
      isExpanded ? 'sm:ml-64' : 'ml-0 mt-14'
    }`"
  >
    <div
      v-if="message"
      class="animate-flashMessage w-full flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
    >
      <h2 class="font-medium">{{ message }}</h2>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
a.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

aside,
.smooth-transition,
template {
  transition: 0.2s ease-in-out;
}

.highlighted {
  color: white;
}
</style>
