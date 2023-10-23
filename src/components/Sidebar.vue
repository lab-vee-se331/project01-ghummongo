<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const isExpanded = ref(true)
const route = useRoute()
const router = useRouter()

const userId = () => {
  return localStorage.getItem('user_id') as string
}

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

const authStore = useAuthStore()
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
  router.push({ name: 'login-page' })
}

function logout() {
  authStore.logout()
  router.push({ name: 'login-page' })
}

const isErrorMessage = () => {
  return message.value === 'Could not login'
}
</script>

<template>
  <aside
    :class="`fixed top-0 left-0 z-40 w-64 h-screen ${!isExpanded && 'w-[4rem]'}`"
    aria-label="Sidebar"
  >
    <div
      :class="`h-full px-4 pb-4 overflow-hidden bg-gray-900 text-gray-500 ${
        !isExpanded && 'hidden'
      }`"
    >
      <div class="h-full flex flex-col justify-between">
        <div class="">
          <div class="flex items-center justify-center mt-5">
            <RouterLink to="/" class="flex p-2.5 mr-2">
              <img src="../assets/ghum-logo.png" class="" alt="Flowbite Logo" />
            </RouterLink>

            <button
              class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20"
              @click="ToggleMenu"
            >
              <font-awesome-icon icon="bars" class="text-white" />
            </button>
          </div>
          <ul class="font-medium mt-4">
            <li>
              <RouterLink
                :to="{ name: 'home-page' }"
                class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
              >
                <font-awesome-icon icon="house" class="w-5 h-5" />
                <span class="ml-3 text-sm">Home Page</span>
              </RouterLink>
            </li>
            <span>
              <li v-if="authStore.isTeacher() || authStore.isAdmin()">
                <RouterLink
                  :to="{ name: 'student-list' }"
                  class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
                >
                  <font-awesome-icon icon="user-graduate" class="w-5 h-5" />
                  <span class="ml-3 text-sm">Students List</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAdmin()">
                <RouterLink
                  :to="{ name: 'teacher-list' }"
                  class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
                >
                  <font-awesome-icon icon="user-tie" class="w-5 h-5" />
                  <span class="ml-3 text-sm">Advisors List</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isAdmin()">
                <RouterLink
                  :to="{ name: 'teacher-setting' }"
                  class="flex justify-between text-gray-500 hover:pl-4 hover:bg-gray-800 group rounded-lg"
                  active-class="highlighted"
                >
                  <div
                    class="flex items-center p-2 rounded-lg"
                    :class="{ highlighted: isSettingsPage }"
                  >
                    <font-awesome-icon icon="user-plus" class="h-5" />
                    <span class="ml-3 text-sm">Add</span>
                  </div>
                </RouterLink>
                <div class="pt-2 pl-4">
                  <ul class="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
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
              <li v-if="authStore.isStudent()">
                <RouterLink
                  :to="{ name: 'announcement-page' }"
                  class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
                >
                  <font-awesome-icon icon="bell" class="w-5 h-5" />
                  <span class="ml-3 text-sm">Announcement</span>
                </RouterLink>
              </li>
              <li v-if="authStore.isTeacher()">
                <RouterLink
                  :to="{ name: 'create-announcement-page' }"
                  class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
                >
                  <font-awesome-icon icon="bullhorn" class="w-5 h-5" />
                  <span class="ml-3 text-sm">Create Announcement</span>
                </RouterLink>
              </li>
            </span>
            <li v-if="authStore.isStudent() || authStore.isTeacher()">
              <RouterLink
                :to="{ name: 'profile-page' }"
                class="flex items-center p-2 rounded-lg hover:pl-4 hover:bg-gray-800 group"
              >
                <font-awesome-icon icon="address-card" class="w-5 h-5" />
                <span class="ml-3 text-sm">Profile</span>
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-center gap-2">
          <span class="flex items-center justify-center gap-2" v-if="!authStore.isLoggedIn()">
            <RouterLink :to="{ name: 'login-page' }" class="flex">
              <div class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20">
                <font-awesome-icon icon="right-to-bracket" class="text-white mr-2" />
                <span class="text-white">login</span>
              </div>
            </RouterLink>
            <RouterLink :to="{ name: 'register-page' }" class="flex">
              <div class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20">
                <font-awesome-icon icon="user-plus" class="text-white mr-2" />
                <span class="text-white">Register</span>
              </div>
            </RouterLink>
          </span>
          <span v-if="authStore.isLoggedIn()">
            <RouterLink :to="{ name: 'register-page' }" class="flex" @click="logout">
              <div class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20">
                <font-awesome-icon icon="right-from-bracket" class="text-white mr-2" />
                <span class="text-white">Logout</span>
              </div>
            </RouterLink>
          </span>
        </div>
      </div>
    </div>
    <div :class="`h-full ${isExpanded && 'hidden'}`">
      <div class="flex items-center justify-center gap-2 absolute left-2 top-2">
        <button class="py-2 px-3 rounded-lg bg-gray-900 border border-white/20" @click="ToggleMenu">
          <font-awesome-icon icon="bars" class="text-white" />
        </button>
        <RouterLink
          v-if="!authStore.isLoggedIn()"
          :to="{ name: 'login-page' }"
          class="group/login py-2 px-3 rounded-lg bg-gray-900 border border-white/20"
        >
          <font-awesome-icon icon="right-to-bracket" class="text-white" />
          <div
            class="absolute mt-4 -ml-5 invisible group-hover/login:visible border-2 p-2 rounded-md !text-gray-900"
          >
            Login
          </div>
        </RouterLink>
        <RouterLink
          v-if="!authStore.isLoggedIn()"
          :to="{ name: 'register-page' }"
          class="group/reg py-2 px-3 rounded-lg bg-gray-900 border border-white/20"
        >
          <font-awesome-icon icon="user-plus" class="text-white" />
          <div
            class="absolute mt-4 -ml-8 invisible group-hover/reg:visible border-2 p-2 rounded-md !text-gray-900"
          >
            Register
          </div>
        </RouterLink>
      </div>
    </div>
  </aside>

  <div v-if="authStore.isLoggedIn()" class="top-2 right-2 fixed z-10">
    <RouterLink :to="{ name: 'profile-page' }" class="flex">
      <div class="py-2 px-3 rounded-lg bg-gray-900 -right-6 border border-white/20">
        <font-awesome-icon icon="user" class="text-white mr-2" />
        <span class="text-white">{{ authStore.currentUserName }}</span>
      </div>
    </RouterLink>
  </div>

  <div
    :class="`my-4 transition ease-in-out delay-2000 px-2 sm:px-2 md:px-8 ${
      isExpanded ? 'sm:ml-64 sm:mt-12' : 'ml-0 mt-14 lg:mt-5'
    }`"
  >
    <div
      v-if="message"
      :class="`animate-flashMessage w-full flex items-center p-4 mb-4 text-sm ${
        isErrorMessage() ? 'text-red-800 bg-red-50' : 'text-green-800 bg-green-50'
      } rounded-lg`"
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
