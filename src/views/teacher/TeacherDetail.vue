<script setup lang="ts">
import type { TeacherItem } from '@/type'
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'

const isEdit = ref(false)
const authStore = useAuthStore()
const messageStore = useMessageStore()

// eslint-disable-next-line vue/no-setup-props-destructure
const { oneTeacher } = defineProps<{
  oneTeacher?: TeacherItem
}>()

// const validationSchema = yup.object({
//   username: yup.string().required('The username is required'),
//   firstName: yup.string().required('The first name is required'),
//   lastName: yup.string().required('The last name is required'),
//   email: yup.string().email().required('The email is required')
// })

const { errors, handleSubmit } = useForm({
  // validationSchema,

  initialValues: {
    id: oneTeacher?.id as string || "",
    username: oneTeacher?.username as string || "",
    firstName: oneTeacher?.firstname as string || "",
    lastName: oneTeacher?.lastname as string || "",
    email: oneTeacher?.email as string || ""
  }
})

const { value: username } = useField<string>('username')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  console.log("WTF")
  authStore.updateTeacher(
    values.id,
    values.username,
    values.firstName,
    values.lastName,
    values.email,
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
})

const editToggle = () => {
  isEdit.value = !isEdit.value
  console.log(isEdit.value)
}
</script>

<template>
  <div>
    <div v-if="oneTeacher">
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 relative my-6">
        <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5"
          >Teacher</span
        >
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
              <div class="lg:col-span-2 sm:col-span-6">
                <img :src="oneTeacher?.image" alt="" class="rounded-full w-80 h-80 object-cover" />
              </div>
              <div class="lg:col-span-4 sm:col-span-6 text-xl text-gray-600">
                <!-- <div class="mb-4">
                  <span class="font-bold">Name:</span> {{ oneTeacher?.firstname }}
                  {{ oneTeacher?.lastname }}
                </div>
                <div class="mb-4">
                  <span class="font-bold">Teacher Id:</span> {{ oneTeacher?.id }}
                </div> -->
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
                <div class="mb-4"><span class="font-bold">Students List: </span></div>

                <ul
                  class="flex flex-col mb-4 items-start max-[449px]:flex-col max-[449px]:items-start gap-y-2"
                >
                  <li v-for="(student, index) in oneTeacher?.ownStudent" :key="index">
                    <RouterLink
                      :to="{ name: 'student-detail', params: { id: student?.id } }"
                      class="w-fit flex"
                    >
                      <div
                        class="w-fit px-3 py-2 flex items-center bg-white border border-gray-200 rounded-lg shadow hover:shadow-md"
                      >
                        <img
                          class="w-16 h-16 rounded-full mr-4 object-cover"
                          :src="student?.image"
                          alt=""
                        />
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
