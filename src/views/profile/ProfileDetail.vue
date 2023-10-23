<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import type { StudentItem, TeacherItem } from '@/type'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useStudentStore } from '@/stores/student'
import CommentSection from '@/components/CommentSection.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import StudentCard from '@/components/StudentCard.vue'
import TeacherCard from '@/components/TeacherCard.vue'
import { onBeforeRouteUpdate } from 'vue-router'
import StudentService from '@/services/StudentService'
import type { AxiosResponse } from 'axios'
import StudentCard2 from '@/components/StudentCard2.vue'
import BaseInput from '@/components/BaseInput.vue'

const isEdit = ref(false)
const authStore = useAuthStore()
const messageStore = useMessageStore()

const images = ref<string[]>([])

const { oneStudent, oneTeacher } = defineProps<{
  oneStudent: StudentItem
  oneTeacher: TeacherItem
}>()

const { errors, handleSubmit } = useForm({
  // validationSchema,

  initialValues: {
    id: oneStudent ? (oneStudent.id as string) : (oneTeacher.id as string),
    username: oneStudent ? (oneStudent.username as string) : (oneTeacher.username as string),
    firstName: oneStudent ? (oneStudent.firstname as string) : (oneTeacher.firstname as string),
    lastName: oneStudent ? (oneStudent.lastname as string) : (oneTeacher.lastname as string),
    email: oneStudent ? (oneStudent.email as string) : (oneTeacher.email as string),
    image: []
  }
})

const { value: username } = useField<string>('username')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  // console.log(images.value[0].url);
  if (getRole() === '["ROLE_STUDENT"]') {
    authStore
      .updateStudent(
        values.id,
        values.username,
        values.firstName,
        values.lastName,
        values.email,
        images.value[0].url
      )
      .then(() => {
        messageStore.updateMessage('Update Successful')

        setTimeout(() => {
          messageStore.resetMessage()
        }, 5000)
      })
      .catch(() => {
        messageStore.updateMessage('could not Update')

        setTimeout(() => {
          messageStore.resetMessage()
        }, 3000)
      })
  } else if (getRole() === '["ROLE_TEACHER"]') {
    // console.log(values.image)
    authStore
      .updateTeacher(
        values.id,
        values.username,
        values.firstName,
        values.lastName,
        values.email,
        images.value[0].url
      )
      .then(() => {
        messageStore.updateMessage('Update Successful')

        setTimeout(() => {
          messageStore.resetMessage()
        }, 5000)
      })
      .catch(() => {
        messageStore.updateMessage('could not Update')

        setTimeout(() => {
          messageStore.resetMessage()
        }, 3000)
      })
  }
})

const getRole = () => {
  return localStorage.getItem('user_role')
}

const editToggle = () => {
  isEdit.value = !isEdit.value
  console.log(isEdit.value)
}

const isStudent = () => {
  return getRole() === '["ROLE_STUDENT"]'
}

const studentStore = useStudentStore()
const students = ref<StudentItem[]>([])
const totalStudent = ref<number>(0)
const keyword = ref('')

const fetchStudents = async () => {
  students.value = await studentStore.getStudents(30, 1)
}

onMounted(async () => {
  fetchStudents()
  totalStudent.value = studentStore.getStudentsLength()
})

onBeforeRouteUpdate(async (to, from, next) => {
  const toPage = to.query.page ? Number(to.query.page) : 1 // set default page to 1 if to.query.page is undefined
  students.value = await studentStore.getStudents(30, toPage)
  totalStudent.value = studentStore.getStudentsLength()
  next()
})


function updateKeyword(value: string) {
  console.log(keyword.value)
  let queryFunction
  if (keyword.value == '') {
    fetchStudents()
    queryFunction = studentStore.getStudents(6, 1)
  } else {
    queryFunction = StudentService.getStudentsByKeyword(keyword.value, 6, 1)
  }
  queryFunction
    .then((response: AxiosResponse<StudentItem[]>) => {
      students.value = response.data
      console.log('students', students.value)
      totalStudent.value = studentStore.getStudentsLength()
      console.log('totalStudent', totalStudent.value)
      if (!students.value) {
        fetchStudents()
      }
    })
    .catch((err) => {
      console.log('err: ' + err)
      // router.push({ name: 'NetworkError' })
    })
}
</script>

<template>
  <main class="h-full grid grid-cols-12 gap-4 content-center">
    <div
      class="col-span-12 lg:col-span-4 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 flex flex-col items-center justify-center">
      <div class="">
        <img
          class="w-32 h-32 rounded-full mx-auto object-cover"
          :src="oneStudent ? oneStudent?.image : oneTeacher?.image"
          alt="Profile picture"
        />
        <h2 class="text-center text-2xl font-semibold mt-3">
          {{ oneStudent ? oneStudent?.firstname : oneTeacher?.firstname }}
          {{ oneStudent ? oneStudent?.lastname : oneTeacher?.lastname }}
        </h2>
        <p class="text-center">{{ oneStudent ? oneStudent?.email : oneTeacher?.email }}</p>
        <p class="text-center text-gray-600 mt-1">{{ getRole() }}</p>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-8 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div class="w-full flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-600 mb-2">Profile</h2>
        <button class="group py-2 px-3 rounded-lg bg-white -right-6 border-2 border-gray-900 hover:bg-gray-900 text-sm"
          @click="editToggle">
          <font-awesome-icon icon="pen-to-square" class="text-gray-900 mr-2 group-hover:text-white" />
          <span class="text-gray-900 font-medium group-hover:text-white">Edit</span>
        </button>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
          <div class="md:col-span-6">
            <label for="username">Username</label>
            <InputText type="text" v-model="username" :error="errors['username']" :disabled="!isEdit"></InputText>
          </div>

          <div class="md:col-span-3">
            <label for="firstName">First Name</label>
            <InputText type="text" v-model="firstName" :error="errors['firstName']" :disabled="!isEdit"></InputText>
          </div>

          <div class="md:col-span-3">
            <label for="lastName">Last Name</label>
            <InputText type="text" v-model="lastName" :error="errors['lastName']" :disabled="!isEdit"></InputText>
          </div>

          <div class="md:col-span-6">
            <label for="email">Email</label>
            <InputText type="text" v-model="email" :error="errors['email']" :disabled="!isEdit"></InputText>
          </div>

          <div class="md:col-span-6">
            <h3>Upload Profile</h3>
            <ImageUpload v-model="images" class="my-1" :max="1" />
            <p class="text-gray-400">Supported formats: "JPG", "JPEG", "PNG", "GIF"</p>
          </div>

          <div class="md:col-span-6 text-right mt-2">
            <div class="inline-flex items-end">
              <button
                class="bg-[#42b883] hover:bg-[#27a26f] text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-[#42b88393]"
                type="submit" :disabled="!isEdit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <div v-if="isStudent()" class="flex flex-col items-center justify-center my-12">
        <CommentSection :id="oneStudent.id" :oneStudent="oneStudent"></CommentSection>
      </div>
    </div>
    <div class="col-span-12 flex flex-col items-center justify-center">
      <div class="" v-if="oneStudent?.teacher">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <TeacherCard
            :oneTeacher="oneStudent.teacher"
          ></TeacherCard>
        </div>
      </div>
      <div class="" v-if="oneTeacher?.ownStudent">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <StudentCard
            v-for="student in oneTeacher.ownStudent"
            :key="student.id"
            :student="student"
          ></StudentCard>
        </div>
      </div>
    </div>

    <!-- Search -->

    <!-- <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <StudentCard v-for="student in students" :key="student.id" :student="student"></StudentCard>
    </div> -->

  </main>
  <main class="flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4 text-gray-700">Student List</h1>
    <!-- Search -->
    <div class="w-[50%] mb-4">
      <BaseInput v-model="keyword" type="text" label="Search" placeholder="Search for student" @input="updateKeyword">
      </BaseInput>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
      <StudentCard2 v-for="student in students" :key="student.id" :student="student" :oneTeacher="oneTeacher">
      </StudentCard2>
    </div>

  </main>
</template>
