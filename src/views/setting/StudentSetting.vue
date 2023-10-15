<template>
  <div>
    <h2 class="font-semibold text-xl text-gray-600">Add Student</h2>
    <p class="text-gray-500 mb-6">This form is used to add new student to the list.</p>

    <!-- Form for student data -->
    <form @submit.prevent="submitForm">
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
              <div class="md:col-span-6">
                <div class="flex mb-4 gap-8">
                  <img
                    v-if="profileImage"
                    :src="profileImage"
                    class="uploading-image border-4 h-48 w-48 border-black object-cover"
                  />
                  <img
                    v-if="profileImage"
                    :src="profileImage"
                    class="uploading-image rounded-full border-4 h-48 w-48 border-black object-cover"
                  />
                </div>
                <label for="profileImage">Upload Profile</label>
                <input
                  class="mt-1 bg-gray-50 text-gray-400 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  type="file"
                  id="formFile"
                  accept="image/png, image/gif, image/jpeg"
                  @change="uploadImage"
                  required
                />
              </div>
              <div class="md:col-span-3">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  v-model="student.name"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                />
              </div>

              <div class="md:col-span-3">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  v-model="student.surname"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                />
              </div>

              <div class="md:col-span-2">
                <label for="studentId">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  v-model="student.studentId"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="e.g. 642115069"
                  required
                />
              </div>
              <div class="md:col-span-2">
                <label for="courses">Courses</label>
                <input
                  type="text"
                  name="courses"
                  id="courses"
                  v-model="student.courseList"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="e.g. sci,math,history"
                  required
                />
              </div>
              <div class="md:col-span-2">
                <label for="teacherId">Teacher ID</label>
                <input
                  type="text"
                  name="teacherId"
                  id="teacherId"
                  v-model="student.teacherId"
                  class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  required
                />
              </div>

              <div class="md:col-span-6">
                <label for="comment">Comment</label>
                <textarea
                  type="text"
                  name="comment"
                  id="comment"
                  v-model="student.comment"
                  class="h-20 border mt-1 rounded px-4 pt-2 w-full bg-gray-50"
                  placeholder="e.g. Noob shit"
                  required
                />
              </div>

              <div class="md:col-span-6 text-right mt-2">
                <div class="inline-flex items-end">
                  <button
                    class="bg-[#42b883] hover:bg-[#27a26f] text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStudentStore } from '@/stores/student'
import type { StudentItem } from '@/type'
import router from '@/router'

import { useMessageStore } from '@/stores/message'

export default defineComponent({
  name: 'AddStudent',
  setup() {
    const profileImage = ref<string | null>(null)
    const student: StudentItem = {
      name: '',
      surname: '',
      studentId: '',
      courseList: [],
      teacherId: '',
      comment: '',
      profileImage: ''
    }

    function uploadImage(e: Event) {
      const target = e.target as HTMLInputElement
      const image = target.files && target.files[0]
      if (!image) return

      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = (event) => {
        profileImage.value = event.target!.result as string
      }
    }

    function submitForm() {
      const tempCourseList = []
      var temp = ''
      for (let i = 0; i < student.courseList.length; i++) {
        if (student.courseList[i] !== ',') {
          temp += student.courseList[i]
        } else {
          tempCourseList.push(temp)
          temp = ''
        }
      }
      if (temp) {
        tempCourseList.push(temp)
      }

      const newStudent: StudentItem = {
        ...student,
        profileImage: profileImage.value || '',
        courseList: tempCourseList || []
      }
      const store = useMessageStore()

      const studentStore = useStudentStore()
      studentStore.addStudent(newStudent)

      store.updateMessage('The Student has been added!')
      setTimeout(() => {
        store.resetMessage()
      }, 3000)

      router.push({ name: 'student-list' })
    }

    return {
      profileImage,
      student,
      uploadImage,
      submitForm
    }
  }
})
</script>

<style scoped>
.error {
  color: red;
}

input {
  border: 1px solid red;
}
</style>
