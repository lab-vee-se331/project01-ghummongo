<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const isExpanded = ref(true)
const route = useRoute();

// fuck you phiriyakorn
const ToggleMenu = () => {
  isExpanded.value = !isExpanded.value
}

// highlight when student/techer -setting page
const isSettingsPage = computed(() => {
  return route.name && ['student-setting', 'teacher-setting'].includes(route.name as string);
});
</script>

<template>
  <!-- <button class="fixed top-8 -left-4 rounded-lg bg-gray-800 text-gray-500 px-4 py-2" @click="isExpanded == true">
    <font-awesome-icon icon="arrow-right" />
  </button> -->
  <aside :class="`fixed top-0 left-0 z-40 w-64 h-screen ${!isExpanded && 'not-expanded'}`" aria-label="Sidebar">
    <!-- transition-transform -translate-x-full sm:translate-x-0 -->
    <div :class="`h-full px-6 py-8 overflow-y-auto bg-gray-900 text-gray-500 ${!isExpanded && 'hidden'}`">
      <div class="flex items-center justify-between pl-2.5 mb-5">
        <RouterLink to="/" class="flex">
          <img
            src="https://api.logo.com/api/v2/images?logo=logo_4e60f17a-fda1-4731-bdee-b9323c05a05a&format=webp&margins=0&quality=60&width=500&background=transparent&u=1691332226"
            class="h-7 mr-3" alt="Flowbite Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white">Ghum</span>
        </RouterLink>
        <button class="px-2.5 py-0.5 rounded bg-gray-800" @click="ToggleMenu">
          <font-awesome-icon icon="arrow-left" />
        </button>
      </div>
      <hr class="border-gray-700" />
      <ul class="space-y-2 font-medium mt-4">
        <li>
          <RouterLink :to="{ name: 'home-page' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group">
            <font-awesome-icon icon="house" class="w-5 h-5" />
            <span class="ml-3 text-sm">Home Page</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'student-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group">
            <font-awesome-icon icon="user-graduate" class="w-5 h-5" />
            <span class="ml-3 text-sm">Students List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'teacher-list' }"
            class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group">
            <font-awesome-icon icon="user-tie" class="w-5 h-5" />
            <span class="ml-3 text-sm">Teachers List</span>
          </RouterLink>
        </li>
        <li class="">
          <RouterLink :to="{ name: 'student-setting' }"
            class="flex justify-between text-gray-500 hover:pl-4 hover:bg-gray-800 group rounded-lg"
            active-class="highlighted">
            <div class="flex items-center p-2 rounded-lg" :class="{ 'highlighted': isSettingsPage }">
              <font-awesome-icon icon="sliders" class="w-5 h-5" />
              <span class="ml-3 text-sm">Settings</span>
            </div>
          </RouterLink>
          <div class="pt-2 pl-4">
            <ul class="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
              <li>
                <RouterLink :to="{ name: 'student-setting' }"
                  class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white">Students
                </RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'teacher-setting' }"
                  class="inline-block w-full px-4 py-2 text-xs rounded hover:bg-gray-800 hover:text-white">Teachers
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div :class="`h-full px-3.5 py-8 overflow-hidden bg-gray-900 text-gray-500 ${isExpanded && 'hidden'}`">
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
    </div>
  </aside>

  <div :class="`smooth-transition p-4 ${isExpanded ? 'sm:ml-64' : 'ml-16'}`">
    <RouterView />
  </div>
</template>

<style scoped>
a.router-link-active {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.not-expanded {
  width: 4rem;
}

aside,
.smooth-transition {
  transition: 0.2s ease-out;
}

.highlighted {

  /* This is an example, you can adjust it */
  color: white;
}
</style>
