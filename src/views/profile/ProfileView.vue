<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import { useStudentStore } from '@/stores/student'
import * as yup from 'yup'
import type { StudentItem } from '@/type'
import { onMounted, ref } from 'vue'

const studentStore = useStudentStore()
const isEdit = ref(false)
const student = ref<StudentItem | null>(null)

const userId = localStorage.getItem('user_id') as string

onMounted(async () => {
  student.value = await studentStore.getStudentById(userId)
})

// const validationSchema = yup.object({
//   username: yup.string().required('The username is required'),
//   firstName: yup.string().required('The first name is required'),
//   lastName: yup.string().required('The last name is required'),
//   email: yup.string().email().required('The email is required')
// })

const { errors, handleSubmit } = useForm({
  // validationSchema,

  initialValues: {
    id: student.value?.id,
    username: student.value?.username,
    firstName: student.value?.firstname,
    lastName: student.value?.lastname,
    email: student.value?.email
  }
})

const { value: username } = useField<string>('username')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  console.log('username: ' + values.username)
  console.log('firstName: ' + values.firstName)
  console.log('lastName: ' + values.lastName)
  console.log('email: ' + values.email)
})

const getRole = () => {
  return localStorage.getItem('user_role')
}

const editToggle = () => {
  isEdit.value = !isEdit.value
  console.log(isEdit.value)
}
</script>

<template>
  <main class="h-full grid grid-cols-12 gap-4 content-center">
    <div
      class="col-span-12 lg:col-span-4 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 flex flex-col items-center justify-center"
    >
      <div class="">
        <img
          class="w-32 h-32 rounded-full mx-auto"
          src="https://i.imgur.com/tbXDnsJ.jpg"
          alt="Profile picture"
        />
        <h2 class="text-center text-2xl font-semibold mt-3">
          {{ student?.firstname }}
          {{ student?.lastname }}
        </h2>
        <p class="text-center text-gray-600 mt-1">{{ getRole() }}</p>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-8 bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
      <div class="w-full flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-600 mb-2">Profile</h2>
        <button
          class="group py-2 px-3 rounded-lg bg-white -right-6 border-2 border-gray-900 hover:bg-gray-900 text-sm"
          @click="editToggle"
        >
          <font-awesome-icon
            icon="pen-to-square"
            class="text-gray-900 mr-2 group-hover:text-white"
          />
          <span class="text-gray-900 font-medium group-hover:text-white">Edit</span>
        </button>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
          <div class="md:col-span-6">
            <label for="username">Username</label>
            <InputText
              type="text"
              v-model="username"
              :error="errors['username']"
              :disabled="!isEdit"
            ></InputText>
          </div>

          <div class="md:col-span-3">
            <label for="firstName">First Name</label>
            <InputText
              type="text"
              v-model="firstName"
              :error="errors['firstName']"
              :disabled="!isEdit"
            ></InputText>
          </div>

          <div class="md:col-span-3">
            <label for="lastName">Last Name</label>
            <InputText
              type="text"
              v-model="lastName"
              :error="errors['lastName']"
              :disabled="!isEdit"
            ></InputText>
          </div>

          <div class="md:col-span-6">
            <label for="email">Email</label>
            <InputText
              type="text"
              v-model="email"
              :error="errors['email']"
              :disabled="!isEdit"
            ></InputText>
          </div>

          <div class="md:col-span-6 text-right mt-2">
            <div class="inline-flex items-end">
              <button
                class="bg-[#42b883] hover:bg-[#27a26f] text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-[#42b88393]"
                type="submit"
                :disabled="!isEdit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
