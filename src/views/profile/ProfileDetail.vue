<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import type { StudentItem, TeacherItem } from '@/type'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

const isEdit = ref(false)
const authStore = useAuthStore()
const messageStore = useMessageStore()

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
    email: oneStudent ? (oneStudent.email as string) : (oneTeacher.email as string)
  }
})

const { value: username } = useField<string>('username')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  if (getRole() === '["ROLE_STUDENT"]') {
    authStore
      .updateStudent(values.id, values.username, values.firstName, values.lastName, values.email)
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
    authStore
      .updateTeacher(values.id, values.username, values.firstName, values.lastName, values.email)
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
          {{ oneStudent ? oneStudent?.firstname : oneTeacher?.firstname }}
          {{ oneStudent ? oneStudent?.lastname : oneTeacher?.lastname }}
        </h2>
        <p>{{ oneStudent ? oneStudent?.email : oneTeacher?.email }}</p>
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
