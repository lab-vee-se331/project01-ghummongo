<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useRouter, RouterLink } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const authStore = useAuthStore()
const router = useRouter()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  username: yup.string().required('The username is required'),
  firstName: yup.string().required('The firstName is required'),
  lastName: yup.string().required('The lastName is required'),
  email: yup.string().email().required('The email is required'),
  password: yup.string().required('The password is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,

  initialValues: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
})

const { value: username } = useField<string>('username')

const { value: firstName } = useField<string>('firstName')

const { value: lastName } = useField<string>('lastName')

const { value: email } = useField<string>('email')

const { value: password } = useField<string>('password')

const onSubmit = handleSubmit((values) => {
  authStore
    .studentRegister(values.username, values.firstName, values.lastName, values.email, values.password)
    .then(() => {
      router.push({ name: 'login-page' })
      messageStore.updateMessage('Register Successful')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 5000)
    })
    .catch(() => {
      messageStore.updateMessage('could not register')

      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
    })
})
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="../../assets/ghum-mongo-black-border.png"
        alt="ghum mongo"
      />

      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Register to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="username" class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <InputText type="text" v-model="username" :error="errors['username']"></InputText>
        </div>

        <div>
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900"
            >First Name</label
          >
          <InputText type="text" v-model="firstName" :error="errors['firstName']"></InputText>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900"
            >Last Name</label
          >
          <InputText type="text" v-model="lastName" :error="errors['lastName']"></InputText>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <InputText type="text" v-model="email" :error="errors['email']"></InputText>
        </div>

        <div>
          <div class="flex items-center justify-start">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>

          <div class="mt-2">
            <InputText v-model="password" type="password" :error="errors['password']"></InputText>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-[#42b883] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#42b883] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42b883]"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already a member?

        {{ ' ' }}

        <RouterLink
          :to="{ name: 'login-page' }"
          class="font-semibold leading-6 text-[#42b883] hover:text-[#42b883]"
          >Sign In</RouterLink
        >
      </p>
    </div>
  </div>
</template>
