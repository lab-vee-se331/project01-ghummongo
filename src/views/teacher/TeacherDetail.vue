<script setup lang="ts">
import type { StudentItem, TeacherItem } from '@/type'

// eslint-disable-next-line vue/no-setup-props-destructure
const { manyStudent, oneTeacher } = defineProps<{
  manyStudent: StudentItem[]
  oneTeacher?: TeacherItem
}>()
</script>

<template>
  <div>
    <div v-if="oneTeacher">
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 relative my-6">
        <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5">Teacher</span>
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
              <div class="lg:col-span-2 sm:col-span-6">
                <img :src="oneTeacher?.images[0]" alt="" class="rounded-full w-80 h-80 object-cover" />
              </div>
              <div class="lg:col-span-4 sm:col-span-6 text-xl text-gray-600">
                <div class="mb-4">
                  <span class="font-bold">Name:</span> {{ oneTeacher?.firstname }}
                  {{ oneTeacher?.lastname }}
                </div>
                <div class="mb-4">
                  <span class="font-bold">Teacher Id:</span> {{ oneTeacher?.id }}
                </div>
                <div class="mb-4"><span class="font-bold">Students List: </span></div>

                <ul class="flex flex-col mb-4 items-start max-[449px]:flex-col max-[449px]:items-start gap-y-2">
                  <li v-for="(student, index) in oneTeacher?.ownStudent" :key="index">
                    <RouterLink :to="{ name: 'student-detail', params: { id: student?.id } }" class="w-fit flex">
                      <div
                        class="w-fit px-3 py-2 flex items-center bg-white border border-gray-200 rounded-lg shadow hover:shadow-md">
                        <img class="w-16 h-16 rounded-full mr-4 object-cover" :src="student?.profileImage" alt="" />
                        <div class="text-base">
                          <p class="text-gray-900 leading-none">
                            {{ student?.name }} {{ student?.surname }}
                          </p>
                        </div>
                      </div>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
