<script setup lang="ts">
import type { StudentItem } from '@/type'
import InputText from '@/components/InputText.vue'
import { useField, useForm } from 'vee-validate'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { ref } from 'vue'
import CommentSection from '@/components/CommentSection.vue'

const isEdit = ref(false)
const authStore = useAuthStore()
const messageStore = useMessageStore()

const { oneStudent } = defineProps<{
  oneStudent: StudentItem
}>()

const { errors, handleSubmit } = useForm({
  // validationSchema,

  initialValues: {
    id: (oneStudent?.id as string) || '',
    username: (oneStudent?.username as string) || '',
    firstName: (oneStudent?.firstname as string) || '',
    lastName: (oneStudent?.lastname as string) || '',
    email: (oneStudent?.email as string) || ''
  }
})

const { value: username } = useField<string>('username')
const { value: firstName } = useField<string>('firstName')
const { value: lastName } = useField<string>('lastName')
const { value: email } = useField<string>('email')

const onSubmit = handleSubmit((values) => {
  authStore
    .updateStudent(
      values.id,
      values.username,
      values.firstName,
      values.lastName,
      values.email
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

const onSubmitComment = () => {
  console.log('COMMENT')
}
</script>

<template>
  <div>
    <div v-if="oneStudent">
      <div
        class="flex max-sm:items-center max-sm:justify-center bg-white rounded shadow-lg p-4 md:p-4 mb-6 relative my-6"
      >
        <span class="absolute top-0 left-0 bg-[#42b883] rounded-br-lg text-white px-6 py-1.5"
          >Student</span
        >
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2 max-[1360px]:mt-4">
          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6 my-4">
              <div class="lg:col-span-2 sm:col-span-6">
                <img
                  :src="oneStudent?.image"
                  alt=""
                  class="rounded-full w-80 h-80 object-cover mr-4 max-[1360px]:w-64 max-[1360px]:h-64 max-[1190px]:w-52 max-[1190px]:h-52"
                />
              </div>
              <div class="lg:col-span-4 sm:col-span-6 text-xl text-gray-600">
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
                <div class="mb-4"><span class="font-bold">Advisor: </span></div>
                <RouterLink
                  :to="{ name: 'teacher-detail', params: { id: oneStudent?.teacher.id } }"
                  class="w-fit flex"
                >
                  <div
                    class="w-fit px-3 py-2 flex items-center bg-white border border-gray-200 rounded-lg shadow hover:shadow-md"
                  >
                    <img
                      class="w-16 h-16 rounded-full mr-4 object-cover"
                      :src="oneStudent?.teacher.image"
                      alt=""
                    />
                    <div class="text-base">
                      <p class="text-gray-900 leading-none">
                        {{ oneStudent?.teacher.firstname }} {{ oneStudent?.teacher.lastname }}
                      </p>
                      <p class="text-gray-600">{{ oneStudent?.teacher.id }}</p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center my-12">
        <CommentSection :id="oneStudent.id"></CommentSection>
      </div>

      <form @submit.prevent="onSubmitComment">
        <div class="w-full border border-gray-200 rounded-lg bg-gray-50">
          <div class="px-4 py-2 bg-white rounded-t-lg">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea
              rows="4"
              class="w-full px-0 text-sm text-gray-900 bg-white border-0"
              placeholder="Write a comment..."
            ></textarea>
          </div>
          <div class="flex items-center justify-between px-3 py-2 border-t">
            <button
              type="submit"
              class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#27a26f] rounded-lg focus:ring-4 focus:ring-[#b1e9ca]"
            >
              Post comment
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
